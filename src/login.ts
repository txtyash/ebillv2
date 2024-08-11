import Swal from 'sweetalert2';
import { Validation } from './helpers/validators';
import { User } from './types';
import { AppState } from './types';

// function to login user to the site and setting the app state in the local storage with the key appState
export function login(email: string, password: string) {
    // validate the login form fields using the login function from the validators.ts file
    const status: ["success" | "fail", string | null] = Validation.login(email, password);
    if (status[0] === "fail") {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: status[1] || 'Please try again later.'
        });
        return;
    }
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user: User | undefined = users.find((user: User) => user.email === email && user.password === password);
    if (!user) {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid email or password.'
        });
    }
    else {
        const appState: AppState = {
            loggedIn: true,
            role: user.role,
            user
        };
        localStorage.setItem('appState', JSON.stringify(appState));
        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have successfully logged in.'
        });
        // redirect to home page after some delay
        setTimeout(() => {
            window.location.href = 'protected/manage.html';
        }, 1500);
    }
}