import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('project mapper specs', () => {
  it('should return empty object when it feeds undefined', () => {
    // Arrange
    const project: apiModel.Project = undefined;

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual<viewModel.Project>({
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    });
  });

  it('should return empty object when it feeds null', () => {
    // Arrange
    const project: apiModel.Project = null;

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual<viewModel.Project>({
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    });
  });

  it('should return expected result with viewModel interface', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '12345',
      name: 'App development',
      externalId: '12345JX',
      comments: 'lorem ipsum',
      isActive: true,
      employees: [{id: '38456', isAssigned: false, employeeName: 'Jane Doe'}],
    };

    const expectedResult: viewModel.Project = {
      id: '12345',
      name: 'App development',
      externalId: '12345JX',
      comments: 'lorem ipsum',
      isActive: true,
      employees: [{id: '38456', isAssigned: false, employeeName: 'Jane Doe'}],
    };

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should work when externalId is not included as a property', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '12345',
      name: 'App development',
      comments: 'lorem ipsum',
      isActive: true,
      employees: [{id: '38456', isAssigned: false, employeeName: 'Jane Doe'}],
    };

    const expectedResult: viewModel.Project = {
      id: '12345',
      name: 'App development',
      comments: 'lorem ipsum',
      isActive: true,
      employees: [{id: '38456', isAssigned: false, employeeName: 'Jane Doe'}],
    };

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should work when comments is not included as a property', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '12345',
      name: 'App development',
      externalId: '12345JX',
      isActive: true,
      employees: [{id: '38456', isAssigned: false, employeeName: 'Jane Doe'}],
    };

    const expectedResult: viewModel.Project = {
      id: '12345',
      name: 'App development',
      externalId: '12345JX',
      isActive: true,
      employees: [{id: '38456', isAssigned: false, employeeName: 'Jane Doe'}],
    };

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should work when comments & externalId are not included as properties', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '12345',
      name: 'App development',
      isActive: true,
      employees: [{id: '38456', isAssigned: false, employeeName: 'Jane Doe'}],
    };

    const expectedResult: viewModel.Project = {
      id: '12345',
      name: 'App development',
      isActive: true,
      employees: [{id: '38456', isAssigned: false, employeeName: 'Jane Doe'}],
    };

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should work when isAssigned is not included as a property on EmployeeSummary', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '12345',
      name: 'App development',
      externalId: '12345JX',
      comments: 'lorem ipsum',
      isActive: true,
      employees: [{id: '38456', employeeName: 'Jane Doe'}],
    };

    const expectedResult: viewModel.Project = {
      id: '12345',
      name: 'App development',
      externalId: '12345JX',
      comments: 'lorem ipsum',
      isActive: true,
      employees: [{id: '38456', employeeName: 'Jane Doe'}],
    };

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
