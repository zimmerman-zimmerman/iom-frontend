import { Component } from 'react';
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import extend from "lodash/extend";


class BaseFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        aggregations: 'activity_count,incoming_fund,disbursement,expenditure,value',
        group_by: '',
        order_by: '-value',
        hierarchy: 1,
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
      },
      orderBy: 'value',
      page: 1,
      pageSize: 10,
      update: false,
      filters: {values: { order_by: '-value'}, changed: false, chips: {}},
      dataRange: [],
      countriesTableSortBy: 'title',
      donorTableSortBy: 'participating_organisation',
      servicesTableSortBy: '-totalValue',
      donorsTableSortby: 'name'
    };
    this.actionRequest = this.actionRequest.bind(this);
    this.updateComponent = this.updateComponent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  filter(data, valueKey = 'value') {
    let dataSource = get(data, 'results');
    if (this.state.dataRange.length > 0 && dataSource) {
      return dataSource.filter(
        d => (d[valueKey] >= this.state.dataRange[0] &&  d[valueKey] <= this.state.dataRange[1])
      );
    }
    return dataSource;
  }

  actionRequest(params, groupBy, request) {
    const dispatch = this.props.dispatch ? this.props.dispatch : this.props.rootComponent.props.dispatch;
    const lParams = params;
    if (groupBy) {
      lParams.group_by = groupBy;
    }
    dispatch(request(lParams))
  }

  handleChange(values, names, remove=false, fieldN=undefined, fieldL=undefined) {
    const { rootComponent } = this.props;
    const fieldName = fieldN ? fieldN : this.props.fieldName;
    const fieldLabel = fieldL ? fieldL : this.props.fieldLabel;
    const { filters } = rootComponent.state;
    let value = values;
    if(fieldName === 'q' && filters.chips['q'] && !remove)
    {
      value = filters.chips['q'].values;
      if(value.indexOf(values) === -1)
      {
          value.push(values);
      }
    }

    if (get(filters.values, fieldName)) {
      delete filters.values[fieldName];
      delete filters.chips[fieldName];
    }

    if(fieldName === 'date' && remove){
        delete filters.values['start_date_gte'];
        delete filters.values['end_date_lte'];
        delete filters.chips[fieldName];
    }

      if(fieldName === 'money' && remove){
          delete filters.chips[fieldName];
          rootComponent.setState({
              dataRange: [],
          })
      }

    if (!isEmpty(value)) {
      const valuez = Array.isArray(value) ? value.join() : value;
      const valuezz = fieldLabel === 'Sector type' ? value : valuez.split(',');
      filters.chips[fieldName] = {
          values: valuezz,
          labels: fieldLabel === 'Key word' ? valuez.split(',') : names,
          type: fieldLabel,
      };

      filters.values[fieldName] = valuez;
    }
    filters.values['page'] = 1;
    filters.changed = true;
    rootComponent.setState({ filters });
    this.updateComponent(filters);
  }

  componentDidUpdate() {
    this.updateComponent();
  }

  updateComponent(filterz=undefined){
    const rootComponent = get(this.props, 'rootComponent');
    if (rootComponent) {
      const filters = filterz ? filterz : rootComponent.state.filters;
      const { groupBy, filterRequest, secondFilterRequest, nonHumanFilterRequest } = rootComponent.props;
      if (filters.changed) {
        const { params } = rootComponent.state;
        let values = {};

        if(filters.values['sector type'])
        {

            for (let key in filters.values){
                if (filters.values.hasOwnProperty(key)) {
                  if(key !== 'sector type')
                  {
                    values[key] = filters.values[key];
                  }
                }
            }

            if(values['sector'])
            {
                values['sector'] = values['sector'].concat(',').concat(filters.values['sector type']);
            }else
            {
                values['sector'] = filters.values['sector type'];
            }

        }else
        {
            values = filters.values;
        }

        if(values['sector type'] && values['sector'])
        {
          values['sector'] = values['sector'].concat(',').concat(values['sector type']);
          delete values['sector type'];
        }else if(values['sector type'] && !values['sector'])
        {
            values['sector'] = values['sector type'];
            delete values['sector type'];
        }

        if(params['humanitarian'] !== undefined) {
          let paramz = params;
          paramz.humanitarian = 1;
          this.actionRequest(extend({}, params, values), groupBy, filterRequest);
          params.humanitarian = 0;
          this.actionRequest(extend({}, params, values), groupBy, nonHumanFilterRequest);
        } else {
          this.actionRequest(extend({}, params, values), groupBy, filterRequest);
          if (secondFilterRequest) {
            this.actionRequest(extend({}, params, values), 'participating_organisation', secondFilterRequest);
          }
        }
        filters.changed = false;
        rootComponent.setState({filters: filters})
      }
    }
  }
}

BaseFilter.defaultProps = {
  groupBy: '',
  filterRequest: null,
  secondFilterRequest: null,
};

export default BaseFilter;