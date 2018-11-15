import React from 'react';
import extend from "lodash/extend";
import { connect } from 'react-redux';
import get from 'lodash/get';
import injectSheet from 'react-jss';

import BaseFilter from '../../../components/base/filters/BaseFilter';
import * as actions from '../../../services/actions';
import GeoMap from '../../../components/maps/GeoMap';
import Trans from '../../../locales/Trans';
import {addFilterValues} from "../../../helpers/generic";

class ServiceCountries extends BaseFilter {
  componentDidMount() {
    const { dispatch, sectorId } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
          if(this.props.filterValues)
          {
              //NOTE! this fucntion actually changes the states variable WITHOUT calling this.setState()
              // params works as a reference when passed in this function
              addFilterValues(this.props.filterValues, params);
          }
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
    const geomapHeight = window.innerWidth > 2000 ? 650 : 450;
    return(
      <div className={classes.serviceCountries}>
        <h2 className="title">
          <Trans id="service.countries.title" defaultMessage="Explore what countries the funds go to"/>
        </h2>
        { serviceCountries.success ?
          <GeoMap data={data} country='nl' height={geomapHeight} tooltipName="Activities:"
                  tabName="activities" service
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
      '@media (max-width: 767px)': {
        fontSize: '22px',
      },
    },
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(ServiceCountries));