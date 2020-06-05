import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/models';

@Injectable()
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        try {
            const userJson = localStorage.getItem('currentUser');
            this.currentUserSubject = new BehaviorSubject<User>(
                (this.currentUser = userJson !== null ? JSON.parse(userJson) : new User())
            );
            this.currentUser = this.currentUserSubject.asObservable();
        } catch (error) {
            console.error(error);
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(new User());
        alert('Logged Out');
    }
    currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(user: User) {
        console.log('logged in ' + user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }
}
