import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { TokenService } from 'src/app/services/token.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {

  public categories: Category[] = [];

  constructor(private tokenService: TokenService, private categoryService: CategoryService, private toastrService: ToastrService) {
    this.tokenService.handleTokenValidityBeforePageLoad();
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response;
      console.log(response);
    }, (error: any) => {
      console.log(error);
      if (error.error?.message)
        this.toastrService.error(error.error?.message);
      else
        this.toastrService.error(GlobalConstants.genericError);
    });
  }

}
