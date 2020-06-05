export class Participant {
    id: number;
    fullname: string;
    mobile: string;
    email: string;
    registration_type: number;
    idcard: number;
    group_id: number;
}

export class Group {
    id: number;
    name: string;
    participants: Participant[];
}

export class User {
    id: number;
    url: string;
    name: string;
    email: string;
    password: string;
}

export class Event {
    id: number;
    url: string;
    name: string;
    description: string;
    start: Date;
    end: Date;
}
