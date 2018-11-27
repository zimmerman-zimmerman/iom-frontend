import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import Select from 'antd/es/select';
import Spin from 'antd/es/spin';
import Layout from 'antd/es/layout';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import PropsType from 'prop-types';
import { TreeSelect } from 'antd';

import BaseFilter from './BaseFilter';
import { injectIntl } from 'react-intl';
import { getSectors } from './FilterHelper';

const Option = Select.Option;
const { Content } = Layout;
const TreeNode = TreeSelect.TreeNode;

class Filter extends BaseFilter {
    constructor(props) {
        super(props);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentDidMount() {
        const { dispatch, actionRequest, groupBy } = this.props;
        const { params } = this.state;
        if (dispatch) {
            this.actionRequest(params, groupBy, actionRequest);
        }
    }

    handleFilterChange(valuez, component){
        const value = this.props.fieldName !== 'sector' ? component.key : valuez;
        const chips = this.props.rootComponent.state.filters.chips;
        let values = [];
        let names = [];
        let fieldName = this.props.fieldName;

        //So if the value contains ',' that means that it will be a value for a sector group
        //Cause those values are made up of several values which are seperated by ','
        if(fieldName === 'sector')
        {
            if(value.indexOf(',') !== -1){
                fieldName='sector type';
            }else
            {
                fieldName='sector';
            }
        }

        if(Object.keys(chips).length !== 0 && chips[fieldName])
        {
            values = chips[fieldName].values;
            names = chips[fieldName].labels;
        }

        const name = component.props ? component.props.children : component[0];
        if(values.indexOf(value) === -1 && names.indexOf(name) === -1){
            values.push(value);
            names.push(name);
        }

        if(this.props.fieldName === 'sector')
        {
            const fieldLabel = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
            this.handleChange(values, names, false, fieldName, fieldLabel);
        }else
        {
            this.handleChange(values, names);
        }
    }

    options(results) {
        const { optionKeyName, optionValueName } = this.props;

        const donorsRendered = [];

        return sortBy(results, optionValueName).map( item =>{

            let value = get(item, optionValueName);

            if(this.props.fieldName.indexOf('participating_organisation') !== -1)
            {
                //This is used to add an extra number to donors that have the same name
                //because there are donors like that and they mess up the dropdown #JustIOMThings
                //And we gonna just add an empty space to the end of these kind of names.
                value = find(donorsRendered, [optionValueName, value]) ? value.concat(' ') : value;

                //Here we just store the rendered donor options
                donorsRendered.push(item);
            }

            return <Option key={get(item, optionKeyName)} value={value}>
                {get(item, optionValueName)}</Option>
        });
    }

    select(options) {
        const { placeholder, classes, sectors, sectorMapping, reducer, intl } = this.props;
        if(sectors)
        {
            const mapping = get(sectorMapping, 'data.content', false);
            const sectors = get(reducer, 'data.results', []);
            let serviceCodes = '';
            let projectCodes = '';
            let dacCodes = '';
            if(mapping)
            {
                serviceCodes = mapping.serviceAreaFilter.allCodes;
                projectCodes = mapping.projectTypeFilter;
                dacCodes = mapping.dacCodeFilter.allCodes;
            }

            const serviceAreaOptions = getSectors(sectors, serviceCodes);
            const projectTypeOptions = getSectors(sectors, projectCodes);
            const DACSectorsOptions = getSectors(sectors, dacCodes);

            return(
                <TreeSelect
                    value={undefined}
                    placeholder={placeholder}
                    onChange={this.handleFilterChange}
                    className={classes.filter}
                    dropdownClassName={classes.treeDropDown}
                >
                    <TreeNode value={serviceCodes}
                              title={intl.formatMessage({
                                id: 'filters.select.sectors.service.area',
                                defaultMessage: 'Service Area'
                                    })}
                              key="1">
                        {serviceAreaOptions.map(service => {
                            return <TreeNode className={classes.childOption} value={service.sector.code}
                                             title={service.sector.name} key={service.sector.code} />;
                        })}
                    </TreeNode>
                    <TreeNode value={projectCodes}
                              title={intl.formatMessage({
                                  id: 'filters.select.sectors.project.type',
                                  defaultMessage: 'Project Type'
                              })}
                              key="2">
                        {projectTypeOptions.map(project => {
                            return <TreeNode className={classes.childOption} value={project.sector.code}
                                             title={project.sector.name} key={project.sector.code} />;
                        })}
                    </TreeNode>
                    <TreeNode value={dacCodes}
                              title={intl.formatMessage({
                                  id: 'filters.select.sectors.dac.sector',
                                  defaultMessage: 'DAC Sector'
                              })}
                              key="3">
                        {DACSectorsOptions.map(sector => {
                            return <TreeNode className={classes.childOption} value={sector.sector.code}
                                             title={sector.sector.name} key={sector.sector.code} />;
                        })}
                    </TreeNode>
                </TreeSelect>
            );
        }else if (/Android/i.test(navigator.userAgent)) {
            return (
                <Select placeholder={placeholder}
                        className={classes.filter}
                        onChange={this.handleFilterChange}
                        value={placeholder}
                >
                    {options}
                </Select>
            )
        }

        return (
            <Select showSearch
                    placeholder={placeholder}
                    className={classes.filter}
                    onChange={this.handleFilterChange}
                    value={placeholder}
            >
                {options}
            </Select>
        )
    }

    render() {
        const { reducer } = this.props;
        const results = get(reducer, 'data.results');
        const options = !isEmpty(results) ? this.options(results) : null;
        return (
            <Spin spinning={reducer.request}>
                <Content>
                    {options ? this.select(options) : null}
                </Content>
            </Spin>
        )
    }
}

Filter.propTypes = {
    reducer: PropsType.object,
    placeholder: PropsType.string,
    optionKeyName: PropsType.string,
    optionValueName: PropsType.string,
    groupBy: PropsType.string,
    actionRequest: PropsType.func,
};

const styles = {
    treeDropDown: {
        maxHeight: '250px !important',
        overflow: 'unset !important',
        overflowY: 'auto !important',
    },
    childOption: {
        '& .ant-select-tree-node-content-wrapper':{
            overflowX: 'hidden',
            textOverflow: 'ellipsis',
        },
    },
    filter: {
        fontSize: 15,
        backgroundColor:'#e9ebf7',
        width: '100%',
        '& .ant-select-selection': {
            minHeight: 44,
        },
        '& .ant-select-selection__rendered': {
            marginTop: 6,
        },
        '& .ant-select-selection-selected-value': {
            opacity: '0.4 !important',
        }
    },
};

const mapStateToProps = (state, props) => {
    const { reducerName } = props;
    return {
        reducer: get(state, reducerName),
        sectorMapping: state.sectorMapping,
    }
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(Filter)));
