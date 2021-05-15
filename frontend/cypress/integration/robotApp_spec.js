const API = 'http://localhost:4000';
const CLIENT = 'http://localhost:3000'
describe('Robot App', () => {
    beforeEach(() => {
        cy.visit(CLIENT);
        cy.request('POST', `${API}/api/test/reset`);
        const user = {
            username: "admin",
            email: "admin@admin.com",
            password: "admin",
            roles: ['admin', 'moderator', 'user']
        }
        cy.request('POST', `${API}/api/auth/signup`, user);
    });

    it('user can log in', () => {
        cy.contains('Welcome!');
        cy.contains('Sign Up');
        cy.contains('Log In').click();
        cy.get('[type="email"]').type('admin@admin.com');
        cy.get('[type="password"]').type('admin');
        cy.contains('Submit').click();
        cy.get('.Toastify__toast-body')
            .should('contain', 'Logged In Successfully!')
        cy.contains('Log Out');
    });

    it('user cannot log in with wrong credentials', () => {
        cy.contains('Welcome!');
        cy.contains('Sign Up');
        cy.contains('Log In').click();
        cy.get('[type="email"]').type('admin@admin.com');
        cy.get('[type="password"]').type('admin123');
        cy.contains('Submit').click();
        cy.get('.Toastify__toast-body')
            .should('contain', 'Email and Password do not match, please try again.');
    });
})

describe('when logged in (as admin)', () => {
    beforeEach(() => {
        cy.login({ email: 'admin@admin.com', password: 'admin' });
        cy.createNewRobot({ name: 'Test Robot 1', description: 'Test description 1', url: 'https://www.youtube.com/watch?v=zPyg4N7bcHM' });
        cy.createNewRobot({ name: 'Test Robot 2', description: 'Test description 2', url: 'https://www.youtube.com/watch?v=zPyg4N7bcHM' });
        cy.createNewRobot({ name: 'Wow!', description: 'Nice!', url: 'https://www.youtube.com/watch?v=zPyg4N7bcHM' });
    });

    it('user sees three robots on home page', () => {
        cy.contains('Test Robot 1');
        cy.contains('Test Robot 2');
        cy.contains('Wow!');
        cy.contains('Nice!');
    })

    it('user can go to favorite robots when having none', () => {
        cy.contains('My Favorites');
        cy.get('[data-test-id="favoriteRobotsUser"]').click();
        cy.contains('No favorites Robots found, try adding one!');
    });

    it('user can create a new Robot correctly', () => {
        cy.contains('Add a robot!').click();
        cy.get('input').first().type('Hello');
        cy.get('textarea').type('This is a test from cypress :)');
        cy.get('input[name="url"]').type('https://www.youtube.com/watch?v=LXb3EKWsInQ');
        cy.get('input[type=file]').attachFile('images/test.jpg');
        cy.contains('Submit').click();
        cy.wait(1000);
        cy.get('.Toastify__toast-body')
            .should('contain', 'Robot created successfully!');
        cy.contains('Hello');
        cy.contains('This is a test from cypress :)');
    });

    it('user add robot to favorite and checks if is it faved', () => {
        cy.contains('More Info').click();
        cy.contains('Hello');
        cy.contains('This is a test from cypress :)');
        cy.contains('EDIT');
        cy.contains('DELETE');
        cy.contains('Add to favorite!').click();
        cy.contains('Favorite');
        cy.get('[data-test-id="favoriteRobotsUser"]').click();
        cy.contains('Hello');
        cy.contains('This is a test from cypress :)');
        cy.contains('DELETE');
    });
});