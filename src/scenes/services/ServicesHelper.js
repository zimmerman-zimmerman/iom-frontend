//THis combines the humanitarian and non-humanitarian data
//and forms it appropriately for the stacked bar chart.
//NOTE: the data array will contain properties 'value' and 'nonHumanValue'
export function combineData(human, nonHuman) {
    const data = [];

    if (human) {
      //We are using simple for loops here, cause the are
      //one of the loops from which we can break out
      //its not possible to do it with .map or .forEach
      //Cause #Javascript

      //So here we first map out the nonHuman values into the main data array
      //according to the length and values of the human array
      for (let i = 0; i < human.length; i++) {
        let humanItem = human[i];
        if (nonHuman && nonHuman.length > 0) {
          for (let j = 0; j < nonHuman.length; j++) {
            let nonHumanItem = nonHuman[j];
            if (humanItem.sector.code === nonHumanItem.sector.code) {
              let item = humanItem;
              item.name = item.sector.name;
              item.code = item.sector.code;
              item.totalActivityCount = humanItem.activity_count + nonHumanItem.activity_count;
              item.humanValue = item.value;
              item.nonHumanValue = nonHumanItem.value;
              data.push(item);
              //So if a human and nonhuman data association is found we give the nonHuman item
              //the foundHUman and set it to true.
              nonHuman[j].foundHuman = true;
              break;
            } else if (j === nonHuman.length-1) {
              //SO here, if a human and nonHUman association has not been found
              //  We just add the human item to an array, and set the nonHumanValue to zero
              let item = humanItem;
              item.name = item.sector.name;
              item.code = item.sector.code;
              item.totalActivityCount = item.activity_count;
              item.humanValue = item.value;
              item.nonHumanValue = 0;
              data.push(item);
            }
          }
        } else {
          let item = humanItem;
          item.name = item.sector.name;
          item.code = item.sector.code;
          item.totalActivityCount = item.activity_count;
          item.humanValue = item.value;
          item.nonHumanValue = 0;
          data.push(item);
        }
      }

      //Here we just add the human and nonHuman values to the variable 'totalValue'
      //Cause some places requires a combined number of these two
      data.forEach(item => {
        item.totalValue = item.nonHumanValue + item.value;
      });

      //And here we make a final addition to the array
      //THis does a final check to see if we have some nonHUman values that have NOT found a human association :D
      //and we put them as seperate items in the array and set their 'value' attribute to zero(cause this field is for the)
      //human budget!
      //and here we don't need a break, cause we need to check every item
      //and just add it to the main data array if it doesn't have a human :D
      //get it? :DD
      //HAHAHAHAHAHAHA
      //Im so funny
      nonHuman && nonHuman.forEach(nonHumanItem => {
        if(!nonHumanItem.foundHuman) {
          let item = nonHumanItem;
          item.name = item.sector.name;
          item.code = item.sector.code;
          item.humanValue = 0;
          item.nonHumanValue = nonHumanItem.value;
          item.totalValue = nonHumanItem.value;
          item.totalActivityCount = item.activity_count;
          data.push(item);
        }
      });
    }

    return data;
}

//These are the default values with which the labels look good
//thus all calculations are made according to these
const defServiceCount = 10;
const defFontSize = 1;
const defYAdjust = 16;
const defDivMargTop = 76;

//Cause again we using those svg elements, here's a function that will
//calculate the label fontsize for the bar charts
//it all depends on the amount of services
//and is scaled with the vw unit.
//for the calculation the default proportions are used: 1vw and 10services
//cause with that proprotion the labels looks good
//and it needs to be reverse proportional thus we divide one by the proportional result
export function calcBarChartFont(serviceAmount){
  let newFont = (1/(defFontSize*serviceAmount/defServiceCount));
  //we dont want the font size to be more than 1vw, cause then its too big
  if(newFont > 1)
  {
    newFont = 1;
  }
  return newFont;
}

//Because of the changing fontsizes we also need to make the y position adjustable to the fontsize
//this will be just proportional
export function calcBarChartYPos(serviceAmount){
    const fontSize = calcBarChartFont(serviceAmount);
    return (defYAdjust*fontSize/defFontSize);
}

//This calculates the margin top for the divider line underneath the bar chart, so that labels would be
//properly seen, and its done with the divider line, because applying this kind of calculation to the
//bar charts height doesn't work because its broken...
export function calcDividerMargTop(serviceAmount) {
    const fontSize = calcBarChartFont(serviceAmount);
    return (defDivMargTop*fontSize/defFontSize);
}