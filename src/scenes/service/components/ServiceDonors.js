import React from "react";
import Table from "antd/es/table";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import * as actions from "../../../services/actions";
import { connect } from "react-redux";
import { format } from "d3-format";
import get from "lodash/get";
import filter from "lodash/filter";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import SortHeader from "../../../components/SortHeader/SortHeader";
import Pagination from "../../../components/Pagination/Pagination";
import { addFilterValues } from "../../../helpers/generic";

class ServiceDonors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        aggregations:
          "activity_count,incoming_fund,disbursement,expenditure,value",
        group_by: "participating_organisation",
        reporting_organisation_identifier:
          process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
        order_by: "participating_organisation",
        page: 1,
        page_size: 5,
      },
    };
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, "participating_organisation_ref");
      data.push(item);
    });
    return data;
  }

  handleSortBy(value) {
    const newParams = this.state.params;
    newParams.order_by = value;
    this.setState({ params: newParams }, () => {
      this.getDonors();
    });
  }

  handlePageChange(page) {
    const newParams = this.state.params;
    newParams.page = page;
    this.setState({ params: newParams }, () => {
      this.getDonors();
    });
  }

  getDonors() {
    const { dispatch, sectorId } = this.props;
    const { params } = this.state;
    if (dispatch && sectorId) {
      if (this.props.filterValues) {
        const filterValues = this.props.filterValues;
        filterValues.participating_organisation_ref =
          filterValues.participating_organisation;
        delete filterValues["participating_organisation"];
        //NOTE! this fucntion actually changes the states variable WITHOUT calling this.setState()
        // params works as a reference when passed in this function
        addFilterValues(filterValues, params);
      }
      dispatch(actions.serviceDonorsRequest({ ...params, sector: sectorId }));
    } else {
      dispatch(actions.serviceDonorsInitial());
    }
  }

  componentDidMount() {
    this.getDonors();
  }

  render() {
    const { intl, serviceDonors, classes, donorGroupJson } = this.props;
    const usd = intl.formatMessage({
      id: "currency.usd",
      defaultMessage: "US$ ",
    });
    const columns = [
      {
        title: (
          <SortHeader
            title={intl.formatMessage({
              id: "service.donors.header.donor",
              defaultMessage: "Donor",
            })}
            sortValue={this.state.params.order_by}
            defSortValue={"participating_organisation"}
            onSort={this.handleSortBy}
          />
        ),
        key: "participating_organisation",
        className: "title",
        width: "50%",
        render: (obj) => {
          let donorExtra = get(
            donorGroupJson,
            obj.participating_organisation_ref
          );
          donorExtra = donorExtra ? `${donorExtra}/` : "";
          return (
            <Link to={`/donors/${donorExtra}${obj.participating_organisation}`}>
              {obj.participating_organisation}
            </Link>
          );
        },
      },
      {
        title: (
          <SortHeader
            title={intl.formatMessage({
              id: "service.donors.header.total",
              defaultMessage: "Total donor funding value",
            })}
            sortValue={this.state.params.order_by}
            defSortValue={"value"}
            onSort={this.handleSortBy}
          />
        ),
        dataIndex: "value",
        key: "value",
        className: "number",
        render: (value) => (
          <span>
            {usd}
            {format(",.2f")(value)}
          </span>
        ),
      },
    ];
    let filterOutCount = 0;
    const sDonors = filter(get(serviceDonors, "data.results", []), (d) => {
      if (d.participating_organisation_role === "2") {
        filterOutCount++;
        return false;
      }
      return true;
    });
    const data = sDonors;
    const count = get(serviceDonors, "data.count", 0) - filterOutCount;
    return (
      <div className={classes.serviceDonors}>
        <h2 className="title">
          <FormattedMessage
            id="service.donors.title"
            defaultMessage="Where the funds come from"
          />
        </h2>
        <Table
          columns={columns}
          size="middle"
          loading={serviceDonors.request}
          dataSource={data ? this.addKey(data) : null}
          className={classes.table}
          pagination={false}
        />
        {data && count > this.state.params.page_size && (
          <Pagination
            pageCount={Math.ceil(count / this.state.params.page_size)}
            onPageChange={(value) => this.handlePageChange(value.selected + 1)}
            forcePage={this.state.params.page - 1}
          />
        )}
      </div>
    );
  }
}

ServiceDonors.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = (state) => {
  return {
    serviceDonors: state.serviceDonors,
  };
};

const styles = {
  serviceDonors: {
    width: "50%",
    paddingTop: 20,
    marginRight: 10,
    "& .title": {
      color: "#0033a1",
      fontWeight: 600,
      fontSize: 26,
      "@media (max-width: 767px)": {
        fontSize: "22px",
      },
    },
  },
  table: {
    marginTop: 30,
    "& tr": {
      "& td, th": {
        paddingLeft: "0px !important",
        paddingTop: 12,
        paddingBottom: 12,
      },
    },
    "& .title": {
      fontSize: 16,
      fontWeight: "normal",
      lineHeight: "22px",
      color: "#0033a1",
      "& a": {
        color: "#0033a1",
        "&:hover": {
          color: "#418fde",
        },
      },
    },
    "& .number": {
      fontSize: 16,
      fontWeight: "normal",
      lineHeight: "22px",
      color: "#0033a1",
    },
  },
  fixedTH: {
    right: 0,
    position: "sticky",
    backgroundColor: "#fff !important",
  },
};

export default injectSheet(styles)(
  connect(mapStateToProps)(injectIntl(ServiceDonors))
);
