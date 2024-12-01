describe('Test ticktack game', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Test game finished with the winner', () => {
    cy.get('[data-e2e="square-0"]').click(); // X
    cy.get('[data-e2e="square-1"]').click(); // O
    cy.get('[data-e2e="square-4"]').click(); // X
    cy.get('[data-e2e="square-2"]').click(); // O
    cy.get('[data-e2e="square-8"]').click(); // X

    cy.contains('Winner: X');
  });

  it('Test game finished with draw', () => {
    cy.get('[data-e2e="square-0"]').click(); // X
    cy.get('[data-e2e="square-1"]').click(); // O
    cy.get('[data-e2e="square-2"]').click(); // X
    cy.get('[data-e2e="square-4"]').click(); // O
    cy.get('[data-e2e="square-3"]').click(); // X
    cy.get('[data-e2e="square-5"]').click(); // O
    cy.get('[data-e2e="square-7"]').click(); // X
    cy.get('[data-e2e="square-6"]').click(); // O
    cy.get('[data-e2e="square-8"]').click(); // X

    cy.contains('Draw!');
  });
});
