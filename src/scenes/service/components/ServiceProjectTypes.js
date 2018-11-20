import React from 'react';
import Table from 'antd/es/table';
import { format } from "d3-format";
import get from "lodash/get";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import Trans from '../../../locales/Trans';
import SortHeader from "../../../components/SortHeader/SortHeader";
import Pagination from "../../../components/Pagination/Pagination";
import * as actions from "../../../services/actions";
import BaseFilter from "../../../components/base/filters/BaseFilter";
import { genericSort, paginate } from "../../../helpers/tableHelpers";

class ServiceProjectTypes extends BaseFilter {

    componentDidMount(){
        const { dispatch, sectorMapping, serviceId } = this.props;
        const params = this.state.params;
        const dacSectors = get(sectorMapping, 'data.content.dacCodeFilter');
        const serviceAreas = get(sectorMapping, 'data.content.serviceAreaFilter');
        const serviceProjectTypes = dacSectors[serviceId] ? dacSectors[serviceId] : serviceAreas[serviceId];
        if (dispatch) {
            params.humanitarian = 1;
            this.actionRequest({
                ...params,
                sector: serviceProjectTypes,
            }, 'sector', actions.servicesRequest);
            params.humanitarian = 0;
            this.actionRequest({
                ...params,
                sector: serviceProjectTypes,
            }, 'sector', actions.nonHumanServicesRequest);
        } else {
            dispatch(actions.servicesInitial());
            dispatch(actions.nonHumanServicesInitial());
        }
        this.setState({
            pageSize: 5,
        })
    }

    handleSortBy(value){
        this.setState({
            orderBy: value,
        })
    }

    render() {
        const { intl, classes, humanServices, nonHumanServices } = this.props;
        const humanProjectTypes = get(humanServices, 'data.results', []).map(service => {
            service.humanitarian = 'Yes';
            service.title = service.sector.name;
            return service;
        });
        const nonHumanProjectTypes = get(nonHumanServices, 'data.results', []).map(service => {
            service.humanitarian = 'No';
            service.title = service.sector.name;
            return service;
        });

        const data = humanProjectTypes.concat(nonHumanProjectTypes);

        const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});

        const columns = [{
            title:
                <SortHeader
                    title={intl.formatMessage({id: 'service.project.types.title', defaultMessage: 'Project types'})}
                    sortValue={this.state.orderBy}
                    defSortValue={'title'}
                    onSort={(value) => this.handleSortBy(value)}
                />,
            dataIndex: 'sector',
            render: sector =>
                <Link to={`/services/project-type/${sector.code}`}>{sector.name}</Link>
        }, {
            title: <SortHeader
                title={intl.formatMessage({id: 'service.project.types.funding', defaultMessage: 'Total funding value'})}
                sortValue={this.state.orderBy}
                defSortValue={'value'}
                onSort={(value) => this.handleSortBy(value)}
            />,
            dataIndex: 'value',
            className: 'number',
            render: value => <span>{usd}{format(',.0f')(value)}</span>
        }, {
            title: <SortHeader
                title={intl.formatMessage({id: 'service.project.types.humanitarian', defaultMessage: 'Humanitarian'})}
                sortValue={this.state.orderBy}
                defSortValue={'humanitarian'}
                onSort={(value) => this.handleSortBy(value)}
            />,
            dataIndex: 'humanitarian',
            render: value =>
                <span>{value}</span>
        },];

        let sortedData = genericSort(data, this.state.orderBy);
        sortedData = paginate(this.state.page, this.state.pageSize, sortedData);

        return(
            <div className={classes.projectsTable}>
                <h2 className="title">
                    <Trans id="service.projects.title" defaultMessage="Where the funds go"/>
                </h2>
                <Table dataSource={sortedData}
                       columns={columns}
                       pagination={false}
                       className={classes.table}
                       rowClassName={classes.row}
                />
                {data.length > this.state.pageSize &&
                <Pagination pageCount={Math.ceil(data.length/this.state.pageSize)}
                            onPageChange={(value) => this.setState({page: value.selected+1})}
                            forcePage={this.state.page-1}
                />
                }
            </div>
        );
    }
}

ServiceProjectTypes.propTypes = {
    intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
    return {
        humanServices: state.services,
        nonHumanServices: state.nonHumanServices,
        sectorMapping: state.sectorMapping,
    };
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
    projectsTable: {
        width: '50%',
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

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(ServiceProjectTypes)));