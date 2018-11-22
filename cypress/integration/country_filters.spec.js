// const targetURL = 'https://iom-dev.zz-demos.net';

let itemValue = '';

context('Test country filter functionality', () => {
    it('Apply Geo-location filter', () => {
        applyFilter('Geo-location');
    });
    it('Check if geo location chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Check if geo location filter applied correctly', () => {
        //will check if the table contains the selected geolocation
        cy.get('.ant-table-tbody').should('contain', itemValue);
    });
    it('Apply Sector filter', () => {
        cy.visit(Cypress.env('targetUrl').concat('/countries'));
        cy.contains('Sector').click({ force: true });
        cy.get('.ant-select-selection').click({ force: true });
        cy.get('.ant-select-tree-switcher').first().click({ force: true });
        cy.get('.ant-select-tree-node-content-wrapper-normal').first().should(($li) => {
            itemValue = $li.text();
        });
        cy.get('.ant-select-tree-node-content-wrapper-normal').first().click({ force: true });
    });
    it('Check if sector chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Check if sector filter applied correctly', () => {
        //Will check if the country detail contains the specified sector
        //Goes to country detail
        goToCountryDetail();
        //Check if sector is listed in country detail
        //So we need to check if each word of the applied sector can be found on the detail page
        //Cause most likely the whole sector name(which is made up of several words)
        //will be shown in the treemap component and in that component
        //its very usual that long names/sentences are split up in seperate parts
        //thus looking for the string as a whole will not work.
        const wordArray = itemValue.split(' ');
        wordArray.forEach(word => {
            cy.contains(word);
        });
    });
    it('Apply Project status filter', () => {
        applyFilter('Project status');
    });
    it('Check if Project status chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Check if Project status filter applied correctly', () => {
        //Will check if the related projects list contains only the projects of the specified project status
        goToCountryDetail();
        cy.get('tbody').each(($el, index) => {
            //Because we want this to work for the second tables
            //children only. We do this in an each, cause next doesn't work
            if(index === 1)
            {
                cy.wrap($el).children().each(($el) => {
                    //And here we check that each item of the list would have the specified project status
                    cy.wrap($el).should('contain', itemValue);
                });
            }
        });
    });
    it('Check Start - End filter', () => {
        cy.visit(Cypress.env('targetUrl').concat('/countries'));
        const startDate = '2008-01-01';
        const endDate = '2018-09-30';
        //Apply filter
        cy.contains('Start - end data').click();
        cy.get('.ant-calendar-picker-input.ant-input').click({ force: true });
        cy.get('.ant-calendar-range-left > div > div > input').type(startDate);
        cy.get('.ant-calendar-range-right > div > div > input').type(endDate);
        //Check if chip exists
        cy.get('.chip-label').should('contain', startDate);
        cy.get('.chip-label').should('contain', endDate);
        //Check if filter applied correctly
        goToCountryDetail();

        cy.get('tbody').each(($relatedTable, index) => {
            //Because we want this to work for the second tables
            //children only. We do this in an each, cause next doesn't work
            if(index === 1)
            {
                //So this for each goes through each child of the table === 'tbody'
                //which are rows
                cy.wrap($relatedTable).children().each(($row) => {

                    //And this for each goes through each cell of the row
                    cy.wrap($row).children().each(($cell, ind) => {
                        //And here the 5th cell of a row contains the startDate
                        if(ind === 5)
                        {
                            expect($cell.text() >= startDate).to.be.true;
                        }

                        //And here the 6th cell of a row contains the endDate
                        if (ind === 6)
                        {
                            expect($cell.text() <= endDate).to.be.true;
                        }

                    });

                });
            }
        });

    });
    it('Apply Donors filter', () => {
        applyFilter('.ant-collapse-item:nth-of-type(5)', true);
    });
    it('Check if Donors chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Check if Donors filter applied correctly', () => {
        //Goes into the country detail
        //And checks if the selected donor exists there
        goToCountryDetail();
        //Check if Donors is listed in country detail
        cy.contains(itemValue);
    });

    it('Apply funding amount filter', () => {
        cy.visit(Cypress.env('targetUrl').concat('/countries'));
        cy.contains('Funding amount').click();
        cy.get('.rc-slider').click('left');
    });
    it('Check if funding chip exists and save values', () => {
        cy.get('.chip-label').should('contain', 'US$');
        cy.get('.chip-label').should(($el) => {
            itemValue = $el.text();
        });
    });
    it('Check if funding filter applied correctly', () => {
        let startInd = itemValue.indexOf('US$') + 5;
        let endInd = itemValue.indexOf(' to', startInd);
        const moneyFrom = Number(itemValue.substring(startInd, endInd).replace(/,/g, ''));
        startInd = itemValue.lastIndexOf('US$') + 5;
        const moneyTo = Number(itemValue.substring(startInd).trim().replace(/,/g, ''));



        //This is the budget cell array of the country list
        cy.get('.ant-table-row > td:nth-child(2) > span').each(($cell) => {
            const cellText = $cell.text().substring($cell.text().indexOf(' ') + 1);
            const cellNumber = Number(cellText.replace(/,/g, ''));
            expect(cellNumber >= moneyFrom).to.be.true;
            expect(cellNumber <= moneyTo).to.be.true;
        });
    });

    //This function needs to be here, because we want to save the applied filters value here
    //Basically goes to the donors page and applies the specified filters first selection
    //element is used if there might be texts with the same name, so we pass in the filter element we want
    //to click on
    function applyFilter(filterText, element=false){
        cy.visit(Cypress.env('targetUrl').concat('/countries'));
        if(element)
        {
            cy.get(filterText).click();
        }else
        {
            cy.contains(filterText).click();
        }
        cy.get('.ant-select-selection').click();
        cy.get('.ant-select-dropdown-menu-item').first().should(($li) => {
            itemValue = $li.text();
        });
        cy.get('.ant-select-dropdown-menu-item').first().click({ force: true });
    }
    function goToCountryDetail() {
        cy.get('td > a').first().click();
        cy.wait(1000);
    }
});