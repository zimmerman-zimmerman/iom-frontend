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
import { addFilterValues } from '../../helpers/generic';

class DonorGroup extends BaseFilter {
  componentDidMount() {
    const { dispatch, donorsGroupsJsonSlug } = this.props;
    this.setState({actionRequest: true});
    if (dispatch) {
      dispatch(actions.donorsGroupsJsonRequest(donorsGroupsJsonSlug));
    } else {
      dispatch(actions.donorsGroupsJsonInitial());
      actions.donorInitial();
    }

    // Here we add the filter values from donors, to our current donorGroup filter values
    //  As it was requested by Siem. THat the filters applied in donors page, would be applied here as well
    // Well at least thats how i understood it lol. #Morty
      if(this.props.location.state && this.props.location.state.filterValues)
      {
          //NOTE! this fucntion actually changes the states variable WITHOUT calling this.setState()
          //this.state.filters.values works as a reference when passed in this function
          addFilterValues(this.props.location.state.filterValues, this.state.filters.values);
      }
  }

  componentDidUpdate(prevProps) {
    const { donorsGroupsJson } = this.props;
    const { params, filters, actionRequest } = this.state;
    const group = get(this.props, 'match.params.group', '');
    const donorGroup = donorsGroupsJson.success ? get(donorsGroupsJson.data.content, group.toUpperCase()) : null;

    if(donorGroup === undefined)
    {
      //So if the donorGroup is not found in the cms, that means that a donor with the specified
      //  ref was not added to the cms, thus we redirect the user to the donors detail page
      this.props.history.replace(`${group}/${group}`);
    }
    else if (donorGroup && actionRequest){
      this.actionRequest(
        extend({}, params, filters.values, {participating_organisation_ref: donorGroup.filter}),
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
  groupBy: 'participating_organisation',
  filterRequest: actions.donorRequest,
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