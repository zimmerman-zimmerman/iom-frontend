import map from 'lodash/map';
import get  from 'lodash/get';

export function countriesFormatter(data, m49Region, countryM49Mapping) {
    return map(data, (c) => {
        return {
            region: get(m49Region, get(countryM49Mapping, get(c, 'recipient_country.code', '').toLowerCase())),
            code: get(c, 'recipient_country.code', ''),
            title: get(c, 'recipient_country.name', ''),
            budget: get(c, 'value', 0),
            activity_count: get(c, 'activity_count', 0)
        };
    });
}