import React from 'react';
import Table from 'antd/es/table';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import * as actions from '../../../services/actions';
import { connect } from 'react-redux';
import { format } from 'd3-format';
import get from 'lodash/get';
import injectSheet from "react-jss";
import { tableHeader } from '../../../helpers/style';
import { Link } from 'react-router-dom';
import SortBy from '../../../components/base/SortBy';

const sortByOptions = [
  { value: 'participating_organisation', label: 'Name (a - z)' },
  { value: '-participating_organisation', label: 'Name (z - a)' },
  { value: 'value', label: 'Total Budget (asc)' },
  { value: '-value', label: 'Total Budget (desc)' },
];

class ServiceDonors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        aggregations: 'activity_count,incoming_fund,disbursement,expenditure,value',
        convert_to: 'usd',
        page_size: 10,
        group_by: 'participating_organisation',
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
        order_by: 'participating_organisation',
      }
    };
  }

  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'participating_organisation_ref');
      data.push(item);
    });
    return data;
  }

  handleSortBy(value) {
    const newParams = this.state.params;
    newParams.order_by = value;
    this.setState({params: newParams}, () => {
      this.getDonors();
    });
  }

  getDonors() {
    const { dispatch, sectorId } = this.props;
    const { params } = this.state;
    if (dispatch && sectorId) {
      dispatch(actions.serviceDonorsRequest({ ...params, sector: sectorId }));
    } else {
      dispatch(actions.serviceDonorsInitial());
    }
  }

  componentDidMount() {
    this.getDonors()
  }

  render() {
    const { intl, serviceDonors, classes } = this.props;
    const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
    const columns = [{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'service.donors.header.donor', defaultMessage: 'Donor'})}</span>,
      key: 'participating_organisation',
      width: '50%',
      render: obj =>
        <Link to={`/donors/${obj.participating_organisation_ref}`}>{obj.participating_organisation}</Link>
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'service.donors.header.total', defaultMessage: 'Total donor funding value'})}</span>,
      dataIndex: 'value',
      key: 'value',
      className: 'number',
      render: value => <span>{usd}{format(',.2f')(value)}</span>
    },{
      title:
        <SortBy
          options={sortByOptions}
          selectedKey={this.state.params.order_by}
          handleChange={e => this.handleSortBy(e)}
        />,
      key: 'sort_by',
    }];
    return(
      <div className={classes.serviceDonors}>
        <h2 className="title">
          <FormattedMessage id="service.donors.title" defaultMessage="Where the funds come from"/>
        </h2>
        <Table
               columns={columns}
               size="middle"
               loading={serviceDonors.request}
               className={classes.table}
        />
      </div>
    )
  }
}

ServiceDonors.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
  return {
    serviceDonors: state.serviceDonors,
  }
};

const styles = {
  serviceDonors: {
    paddingTop: 20,
    marginRight: 10,
    '& .title': {
      color: '#0033a1',
      fontWeight: 600,
    }
  },
  table: {
    '& tr': {
      '& td, th': {
        paddingLeft: '0px !important',
      }
    }
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(ServiceDonors)));