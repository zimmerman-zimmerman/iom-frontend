// const targetURL = 'https://iom-dev.zz-demos.net';

let itemValue = '';

context('Test donor filter functionality', () => {

    it('Apply Geo-location filter', () => {
        applyFilter('Geo-location');
    });
    it('Check if geo location chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Check if geo location filter applied correctly', () => {
        //Basically will go into the project of one of the donors
        //and will check if the project location is the same as the applied filter
        goToProjectDetail();
        //Check if project location is correct
        cy.get('.country-name').should('contain', itemValue);
    });
    it('Apply Sector filter', () => {
        cy.visit(Cypress.env('targetUrl').concat('/donors'));
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
        //Basically will go into the project of one of the donors
        //and will check if the service area is listed in the project detail
        goToProjectDetail();
        //Check if sector is listed in project detail
        cy.contains(itemValue);
    });
    it('Apply Project status filter', () => {
        applyFilter('Project status');
    });
    it('Check if Project status chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Check if Project status filter applied correctly', () => {
        //Basically will go into the donor detail and check if all the projects in the first page at least
        // contain only the selected project status
        //Go to the donorgroup page
        cy.get('td > a').first().click();
        cy.wait(1000);
        //Go to the donor detail page
        cy.get('td > a').first().click();
        cy.wait(1000);
        //And here we check if the projects do contain the selected status
        cy.get('.Status').each(($el, index) => {
            // Because we need to skip the first element with classname 'Status'
            //For it is the column header and it is named 'Project Status'
            if(index !== 0)
            {
                cy.wrap($el).should('contain', itemValue);
            }
        })
    });

    it('Check Start - End filter', () => {
        cy.visit(Cypress.env('targetUrl').concat('/donors'));
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
        //Go to the donorgroup page
        cy.get('td > a').first().click({ force: true });
        cy.wait(1000);
        //Go to the donor detail page
        cy.get('td > a').first().click({ force: true });
        cy.wait(1000);

        //So this for each goes through each child of the table === 'tbody'
        //which are rows
        cy.get('tbody').children().each(($row, index) => {

            //And this for each goes through each cell of the row
            cy.wrap($row).children().each(($cell, ind) => {
                //And here the 1st cell of a row contains the startDate
                if(ind === 1)
                {
                    const ISODate = convertDutchtoISO($cell.text());
                    expect(ISODate >= startDate).to.be.true;
                }

                //And here the 2nd cell of a row contains the endDate
                if (ind === 2)
                {
                    const ISODate = convertDutchtoISO($cell.text());
                    expect(ISODate <= endDate).to.be.true;
                }
            });

        });

    });

    it('Apply Donors filter', () => {
        applyFilter('.ant-collapse-item:nth-of-type(5)', true);
    });
    it('Check if Donors chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Check if Donors filter applied correctly', () => {
        //Basically will go into the project of one of the donors
        //and will check if the funding type for that project is the one we filtered with
        goToProjectDetail();
        //Check if Donors is listed in project detail
        cy.contains(itemValue);
    });

    it('Apply funding amount filter', () => {
        cy.visit(Cypress.env('targetUrl').concat('/donors'));
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

        //This is the budget cell array of the donor list
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
        cy.visit(Cypress.env('targetUrl').concat('/donors'));
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
    //This function needs to be here, because we want to save the applied filters value here
    function goToProjectDetail(){
        //Go to the donorgroup page
        cy.get('td > a').first().click({ force: true });
        cy.wait(1000);
        //Go to the donor detail page
        cy.get('td > a').first().click({ force: true });
        cy.wait(1000);
        //Go to the project detail page
        cy.get('td > a').first().click({ force: true });
        cy.wait(1000);
    }
    //Converts dutch date string to ISO date string
    function convertDutchtoISO(dutchDate) {
        const firstPart = dutchDate.substring(0, dutchDate.indexOf('-'));
        const secondPart = dutchDate.substring(dutchDate.indexOf('-'), dutchDate.indexOf('-', dutchDate.indexOf('-')+1)+1);
        const lastPart = dutchDate.substring(dutchDate.lastIndexOf('-') + 1);
        return lastPart.concat(secondPart).concat(firstPart);
    }
});