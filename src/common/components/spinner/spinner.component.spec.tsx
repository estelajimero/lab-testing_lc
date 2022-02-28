import React from "react";
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from "./spinner.component";
import * as promiseTracker from 'react-promise-tracker/lib/trackerHook';

describe('Spinner component specs', () => {
  it('should be displayed when promiseInProgress is true', () => {
    // Arrange
    const stub = jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockImplementation(() => ({ promiseInProgress: true }));

    // Act
    render(<SpinnerComponent />);
    const spinner = screen.getByRole('presentation');

    // Assert
    expect(spinner).toBeInTheDocument();
  });

  it('should not be displayed by default', () => {
    // Arrange

    // Act
    render(<SpinnerComponent />);
    const spinner = screen.queryByRole('presentation');

    // Assert
    expect(spinner).toEqual(null);
  });
});
