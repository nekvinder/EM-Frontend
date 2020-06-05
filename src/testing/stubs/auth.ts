import { UserService } from '../../../app-common/services/user.service';

import { MockUser, User } from '@testing/mocks';
import { Observable, of } from 'rxjs';

const mockUser = new MockUser();

export class UserServiceStub implements UserService {
    set user(user: User) {}
    get user$(): Observable<User> {
        return of(mockUser);
    }
}
