import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import LC from './lc';

const DiaryPage = () => {
  const [error, _] = useState('');
  return (
    <div>
      <div>{error}</div>
      Placeholder.
    </div>
  );
};

export default DiaryPage;
