import map from 'lodash/map';
import get  from 'lodash/get';

export function countriesFormatter(data) {
    return map(data, (c) => {
        return {
            code: get(c, 'recipient_country.code', ''),
            title: get(c, 'recipient_country.name', ''),
            budget: get(c, 'value', 0),
            region: get(c, 'recipient_country.region.name', ''),
            activity_count: get(c, 'activity_count', 0)
        };
    });
}