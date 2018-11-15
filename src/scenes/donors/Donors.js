import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from "react-redux";
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import injectSheet from 'react-jss';
import { FormattedMessage } from "react-intl";
import Spin from 'antd/es/spin';

import Page from '../../components/base/Page';
import Filters from '../../components/base/filters/Filters';
import Trans from '../../locales/Trans';
import BaseFilter from '../../components/base/filters/BaseFilter';
import * as actions from "../../services/actions";
import DonorsTreeMap from './components/charts/DonorsTreeMap';
import DonorsTable from './components/DonorsTable';
import { pageContainer } from '../../helpers/style';

class Donors extends BaseFilter {
  componentDidMount() {
    const { dispatch, donorsGroupsJsonSlug } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        this.actionRequest(params, 'participating_organisation', actions.donorsRequest);
        dispatch(actions.donorsGroupsJsonRequest(donorsGroupsJsonSlug));
      } else {
        dispatch(actions.donorsGroupsJsonInitial());
      }
    }
  }

  createDonorsByGroup(donors) {
    const { donorsGroupsJson, donorGroupJson } = this.props;
    let dataGroup = [];
    if (donorsGroupsJson.success && donorGroupJson.success) {
      forEach(donors, function (donor) {
        const code = get(donorGroupJson.data.content, donor.participating_organisation_ref);
        const group = get(donorsGroupsJson.data.content, code);
        let donorGroup = find(dataGroup, {code: code});
        if (!donorGroup) {
          donorGroup = {
            code: code,
            name: group.name,
            value: donor.value,
            project: donor.activity_count,
          };
          dataGroup.push(donorGroup);
        } else {
          donorGroup.value = donorGroup.value + donor.value;
          donorGroup.project = donorGroup.project + donor.activity_count;
        }
      });
    }
    return dataGroup;
  }

  render() {
    const { donors, classes } = this.props;
    const data = this.filter(get(donors, 'data'));
    const dataDonors = this.createDonorsByGroup(data);
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: null, text: <Trans id='main.menu.donors' text='Donors' />},
    ];
    return (
      <Spin spinning={donors.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <Grid className={classes.container} style={pageContainer} fluid>
            <Row>
              <Col xs={12} md={4} lg={3} >
                <Filters rootComponent={this} countResults={get(dataDonors, 'length', 0)}
                         pluralMessage={<FormattedMessage id="donors.filters.donors" defaultMessage="Donors" />}
                         singularMessage={<FormattedMessage id="donors.filters.donor" defaultMessage="Donor" />}
                />
              </Col>
              <Col xs={12} md={8} lg={9}>
                <Row className={classes.rowGap}>
                  <Col xs={12}>
                    <DonorsTreeMap
                      data={sortBy(dataDonors, function(e) {
                        return e.value;
                      }).reverse()
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <DonorsTable rootComponent={this} data={dataDonors ? dataDonors : null} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </Page>
      </Spin>
    )
  }
}

Donors.defaultProps = {
  groupBy: 'participating_organisation',
  filterRequest: actions.donorsRequest,
  donorsGroupsJsonSlug: 'donors-groups-json',
};

const mapStateToProps = (state, ) => {
  return {
    donors: state.donors,
    donorsGroupsJson: state.donorsGroupsJson,
    donorGroupJson: state.donorGroupJson,
  }
};

const styles = {
  container: {
    '& th, td': {
      paddingLeft: '0 !important',
    }
  },
  rowGap: {
    marginTop: 18
  },
  title: {
    fontWeight: 300,
      marginTop: '8px',
  },
};

export default injectSheet(styles)(connect(mapStateToProps)(Donors));
