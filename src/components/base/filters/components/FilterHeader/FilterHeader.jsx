import React from 'react';
import ArrowDown from "../../../../../icons/arrowDown";
import './FilterHeader.scss';

class FilterHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    render(){
        return (
            <div className={'filter-header-component'}
                 onClick={() => this.setState({ expanded: !this.state.expanded })}>
                <div className={'filter-header-text'}>
                    {this.props.headerString}
                </div>
                <ArrowDown className={'filter-header-arrow'} />
            </div>
        );
    }
}

export default FilterHeader;