import React, { useCallback } from 'react';
import _ from 'lodash';

const InputForm = (props) => {
  const { data, selectedCountry, onCountryChange } = props;

  const onChangeHandle = useCallback(
    (evt) => {
      onCountryChange(evt.target.value);
    },
    [onCountryChange]
  );

  return (
    <select
      className="form-control mb-3"
      onChange={onChangeHandle}
      value={selectedCountry.Country}
    >
      {_.map(data, (country) => {
        return <option key={country.Country}>{country.Country}</option>;
      })}
    </select>
  );
};

export default React.memo(InputForm);
