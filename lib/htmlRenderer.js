import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function generateHTML(team) {
    // Read the main.html file
    let mainHTML = fs.readFileSync(path.resolve(__dirname, '../templates/main.html'), 'utf8');

    // Loop over the team array and generate HTML for each member
    for (let member of team) {
        let memberHTML;
        if (member.getRole() === 'Engineer') {
            memberHTML = fs.readFileSync(path.resolve(__dirname, '../templates/engineer.html'), 'utf8');
        } else if (member.getRole() === 'Intern') {
            memberHTML = fs.readFileSync(path.resolve(__dirname, '../templates/intern.html'), 'utf8');
        } else if (member.getRole() === 'Manager') {
            memberHTML = fs.readFileSync(path.resolve(__dirname, '../templates/manager.html'), 'utf8');
        }

        // Replace placeholders in the memberHTML with actual data
        memberHTML = memberHTML.replace(/{{ name }}/g, member.getName());
        memberHTML = memberHTML.replace(/{{ role }}/g, member.getRole());
        memberHTML = memberHTML.replace(/{{ id }}/g, member.getId());
        memberHTML = memberHTML.replace(/{{ email }}/g, member.getEmail());

        // Add the memberHTML to the mainHTML
        mainHTML += memberHTML;
    }

    // Return the final HTML string
    return mainHTML;
}

export default generateHTML;
