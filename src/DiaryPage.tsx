import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import marked from 'marked';
import DOMPurify from 'dompurify';

import LC from './lc';
import style from './DiaryPage.module.scss';

const Entry = LC.Object.extend('Entry');

type DiaryEntry = { id: string; content: string; date: Date };

const DiaryPage = () => {
  const [error, setError] = useState('');
  const [newEntry, setNewEntry] = useState('');
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const history = useHistory();
  const me = LC.User.current();

  useEffect(() => {
    const fetchEntries = async () => {
      const query = new LC.Query('Entry');
      query.equalTo('user', LC.User.current());
      query.descending('createdAt');
      try {
        const fetchedEntries = await query.find();
        setEntries(
          fetchedEntries.map(entry => {
            return {
              id: entry.id!,
              content: entry.get('content'),
              date: entry.createdAt!
            };
          })
        );
      } catch (e) {
        setError(e.message);
      }
    };
    fetchEntries();
  }, [me]);

  if (!LC.User.current()) {
    history.push('/');
    return <></>;
  }

  const submit = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const entry = new Entry();
    const acl = new LC.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(me, true);
    acl.setWriteAccess(me, true);
    entry.setACL(acl);
    try {
      const savedEntry = await entry.save({
        user: me,
        content: newEntry
      });
      setNewEntry('');
      setEntries([
        {
          id: savedEntry.id!,
          content: savedEntry.get('content'),
          date: savedEntry.createdAt!
        },
        ...entries
      ]);
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div className={style.container}>
      <h2>New entry</h2>
      <form>
        <textarea
          value={newEntry}
          onChange={e => setNewEntry(e.target.value)}
        />
        <button type="submit" onClick={submit}>
          Submit
        </button>
        <div>{error}</div>
      </form>
      <h2>Entries</h2>
      {entries.map(entry => (
        <div key={entry.id}>
          <div className={style.date}>{entry.date.toDateString()}</div>
          <div
            className={style.content}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(entry.content))
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DiaryPage;
