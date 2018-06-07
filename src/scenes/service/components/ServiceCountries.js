import React from 'react';
import extend from "lodash/extend";
import { connect } from 'react-redux';
import get from 'lodash/get';
import Layout from 'antd/es/layout';
import { FormattedMessage } from 'react-intl';

import BaseFilter from '../../../components/filters/BaseFilter';
import * as actions from '../../../services/actions';
import GeoMap from '../../../components/maps/GeoMap';

const { Content } = Layout;

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
    const { serviceCountries } = this.props;
    const data = get(serviceCountries, 'data');
    return(
      <Content className="Content Top">
        <h3 className="Title">
          <FormattedMessage id="service.countries.title" defaultMessage="Explore what countries the funds go to"/>
        </h3>
        { serviceCountries.success ?
          <GeoMap data={data} zoom={3.2} country='nl' height={450} tooltipName="Activities:"
                  tabName="activities"
          /> : null
        }
      </Content>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    serviceCountries: state.serviceCountries,
  }
};

export default connect(mapStateToProps)(ServiceCountries);