import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item.service';
import { TokenService } from 'src/app/services/token.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ItemDialogComponent } from '../../dialogs/item-dialog/item-dialog.component';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';

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

  handleAddItem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "25rem";
    dialogConfig.position = { left: '45%' };
    const dialogRef = this.dialog.open(ItemDialogComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    /* This ensures that the newly added category is immediately reflected in the list without requiring a page reload */
    const sub = dialogRef.componentInstance.onAddItem.subscribe((response) => {
      this.getAllItems();
    });
  }

}
