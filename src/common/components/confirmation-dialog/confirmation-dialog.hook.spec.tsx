import React from "react";
import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup } from "common/models";

describe('Confirmation dialog hook specs', () => {
  it('isOpen should be false by default', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toEqual(false);
  });

  it('itemToDelete should be an empty object with Lookup interface by default', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.itemToDelete).toEqual<Lookup>({
      id: '',
      name: '',
    });
  });

  it('onAccept, onClose & onOpenDialog should be functions', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should update itemToDelete with the passed item & change isOpen to true when calling openDialog with an item', () => {
    // Arrange
    const newItem: Lookup = {
      id: 'updated id',
      name: 'updated name',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(newItem);
    })

    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(newItem);
  });

  it('should return an empty Lookup item when calling onAccept', () => {
    // Arrange
    const newItem: Lookup = {
      id: '3',
      name: 'Test Name',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(newItem);
    })

    expect(result.current.itemToDelete).toEqual(newItem);

    act(() => {
      result.current.onAccept();
    })

    // Assert
    expect(result.current.itemToDelete).toEqual<Lookup>({
      id: '',
      name: '',
    });
  });

  it('should change isOpen to false when calling onClose', () => {
    // Arrange
    const newItem: Lookup = {
      id: '3',
      name: 'Test Name',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(newItem);
    })

    expect(result.current.isOpen).toEqual(true);

    act(() => {
      result.current.onClose();
    })

    // Assert
    expect(result.current.isOpen).toEqual(false);
  });
});
