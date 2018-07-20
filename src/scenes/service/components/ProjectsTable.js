import React from 'react';
import Table from 'antd/es/table';
import Pagination from 'antd/es/pagination';
import { format } from "d3-format";
import get from "lodash/get";
import BaseFilter from "../../../components/base/filters/BaseFilter";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import SortBy from '../../../components/base/SortBy';

import Trans from '../../../locales/Trans';

const sortByOptions = [
  { value: 'title', label: 'Name (a - z)' },
  { value: '-title', label: 'Name (z - a)' },
  { value: 'activity_budget_value', label: 'Total Budget (asc)' },
  { value: '-activity_budget_value', label: 'Total Budget (desc)' },
];

class ProjectsTable extends BaseFilter {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'id');
      data.push(item);
    });
    return data;
  }

  render() {
    const { intl, data, classes, selectedSortBy, handleSortBy } = this.props;
    const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
    const columns = [{
      title: intl.formatMessage({id: 'service.projects.header.project', defaultMessage: 'Donor'}),
      key: 'title.narratives[0].text',
      width: '45%',
      render: obj => 
        <Link to={`/projects/${obj.id}`}>{obj.title.narratives[0].text}</Link>
    }, {
      title: intl.formatMessage({id: 'service.projects.header.value', defaultMessage: 'Total donor funding value'}),
      dataIndex: 'aggregations.activity.budget_value',
      key: 'aggregations.activity.budget_value',
      className: 'number',
      render: value => <span>{usd}{format(',.2f')(value)}</span>
    }, {
      title: intl.formatMessage({id: 'service.projects.header.humanitarian', defaultMessage: 'Humanitarian'}),
      dataIndex: 'humanitarian',
      key: 'humanitarian',
      render: value =>
        <span>{value ? intl.formatMessage({id: 'service.projects.yes', defaultMessage: 'Yes'}) :
          intl.formatMessage({id: 'service.projects.no', defaultMessage: 'No'})}
        </span>
    },{
      title: 
        <SortBy
          options={sortByOptions}
          selectedKey={selectedSortBy}
          handleChange={e => handleSortBy(e)}
        />,
      key: 'sort_by',
    }];
    return(
      <div className={classes.projectsTable}>
        <h2 className="title">
          <Trans id="service.projects.title" defaultMessage="Where the funds go"/>
        </h2>
        <Table dataSource={data ? this.addKey(data.results) : null}
               columns={columns}
               pagination={false}
               scroll={{ x: 650 }}
        />
        <Pagination className="pagination"
                    size="small"
                    total={get(data, 'count', 0)}
                    onChange={(page) => this.handleChange(page)}
        />
      </div>
    )
  }
}

ProjectsTable.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
  return {}
};

const styles = {
  projectsTable: {
    paddingTop: 20,
    '& .title': {
      color: '#0033a1',
    },
    '& .pagination': {
      padding: '20px 0',
    }
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(ProjectsTable)));