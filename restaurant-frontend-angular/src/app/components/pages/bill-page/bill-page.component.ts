import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bill } from 'src/app/models/Bill';
import { BillService } from 'src/app/services/bill.service';
import { TokenService } from 'src/app/services/token.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent {

}
