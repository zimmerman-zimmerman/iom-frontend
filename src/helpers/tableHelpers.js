import sortBy from 'lodash/sortBy';
import find from 'lodash/find';

//Frontend pagination helper function
export function paginate(page, pageSize, data) {
    return data ? data.slice((page-1)*pageSize, page*pageSize) : [];
}

//Sorting for the frontend
export function genericSort(data, order) {
    const orderBy = order.indexOf('-') !== -1 ? order.substring(1) : order;

    const sortedData = sortBy(data, [(item) => { return typeof item[orderBy] === 'string' ?
        item[orderBy].toLowerCase() : item[orderBy] }]);

    return order.indexOf('-') !== -1 ? sortedData.reverse() : sortedData;
}

//Gets the the planned end date or planned start date from activity dates array
export function getDate(dateArray, dateType) {
    return find(dateArray, (date) => {
       if(dateType === 'start')
       {
           return date.type.name.toLowerCase() === 'planned start';
       }else
       {
           return date.type.name.toLowerCase() === 'planned end';
       }
    }).iso_date;
}