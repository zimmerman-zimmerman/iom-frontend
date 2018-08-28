//NOTE: These default values strongly depend on the font weight, font strecth, spacing, lineheight, font family
//so if ever the words seem to not fit, just recheck and change these default values to work
//with your text properties
//default font size for labels
const defFontSize = 40;
//Default char width when fontsize is 40
const defCharWidth = 20;
//Default text height when fontsize is 40
const defTextHeight = 55;

//Calculates the font size for the percentage label
export function calcPercFontSize(text, width, height) {
    //default font size
    let fontSize = defFontSize;
    if(text)
    {
        const textWidth = text.length * defCharWidth;
        //We check if the fontsize is correct according to the width and adjust the fontsize accordingly
        if(textWidth >= width)
        {
            //Here we increse the text length by one
            //Just so it would definetely fit when we
            //calculate the fontsize
            const charWidth = width/(text.length+1);
            fontSize = fontSize*charWidth/defCharWidth;
        }

        //We check if the fontsize is correct according to the height and adjust the fontsize accordingly
        //We will go on the assumption that the height of this percentage text
        //cannot be higher than half of the rect height
        const textHeight = defTextHeight*fontSize/defFontSize;
        if(textHeight >= height/2){
            //we reduce the desired text height by 1 pixel
            //just for it to be prettier
            const desiredTextHeight = (height/2)-1;
            fontSize = fontSize*desiredTextHeight/textHeight;
        }
    }
    return fontSize;
}

//Calculates the X position ON THE RECT of the percentage label, according to the width and text width and fontSize
export function calcPercXPosition(text, width, fontSize){
    const charWidth = fontSize*defCharWidth/defFontSize;
    const textWidth = text.length * charWidth;
    return (width - textWidth)/2;
}

//Calculates the Y position ON THE RECT of the percentage label, according to the height of the rect
export function calcPercYPosition(height){
    //So we use these two as defaults for calculations
    //Because when the rect height is 360
    //It looks good with the adjustment of 16
    const defHeight = 360;
    const defAdjustment = 16;
    return height - height*defAdjustment/defHeight;
}

//THis function takes the initial text, breaks it apart and reduces the font size
//according to the rects height and width and ofcourse the default values
//which can be found at the top
//ALSO it returns an array of texts where each text has its own y position adjustment
export function calcLabelSizePosition(text, width, height) {

    const textSpaceHeight = height/2;
    let fontSize = defFontSize;
    let charWidth = defCharWidth;
    let textHeight = defTextHeight;
    let textArray = [];
    let finalTextArray = [];

    if(text && width !== 0)
    {
        let currentText = text.trim();
        let textWidth = charWidth*currentText.length;

        if(textWidth >= width){
            while(textWidth >= width){
                if(currentText.indexOf(' ') !== -1)
                {
                    // UK - Department for International Development (DFID)
                    const brokenWord = currentText.substring(currentText.lastIndexOf(' ')+1);
                    currentText = currentText.substring(0, currentText.lastIndexOf(' '));
                    charWidth = defCharWidth*fontSize/defFontSize;
                    textWidth = currentText.length*charWidth;
                    if(textArray[0])
                    {
                        const joinedWords = brokenWord.concat(' ').concat(textArray[0].text);
                        const joinedWidth = charWidth*joinedWords.length;
                        if(joinedWidth < width)
                        {
                            textArray[0].text = joinedWords;
                        }else
                        {
                            const brokenWordWidth = brokenWord.length*charWidth;

                            if(brokenWordWidth >= width)
                            {
                                const desiredCharWidth = width/(brokenWord.length+1);
                                fontSize = defFontSize*desiredCharWidth/defCharWidth;

                                charWidth = defCharWidth*fontSize/defFontSize;
                                textWidth = currentText.length*charWidth;
                                textHeight = fontSize*defTextHeight/defFontSize;
                            }

                            textArray.unshift({
                                text: brokenWord,
                                yAdjust: textHeight,
                            })
                        }
                    }else {
                        const brokenWordWidth = charWidth*brokenWord.length;
                        if(brokenWordWidth >= width)
                        {
                            const desiredCharWidth = width/(brokenWord.length+1);
                            fontSize = defFontSize*desiredCharWidth/defCharWidth;
                            charWidth = defCharWidth*fontSize/defFontSize;
                            textWidth = currentText.length*charWidth;
                            textHeight = fontSize*defTextHeight/defFontSize;
                        }

                        textArray.push({
                            text: brokenWord,
                            yAdjust: textHeight,
                        });
                    }
                }else
                {
                    //Here we increse the text length by one
                    //Just so it would definetely fit when we
                    //calculate the fontsize
                    charWidth = width/(currentText.length+1);
                    fontSize = fontSize*charWidth/defCharWidth;
                    textWidth = charWidth*currentText.length;
                    textHeight = fontSize*defTextHeight/defFontSize;
                    textArray.unshift({
                        text: currentText,
                        yAdjust: textHeight,
                    });
                    currentText = '';
                }

                //We need to add the one here, because the currentText might
                //also be added to the text array
                let joinedTextHeight = (textArray.length+1)*textHeight;
                if(textSpaceHeight <= joinedTextHeight)
                {
                    const desiredTextHeight = (textSpaceHeight-1)/(textArray.length+1);
                    fontSize = defFontSize*desiredTextHeight/defTextHeight;

                    charWidth = fontSize*defCharWidth/defFontSize;
                    textWidth = charWidth*currentText.length;
                    textHeight = fontSize*defTextHeight/defFontSize;
                }
            }

            if(currentText.length > 0)
            {
                textArray.unshift({
                    text: currentText,
                    yAdjust: textHeight,
                })
            }

        }else
        {
            if(textHeight >= textSpaceHeight)
            {
                //we reduce the desired text height by 1 pixel
                //just for it to be prettier
                const desiredTextHeight = textSpaceHeight-1;
                fontSize = fontSize*desiredTextHeight/textHeight;
                textHeight = fontSize*defTextHeight/defFontSize;
            }

            textArray.push(
                {
                    yAdjust: textHeight,
                    text: currentText,
                }
            )
        }

        textArray.map((item, index) => {
            item.yAdjust = textHeight*(index+1);
        });
    }

    return {
        fontSize,
        textArray,
    }
}