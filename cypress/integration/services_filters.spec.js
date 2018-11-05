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
        // Will check if the projects project location of one of the services
        // is of the specified geolocation
        goToServicesDetail();
        goToProjectDetail();
        //Check if project location is correct
        cy.get('.country-name').should('contain', itemValue);
    });
    it('Apply Sector filter', () => {
        applyFilter('Sector');
    });
    it('Check if sector chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Check if sector filter applied correctly', () => {
        //Check the table that it would contain the selected Sector/service area
        cy.get('.ant-table-tbody').should('contain', itemValue);
    });
    it('Apply Project status filter', () => {
        applyFilter('Project status');
    });
    it('Check if Project status chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Check if Project status filter applied correctly', () => {
        //Will check if the related projects list contains only the projects of the specified project status
        goToServicesDetail();
        goToProjectDetail();
        cy.contains(itemValue);
    });
    it('Apply Donors filter', () => {
        applyFilter('.ant-collapse-item:nth-of-type(5)', true);
    });
    it('Check if Donors chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Check if Donors filter applied correctly', () => {
        //Goes into the service detail
        //And checks if the selected donor exists there
        goToServicesDetail();
        //Check if Donors is listed in service detail
        cy.contains(itemValue);
    });
    //This function needs to be here, because we want to save the applied filters value here
    //Basically goes to the donors page and applies the specified filters first selection
    //element is used if there might be texts with the same name, so we pass in the filter element we want
    //to click on
    function applyFilter(filterText, element=false){
        cy.visit(Cypress.env('targetUrl').concat('/services'));
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
    function goToServicesDetail() {
        cy.get('td > a').first().click();
        cy.wait(1000);
    }
    function goToProjectDetail() {
        cy.get('tbody').each(($el, index) => {
            //Because we want this to work for the second tables
            //children only. We do this in an each, cause next doesn't work
            if(index === 1)
            {
                cy.wrap($el).children('.ant-table-row').children('td').children('a').first().click();
            }
        });
        cy.wait(1000);
    }
});