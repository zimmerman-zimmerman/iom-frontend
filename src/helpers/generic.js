
//so this helper function will reformat any number to be properly seperated by ,
// It also rounds up the number before doing the reformating
export function formatNumberComma(numb) {
    let number = Math.ceil(numb);
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

//Formats the data to be acceptable by the GeoMap
//And returns an array of one cause thats what we want, for the project detail
//Only one country
export function formatMapData(data, activityCount, budgetValue) {
    return data ? [{
        key: data.code,
        activity_count: activityCount,
        recipient_country:{
            code: data.code,
            location: data.location,
            name: data.name,
        },
        value: budgetValue,
    },] : null;
}

//Adds values from the oldFIlters to the new ones
//Used for donor-group/donor detail pages
//Cause it was requested for filters from the donors page to be applied to those ^ pages as well
export function addFilterValues(oldFilters, filterValuez) {
    const filterValues = filterValuez;
    for (let key in oldFilters){
        if (oldFilters.hasOwnProperty(key)) {
            //These filter values from the donors page, need to NOT be applied
            //As it might break the donor groups/donor page.
            //Everything else should be fine
            if(key !== 'order_by' && key !== 'page' && key !== 'page_size')
            {
                //NOTE! this actually changes the states variable WITHOUT calling this.setState()
                //Because of the reference to the state above ^
                //Wth javascript/React xDD
                filterValues[key] = oldFilters[key];
            }
        }
    }
    return filterValues;
}