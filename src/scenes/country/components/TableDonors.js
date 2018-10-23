import React, {Fragment} from 'react';
import Table from 'antd/es/table';
import { injectIntl, intlShape } from "react-intl";
import get from "lodash/get";
import { format } from "d3-format";
import { Link } from 'react-router-dom';
import SortHeader from "../../../components/SortHeader/SortHeader";
import injectSheet from "react-jss";
import Pagination from "../../../components/Pagination/Pagination";
import {paginate} from "../../../helpers/tableHelpers";

class TableDonors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageSize: 5,
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

    render(){
        const { intl, classes, handleDonorSortBy } = this.props;
        const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
        const columns = [{
            title:
                <SortHeader
                    title={intl.formatMessage({id: 'country.table.donors.header.donors', defaultMessage: 'Donor'})}
                    sortValue={this.props.sortBy}
                    defSortValue={'participating_organisation'}
                    onSort={handleDonorSortBy}
                />,
            key: 'participating_organisation',
            width: '60%',
            render: obj =>
                <Link to={`/donors/${obj.participating_organisation_ref}`}>{obj.participating_organisation}</Link>
        }, {
            title: <SortHeader
                title={intl.formatMessage({id: 'country.table.donors.header.total', defaultMessage: 'Total donor funding value'})}
                sortValue={this.props.sortBy}
                defSortValue={'value'}
                onSort={handleDonorSortBy}
            />,
            dataIndex: 'value',
            key: 'value',
            className: 'columnMoney',
            render: value => <span>{usd}{format(',.2f')(value)}</span>
        },];
        const data = paginate(this.state.page, this.state.pageSize, this.props.data);
        return (
            <Fragment>
                <Table dataSource={data ? this.addKey(data) : null} columns={columns} size="middle" pagination={false}
                       rowClassName={classes.row}/>
                {this.props.data && this.props.data.length > this.state.pageSize &&
                <Pagination pageCount={Math.ceil(this.props.data.length/this.state.pageSize)}
                            onPageChange={(value) => this.setState({ page: value.selected+1 })}
                            forcePage={this.state.page-1}
                />
                }
            </Fragment>
        )
    }
}

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
};

TableDonors.propTypes = {
  intl: intlShape.isRequired
};

export default injectSheet(styles)(injectIntl(TableDonors));
