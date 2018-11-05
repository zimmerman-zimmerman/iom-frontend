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
        applyFilter('Sector');
    });
    it('Check if sector chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Check if sector filter applied correctly', () => {
        //Will check if the country detail contains the specified sector
        //Goes to country detail
        goToCountryDetail();
        //Check if sector is listed in country detail
        cy.contains(itemValue);
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