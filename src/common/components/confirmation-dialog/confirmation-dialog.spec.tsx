import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('Confirmation dialog component specs', () => {
  it('should open dialog when isOpen property is set to true', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: { closeButton: 'test close', acceptButton: 'test accept' },
    };

    // Act
    render(
      <ConfirmationDialogComponent {...props}>
        <div>testing children</div>
      </ConfirmationDialogComponent>
    );

    const confirmationDialogElement = screen.getByRole('dialog');
    const confirmationDialogTitle = screen.getByText(props.title);
    const confirmationDialogContent = screen.getByText('testing children');
    const confirmationDialogCloseBtn = screen.getByRole('button', {
      name: props.labels.closeButton,
    });
    const confirmationDialogAcceptBtn = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });

    // Assert
    expect(confirmationDialogElement).toBeInTheDocument();
    expect(confirmationDialogTitle).toBeInTheDocument();
    expect(confirmationDialogContent).toBeInTheDocument();
    expect(confirmationDialogCloseBtn).toBeInTheDocument();
    expect(confirmationDialogAcceptBtn).toBeInTheDocument();
  });

  it('should not open dialog when isOpen property is set to false', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: { closeButton: 'test close', acceptButton: 'test accept' },
    };

    // Act
    render(
      <ConfirmationDialogComponent {...props}>
        <div>testing children</div>
      </ConfirmationDialogComponent>
    );

    const confirmationDialogElement = screen.queryByRole('dialog');
    const confirmationDialogTitle = screen.queryByRole(props.title);
    const confirmationDialogContent = screen.queryByRole('testing children');
    const confirmationDialogCloseBtn = screen.queryByRole('button', {
      name: props.labels.closeButton,
    });
    const confirmationDialogAcceptBtn = screen.queryByRole('button', {
      name: props.labels.acceptButton,
    });

    // Assert
    expect(confirmationDialogElement).toEqual(null);
    expect(confirmationDialogTitle).toEqual(null);
    expect(confirmationDialogContent).toEqual(null);
    expect(confirmationDialogCloseBtn).toEqual(null);
    expect(confirmationDialogAcceptBtn).toEqual(null);
  });

  it('should call onClose when closeButton is clicked', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: { closeButton: 'test close', acceptButton: 'test accept' },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const confirmationDialogCloseBtn = screen.getByRole('button', {
      name: props.labels.closeButton,
    });

    userEvent.click(confirmationDialogCloseBtn);

    // Assert
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should call onAccept when closeButton is clicked', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: { closeButton: 'test close', acceptButton: 'test accept' },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const confirmationDialogAcceptBtn = screen.queryByRole('button', {
      name: props.labels.acceptButton,
    });

    userEvent.click(confirmationDialogAcceptBtn);

    // Assert
    expect(props.onAccept).toHaveBeenCalled();
  });
});
