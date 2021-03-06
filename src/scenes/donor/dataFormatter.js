import map from 'lodash/map';
import get  from 'lodash/get';
import find  from 'lodash/find';
import { format as dateFormat } from 'date-fns';
import {getProjectTitle} from "../../helpers/tableHelpers";

export function donorProjectsFormatter(data) {
    return map(data, (d) => {
        const rawStartDate = get(find(d.activity_dates, (ad) => {
            return ad.type.code === "1"; // Planned start date => code = 1
          }), 'iso_date');

        const rawEndDate = get(find(d.activity_dates, (ad) => {
            return ad.type.code === "3"; // Planned start date => code = 1
          }), 'iso_date');
        return {
            id: d.id,
            title: getProjectTitle(get(d.title, 'narratives', [])),
            rawStartDate: rawStartDate ? rawStartDate : '-',
            startDate: rawStartDate ? dateFormat(rawStartDate, 'DD-MM-YYYY') : '-',
            rawEndDate: rawEndDate ? rawEndDate : '-',
            endDate: rawEndDate ? dateFormat(rawEndDate, 'DD-MM-YYYY'): '-',
            budget: get(d.aggregations, 'activity.budget_value', 0),
            status: get(d.activity_status, 'name', ''),
            sector: get(find(d.sectors, (s) => {
                return get(s, 'vocabulary.code') === '99'; // Project type => code = 99
            }), 'sector.name', ''),
            sectorID: get(find(d.sectors, (s) => {
                return get(s, 'vocabulary.code') === '99'; // Project type => code = 99
            }), 'sector.code', ''),
        };
    });
}