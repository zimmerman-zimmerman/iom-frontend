import React, { Component } from 'react';
import Icon from "antd/es/icon";

import './SortHeader.scss';

class SortHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defValue: props.defSortValue,
            arrowClassName: 'no-arrow',
            iconType: 'caret-up',
        };
        this.handleSort = this.handleSort.bind(this);
        this.changeArrow = this.changeArrow.bind(this);
    }

    componentDidUpdate(prevProps){
        if(this.props.sortValue !== prevProps.sortValue)
        {
            this.changeArrow();
        }
    }

    handleSort() {
        let value = this.props.sortValue;
        if (value && value.indexOf(this.state.defValue) !== -1)
        {
            value = value.startsWith('-') ? value.substring(1) : ('-').concat(value);
        }else
        {
            value = this.state.defValue;
        }
        this.props.onSort(value);
    }

    changeArrow (){
        if(this.props.sortValue.indexOf(this.state.defValue) !== -1)
        {
            if(this.props.sortValue.indexOf('-') !== -1){
                this.setState({
                    arrowClassName: 'sort-arrow',
                    iconType: 'caret-up',
                })
            }else
            {
                this.setState({
                    arrowClassName: 'sort-arrow',
                    iconType: 'caret-down',
                })
            }

        }else
        {
            this.setState({
                arrowClassName: 'no-arrow',
            })
        }
    }

    render() {
        return (
            <div className={'sort-header'} onClick={() => this.handleSort()}>
                <div className={'sort-title'}
                     style={this.props.style ? this.props.style : {}}>
                    {this.props.title}</div>
                <div className={this.state.arrowClassName}> <Icon type={this.state.iconType} /> </div>
            </div>
        );
    }
}

export default SortHeader;
