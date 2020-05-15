import { graphql } from 'gatsby';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { get, isEmpty } from 'lodash';
import Meta from 'components/meta';
import Layout from 'components/layout';
import InputForm from 'components/inputForm';
import Card from 'components/card';
import Header from 'components/header';
import Loading from 'components/loading';
import Table from 'components/table';

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
    console.log(selected);
    fetch(`https://api.covid19api.com/total/country/${selected.Slug}`)
      .then((response) => response.json())
      .then((data) => setReportData(data.reverse()))
      .then(() => setLoading(false));
  }, [reportData, setReportData, setLoading, selectedCountry]);

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

  const latestData = useMemo(() => {
    if (reportData && reportData.length > 2) {
      const todayData = reportData[0];
      const yesterdayData = reportData[1];

      const { Confirmed, Deaths, Recovered } = todayData;
      const {
        Confirmed: ytdConfirmed,
        Deaths: ytdDeaths,
        Recovered: ytdRecovered,
      } = yesterdayData;

      return {
        ...todayData,
        TodayConfirmed: Confirmed - ytdConfirmed,
        TodayDeaths: Deaths - ytdDeaths,
        TodayRecovered: Recovered - ytdRecovered,
      };
    }
    return {};
  }, [reportData]);

  const {
    Active,
    Confirmed,
    Deaths,
    Recovered,
    TodayConfirmed,
    TodayDeaths,
    TodayRecovered,
    Country,
    CountryCode,
    Date,
  } = latestData;

  return (
    <Layout location={location} data={get(data, 'site.meta')}>
      <Meta site={get(data, 'site.meta')} />
      <div className="container mt-4 mb-4">
        <InputForm
          data={countries.sort((a, b) => (a.Country > b.Country ? 1 : -1))}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />
        {isEmpty(latestData) ? (
          <div className="text-center" style={{ fontSize: '2rem' }}>
            No data found.
          </div>
        ) : (
          <React.Fragment>
            <Header country={Country} countryCode={CountryCode} date={Date} />
            <div className="row">
              <div className="col-lg-12 col-xl-4">
                <Card
                  title="Confirmed"
                  number={TodayConfirmed}
                  icon="ambulance"
                  theme="warning"
                />
              </div>
              <div className="col-lg-12 col-xl-4">
                <Card
                  title="Dead"
                  number={TodayDeaths}
                  icon="skull-crossbones"
                  theme="danger"
                />
              </div>
              <div className="col-lg-12 col-xl-4">
                <Card
                  title="Recovered"
                  number={TodayRecovered}
                  icon="smile"
                  theme="success"
                />
              </div>
              <div className="col-lg-12">
                <Card
                  title="Active"
                  number={Active}
                  icon="heartbeat"
                  theme="pink"
                />
              </div>
              <div className="col-12">
                <Card
                  title="Total Confirmed"
                  number={Confirmed}
                  icon="notes-medical"
                  theme="orange"
                />
              </div>
              <div className="col-12">
                <Card
                  title="Total Deaths"
                  number={Deaths}
                  icon="dizzy"
                  theme="primary"
                />
              </div>
              <div className="col-12">
                <Card
                  title="Total Recovered"
                  number={Recovered}
                  icon="walking"
                  theme="info"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 overflow-auto">
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
