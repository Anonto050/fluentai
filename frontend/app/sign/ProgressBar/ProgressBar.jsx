import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-green-200 rounded-lg transition-all duration-500 ease-in-out">
      <div
        className="h-5 bg-green-500 rounded-lg text-white font-bold flex items-center justify-center"
        style={{ width: `${progress}%`, minWidth: '50px' }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
