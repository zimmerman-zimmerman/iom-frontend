
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