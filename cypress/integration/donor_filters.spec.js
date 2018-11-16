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
        applyFilter('Sector');
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
});