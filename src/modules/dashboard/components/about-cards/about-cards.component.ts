import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-about-cards',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './about-cards.component.html',
    styleUrls: ['about-cards.component.scss'],
})
export class AboutCardsComponent implements OnInit {
    profiles = [
        {
            photo: 'assets/img/nek.png',
            name: 'Nekvinder Singh',
            email: 'nekvinder@gmail.com',
            contact: '+91-8740855528',
            role: 'Architecture Design & Integration',
            github: 'https://github.com/nekvinder',
            skills: [
                'Embedded Systems',
                'Machine Learning',
                'Web Fullstack Development',
                'Android & iOS Development',
                'InfoSec & Ethical Hacking',
            ],
        },
        {
            photo: 'assets/img/monika.png',
            name: 'Monika Rai',
            email: 'rai20monika@gmail.com',
            contact: '+91-7023391322',
            role: 'Backend Developer',
            github: 'https://github.com/raimonika20',
            skills: [
                'Machine Learning',
                'Python 3 + Django',
                'Backend Fullstack Development',
                'Java 8 + DBMS',
            ],
        },
        {
            photo: 'assets/img/rahul.png',
            name: 'Rahul Vaishnav',
            email: 'rahulvaishnav166@gmail.com',
            contact: '+91-9619270720',
            role: 'Frontend Developer',
            github: 'https://github.com/RahulVaishnav25',
            skills: [
                'Machine Learning',
                'Frontend Development',
                'IoT - Raspberry Pi 3',
                'Java 8 + DBMS ',
            ],
        },
        {
            photo: 'assets/img/mohit.png',
            name: 'Mohit Nagar',
            email: 'dhakadmohit463@gmail.com',
            contact: '+91-8947807777',
            role: 'UI Design',
            // github: 'https://github.com/nekvinder',
            skills: ['Machine Learning', 'UI Design', 'IoT - Raspberry Pi 3', 'Java 8 + DBMS '],
        },
    ].reverse();
    constructor() {}
    ngOnInit() {}
}
