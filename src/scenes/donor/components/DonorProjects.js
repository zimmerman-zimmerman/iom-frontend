import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from 'antd/es/table';
import Pagination from 'antd/es/pagination';
import Spin from 'antd/es/spin';
import { injectIntl, intlShape } from "react-intl";
import get from 'lodash/get';
import { FormattedMessage } from "react-intl";
import { format } from "d3-format";
import injectSheet from 'react-jss';
import { tableHeader } from '../../../helpers/style';

import * as actions from '../../../services/actions/index';

class DonorProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,title,iati_identifier,activity_dates,activity_status,sectors,' +
        'participating_organisations,aggregations',
        convert_to: 'usd',
        participating_organisation: props.code.toUpperCase(),
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
      }
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        dispatch(actions.donorProjectsRequest(params));
      } else {
        dispatch(actions.donorProjectsInitial());
      }
    }
  }

  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'id');
      data.push(item);
    });
    return data;
  }

  onPageChange = (page) => {
    const { dispatch } = this.props;
    const { params } = this.state;
    params.page = page;
    dispatch(actions.donorProjectsRequest(params));
  };

  render() {
    const { intl, donorProjects, classes } = this.props;
    const data = get(donorProjects, 'data.results');
    const total = get(donorProjects, 'data.count');
    const usd = <FormattedMessage id="currency.usd.symbol" defaultMessage="$" />;
    const columns = [{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'donor.table.projects.header.title', defaultMessage: 'Project title'})}</span>,
      dataIndex: 'title.narratives[0].text',
      width: '40%',
      key: 'donors'
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'donor.table.projects.header.budget', defaultMessage: 'Budget'})}</span>,
      dataIndex: 'aggregations.activity.budget_value',
      className: 'number',
      key: 'budget',
      render: (value) => <span>{usd}{format(",.2f")(value)}</span>
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'donor.table.projects.header.status', defaultMessage: 'Project status'})}</span>,
      dataIndex: 'activity_status.name',
      className: 'Status',
      key: 'status'
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'donor.table.projects.header.sector', defaultMessage: 'DAC sector'})}</span>,
      dataIndex: 'sectors[0].sector.name',
      className: 'Sector',
      key: 'sector'
    }];
    return (
      <Spin spinning={donorProjects.request}>
          <Table className="DonorsTable"
                 dataSource={data ? this.addKey(data) : null}
                 columns={columns} size="middle"
                 pagination={false}
                 scroll={{ x: 1200 }}
          />
          <Pagination size="small" total={total} className={classes.pagination} onChange={this.onPageChange}/>
      </Spin>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    donorProjects: state.donorProjects
  }
};

DonorProjects.propTypes = {
  intl: intlShape.isRequired
};

const styles = {
  pagination: {
    marginTop: 10
  },
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(DonorProjects)));