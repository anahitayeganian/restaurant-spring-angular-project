import { AfterViewInit, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements AfterViewInit {

  private responseMessage: any;
  data: any;

  constructor(private dashboardService: DashboardService, private toastrService: ToastrService) {
    this.dashboardData();
  }

  ngAfterViewInit(): void { }

  dashboardData() {
    this.dashboardService.getDetails().subscribe((response: any) => {
      this.data = response;
    }, (error: any) => {
      console.log(error);
      if (error.error?.message)
        this.toastrService.error(error.error?.message);
      else
        this.toastrService.error(GlobalConstants.genericError);
    });
  }

}
