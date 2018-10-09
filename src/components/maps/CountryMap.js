import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ReactCountryFlag from "react-country-flag";
import Layout from 'antd/es/layout';
import connect from "react-redux/es/connect/connect";

const { Content } = Layout;
const Flag = ({ data }) => <span style={{fontSize: 15}}>
  <ReactCountryFlag code={data.code} svg/>
</span>;

class CountryMap extends Component {
  render() {
    const { data } = this.props;
    return (
      <Content style={{ height: '450px', width: '100%' }}>
        {data ?
          <GoogleMapReact
            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_KEY, language: 'en', region: 'af'}}
            defaultCenter={
              {lat: data.location.coordinates[1], lng: data.location.coordinates[0]}
            }
            onClick={() => this.props.history.push(`/countries/${data.code}`)}
            onChildClick={() => this.props.history.push(`/countries/${data.code}`)}
            defaultZoom={6}
          >
            <Flag
              lat={data.location.coordinates[1]}
              lng={data.location.coordinates[0]}
              data={data}
            />
          </GoogleMapReact> : null
        }
      </Content>
    )
  }
}

export default (connect(null))(CountryMap);