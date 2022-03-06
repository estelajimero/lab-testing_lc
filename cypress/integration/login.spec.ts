describe('Login specs', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });

  it('name input should have the focus when clicking on it', () => {
    // Arrange

    // Act
    cy.visit('/');
    cy.get('input[name="user"]').click();

    // Assert
    cy.get('input[name="user"]').should('have.focus');
  });

  it('should show an alert with a message when typing invalid credentials', () => {
    // Arrange
    const user = 'test';
    const password = '1234'

    // Act
    cy.visit('/');

    cy.get('input[name="user"]').as('userInput');
    cy.get('input[name="password"]').as('passwordInput');
    cy.findByRole('button', { name: 'Login' }).as('loginButton');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.get('@loginButton').click();
    cy.findByText('Usuario y/o password no válidos');
  });

  it('should go to submodule-list when credentials are valid', () => {
    // Arrange
    const user = 'admin';
    const password = 'test'

    // Act
    cy.visit('/');

    cy.get('input[name="user"]').as('userInput');
    cy.get('input[name="password"]').as('passwordInput');
    cy.findByRole('button', { name: 'Login' }).as('loginButton').click();

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.get('@loginButton').click();
    cy.url().should('equal', 'http://localhost:8080/#/submodule-list');
  });
});
