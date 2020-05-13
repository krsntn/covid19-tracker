import React, { useCallback } from 'react';
import Icon from 'components/icon';

const Card = (props) => {
  const { title, number, icon, theme, width } = props;

  const formatNumberWithCommas = useCallback((x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, []);

  return (
    <div
      className="card w-100 border-0 position-relative"
      style={{ marginBottom: '4rem' }}
    >
      <div className="card-body font-weight-bold">
        <div
          className={`card-title text-${theme}`}
          style={{ fontSize: '2rem' }}
        >
          {title}
        </div>
        <div className="card-text" style={{ fontSize: '3rem' }}>
          {number && formatNumberWithCommas(number)}
        </div>
      </div>
      <div
        className={`d-flex flex-column justify-content-center align-items-center position-absolute p-3 text-white rounded bg-${theme}`}
        style={{
          top: -36,
          right: 30,
          minWidth: 100,
          minHeight: 100,
          margin: 'auto',
          boxShadow: '0 0 20px 1px #999',
        }}
      >
        <Icon name={icon} />
      </div>
    </div>
  );
};

export default Card;
