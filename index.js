const inquirer = require('inquirer');
const fs = require('fs');

const template = `
<!DOCTYPE html>
<html>
  <head>
    <title>Team Profile</title>
  </head>
  <body>
    <header>
      <h1>{{ teamName }}</h1>
    </header>
    <main>
      {{#employees}}
        <div>
          <h2>{{ name }}</h2>
          <p>ID: {{ id }}</p>
          <p>Email: {{ email }}</p>
          <p>GitHub: {{ github }}</p>
          <p>Role: {{ role }}</p>
        </div>
      {{/employees}}
    </main>
  </body>
</html>
`;

async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the employee\'s name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the employee\'s ID?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the employee\'s email address?'
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is the employee\'s GitHub username?'
    },
    {
      type: 'input',
      name: 'role',
      message: 'What is the employee\'s role (e.g. Employee, Engineer, Manager, Intern)?'
    },
    {
      type: 'confirm',
      name: 'addMore',
      message: 'Do you want to add more people?'
    }
  ]);
  return answers;
}
async function getTeamName() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'teamName',
        message: 'What is the name of your team?'
      }
    ]);
    return answers.teamName;
  }

  function generateHTML(teamName, employeesArray) {
    const html = template
      .replace('{{ teamName }}', teamName)
      .replace('{{#employees}}', employeesArray.employees.map(employee => {
        return `
          <div>
            <h2>${employee.name}</h2>
            <p>ID: ${employee.id}</p>
            <p>Email: ${employee.email}</p>
            <p>GitHub: ${employee.github}</p>
            <p>Role: ${employee.role}</p>
          </div>`
      }).join(''))
      .replace('{{/employees}}', '');
  

  fs.writeFile('team.html', html, (err) => {
    if (err) throw err;
    console.log('Team profile generated successfully!');
  });
}

async function main() {
    const employees = [];
    
    const teamName = await getTeamName();
    let addMore = true;
    while (addMore) {
      const answers = await promptUser();
      employees.push(answers);
      addMore = answers.addMore;
    }
  
    generateHTML(teamName, { employees: employees });
  }
  
  main();