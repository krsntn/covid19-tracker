import React from 'react';
import { formatDate } from '../../utils/formatDate';

const Header = (props) => {
  const { country, countryCode, date } = props;

  let dateTime = '';
  if (date) {
    dateTime = formatDate(date);
  }

  return (
    <div
      className="d-flex flex-wrap justify-content-between align-items-center font-weight-bold"
      style={{ fontSize: '1.25rem', marginBottom: '2rem' }}
    >
      <div>
        <img
          src={`https://www.countryflags.io/${countryCode}/flat/64.png`}
          alt={countryCode}
          className="mb-0 mr-2"
        />
        {country}
      </div>
      <div className="">{dateTime}</div>
    </div>
  );
};

export default React.memo(Header);
