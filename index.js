
import inquirer from 'inquirer';
import fs from 'fs';
import Manager from './lib/Manager.js';
import Engineer from './lib/Engineer.js';
import Intern from './lib/Intern.js';
import render from './lib/htmlRenderer.js';

const teamArray = [];

function startApp() {
  addMember();
}

function addMember() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'What is the team member\'s role?:',
      choices: ['Engineer', 'Intern', 'Manager'],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the team member\'s name?:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the team member\'s id?:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the team member\'s email?:',
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is the engineer\'s GitHub username?:',
      when: (input) => input.role === 'Engineer',
    },
    {
      type: 'input',
      name: 'school',
      message: 'What school does the intern attend?:',
      when: (input) => input.role === 'Intern',
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'What is the manager\'s office number?:',
      when: (input) => input.role === 'Manager',
    },
    {
      type: 'list',
      name: 'moreMembers',
      message: 'Would you like to add more team members?:',
      choices: ['Yes', 'No'],
    },
  ]).then((data) => {
    let newMember;
    if (data.role === 'Engineer') {
      newMember = new Engineer(data.name, data.id, data.email, data.github);
    } else if (data.role === 'Intern') {
      newMember = new Intern(data.name, data.id, data.email, data.school);
    } else {
      newMember = new Manager(data.name, data.id, data.email, data.officeNumber);
    }
    teamArray.push(newMember);
    if (data.moreMembers === 'Yes') {
      addMember();
    } else {
      generateHTML(teamArray);
    }
  });


function generateHTML(team) {
  const html = render(team);
  fs.writeFile('./outputs/team.html', html, (err) => {
    if (err) throw err;
    console.log('Team HTML file written to output folder');
  });
}}

startApp();
