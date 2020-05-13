import React from 'react';

const Header = (props) => {
  const { country, countryCode, date } = props;

  let dateTime = '';
  if (date) {
    const dateValue = new Date(date);
    dateTime = `${dateValue.getFullYear()}-${
      dateValue.getMonth() + 1
    }-${dateValue.getDate()}`;
  }

  return (
    <div
      className="d-flex justify-content-between font-weight-bold"
      style={{ fontSize: 50, marginBottom: '4rem' }}
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
