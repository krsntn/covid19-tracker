import React from 'react';

const Loading = () => {
  return (
    <div
      className="position-fixed bg-grey"
      style={{
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
      }}
    >
      <div
        className="position-absolute bg-primary rounded"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <span
          className="spinner-border spinner-border-sm text-white m-2"
          style={{ width: '20px', height: '20px' }}
          role="status"
          aria-hidden="true"
        ></span>
      </div>
    </div>
  );
};

export default Loading;
