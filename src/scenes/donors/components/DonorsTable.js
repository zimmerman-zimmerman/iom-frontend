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
import {paginate} from "../../../helpers/tableHelpers";

class DonorsTable extends BaseFilter {
    addKey(dataSource) {
        let data = [];
        dataSource.forEach(function(item) {
            item.key = get(item, 'participating_organisation_ref');
            data.push(item);
        });
        return data;
    }

    handleChange(value) {
        const { rootComponent } = this.props;
        const { filters } = rootComponent.state;
        if (get(filters.values, 'order_by')) {
            delete filters.values['order_by'];
        }
        filters.values['order_by'] = value;
        filters.changed = true;
        this.setState({filters: filters});
    }

    render() {
        const { intl, rootComponent, classes } = this.props;
        const { filters } = rootComponent.state;
        const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
        const columns = [{
            title: <SortHeader
                title={intl.formatMessage({id: 'donors.table.donors.header.donor', defaultMessage: 'Donor'})}
                sortValue={filters.values.order_by}
                defSortValue={'participating_organisation'}
                onSort={this.handleChange}
            />,
            dataIndex: 'name',
            key: 'participating_organisation',
            width: '55%',
            render: (participating_organisation, row, index) => {
                return (
                    <Link to={`/donors/${row.code.toLowerCase()}`}>
                        {participating_organisation}
                    </Link>
                );
            },
        }, {
            title: <SortHeader
                title={intl.formatMessage({id: 'donors.table.donors.header.budget', defaultMessage: 'Budget'})}
                sortValue={filters.values.order_by}
                defSortValue={'value'}
                onSort={this.handleChange}
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
                sortValue={filters.values.order_by}
                defSortValue={'activity_count'}
                onSort={this.handleChange}
            />,
            dataIndex: 'project',
            key: 'activity_count',
            className: 'number',
        },];
        const data = paginate(this.state.page, this.state.pageSize, this.props.data);
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
