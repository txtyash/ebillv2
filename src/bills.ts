import Swal from 'sweetalert2';
import { Bill, User } from './types';
import { getAuthenticatedUser } from './personal-info';

export function getAllBillsByOwner(user: User): Bill[] {
    return user.bills;
}

export function getBillById(id: string): Bill | null {
    const user: User | null = getAuthenticatedUser();
    if (user) {
        return user.bills.find((bill: Bill) => bill.id == id) || null;
    }
    return null;
}

export function payBillForId(id: string): void {
    const user: User | null = getAuthenticatedUser();
    if (user) {
        const bill: Bill | null = user.bills.find((bill: Bill) => bill.id == id) || null;
        if (bill) {
            if (bill.status === "paid") {
                Swal.fire({
                    title: "Bill already paid",
                    icon: "error",
                });
            } else {
                // Update the bill
                bill.status = "paid";
                bill.datePaid = new Date();

                // Update the user in local storage
                const usersJson = localStorage.getItem('users');
                if (usersJson) {
                    let users: User[] = JSON.parse(usersJson);
                    const userIndex = users.findIndex((u: User) => u.email === user.email);
                    if (userIndex !== -1) {
                        users[userIndex] = user;
                        localStorage.setItem('users', JSON.stringify(users));
                        let appState = JSON.parse(localStorage.getItem('appState') || '[]');
                        appState.user = user;
                        localStorage.setItem('appState', JSON.stringify(appState));
                        Swal.fire({
                            title: "Bill paid successfully",
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: "Error updating user data",
                            icon: "error",
                        });
                    }
                } else {
                    Swal.fire({
                        title: "Error: Users data not found",
                        icon: "error",
                    });
                }
            }
        } else {
            Swal.fire({
                title: "Bill not found",
                icon: "error",
            });
        }
    } else {
        Swal.fire({
            title: "User not found",
            icon: "error",
        });
    }
}
