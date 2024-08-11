export interface AppState {
    loggedIn: boolean;
    role: "admin" | "user" | null;
    user: User | null;
}

export interface User {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    address: Address;
    pancard: string;
    applications: Application[];
    connections: Connection[];
    bills: Bill[];
    complaints: Complaint[];
    feedbacks: Feedback[];
}

export interface Address {
    street: string;
    district: string;
    pincode: string;
}

export interface Application {
    id: string;
    name: string;
    owner: User;
    address: Address,
    dateSubmitted: Date;
    dateApproved: Date | null;
    // depends on the dateApproved field
    status: "approved" | "rejected" | "pending";
    // if status is approved, this field will be populated
    connection: Connection | null;
}

export interface Connection {
    // 12 digit CA number
    id: string;
    owner: User;
    status: "active" | "inactive";
    // the application that was approved
    application: Application;
}

export interface Bill {
    id: string;
    connection: Connection;
    amount: number;
    dateGenerated: Date;
    datePaid: Date | null;
    // depends on the datePaid field
    status: "paid" | "unpaid";
}

export interface Complaint {
    id: string;
    owner: User;
    subject: string;
    description: string;
    // Complaint might be related to a connection
    connection: Connection | null;
    dateFiled: Date;
    dateResolved: Date | null;
    // depends on the dateResolved field
    status: "resolved" | "unresolved";
}

export interface Feedback {
    id: string;
    owner: User;
    subject: string;
    description: string;
    dateSubmitted: Date;
}
