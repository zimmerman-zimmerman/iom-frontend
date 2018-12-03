import React from 'react';
import Table from 'antd/es/table';
import { format } from "d3-format";
import get from "lodash/get";
import BaseFilter from "../../../components/base/filters/BaseFilter";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import Trans from '../../../locales/Trans';
import SortHeader from "../../../components/SortHeader/SortHeader";
import Pagination from "../../../components/Pagination/Pagination";
import * as actions from "../../../services/actions";
import {getDate} from "../../../helpers/tableHelpers";

class ProjectsTable extends BaseFilter {

    componentDidMount(){
        const { dispatch, donorGroupJson, donorGroupJsonSlug } = this.props;
        if(!donorGroupJson.data) {
            dispatch(actions.donorGroupJsonRequest(donorGroupJsonSlug));
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

    handleChange(value, fieldName='page') {
        const { rootComponent } = this.props;
        const { filters } = rootComponent.state;
        if (get(filters.values, fieldName)) {
            delete filters.values[fieldName];
        }
        filters.values[fieldName] = value;
        filters.changed = true;
        this.setState({filters: filters});
    }

  render() {
    const { intl, data, classes, selectedSortBy, handleSortBy, donorGroupJson } = this.props;
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    const total = get(data, 'count', 0);
    const columns = [{
      title:
          <SortHeader
              title={intl.formatMessage({id: 'service.projects.header.project', defaultMessage: 'Project title'})}
              sortValue={selectedSortBy}
              defSortValue={'title'}
              onSort={handleSortBy}
          />,
      key: 'title.narratives[0].text',
      render: obj =>
        <Link to={`/projects/${obj.id}`}>{obj.title.narratives[0].text}</Link>
    },
        {title:
                <SortHeader
                    title={intl.formatMessage({id: 'service.projects.header.donor', defaultMessage: 'Donor'})}
                    sortValue={selectedSortBy}
                    // defSortValue={'donor'}
                    onSort={() => console.log('We need backend sorting functionality for this')}
                />,
            dataIndex: 'participating_organisations[0]',
            render: obj => {
                let donorExtra = `${get(donorGroupJson, `data.content.${obj.ref}`)}/`;
                return (
                    <Link to={`/donors/${donorExtra}${obj.ref}`}>
                        {obj.narratives[0].text}
                    </Link>
                )
            }
        },
        {title: <SortHeader
              title={intl.formatMessage({id: 'service.projects.header.value', defaultMessage: 'Total donor funding value'})}
              sortValue={selectedSortBy}
              defSortValue={'activity_budget_value'}
              onSort={handleSortBy}
              />,
              dataIndex: 'aggregations.activity.budget_value',
              key: 'aggregations.activity.budget_value',
              render: value => <span>{usd}{format(',.0f')(value)}</span>
        },
        {title: <SortHeader
                title={intl.formatMessage({id: 'country.table.projects.header.status', defaultMessage: 'Project Status'})}
                sortValue={selectedSortBy}
                defSortValue={'activity_status'}
                onSort={handleSortBy}
            />,
            dataIndex: 'activity_status.name',
            render: name => <span>{name}</span>
        },
        {
            title: <SortHeader
                title={intl.formatMessage({id: 'projects.table.start.date', defaultMessage: 'Start date'})}
                sortValue={selectedSortBy}
                defSortValue={'start_date'}
                onSort={handleSortBy}
            />,
            dataIndex: 'activity_dates',
            key: 'start_date',
            render: activityDates => <div className={classes.dates}>{getDate(activityDates, 'start')}</div>
        }, {
            title: <SortHeader
                title={intl.formatMessage({id: 'projects.table.end.date', defaultMessage: 'End date'})}
                sortValue={selectedSortBy}
                defSortValue={'end_date'}
                onSort={handleSortBy}
            />,
            dataIndex: 'activity_dates',
            key: 'end_date',
            render: activityDates => <div className={classes.dates}>{getDate(activityDates, 'end')}</div>
        },
    ];

    return(
      <div className={classes.projectsTable}>
        <h2 className="title">
          <Trans id="country.table.projects.title" defaultMessage="Related Projects"/>
        </h2>
        <Table dataSource={data ? this.addKey(data.results) : null}
               columns={columns}
               pagination={false}
               scroll={{ x: 650 }}
               className={classes.table}
               rowClassName={classes.row}
        />
          {total > 5 &&
            <Pagination pageCount={Math.ceil(total/5)}
                        onPageChange={(value) => this.handleChange(value.selected+1)}
                        forcePage={get(this.props.rootComponent.state.filters.values, 'page', 1)-1}
            />
          }
      </div>
    )
  }
}

ProjectsTable.propTypes = {
  intl: intlShape.isRequired
};

ProjectsTable.defaultProps = {
    donorGroupJsonSlug: 'donor-group-json',
};

const mapStateToProps = (state, ) => {
  return {
      donorGroupJson: state.donorGroupJson,
  }
};

const styles = {
    row: {
      fontSize: 16,
        lineHeight: '22px',
        color: '#0033a1',
        '& td': {
            '& a': {
                color: '#0033a1',
                '&:hover': {
                    color: '#418fde',
                },
            },
        },
    },
    dates: {
      width: 'max-content',
    },
  projectsTable: {
      width: '100%',
    paddingTop: 20,
    '& .title': {
      color: '#0033a1',
        fontSize: 26,
      fontWeight: 600,
      '@media (max-width: 767px)': {
        fontSize: '22px',
      },
    },
    '& .pagination': {
      padding: '20px 0',
    }
  },
  table: {
      marginTop: 20,
    '& tr': {
      '& td, th': {
        paddingLeft: '0px !important',
        paddingTop: 12,
        paddingBottom: 12,
      }
    }
  },
  fixedTH: {
    right: 0,
    position: 'sticky',
    backgroundColor: '#fff !important',
  },
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(ProjectsTable)));