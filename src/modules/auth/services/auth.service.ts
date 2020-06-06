import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/models';

@Injectable()
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    private isLoggedInSubject: BehaviorSubject<boolean>;
    public currentUser: Observable<User>;
    public isLoggedIn: Observable<boolean>;

    constructor(private http: HttpClient) {
        try {
            const userJson = localStorage.getItem('currentUser');
            this.currentUserSubject = new BehaviorSubject<User>(
                (this.currentUser = userJson !== null ? JSON.parse(userJson) : new User())
            );
            this.isLoggedInSubject = new BehaviorSubject<boolean>(userJson !== null ? true : false);

            this.currentUser = this.currentUserSubject.asObservable();
        } catch (error) {
            console.error(error);
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(new User());
        this.isLoggedInSubject.next(false);
        alert('Logged Out');
    }

    // isCurrentLoggedIn(): Observable<boolean> {
    //     this.currentUser.subscribe(s => {
    //         if (this.currentUserValue().id >= 0 && this.currentUserValue().id) {
    //             return of(true);
    //         }
    //         return of(false);
    //     });
    // }
    currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    isLoggedInValue(): boolean {
        return this.isLoggedInSubject.value;
    }

    login(user: User) {
        console.log('logged in ' + user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
    }
}
