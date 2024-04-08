import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private toastrService: ToastrService) { }

    public handleTokenValidityBeforePageLoad() {
        if (this.authService.isAuthenticated()) {
            this.userService.checkToken().subscribe({
                error: () => {
                    this.toastrService.error(GlobalConstants.unauthorized);
                    this.router.navigate(['']);
                    localStorage.clear();
                }
            });
        }
    }
  
}
