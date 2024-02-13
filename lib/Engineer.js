import Employee from './Employee';

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(namme, id, email);
        this.github = github;
    }

    getGitHub(){
        return this.github;
    }

    getRole() {
        return 'Engineer';
    }
}

export default Engineer;