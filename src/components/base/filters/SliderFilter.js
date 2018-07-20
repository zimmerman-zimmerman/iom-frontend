import React from 'react';
import injectSheet from "react-jss";
import { injectIntl, intlShape } from "react-intl";
import { Range } from 'rc-slider';
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";

import BaseFilter from './BaseFilter';

import 'rc-slider/assets/index.css';

const dotStyle = {
  width: 24,
  height: 24,
  marginTop: -11,
  backgroundColor: '#418fde',
  borderColor: '#418fde',
}
const railStyle = {
  height: 1,
  backgroundColor: '#5f5f5f',
}

class SliderFilter extends BaseFilter {
  constructor(props) {
    super(props);

    this.state = {
      value: [0, 1000000]
    }
  }

  handleChange(values) {
    const { rootComponent, minValue, maxValue } = this.props;
    const { filters } = rootComponent.state;
    if (get(filters.values, 'total_commitment_gte') || get(filters.values, 'total_commitment_lte') ) {
      delete filters.values['total_commitment_gte'];
      delete filters.values['total_commitment_lte'];
    }
    if (!isEmpty(values)) {
      filters.values['total_commitment_gte'] = values[0];
      filters.values['total_commitment_lte'] = values[1];
    }
    if(values[0] === minValue && values[1] === maxValue) {
      delete filters.values['total_commitment_gte'];
      delete filters.values['total_commitment_lte'];
    }
    filters.changed = true;
    this.setState({filters: filters});
  }

  render() {
    const { classes, intl, minValue, maxValue } = this.props;
    const { value } = this.state;
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'USD'});
    return (
      <div className={classes.slider}>
        <Range
          range
          allowCross={false}
          value={value}
          defaultValue={[minValue, maxValue]}
          onChange={v => {
            this.handleChange(v);
            this.setState({ value: v })
          }}
          tipFormatter={null}
          min={minValue}
          max={maxValue}
          handleStyle={[dotStyle, dotStyle]}
          trackStyle={[railStyle]}
          railStyle={railStyle}
          dotStyle={dotStyle}
          activeDotStyle={dotStyle}
        />
        <div className={classes.flexContainer}>
          <div className={classes.amount}>
            <input readOnly="readonly" value={`${usd} ${value[0].toLocaleString()}`} />
          </div>
          <div className={classes.amount}>
            <input readOnly="readonly" value={`${usd} ${value[1].toLocaleString()}`} />
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  slider: {
    padding: '15px 30px 15px 20px',
  },
  flexContainer: {
    display: 'flex',
  },
  amount: {
    width: '50%',
    margin: '6px 0',
    textAlign: 'start',
    '&:last-of-type': {
      paddingRight: 0,
      textAlign: 'right',
      '& input': {
        textAlign: 'right',
        marginLeft: 10,
      }
    },
    '& input': {
      color: '#262626',
      display: 'block',
      marginLeft: -10,
      border: 0,
      background: 'none',
      width: '100%',
      fontSize: 15,
      fontWeight: 300,
    }
  },
};

SliderFilter.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
  return {}
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(SliderFilter)));