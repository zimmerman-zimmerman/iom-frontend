import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Select from 'antd/es/select';
import Spin from 'antd/es/spin';
import Layout from 'antd/es/layout';
import { connect } from "react-redux";
import injectSheet from "react-jss";
import PropsType from 'prop-types';

import BaseFilter from "./BaseFilter";

const Option = Select.Option;
const { Content } = Layout;

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

    handleFilterChange(value, component){
        const chips = this.props.rootComponent.state.filters.chips;
        let values = [];
        let names = [];
        if(Object.keys(chips).length !== 0 && chips[this.props.fieldName])
        {
            values = chips[this.props.fieldName].values;
            names = chips[this.props.fieldName].labels;
        }
        if(values.indexOf(value) === -1){
            values.push(value);
            names.push(component.props.children);
        }
        this.handleChange(values, names);
    }

    options(results) {
        const { optionKeyName, optionValueName } = this.props;
        return results.map(item => <Option key={get(item, optionKeyName)}>{get(item, optionValueName)}</Option>)
    }

    select(options) {
        const { placeholder, classes } = this.props;
        if (/Android/i.test(navigator.userAgent)) {
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
        reducer: get(state, reducerName)
    }
};

export default injectSheet(styles)(connect(mapStateToProps)(Filter));
