// const targetURL = 'https://iom-dev.zz-demos.net';

let itemValue = '';

context('Test country filter functionality', () => {
    it('Apply Geo-location filter', () => {
        applyFilter('Geo-location');
    });
    it('Check if geo location chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
    });
    it('Apply Sector filter', () => {
        cy.visit(Cypress.env('targetUrl').concat('/services'));
        cy.get('.ant-collapse > div:nth-child(2)').click();
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
        //Check the table that it would contain the selected Sector/service area
        cy.get('.ant-table-tbody').should('contain', itemValue);
    });
    it('Apply Project status filter', () => {
        applyFilter('Project status');
    });
    it('Check if Project status chip exists', () => {
        cy.get('.chip-label').should('contain', itemValue);
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
});