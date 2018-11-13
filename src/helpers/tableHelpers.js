import sortBy from 'lodash/sortBy';

//Frontend pagination helper function
export function paginate(page, pageSize, data) {
    return data ? data.slice((page-1)*pageSize, page*pageSize+1) : [];
}

//Sorting for the frontend
export function genericSort(data, order) {
    const orderBy = order.indexOf('-') !== -1 ? order.substring(1) : order;

    const sortedData = sortBy(data, [(item) => { return typeof item[orderBy] === 'string' ?
        item[orderBy].toLowerCase() : item[orderBy] }]);

    return order.indexOf('-') !== -1 ? sortedData.reverse() : sortedData;
}