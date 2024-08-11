import { Feedback } from "./types";

export function addFeedback (feedback: Feedback): void {
    // get the current user from the localStorage appstate and push the feedback to the user's feedbacks array
    const appState = localStorage.getItem("appState");
    if (appState) {
        const appStateObj = JSON.parse(appState);
        const user = appStateObj.user;
        user.feedbacks.push(feedback);
        localStorage.setItem("appState", JSON.stringify(appStateObj));
    }
}
