import React, { useCallback } from 'react';
import Icon from 'components/icon';
import css from './card.module.scss';

const Card = (props) => {
  const { title, number, icon, theme, width } = props;

  const formatNumberWithCommas = useCallback((x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, []);

  return (
    <div className={`card w-100 border-0 position-relative ${css.container}`}>
      <div className="card-body font-weight-bold">
        <div
          className={`card-title text-${theme}`}
          style={{ fontSize: '1.25rem' }}
        >
          {title}
        </div>
        <div className="card-text" style={{ fontSize: '1.5rem' }}>
          {number && formatNumberWithCommas(number)}
        </div>
      </div>
      <div
        className={
          `d-flex flex-column justify-content-center align-items-center position-absolute p-3 text-white rounded bg-${theme} ` +
          css.iconContainer
        }
      >
        <Icon name={icon} />
      </div>
    </div>
  );
};

export default Card;
