import React, { Component } from 'react';
import SortUpArrow from '../../icons/SortUpArrow';
import SortDownArrow from '../../icons/SortDownArrow';

import './SortHeader.scss';

class SortHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defValue: props.defSortValue,
            arrowClassName: 'no-arrow',
            icon: <SortDownArrow className={'arrow-icon-down'} />,
        };
        this.handleSort = this.handleSort.bind(this);
        this.changeArrow = this.changeArrow.bind(this);
    }

    componentDidMount(){
        this.changeArrow();
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
                    icon: <SortUpArrow className={'arrow-icon-up'} />,
                })
            }else
            {
                this.setState({
                    arrowClassName: 'sort-arrow',
                    icon: <SortDownArrow className={'arrow-icon-down'} />,
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
                <div className={'sort-title'}>{this.props.title}</div>
                <div className={this.state.arrowClassName}> {this.state.icon} </div>
            </div>
        );
    }
}

export default SortHeader;
