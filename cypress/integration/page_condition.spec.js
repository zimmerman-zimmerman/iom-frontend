// const targetURL = 'http://localhost:8080/';
// const targetURL = 'http://localhost:5000/';
// const targetURL = 'https://iom-staging.zz-demos.net';
const targetURL = Cypress.env('targetUrl');
const targets = [
    targetURL + '/',
    targetURL + '/donors',
    targetURL + '/donors/us',
    targetURL + '/donors/us/US-GOV-1',
    targetURL + '/countries',
    targetURL + '/countries/ss',
    targetURL + '/countries/pk',
    targetURL + '/countries/pk',
    targetURL + '/countries/co',
    targetURL + '/countries/ye',
    targetURL + '/countries/ng',
    targetURL + '/services',
    targetURL + '/services/1',
    targetURL + '/services/2',
    targetURL + '/services/3',
    targetURL + '/services/4',
    targetURL + '/services/5',
    targetURL + '/services/6',
    targetURL + '/services/7',
    targetURL + '/projects',
    targetURL + '/projects/1',
    targetURL + '/projects/2',
    targetURL + '/projects/3',
    targetURL + '/projects/4',
    targetURL + '/projects/5',
    targetURL + '/projects/6',
    targetURL + '/projects/7',
    targetURL + '/about'
];

context('Check page condition', () => {

    it('Go to page and check protocol', () => {
        targets.forEach(function (url) {
            cy.visit(url);
            cy.wait(1000);
        });
    });

    it('Check port and protocol', () => {
        targets.forEach(function (url) {
            cy.visit(url);
            cy.location().should((location) => {
                expect(location.port).to.eq('3000');
                expect(location.protocol).to.eq('http:');
            })
        });
    });
});
