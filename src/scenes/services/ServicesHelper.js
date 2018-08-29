//THis combines the humanitarian and non-humanitarian data
//and forms it appropriately for the stacked bar chart.
//NOTE: the data array will contain properties 'value' and 'nonHumanValue'
export function combineData(human, nonHuman) {
    const data = [];

    if(human)
    {
      //We are using simple for loops here, cause the are
      //one of the loops from which we can break out
      //its not possible to do it with .map or .forEach
      //Cause #Javascript

      //So here we first map out the nonHuman values into the main data array
      //according to the length and values of the human array
      for(let i = 0; i < human.length; i++){
        let humanItem = human[i];
        if(nonHuman)
        {
          for(let j = 0; j < nonHuman.length; j++){
            let nonHumanItem = nonHuman[j];
            if(humanItem.sector.code === nonHumanItem.sector.code){
              let item = humanItem;
              item.nonHumanValue = nonHumanItem.value;
              data.push(item);
              //So if a human and nonhuman data association is found we give the nonHuman item
              //the foundHUman and set it to true.
              nonHuman[j].foundHuman = true;
              break;
            }else if(j === nonHuman.length-1)
            {//SO here, if a human and nonHUman association has not been found
              //  We just add the human item to an array, and set the nonHumanValue to zero
              let item = humanItem;
              item.nonHumanValue = 0;
              data.push(item);
            }
          }
        }else
        {
          let item = humanItem;
          item.nonHumanValue = 0;
          data.push(item);
        }
      }

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
        if(!nonHumanItem.foundHuman){
          let item = nonHumanItem;
          item.nonHumanValue = nonHumanItem.value;
          item.value = 0;
          data.push(item);
        }
      });
    }

    //Here we just add the human and nonHuman values to the variable 'totalValue'
    //Cause some places requires a combined number of these two
    data.forEach(item => {
        item.totalValue = item.nonHumanValue + item.value;
    });

    return data;
}