import React from 'react';
import get from "lodash/get";
import Table from 'antd/es/table';
import Pagination from 'antd/es/pagination';
import { injectIntl, intlShape } from "react-intl";
import { Link } from 'react-router-dom';
import {format} from "d3-format";
import Layout from 'antd/es/layout';
import {connect} from "react-redux";

import '../styles/ProjectsTable.scss';
import BaseFilter from "../../../components/filters/BaseFilter";

const { Content } = Layout;

class ProjectsTable extends BaseFilter {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function (item) {
      item.key = get(item, 'id');
      data.push(item);
    });
    return data;
  }

  render() {
    const { intl, data } = this.props;
    const count = get(data, 'count', 0);
    const columns = [{
      title: intl.formatMessage({id: 'projects.table.project.title', defaultMessage: 'Project title'}),
      dataIndex: 'title',
      key: 'title',
      className: 'Title',
      width: '35%',
      render: (title, record) =>
        <Link to={`/projects/${record.id}`}>{title.narratives[0].text}</Link>,
    }, {
      title: intl.formatMessage({id: 'projects.table.start.date', defaultMessage: 'Start date'}),
      dataIndex: 'activity_dates',
      key: 'start_date',
      render: activity_dates => <span>{activity_dates[1].iso_date}</span>
    }, {
      title: intl.formatMessage({id: 'projects.table.end.date', defaultMessage: 'End date'}),
      dataIndex: 'activity_dates',
      key: 'end_date',
      render: activity_dates => <span>{activity_dates[2].iso_date}</span>
    },{
      title: intl.formatMessage({id: 'projects.table.budget', defaultMessage: 'Budget'}),
      dataIndex: 'budgets',
      key: 'budgets',
      render: budgets => <span>{format(".2s")(budgets[0].value.value).replace(/G/, "B")}</span>,
    }, {
      title: intl.formatMessage({id: 'projects.table.sector', defaultMessage: 'Sector by IOM project type'}),
      dataIndex: 'sectors',
      key: 'sectors',
      render: sectors => <span>{sectors[0].sector.name}</span>,
    }, {
      title: intl.formatMessage({id: 'projects.table.country', defaultMessage: 'Country'}),
      dataIndex: 'recipient_countries',
      key: 'recipient_countries',
      width: '15%',
      render: recipient_countries => <span>{recipient_countries[0].country.name}</span>,
    }];
    return (
      <Content className="ProjectsTable">
        <Table dataSource={data ? this.addKey(data.results) : null}
               columns={columns}
               size="middle"
               pagination={false}
        />
        <Pagination className="Pagination" size="small" total={count} onChange={(page) => this.handleChange(page)}/>
      </Content>
    )
  }
}

ProjectsTable.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
  return {}
};

export default connect(mapStateToProps)(injectIntl(ProjectsTable));
