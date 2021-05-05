import 'cypress-file-upload';

Cypress.Commands.add('login', ({ email, password }) => {
    const user = {
        email,
        password
    }
    cy.request('POST', 'http://localhost:4000/api/auth/signin', user)
        .then(res => { localStorage.setItem('user', JSON.stringify(res.body)) });

    cy.visit('http://localhost:3000/home');
});