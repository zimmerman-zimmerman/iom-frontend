import React, {Fragment} from 'react';
import { connect } from "react-redux";
import Table from 'antd/es/table';
import { format } from "d3-format";
import get from 'lodash/get';
import injectSheet from 'react-jss';
import { injectIntl, intlShape } from "react-intl";
import { Link } from 'react-router-dom';
import BaseFilter from "../../../components/base/filters/BaseFilter";
import SortHeader from "../../../components/SortHeader/SortHeader";

import './DonorsTabel.scss';
import Pagination from "../../../components/Pagination/Pagination";
import { paginate, genericSort } from "../../../helpers/tableHelpers";

class DonorsTable extends BaseFilter {
    addKey(dataSource) {
        let data = [];
        dataSource.forEach(function(item) {
            item.key = get(item, 'participating_organisation_ref');
            data.push(item);
        });
        return data;
    }

    handleSort(value) {
        this.setState({
            orderBy: value,
        });
    }

    render() {
        const { intl, rootComponent, classes } = this.props;
        const { filters } = rootComponent.state;
        const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
        const columns = [{
            title: <SortHeader
                title={intl.formatMessage({id: 'donors.table.donors.header.donor', defaultMessage: 'Donor'})}
                sortValue={this.state.orderBy}
                defSortValue={'name'}
                onSort={(value) => this.handleSort(value)}
            />,
            dataIndex: 'name',
            key: 'participating_organisation',
            width: '55%',
            render: (participating_organisation, row, index) => {
                let code = typeof row.code === 'string' ? row.code.toLowerCase() : row.code;
                //so if the code is false, that means that this si a donor without a group
                //and because we filter donor projects by their name, we put this name as
                //the code in the url
                code = code ? code : encodeURIComponent(participating_organisation);
                return (
                    <Link to={{
                              pathname: `/donors/${code}`,
                              state: { filterValues: filters.values }
                          }}>
                        {participating_organisation}
                    </Link>
                );
            },
        }, {
            title: <SortHeader
                title={intl.formatMessage({id: 'donors.table.donors.header.budget', defaultMessage: 'Budget'})}
                sortValue={this.state.orderBy}
                defSortValue={'value'}
                onSort={(value) => this.handleSort(value)}
            />,
            dataIndex: 'value',
            key: 'value',
            className: 'number',
            render: value => <span>{usd}{format(",.0f")(value)}</span>
        }, {
            title: <SortHeader
                title={intl.formatMessage({
                    id: 'donors.table.donors.header.projects.count',
                    defaultMessage: 'Number of projects',
                })}
                sortValue={this.state.orderBy}
                defSortValue={'project'}
                onSort={(value) => this.handleSort(value)}
            />,
            dataIndex: 'project',
            key: 'activity_count',
            className: 'number',
        },];
        //Frontend sort
        let data = genericSort(this.props.data, this.state.orderBy);
        //Frontend paginate
        data = paginate(this.state.page, this.state.pageSize, data);
        return (
            <Fragment>
                <Table className={classes.donorsTable} dataSource={data !== null ? this.addKey(data) : null} columns={columns} size="middle"
                       scroll={{ x: 900 }} pagination={false} rowClassName={classes.donorsRow}
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

DonorsTable.propTypes = {
    intl: intlShape.isRequired
};

const styles = {
    donorsTable: {
      marginTop: 30,
    },
    donorsRow: {
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
    return {}
};

export default injectSheet(styles)(injectIntl(connect(mapStateToProps)(DonorsTable)));
