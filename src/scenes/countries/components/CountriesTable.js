import React, {Fragment} from 'react';
import { connect } from "react-redux";
import Table from 'antd/es/table';
import get from 'lodash/get';
import { format } from "d3-format";
import injectSheet from 'react-jss';
import { injectIntl, intlShape } from "react-intl";
import { Link } from 'react-router-dom';
import BaseFilter from "../../../components/base/filters/BaseFilter";
import SortHeader from '../../../components/SortHeader/SortHeader';
import Pagination from "../../../components/Pagination/Pagination";
import { paginate, genericSort } from '../../../helpers/tableHelpers';
import { countriesFormatter } from '../dataFormatter';

class CountriesTable extends BaseFilter {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'recipient_country.code');
      data.push(item);
    });
    return data;
  }

  handleChange(value) {
    this.setState({countriesTableSortBy: value});
  }

  render() {
    const { classes, intl, rootComponent, m49Region, countryM49Mapping } = this.props;
    const { filters } = rootComponent.state;
    const { countriesTableSortBy } = this.state;
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    const columns = [{
      title: <SortHeader
              title={intl.formatMessage({id: 'countries.table.country', defaultMessage: 'Country name'})}
              sortValue={countriesTableSortBy}
              defSortValue={'title'}
              onSort={this.handleChange}
              />,
      key: 'recipient_country',
      render: (country) =>
        <Link to={{
            pathname: `/countries/${country.code.toLowerCase()}`,
            state: { filterValues: filters.values }
        }}>
            {country.title}
        </Link>
    }, {
      title: <SortHeader
              title={intl.formatMessage({id: 'countries.table.budget', defaultMessage: 'Budget'})}
              sortValue={countriesTableSortBy}
              defSortValue={'budget'}
              onSort={this.handleChange}
              />,
      dataIndex: 'budget',
      key: 'value',
      render: value => <span>{usd}{format(",.0f")(value)}</span>
    }, {
      title: <SortHeader
              title={intl.formatMessage({id: 'countries.table.count', defaultMessage: 'Project count'})}
              sortValue={countriesTableSortBy}
              defSortValue={'activity_count'}
              onSort={this.handleChange}
              />,
      dataIndex: 'activity_count',
      key: 'count',
    },{
      title: <SortHeader
              title={intl.formatMessage({id: 'countries.table.region', defaultMessage: 'Region'})}
              sortValue={countriesTableSortBy}
              defSortValue={'region'}
              onSort={this.handleChange}
              />,
      dataIndex: 'region',
      key: 'region',
    },];
    let data = countriesFormatter(this.props.data, get(m49Region.data, 'content', {}), get(countryM49Mapping.data, 'content', {}));
    data = genericSort(data, countriesTableSortBy);
    data = paginate(this.state.page, this.state.pageSize, data);
    return (
        <Fragment>
            <Table className={classes.table} dataSource={data ? this.addKey(data) : null} columns={columns}
                   pagination={false}
                   scroll={{ x: 900 }}
                   size="middle"
                   rowClassName={classes.row}
            />
            {this.props.data && this.props.data.length > 10 &&
                    <Pagination pageCount={Math.ceil(this.props.data.length/10)}
                                onPageChange={(value) => this.setState({ page: value.selected+1 })}
                                forcePage={this.state.page-1}
                    />
            }
        </Fragment>
    )
  }
}

CountriesTable.propTypes = {
  intl: intlShape.isRequired
};

const styles = {
    table: {
        marginTop: 18,
    },
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
  fixedTH: {
    right: 0,
    position: 'sticky',
    backgroundColor: '#fff !important',
  }
};

const mapStateToProps = (state, ) => {
  return {
    countryM49Mapping: state.countryM49Mapping,
    m49Region: state.m49Region,
  }
};

export default injectSheet(styles)(injectIntl(connect(mapStateToProps)(CountriesTable)));
