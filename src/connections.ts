import { Application, User, Connection } from "./types";

export function getApplications(): Application[] {
    // if applications is null, set it to an empty array
    if (JSON.parse(localStorage.getItem('applications') ?? "null") === null) {
        localStorage.setItem('applications', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('applications') || '[]');
}

export function getApplicationByUser(user: User): Application | undefined {
    const applications: Application[] = getApplications();
    return applications.find(application => application.owner.email === user.email);
}

export function addApplication(application: Application): void {
    const applications: Application[] = getApplications();
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));
    const appState = localStorage.getItem('appState');
    if (appState) {
        const appStateObj = JSON.parse(appState);
        const user = appStateObj.user;
        user.applications.push(application);
        localStorage.setItem('appState', JSON.stringify(appStateObj));
        // update the user in the user's array in localstorage
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === user.email);
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
    console.log('Application added successfully', application);
}

export function approveConnection(application: Application): void {
    // generate the connection object and add it to the current user. update the user in the users array
    /*
    export interface Connection {
    id: string; // 12 digit CA number using Date.now
    owner: User; // get from appstate
    status: "active" | "inactive"; // active
    application: Application;
    }
    */
    const connection: Connection = {
        id: Date.now().toString().slice(0, 12),
        owner: application.owner,
        status: 'active',
        application: application
    };
    const appState = localStorage.getItem('appState');
    // get current user update their connections array
    if (appState) {
        const appStateObj = JSON.parse(appState);
        const user = appStateObj.user;
        user.connections.push(connection);
        localStorage.setItem('appState', JSON.stringify(appStateObj));
        // update the user in the users array
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === user.email);
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Connection approved successfully', connection, user);
    }
}

export function getAllConnections(): Connection[] {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    let connections: Connection[] = [];
    users.forEach(user => {
        connections = connections.concat(user.connections);
    });
    return connections;
}