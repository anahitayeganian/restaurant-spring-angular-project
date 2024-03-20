import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): String[] {
    return ['/assets/images/lobster-ravioli.png',
      '/assets/images/tiramisu.jpg']
  }
}