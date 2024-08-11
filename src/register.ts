import Swal from 'sweetalert2';
import { Validation } from './helpers/validators';
import { User } from './types';

export function register(email: string, password: string, repeatPassword: string) {
    const status: ["success" | "fail", string | null] = Validation.registration(email, password, repeatPassword);
    if (status[0] === "fail") {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: status[1] || 'Please try again later.'
        });
    }
    else if (JSON.parse(localStorage.getItem('users') || '[]').find((user: User) => user.email === email)) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'User with this email already exists.'
        });
        // redirect to login page after some delay
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 1500);
    }
    else {
        // add user to the local storage array with the key users. Type of the user is User
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({
            name: "",
            email,
            password,
            role: email === "admin@gmail.com" ? "admin" : "user",
            address: {
                street: "",
                district: "",
                pincode: ""
            },
            pancard: "",
            applications: [],
            connections: [],
            bills: [],
            complaints: [],
            feedbacks: []
        });
        localStorage.setItem('users', JSON.stringify(users));
        Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'You have successfully registered.'
        });
        // redirect to login page after some delay
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 1500);
    }
}