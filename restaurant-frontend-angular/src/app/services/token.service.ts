import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from '../shared/global-constants';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) { }

    public handleTokenValidityBeforePageLoad() {
        if (AuthService.isAuthenticated()) {
            this.userService.checkToken().subscribe((response: any) => {
            }, (error: any) => {
                this.toastrService.error(GlobalConstants.unauthorized);
                localStorage.clear();
                this.router.navigate(['']);
            });
        }
    }

}