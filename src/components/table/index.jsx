import React, { useCallback } from 'react';
import _ from 'lodash';
import { formatDate } from '../../utils/formatDate';

const Table = (props) => {
  const { data } = props;

  return (
    <table
      className="table table-striped text-center"
      style={{ fontSize: '1.25rem' }}
    >
      <thead className="thead-dark">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Confirmed</th>
          <th scope="col">Dead</th>
          <th scope="col">Recovered</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          _.map(data, (record, index) => {
            const { DayConfirmed, DayDeaths, DayRecovered } = record;
            return (
              <tr key={index}>
                <th scope="row">{formatDate(record.Date)}</th>
                <td>{DayConfirmed}</td>
                <td>{DayDeaths}</td>
                <td>{DayRecovered}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default React.memo(Table);
