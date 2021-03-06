import React from "react";
import Spin from "antd/es/spin";
import get from "lodash/get";
import find from "lodash/find";
import extend from "lodash/extend";
import { Grid, Row, Col } from "react-flexbox-grid";
import injectSheet from "react-jss";
import { connect } from "react-redux";

import Page from "../../components/base/Page";
import BannerCountry from "./components/BannerCountry";
import BaseFilter from "../../components/base/filters/BaseFilter";
import * as actions from "../../services/actions";
import TableDonors from "./components/TableDonors";
import TableProjects from "./components/TableProjects";
import Trans from "../../locales/Trans";
import ContactProject from "./components/ContactProject";
import SectorsMap from "./components/SectorsMap";
import { pageContainer } from "../../helpers/style";
import GeoMap from "../../components/maps/GeoMap";
import { addFilterValues, formatMapData } from "../../helpers/generic";

class Country extends BaseFilter {
  componentDidMount() {
    const {
      dispatch,
      donorGroupJsonSlug,
      donorGroupJson,
      countriesDescSlug,
      countriesDesc
    } = this.props;
    const { params } = this.state;
    const code = get(this.props, "match.params.code");
    if (dispatch && code) {
      if (params) {
        if (this.props.location.state) {
          //NOTE! this fucntion actually changes the states variable WITHOUT calling this.setState()
          // 'params' works as a reference when passed in this function
          addFilterValues(this.props.location.state.filterValues, params);
          // console.log(params);
        }
        this.actionRequest(
          extend({}, params, { recipient_country: code.toUpperCase() }),
          "recipient_country",
          actions.countryRequest
        );
        this.actionRequest(
          extend(
            {},
            params,
            { recipient_country: code.toUpperCase() },
            { page_size: 30 }
          ),
          "sector",
          actions.countrySectorsRequest
        );
        this.actionRequest(
          extend(
            {},
            params,
            { recipient_country: code.toUpperCase() },
            { page_size: 30 }
          ),
          "participating_organisation",
          actions.countryDonorsRequest
        );
        this.actionRequest(
          extend(
            {},
            params,
            { recipient_country: code.toUpperCase() },
            { page_size: 30 }
          ),
          "participating_organisation",
          actions.countryDonorsRequest
        );

        if (!donorGroupJson.data) {
          dispatch(actions.donorGroupJsonRequest(donorGroupJsonSlug));
        }
        if (!countriesDesc.data) {
          dispatch(actions.countriesDescJsonRequest(countriesDescSlug));
        }
      } else {
        dispatch(actions.countryInitial());
        dispatch(actions.countryDonorsInitial());
      }
    }
  }

  handleDonorSortBy(value) {
    const { dispatch } = this.props;
    const { params } = this.state;
    const code = get(this.props, "match.params.code");
    this.setState({ donorTableSortBy: value });
    if (dispatch && code) {
      if (params) {
        this.actionRequest(
          extend(
            {},
            { ...params, order_by: value },
            { recipient_country: code.toUpperCase() },
            { page_size: 30 }
          ),
          "participating_organisation",
          actions.countryDonorsRequest
        );
      } else {
        dispatch(actions.countryDonorsInitial());
      }
    }
  }

