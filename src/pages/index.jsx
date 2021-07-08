import { graphql } from 'gatsby';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { map, get, isEmpty, cloneDeep } from 'lodash';
import Meta from 'components/meta';
import Layout from 'components/layout';
import InputForm from 'components/inputForm';
import Card from 'components/card';
import Header from 'components/header';
import Loading from 'components/loading';
import Table from 'components/table';
import Chart from 'chart.js/auto';
import { formatDate } from '../utils/formatDate';

function getDayRecord(dayRecord, dayBeforeRecord) {
  let DayConfirmed = 0;
  let DayDeaths = 0;
  let DayRecovered = 0;

  if (dayBeforeRecord) {
    const {
      Confirmed: ytdConfirmed,
      Deaths: ytdDeaths,
      Recovered: ytdRecovered,
    } = dayBeforeRecord;
    DayConfirmed = dayRecord.Confirmed - ytdConfirmed;
    DayDeaths = dayRecord.Deaths - ytdDeaths;
    DayRecovered = dayRecord.Recovered - ytdRecovered;
  }

  return { DayConfirmed, DayDeaths, DayRecovered };
}

const Index = ({ data, location }) => {
  const [reportData, setReportData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState({
    Country: 'Malaysia',
    CountryCode: 'my',
  });
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [selectedCountry]);

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const fetchData = useCallback(() => {
    const selected = countries.length
      ? countries.find((x) => x.Country === selectedCountry.Country)
      : { Slug: 'malaysia' };
    fetch(`https://api.covid19api.com/total/country/${selected.Slug}`)
      .then((response) => response.json())
      .then((data) => {
        const msgData = map(data, (record, index) => {
          const dayData = getDayRecord(record, data[index - 1]);
          return { ...record, ...dayData };
        });
        setReportData(msgData.reverse());
      })
      .then(() => setLoading(false));
  }, [reportData, setReportData, setLoading, selectedCountry]);

  useEffect(() => {
    if (reportData) {
      const last30daysData = reportData.slice(0, 30).reverse();
      const labels = last30daysData.map((item) => formatDate(item.Date));
      const data1 = {
        labels: labels,
        datasets: [
          {
            label: 'Confirmed',
            data: last30daysData.map((item) => item.DayConfirmed),
            fill: false,
            borderColor: '#e91e63',
            tension: 0.1,
          },
        ],
      };
      const data2 = {
        labels: labels,
        datasets: [
          {
            label: 'Dead',
            data: last30daysData.map((item) => item.DayDeaths),
            fill: false,
            borderColor: '#f44336',
            tension: 0.1,
          },
        ],
      };
      const data3 = {
        labels: labels,
        datasets: [
          {
            label: 'Recovered',
            data: last30daysData.map((item) => item.DayRecovered),
            fill: false,
            borderColor: '#8bc34a',
            tension: 0.1,
          },
        ],
      };

      const div = document.querySelector('#covidChartDiv');
      const oldCanv1 = document.querySelector('#covidConfirmedChart');
      const oldCanv2 = document.querySelector('#covidDeadChart');
      const oldCanv3 = document.querySelector('#covidRecoveredChart');

      if (oldCanv1 || oldCanv2 || oldCanv3) {
        div.removeChild(oldCanv1);
        div.removeChild(oldCanv2);
        div.removeChild(oldCanv3);
      }

      const canv1 = document.createElement('canvas');
      canv1.id = 'covidConfirmedChart';
      canv1.style = 'margin-bottom: 2rem';
      div.appendChild(canv1);

      const canv2 = document.createElement('canvas');
      canv2.id = 'covidDeadChart';
      canv2.style = 'margin-bottom: 2rem';
      div.appendChild(canv2);

      const canv3 = document.createElement('canvas');
      canv3.id = 'covidRecoveredChart';
      canv3.style = 'margin-bottom: 2rem';
      div.appendChild(canv3);

      const chart1 = new Chart(canv1, {
        type: 'line',
        data: data1,
      });
      const chart2 = new Chart(canv2, {
        type: 'line',
        data: data2,
      });
      const chart3 = new Chart(canv3, {
        type: 'line',
        data: data3,
      });
    }
  }, [reportData]);

  const fetchCountriesData = useCallback(() => {
    fetch('https://api.covid19api.com/countries')
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, [setCountries]);

  const onCountryChange = useCallback(
    (country) => {
      setSelectedCountry(countries.find((x) => x.Country === country));
      setLoading(true);
    },
    [setSelectedCountry, countries, setLoading]
  );

  return (
    <Layout location={location} data={get(data, 'site.meta')}>
      <Meta site={get(data, 'site.meta')} />
      <div className="container mt-4 mb-4" style={{ maxWidth: 800 }}>
        <InputForm
          data={countries.sort((a, b) => (a.Country > b.Country ? 1 : -1))}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />
        {isEmpty(reportData) ? (
          <div className="text-center" style={{ fontSize: '2rem' }}>
            No data found.
          </div>
        ) : (
          <React.Fragment>
            <Header
              country={selectedCountry.Country}
              countryCode={
                countries.find((x) => reportData[0].Country === x.Country).ISO2
              }
              date={reportData[0].Date}
            />
            <div className="row">
              <div className="col-lg-12 col-xl-4">
                <Card
                  title="Confirmed"
                  number={reportData[0].DayConfirmed}
                  icon="ambulance"
                  theme="warning"
                />
              </div>
              <div className="col-lg-12 col-xl-4">
                <Card
                  title="Dead"
                  number={reportData[0].DayDeaths}
                  icon="skull-crossbones"
                  theme="danger"
                />
              </div>
              <div className="col-lg-12 col-xl-4">
                <Card
                  title="Recovered"
                  number={reportData[0].DayRecovered}
                  icon="smile"
                  theme="success"
                />
              </div>
              <div className="col-lg-12">
                <Card
                  title="Active"
                  number={reportData[0].Active}
                  icon="heartbeat"
                  theme="pink"
                />
              </div>
              <div className="col-12">
                <Card
                  title="Total Confirmed"
                  number={reportData[0].Confirmed}
                  icon="notes-medical"
                  theme="orange"
                />
              </div>
              <div className="col-12">
                <Card
                  title="Total Deaths"
                  number={reportData[0].Deaths}
                  icon="dizzy"
                  theme="primary"
                />
              </div>
              <div className="col-12">
                <Card
                  title="Total Recovered"
                  number={reportData[0].Recovered}
                  icon="walking"
                  theme="info"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12" id="covidChartDiv">
                <canvas
                  id="covidConfirmedChart"
                  style={{ marginBottom: '2rem' }}
                />
                <canvas id="covidDeadChart" style={{ marginBottom: '2rem' }} />
                <canvas
                  id="covidRecoveredChart"
                  style={{ marginBottom: '2rem' }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Table data={reportData} />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      {loading && <Loading />}
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      meta: siteMetadata {
        title
        profileUrl
        author
      }
    }
  }
`;
