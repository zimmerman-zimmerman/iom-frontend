import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import get from 'lodash/get';

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
    const date = find(dateArray, (date) => {
        if(dateType === 'start')
        {
            return date.type.name.toLowerCase() === 'planned start';
        }else
        {
            return date.type.name.toLowerCase() === 'planned end';
        }
    });
    return get(date, 'iso_date', '-');
}

// so sometimes the project titles are empty, so we skip those to find the actual
// project titles that have something in them
export function getProjectTitle(titleArray) {
    let title = '-';
    // so we use a simple for loop cause we wanna break out of this
    // when a title is found
    for(let i = 0; i < titleArray.length; i++)
    {
        if(titleArray[i].text.replace(/\s/g, '').length > 0)
        {
            title = titleArray[i].text;
            break;
        }

    }

    return title;
}