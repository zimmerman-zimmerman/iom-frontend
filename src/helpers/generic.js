
//so this helper function will reformat any number to be properly seperated by ,
// It also rounds up the number before doing the reformating
export function formatNumberComma(numb) {
    let number = Math.ceil(numb);
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}