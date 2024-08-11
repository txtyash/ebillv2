import { Complaint } from "./types";

export function addComplaint(complaint: Complaint): void {
    const appState = localStorage.getItem("appState");
    if (appState) {
        const appStateObj = JSON.parse(appState);
        const user = appStateObj.user;
        user.complaints.push(complaint);
        localStorage.setItem("appState", JSON.stringify(appStateObj));
    } 
}