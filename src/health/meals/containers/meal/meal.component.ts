import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from '../../../../models/meal.model';
import { MealsService } from '../../../shared/services/meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['meal.component.scss']
})
export class MealComponent {
  constructor(
    private mealsService: MealsService,
    private router: Router
  ) {}

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
