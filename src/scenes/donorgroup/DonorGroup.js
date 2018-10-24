import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import injectSheet from 'react-jss';

import Page from '../../components/base/Page';
import BaseFilter from '../../components/base/filters/BaseFilter';
import get from 'lodash/get';
import extend from 'lodash/extend';
import * as actions from "../../services/actions/index";
import {connect} from "react-redux";
import Trans from '../../locales/Trans';
import { pageContainer } from '../../helpers/style';
import DonorsTable from './components/DonorsTable';


class DonorGroup extends BaseFilter {
  componentWillMount() {
    // This is used for donors that are not part of a group, to instantly go to its donor detail page,
      // but do we really need that?
    // if (get(this.props, 'match.params.group.length', 0) > 2) {
    //   const groupCode = get(this.props.donorGroupJson.data, `content.${this.props.match.params.group}`, '');
    //   const group = typeof groupCode === 'string' ? groupCode.toLowerCase() : groupCode;
    //   this.props.history.replace(`${group}/${this.props.match.params.group}`);
    // }
  }

  componentDidMount() {
    const { dispatch, donorsGroupsJsonSlug } = this.props;
    this.setState({actionRequest: true});
    if (dispatch) {
      dispatch(actions.donorsGroupsJsonRequest(donorsGroupsJsonSlug));
    } else {
      dispatch(actions.donorsGroupsJsonInitial());
      actions.donorInitial();
    }
  }

  componentDidUpdate(prevProps) {
    const { donorsGroupsJson } = this.props;
    const { params, actionRequest } = this.state;
    const group = get(this.props, 'match.params.group', '');
    const donorGroup = donorsGroupsJson.success ? get(donorsGroupsJson.data.content, group.toUpperCase()) : null;
    if (donorGroup && actionRequest){
      this.actionRequest(
        extend({}, params, {participating_organisation_ref: donorGroup.filter}),
        'participating_organisation',
        actions.donorRequest
      );
      this.setState({actionRequest: false});
    }
  }

  render() {
    const { classes, donorsGroupsJson } = this.props;
    const group = get(this.props, 'match.params.group', '');
    const donorGroup = donorsGroupsJson.success ? get(donorsGroupsJson.data.content, group.toUpperCase()) : null;
    const data = get(this.props, 'donor.data.results');
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: '/donors', text: <Trans id='main.menu.donors' text='Donors' />},
      {url: null, text: donorGroup ? donorGroup.name : <Trans id='main.menu.detail' text='Detail' />},
    ];
    return (
      <Page breadcrumbItems={breadcrumbItems}>
        <Grid style={pageContainer} fluid>
          <Row>
            <Col xs={12}>
              <h1 className={classes.title}>{donorGroup ? donorGroup.name : null}</h1>
            </Col>
          </Row>
          <hr className={classes.divider} />
          <Row className={classes.table}>
            <Col xs={12}>
              { donorGroup ?
                <DonorsTable donorGroup={donorGroup} rootComponent={this} data={data ? data : null} /> : null
              }
            </Col>
          </Row>
        </Grid>
      </Page>
    )
  }
}

DonorGroup.defaultProps = {
  donorsGroupsJsonSlug: 'donors-groups-json',
};

const mapStateToProps = (state, ) => {
  return {
    donor: state.donor,
    donorsGroupsJson: state.donorsGroupsJson,
    donorGroupJson: state.donorGroupJson,
  }
};

const styles = {
    title: {
        marginTop: 10,
        marginBottom: 15,
        fontWeight: 300,
        fontSize: 36,
        '@media (max-width: 767px)': {
            fontSize: '22px',
        },
    },
  description: {
    marginBottom: 10,
    fontWeight: 300,
  },
  table: {
    marginBottom: 15,
    marginLeft: -16,
  },
  divider: {
    border: 'solid 2px #173d8e',
    opacity: 0.3,
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(DonorGroup));