  render() {
    const {
      country,
      countryDonors,
      countryActivities,
      countrySectors,
      classes,
      project,
      countryMappingJson,
      donorGroupJson,
      countriesDesc
    } = this.props;
    const countryResult = get(this.props, "country.data.results[0]");
    const donors = get(this.props, "countryDonors.data.results");
    const sectors = get(this.props, "countrySectors.data.results", []);
    const firstProject = get(countryActivities, "data.results[0]");
    const code = get(this.props, "match.params.code");

    const countriesDescz = get(countriesDesc, "data.content", []);
    const countryJSON = find(countriesDescz, { code: code.toUpperCase() });
    if (countryResult) {
      countryResult.recipient_country["description"] = get(
        countryJSON,
        "description",
        null
      );
    }
    const breadcrumbItems = [
      { url: "/", text: <Trans id="main.menu.home" text="Home" /> },
      {
        url: "/countries",
        text: <Trans id="main.menu.countries" text="Countries" />
      },
      {
        url: null,
        text: countryJSON ? (
          countryJSON["name"]
        ) : (
          <Trans id="main.menu.detail" text="Detail" />
        )
      }
    ];

    const countryData = get(countryResult, "recipient_country");
    const prevFilters = this.props.location.state
      ? this.props.location.state.filterValues
      : false;
    return (
      <Spin
        spinning={
          country.request ||
          countryDonors.request ||
          countryActivities.request ||
          countrySectors.request ||
          project.request
        }
      >
        <Page breadcrumbItems={breadcrumbItems}>
          <BannerCountry
            code={code}
            data={countryResult}
            countryMappingJson={get(countryMappingJson.data, "content", {})}
          />
          <Grid className={classes.country} style={pageContainer} fluid>
            <Row middle="xs" className="gap">
              <Col xs={12} md={6} lg={6}>
                <h2 className="title">
                  <Trans
                    id="country.table.donors.title"
                    defaultMessage="Where the funds come from"
                  />
                </h2>
                <TableDonors
                  data={donors}
                  sortBy={this.state.donorTableSortBy}
                  handleDonorSortBy={e => this.handleDonorSortBy(e)}
                  itemAmount={5}
                  donorGroupJson={get(donorGroupJson, "data.content", {})}
                />
              </Col>
              <Col xs={12} md={6} lg={6}>
                {countryData ? (
                  <GeoMap
                    data={formatMapData(
                      countryData,
                      countryResult.activity_count,
                      countryResult.value
                    )}
                    zoom={6}
                    country="nl"
                    height={450}
                    tooltipName="Activities:"
                    detail
                    tabName="activities"
                    defCenter={[
                      countryData.location.coordinates[1],
                      countryData.location.coordinates[0]
                    ]}
                  />
                ) : null}
              </Col>
            </Row>
            <Row className="gap">
              <Col xs={12}>
                <h2 className="title">
                  <Trans
                    id="country.sectors.map.title"
                    defaultMessage="Explore what sectors the funds go to"
                  />
                </h2>
                <SectorsMap data={sectors} />
              </Col>
            </Row>
            <Row id="related-projects-table">
              <Col xs={12}>
                <h2 className="title">
                  <Trans
                    id="country.table.projects.title"
                    defaultMessage="Related projects"
                  />
                </h2>
                <TableProjects
                  countryCode={get(this.props, "match.params.code")}
                  itemAmount={7}
                  filterValues={prevFilters}
                  donorGroupJson={get(donorGroupJson, "data.content", {})}
                />
              </Col>
            </Row>
            {firstProject ? (
              <ContactProject
                id={firstProject.id}
                code={get(this.props, "match.params.code")}
              />
            ) : null}
          </Grid>
        </Page>
      </Spin>
    );
  }
}

const mapStateToProps = state => {
  return {
    country: state.country,
    countryDonors: state.countryDonors,
    countryActivities: state.countryActivities,
    countrySectors: state.countrySectors,
    project: state.project,
    countryMappingJson: state.countryMappingJson,
    donorGroupJson: state.donorGroupJson,
    countriesDesc: state.countriesDesc
  };
};

Country.defaultProps = {
  donorGroupJsonSlug: "donor-group-json",
  countriesDescSlug: "countries-descriptions"
};

const styles = {
  country: {
    marginTop: 34,
    "& .gap": {
      padding: "30px 0"
    },
    "& .no-padding": {
      padding: 0
    },
    "& .title": {
      color: "#1f4283",
      fontSize: 26,
      fontWeight: 600,
      "@media (max-width: 767px)": {
        fontSize: "22px"
      }
    }
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(Country));
