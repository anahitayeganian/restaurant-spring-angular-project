import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TokenService } from 'src/app/services/token.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  private responseMessage: any;
  data: any;

  constructor(private dashboardService: DashboardService, private toastrService: ToastrService, private tokenService: TokenService) {
    this.dashboardData();
  }

  ngOnInit(): void {
    this.tokenService.handleTokenValidityBeforePageLoad();
  }

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
