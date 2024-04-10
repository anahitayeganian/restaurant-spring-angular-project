import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { AuthService } from 'src/app/services/auth.service';
import { FoodService } from 'src/app/services/food.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  foods: Food[] = [];

  constructor(private foodService: FoodService, private userService: UserService, private router: Router) {
    this.loadDashboardWhenAuthenticated();
    this.foods = this.foodService.getAll();
  }

  loadDashboardWhenAuthenticated() {
    if (AuthService.isAuthenticated()) {
      this.userService.checkToken().subscribe((response: any) => {
        this.router.navigate(['/dashboard']);
      }, (error: any) => {
        console.log(error);
      });
    }
  }

}