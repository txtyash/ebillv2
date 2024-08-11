import { User } from "../types";

export namespace Validation {
    export function registration(email: string, password: string, repeatPassword: string): ["success" | "fail", string | null] {
        if (!email || !password || !repeatPassword) {
            return ["fail", "All fields are required."];
        }
        if (password !== repeatPassword) {
            return ["fail", "Passwords do not match."];
        }
        if (password.length < 8) {
            return ["fail", "Password must be at least 8 characters long."];
        }
        if (!/[A-Z]/.test(password)) {
            return ["fail", "Password must contain at least 1 uppercase letter."];
        }
        if (!/[a-z]/.test(password)) {
            return ["fail", "Password must contain at least 1 lowercase letter."];
        }
        if (!/\d/.test(password)) {
            return ["fail", "Password must contain at least 1 number."];
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return ["fail", "Password must contain at least 1 special character."];
        }
        return ["success", null];
    }

    export function userInfoComplete(): boolean {
        // get the current user from the appState item in the local storage
        const user: User = JSON.parse(localStorage.getItem('appState') || '{}').user;
        if (!user.name || !user.email || !user.password || !user.address.street || !user.address.district || !user.address.pincode || !user.pancard) {
            return false;
        }
        return true;
    }

    export function login(email: string, password: string): ["success" | "fail", string | null] {
        if (!email || !password) {
            return ["fail", "All fields are required."];
        }
        return ["success", null];
    }

    // function to validate user info with the fields name, email, pancard number, street address, district, pincode
    export function updateUserInfo(name: string, email: string, pancard: string, street: string, district: string, pincode: string): ["success" | "fail", string | null] {
        if (!name || !email || !pancard || !street || !district || !pincode) {
            return ["fail", "All fields are required."];
        }
        if (!/^[A-Za-z\s]+$/.test(name)) {
            return ["fail", "Name can only contain alphabets and spaces."];
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return ["fail", "Invalid email address."];
        }
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pancard)) {
            return ["fail", "Invalid PAN card number."];
        }
        if (!/^[a-zA-Z0-9\s,.'-]{3,}$/.test(street)) {
            return ["fail", "Invalid street address."];
        }
        if (!/^[A-Za-z\s]+$/.test(district)) {
            return ["fail", "Invalid district name."];
        }
        if (!/^[1-9][0-9]{5}$/.test(pincode)) {
            return ["fail", "Invalid pincode."];
        }
        return ["success", null];
    }
}