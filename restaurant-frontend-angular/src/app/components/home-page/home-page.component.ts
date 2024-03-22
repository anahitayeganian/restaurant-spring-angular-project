import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/Food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  foods: Food[] = [];

  constructor(private foodService: FoodService) {
    this.foods = foodService.getAll();
  }

}
