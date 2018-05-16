import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ReactCountryFlag from "react-country-flag";
import Layout from 'antd/es/layout';


const { Content } = Layout;
const Flag = ({ data }) => <span style={{fontSize: 15}}>
  <ReactCountryFlag code={data.recipient_country.code} svg/>
</span>;

class CountryMap extends Component {
  render() {
    const { data } = this.props;
    return (
      <Content style={{ height: '350px', width: '99%' }}>
        {data ?
          <GoogleMapReact
            bootstrapURLKeys={{key: 'AIzaSyCa5x8w9ZoopjQeEwQmfSCDT4fWaNgIEA4', language: 'en', region: 'af'}}
            defaultCenter={
              {lat: data.recipient_country.location.coordinates[1], lng: data.recipient_country.location.coordinates[0]}
            }
            defaultZoom={5}
          >
            <Flag
              lat={data.recipient_country.location.coordinates[1]}
              lng={data.recipient_country.location.coordinates[0]}
              data={data}
            />
          </GoogleMapReact> : null
        }
      </Content>
    )
  }
}

export default CountryMap;