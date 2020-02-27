import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(private userService: UserService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(
            this.authService.decodedToken.nameid
        ).pipe(
            catchError(error =>
            {
                this.alertify.error('Problem retrieving data');
                // console.log(error);
                // console.log(this.authService.decodedToken.nameId);
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
