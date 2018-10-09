import React, { Component, Fragment } from 'react';
import ReactCountryFlag from "react-country-flag";
import get from 'lodash/get';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import * as actions from '../../../services/actions';
import Trans from '../../../locales/Trans';
import CountryMap from "../../../components/maps/CountryMap";

import { formatSectors } from '../ProjectHelper';

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
        const projectID = get(this.props, 'match.params.id');
        dispatch(actions.projectTransactionsRequest(projectID));
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
                                    <br/>
                                </Fragment>
                            )
                        })
                    }
                </Fragment>
            )
        };

        //Service area(at least in this context) are where vocabulary code === 98
        const serviceAreas = formatSectors(get(data, 'sectors',[]), '98');
        //Project type (at least in this context) are where vocabulary code === 99
        const projectTypes = formatSectors(get(data, 'sectors',[]), '99');
        const aidType = get(this.props.projectTransactions, 'data.results[0].aid_type.name', '');
        const financeType = get(this.props.projectTransactions, 'data.results[0].finance_type.name', '');
        const flowType = get(this.props.projectTransactions, 'data.results[0].flow_type.name', '');
        const websiteLink = get(data, 'contact_info[0].website','-').includes('http') ? get(data, 'contact_info[0].website','-') : 'https://' + get(data, 'contact_info[0].website','-');
        const fields = [
            {
                title: {id: "project.location.title", defaultMessage: "Project Location"},
                rows: [
                    {
                        value: <Col xs={12} className="flag-country">
                            <div className='flag-icon'>
                                <ReactCountryFlag code={get(data, 'recipient_countries[0].country.code','')} svg />
                            </div>
                            <span className="country-name">{get(data, 'recipient_countries[0].country.name','')}</span>
                        </Col>
                    },
                    {
                        name:  {id:"project.location.fields.iati.reference",  defaultMessage: "IATI reference:"},
                        value: <span>{get(data, 'iati_identifier','-')}</span>
                    },
                    {
                        name: {id: "project.location.fields.funding", defaultMessage: "Funding donor:"},
                        value: <Link to={`/donors/${get(data, 'participating_organisations[0].ref','')}`}>{get(data, 'participating_organisations[0].narratives[0].text','-')}</Link>
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
                    name: {id: "project.location.fields.type", defaultMessage: "Project type:"},
                    value: <div className={classes.sectorLinks}>{
                      projectTypes.map( sector => {
                        return <Link to={sector.url}>{sector.name} </Link>
                      })
                    } </div>
                  },
                  {
                    name: {id: "project.location.fields.ceb.category", defaultMessage:"CEB Category:"},
                    value: <span>-</span>
                  },
                  {
                    name: {id: "project.location.fields.service", defaultMessage: "Service area:"},
                    value: <div className={classes.sectorLinks}>{
                      serviceAreas.map( sector => {
                        return <Link to={sector.url}>{sector.name} </Link>
                      })
                    } </div>
                  },
                  {
                    name: {id: "project.location.fields.finance.type", defaultMessage:"Finance type:"},
                    value: <span>{financeType}</span>
                  },
                  {
                    name: {id: "project.location.fields.flow.type", defaultMessage:"Flow type:"},
                    value: <span>{flowType}</span>
                  },
                  {
                    name: {id: "project.location.fields.aid.type", defaultMessage:"Aid type:"},
                    value: <span>{aidType}</span>
                  },
                ]
            },
            {
                title: {id: "project.location.contact.title", defaultMessage: "Contact info"},
                rows: [
                    {
                        name:  {id:"project.location.contact.phone",  defaultMessage: "Phone number:"},
                        value: <span>{get(data, 'contact_info[0].telephone','-')}</span>
                    },
                    {
                        name:  {id:"project.location.contact.email",  defaultMessage: "Email:"},
                        value: <span>{get(data, 'contact_info[0].email','-')}</span>
                    },
                    {
                        name:  {id:"project.location.contact.address",  defaultMessage: "Address:"},
                        value: <span>{get(data, 'contact_info[0].mailing_address.narratives[0].text','-')}</span>
                    },
                    {
                        name:  {id:"project.location.contact.website",  defaultMessage: "Website:"},
                        value: <span><a href={websiteLink}>{get(data, 'contact_info[0].website','-')}</a></span>
                    },
                ]
            }
        ];
        return (
            <Grid fluid className={classes.projectLocation}>
                <Row middle="xs">
                    <Col xs={12} md={6} className="left">
                        <GroupFields fields={fields} />
                    </Col>
                    <Col xs={12} md={6} className="right">
                        <CountryMap data={country} history={this.props.history}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ) => {
    return {
      projectTransactions: state.projectTransactions,
        projectLocation: state.projectLocation,
    }
};

const styles = {
    sectorLinks:{
        display: 'inline',
    },
    projectLocation: {
        '& .left': {
            paddingLeft: '85px !important',
            '@media (max-width: 767px)': {
                padding: '0px 25px !important',
            },
        },
        '& .right': {
            marginTop: -200,
            paddingRight: '8px !important',
            paddingLeft: '0px !important',
            '@media (max-width: 767px)': {
                marginTop: 40,
                padding: '0px 25px !important',
            },
        },
        margin: '60px 0',
        '& .title': {
            color: '#1f4283',
            marginTop: 10,
            paddingBottom: 10,
            fontSize: 26,
          '@media (max-width: 767px)': {
            fontSize: 22,
          },
        },
        '& .flag-country': {
            display: 'flex',
        },
        '& .country-name': {
            order: 2,
            color: '#1f4283',
            fontSize: 22,
            marginTop: '14px',
            marginLeft: '12px',
          '@media (max-width: 767px)': {
            fontSize: 17,
          },
        },
        '& .field': {
            color: '#262626',
            fontSize: 20,
            margin: '20px 0',
            width: '100%',
            overflow: 'hidden',
            wordWrap: 'break-word',
            '& > div': {
                paddingLeft: '0px !important'
            }
        },
        '& .name': {
            fontWeight: 'bold',
          '@media (max-width: 767px)': {
            fontSize: 16,
          },
        },
        '& .value': {
            marginLeft: 5,
          '@media (max-width: 767px)': {
            fontSize: 16,
          },
        }
    }
};

export default injectSheet(styles)(withRouter(connect(mapStateToProps)(ProjectLocation)));
