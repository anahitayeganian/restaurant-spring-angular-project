import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bill } from 'src/app/models/Bill';
import { BillService } from 'src/app/services/bill.service';
import { TokenService } from 'src/app/services/token.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss'],
  providers: [DatePipe]
})
export class BillPageComponent {

  bills: Bill[] = [];

  constructor(private billService: BillService, private tokenService: TokenService, private datePipe: DatePipe, private toastrService: ToastrService) {
    this.tokenService.handleTokenValidityBeforePageLoad();
    this.getAllBills();
  }

  getAllBills() {
    this.billService.getAllBills().subscribe((response: any) => {
        /* Map over the bills and format the date */
        this.bills = response.map((bill: Bill) => {
          return {
            ...bill,
            issueDate: this.formatDate(bill.issueDate),
            total: bill.total.toFixed(2)
          }
        });
      }, (error: any) => {
        console.error(error);
        if (error.error?.message)
          this.toastrService.error(error.error?.message);
        else
          this.toastrService.error(GlobalConstants.genericError);
      });
  }

  formatDate(date: string): string {
    const dateToFormat = new Date(date);
    return this.datePipe.transform(dateToFormat, 'yyyy-MM-dd HH:mm') || '';
  }
  
}