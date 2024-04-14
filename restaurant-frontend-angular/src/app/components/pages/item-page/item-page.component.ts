import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item.service';
import { TokenService } from 'src/app/services/token.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent {

  items: Item[] = [];
  inputValue: string = '';
  originalItems: Item[] = [];

  constructor(private tokenService: TokenService, private itemService: ItemService, private toastrService: ToastrService, private router: Router,
    private dialog: MatDialog) {
    this.tokenService.handleTokenValidityBeforePageLoad();
    this.getAllItems();
  }

  getAllItems() {
    this.itemService.getAllItems().subscribe((response: any) => {
      this.items = response;
      /* Save original categories for resetting */
      this.originalItems = [...response];
    }, (error: any) => {
      console.log(error);
      if (error.error?.message)
        this.toastrService.error(error.error?.message);
      else
        this.toastrService.error(GlobalConstants.genericError);
    });
  }

  handleFilterValueChanges() {
    /* Reset items to the original list before applying the filter */
    this.items = [...this.originalItems];
  
    /* Apply the filter based on the input value */
    this.items = this.items.filter(item =>
      item.name.toLowerCase().includes(this.inputValue.trim().toLowerCase()) ||
      item.id.toString().toLowerCase().includes(this.inputValue.trim().toLowerCase()) ||
      item.price.toString().toLowerCase().includes(this.inputValue.trim().toLowerCase()) ||
      item.description.toLowerCase().includes(this.inputValue.trim().toLowerCase()) ||
      item.categoryName.toLowerCase().includes(this.inputValue.trim().toLowerCase())
    );
  }

}
