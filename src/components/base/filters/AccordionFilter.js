import React from 'react';
import PropsType from 'prop-types';
import injectSheet from 'react-jss';
import {injectIntl} from "react-intl";
import Accordion from 'antd-mobile/es/accordion';
import { Row, Col } from 'react-flexbox-grid';
import isEqual from 'lodash/isEqual';
import './styles/AccordionFilter.scss';
import BaseFilter from './BaseFilter';

class AccordionFilter  extends BaseFilter{
    constructor(props) {
        super(props);
        this.state = {
            chips: {},
        };
    }

  componentDidUpdate(){
    if(!isEqual(this.props.rootComponent.state.filters.chips, this.state.chips))
    {
      this.setState({
          chips: this.props.rootComponent.state.filters.chips,
      });
    }
  }

  handleRemoveChip(chips, key, index){
      let values = [];
      let names = [];
      if(key !== 'date' && key !== 'money')
      {
          values = chips[key].values;
          names = chips[key].labels;
          values.splice(index, 1);
          names.splice(index, 1);
      }
      this.handleChange(values, names, true, key, chips[key].type);
  }

  render () {
      const { classes, panels } = this.props;
      const chips = this.state.chips;
    return(
        <Row className={classes.accordionFilter}>
            <div className='filters-container'>
                {Object.keys(chips).map(key => {
                    return (
                        <div className='chip-container'>
                          <div className='chip-type'>
                              {chips[key].type}
                          </div>
                          <div className='chip-label-container'>
                              {chips[key].labels.map((label, index) => {
                                  return (
                                      <div className='chip-box'>
                                          <div className='chip-x' onClick={() => this.handleRemoveChip(chips, key, index)}> x </div>
                                          <div className='chip-label'> {label} </div>
                                      </div>
                                  )})}
                          </div>
                      </div>
                    )
                })}
            </div>
            <Col xs={12}>
                <Accordion className={classes.accordionFilter}>
                    {panels.map((item, index) =>
                        <Accordion.Panel header={item.headerString} key={index}>
                            {item.component}
                        </Accordion.Panel>
                    )}
                </Accordion>
            </Col>
        </Row>
    )
  }
}

AccordionFilter.propTypes = {
  rootComponent: PropsType.object,
  panels: PropsType.array,
};

const styles = {
  accordionFilter: {
    marginTop: 5,
    '& .am-accordion': {
      borderTop: 'none',
    },
    '& .am-accordion .am-accordion-item .am-accordion-header': {
      paddingLeft: 0,
      fontWeight: 'bold',
    },
    '& .am-accordion-header': {
      padding: '5px 0',
      '& i': {
        marginTop: 5,
      }
    },
    '& .am-accordion-content-box': {
      padding: '10px 0',
      borderBottom: '0 !important',

    }
  }
};

export default injectSheet(styles)(injectIntl(AccordionFilter));