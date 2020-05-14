import React, { useCallback } from 'react';
import _ from 'lodash';
import { formatDate } from '../../utils/formatDate';

const Table = (props) => {
  const { data } = props;

  const calcDayRecord = useCallback((dayRecord, dayBeforeRecord) => {
    const {
      Confirmed: ytdConfirmed,
      Deaths: ytdDeaths,
      Recovered: ytdRecovered,
    } = dayBeforeRecord;
    dayRecord.Confirmed = dayRecord.Confirmed - ytdConfirmed;
    dayRecord.Deaths = dayRecord.Deaths - ytdDeaths;
    dayRecord.Recovered = dayRecord.Recovered - ytdRecovered;

    return dayRecord;
  }, []);

  return (
    <table
      className="table table-striped text-nowrap"
      style={{ fontSize: '1.5rem' }}
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
            let todayRecord = _.clone(record);

            if (index !== data.length - 1) {
              todayRecord = calcDayRecord(record, data[index + 1]);
            }

            const { Confirmed, Active, Deaths, Recovered } = todayRecord;
            return (
              <tr key={index}>
                <th scope="row">{formatDate(record.Date)}</th>
                <td>{Confirmed}</td>
                <td>{Deaths}</td>
                <td>{Recovered}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default React.memo(Table);
