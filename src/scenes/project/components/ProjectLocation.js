import React, { Component, Fragment } from 'react';
import ReactCountryFlag from "react-country-flag";
import get from 'lodash/get';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import * as actions from '../../../services/actions';
import Trans from '../../../locales/Trans';
import CountryMap from "../../../components/maps/CountryMap";

class ProjectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestProjectLocation: true
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.projectLocationInitial());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { data, dispatch } = this.props;
    const code = get(data, 'recipient_countries[0].country.code', null);
    if (code && this.state.requestProjectLocation) {
      dispatch(actions.projectLocationRequest(code));
      this.setState({requestProjectLocation: false});
    }
  }

  render() {
    const { data, projectLocation, classes } = this.props;
    const country = get(projectLocation, 'data', null);
    const GroupFields = (props) => {
      const { fields } = props;
      return (
        <Fragment>
          {
            fields.map((item, index) => {
              return (
                <Fragment key={index}>
                  <Row className="title">
                    <Col xs={12}>
                      <Trans {...item.title}/>
                    </Col>
                  </Row>
                  {
                    item.rows.map((item, index) => {
                      return (
                        <Row className="field" key={index}>
                          {
                            item.name ? <Col xs={12}>
                              <span className="name"><Trans {...item.name} /></span>
                              <span className="value">{item.value}</span>
                            </Col> : item.value
                          }
                        </Row>
                      )
                    })
                  }
                </Fragment>
              )
            })
          }
        </Fragment>
      )
    };
    const fields = [
      {
        title: {id: "project.location.title", defaultMessage: "Project Location"},
        rows: [
          {
            value: <Col xs={12} className="flag-country">
              <ReactCountryFlag code={get(data, 'recipient_countries[0].country.code','')} svg />
              <span className="country-name">{get(data, 'recipient_countries[0].country.name','')}</span>
            </Col>
          },
          {
            name:  {id:"project.location.fields.iati.reference",  defaultMessage: "IATI reference:"},
            value: <span>{get(data, 'iati_identifier','-')}</span>
          },
          {
            name: {id: "project.location.fields.funding", defaultMessage: "Funding donor:"},
            value: <span>{get(data, 'participating_organisations[0].narratives[0].text','-')}</span>
          },
          {
            name: {id: "project.location.fields.donor.type", defaultMessage: "Donor type:"},
            value: <span>{get(data, 'participating_organisations[0].type.name','-')}</span>
          },
          {
            name: {id:"project.location.fields.donor.reference", defaultMessage: "Funding donor IATI reference:"},
            value: <span>{get(data, 'participating_organisations[0].ref','-')}</span>
          },
          {
            name: {id: "project.location.fields.status", defaultMessage:"Activity status:"},
            value: <span>{get(data, 'activity_status.name','-')}</span>
          },
          {
            name: {id: "project.location.fields.dac", defaultMessage: "DAC 5 sector:"},
            value: <span>{get(data, 'sectors[0].sector.code','')} {get(data, 'sectors[0].sector.name','')}</span>
          }
        ]
      },
      {
        title: {id: "project.location.contact.title", defaultMessage: "Contact info"},
        rows: [
          {
            name:  {id:"project.location.contact.organisation",  defaultMessage: "Organisation:"},
            value: <span>{get(data, 'contact_info[0].organisation.narratives[0].text','-')}</span>
          },
          {
            name:  {id:"project.location.contact.phone",  defaultMessage: "Phone number:"},
            value: <span>{get(data, 'contact_info[0].telephone','-')}</span>
          },
          {
            name:  {id:"project.location.contact.email",  defaultMessage: "Email:"},
            value: <span>{get(data, 'contact_info[0].email','-')}</span>
          }
        ]
      }
    ];
    return (
      <Grid fluid className={classes.projectLocation}>
        <Row middle="xs">
          <Col xs={12} md={6}>
            <GroupFields fields={fields} />
          </Col>
          <Col xs={12} md={6}>
            <CountryMap data={country}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    projectLocation: state.projectLocation,
  }
};

const styles = {
  projectLocation: {
    margin: '25px 0',
    '& .title': {
      marginTop: 10,
      paddingBottom: 10,
      fontSize: 25,
    },
    '& .flag-country': {
      fontSize: 25,
      marginBottom: 10,
    },
    '& .country-name': {
      marginLeft: 10,
      marginTop: 2,
      position: 'absolute',
    },
    '& .name': {
      fontWeight: 'bolder',
    },
    '& .value': {
      marginLeft: 5,
    }
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(ProjectLocation));
