import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private userService: UserService) { }

  get isAuth() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.userService.logout();
  }

}
