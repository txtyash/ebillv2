import { User, AppState } from "./types";
import { Validation } from "./helpers/validators";
import Swal from "sweetalert2";

// function to get user info from local storage and return it if it exists else return null
export const getUserInfo = (): User | null => {
    // get the current user from the appState item in the local storage
    const appState: AppState = JSON.parse(localStorage.getItem('appState') || '{}');
    const user: User | null = appState.user;
    return user;
};

// function with params name, email, pancard number, street, district, postal code to update user info in local storage's users array by first getting the user JSON.parse(localStorage.getItem('users') || '[]').find((user: User) => user.email === email and don't overwrite the users array we have to update it. validate it first by using the updateUserInfo function from the validators file. use swal alerts to show success or error messages.
export const updateUserInfo = (name: string, email: string, pancard: string, street: string, district: string, pincode: string) => {
    console.log(name, email, pancard, street, district, pincode);
    const status: ["success" | "fail", string | null] = Validation.updateUserInfo(name, email, pancard, street, district, pincode);
    if (status[0] === "fail") {
        Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: status[1] || 'Please try again later.'
        });
    }
    else {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user: User | null = getUserInfo();
        if (user) {
            const index = users.findIndex((u: User) => u.email === user.email);
            users[index] = {
                ...user,
                name,
                email,
                pancard,
                address: {
                    street,
                    district,
                    pincode
                }
            };
            localStorage.setItem('users', JSON.stringify(users));
            // update the appState item's user field in the local storage with the updated user
            const appState: AppState = JSON.parse(localStorage.getItem('appState') || '{}');
            appState.user = users[index];
            localStorage.setItem('appState', JSON.stringify(appState));
            Swal.fire({
                icon: 'success',
                title: 'Update Successful',
                text: 'You have successfully updated your information.'
            });
        }
    }
};

export function getAuthenticatedUser(): User | null {
    const appState: AppState = JSON.parse(localStorage.getItem('appState') || '{}');
    const id: string = appState.user?.email || '';
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((user: User) => user.email === id) || null;
}
