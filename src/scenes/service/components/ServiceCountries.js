import React from 'react';
import extend from "lodash/extend";
import { connect } from 'react-redux';
import get from 'lodash/get';
import injectSheet from 'react-jss';

import BaseFilter from '../../../components/base/filters/BaseFilter';
import * as actions from '../../../services/actions';
import GeoMap from '../../../components/maps/GeoMap';
import Trans from '../../../locales/Trans';

class ServiceCountries extends BaseFilter {
  componentDidMount() {
    const { dispatch, sectorId } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        this.actionRequest(
          extend({}, params, {sector: sectorId}), 'recipient_country', actions.serviceCountriesRequest
        );
      } else {
        dispatch(actions.serviceCountriesInitial());
      }
    }
  }

  render() {
    const { serviceCountries, classes } = this.props;
    const data = get(serviceCountries, 'data.results');
    return(
      <div className={classes.serviceCountries}>
        <h2 className="title">
          <Trans id="service.countries.title" defaultMessage="Explore what countries the funds go to"/>
        </h2>
        { serviceCountries.success ?
          <GeoMap data={data} zoom={3.2} country='nl' height={450} tooltipName="Activities:"
                  tabName="activities"
          /> : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    serviceCountries: state.serviceCountries,
  }
};

const styles = {
  serviceCountries: {
    paddingBottom: 30,
    '& .title': {
      color: '#0033a1',
      fontWeight: 600,
      marginBottom: 20,
      '@media (maxWidth: 767px)': {
        fontSize: '22px',
      },
    },
    '& .leaflet-bottom': {
      display: 'none'
    }
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(ServiceCountries));