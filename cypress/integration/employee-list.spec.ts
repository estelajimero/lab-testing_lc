describe('Employee list specs', () => {
  it('should fetch employee list and show it when visiting /employees url', () => {
    // Arrange
    // Act
    cy.visit('/employees');

    // Assert
    cy.findAllByRole('row').should('have.length', 6);
  });

  it('should fetch employee list greater than 0 when visiting /employees url', () => {
    // Arrange
    // Act
    cy.visit('/employees');

    // Assert
    cy.findAllByRole('row').should('have.length.greaterThan', 0);
  });

  it('search input should have the focus when clicking on it', () => {
    // Arrange
    // Act
    cy.visit('/employees');
    cy.findByRole('textbox').as('searchInput');

    // Assert
    cy.get('@searchInput').click();
    cy.get('@searchInput').should('have.focus');
  });

  it('should search the employee by the search text', () => {
    // Arrange
    const employeeName = 'Daniel';

    // Act
    cy.visit('/employees');
    cy.findByPlaceholderText('Buscar empleado').as('searchInput');
    cy.get('@searchInput').type(employeeName);
    cy.get('tbody>tr').as('employeeItems');

    // Assert
    cy.get('@employeeItems').should('have.length', 1);
    cy.get('@employeeItems').filter(`:contains("${employeeName}")`).should('have.length', 1)
  });

  it('should go to new employee when clicking on nuevo empleado', () => {
    // Arrange
    // Act
    cy.visit('/employees');
    cy.findByRole('button', { name: 'Nuevo empleado' }).as('newEmployee');


    // Assert
    cy.get('@newEmployee').click();
    cy.url().should('equal', 'http://localhost:8080/#/employees/0');
  });
});
