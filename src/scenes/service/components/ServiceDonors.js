import React from 'react';
import Table from 'antd/es/table';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import BaseFilter from '../../../components/base/filters/BaseFilter';
import * as actions from '../../../services/actions';
import extend from 'lodash/extend';
import { connect } from 'react-redux';
import { format } from 'd3-format';
import get from 'lodash/get';
import injectSheet from "react-jss";
import { Link } from 'react-router-dom';

class ServiceDonors extends BaseFilter {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'participating_organisation_ref');
      data.push(item);
    });
    return data;
  }

  componentDidMount() {
    const { dispatch, sectorId } = this.props;
    const { params } = this.state;
    if (dispatch && sectorId) {
      this.actionRequest(
        extend({}, params, {sector: sectorId}), 'participating_organisation', actions.serviceDonorsRequest
      );
    } else {
      actions.serviceDonorsInitial();
    }
  }

  render() {
    const { intl, serviceDonors, classes } = this.props;
    const data = get(serviceDonors, 'data.results');
    const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
    const columns = [{
      title: intl.formatMessage({id: 'service.donors.header.donor', defaultMessage: 'Donor'}),
      key: 'participating_organisation',
      width: '50%',
      render: obj => 
        <Link to={`/donors/${obj.participating_organisation_ref}`}>{obj.participating_organisation}</Link>
    }, {
      title: intl.formatMessage({id: 'service.donors.header.total', defaultMessage: 'Total donor funding value'}),
      dataIndex: 'value',
      key: 'value',
      className: 'number',
      render: value => <span>{usd}{format(',.2f')(value)}</span>
    }];
    return(
      <div className={classes.serviceDonors}>
        <h2 className="title">
          <FormattedMessage id="service.donors.title" defaultMessage="Where the funds come from"/>
        </h2>
        <Table dataSource={data ? this.addKey(data) : null}
               columns={columns}
               size="middle"
               loading={serviceDonors.request}
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
    '& .title': {
      color: '#0033a1',
    }
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(ServiceDonors)));