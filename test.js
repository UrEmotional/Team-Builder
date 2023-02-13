const inquirer = require('inquirer');

jest.mock('inquirer');

describe('promptUser', () => {
  it('prompts the user for information about an employee', async () => {
    inquirer.prompt.mockImplementationOnce(() => {
      return Promise.resolve({
        name: 'John Doe',
        id: '123456',
        email: 'john.doe@example.com',
        github: 'johndoe',
        role: 'Employee'
      });
    });

    const answers = await promptUser();

    expect(answers).toEqual({
      name: 'John Doe',
      id: '123456',
      email: 'john.doe@example.com',
      github: 'johndoe',
      role: 'Employee'
    });
  });
});