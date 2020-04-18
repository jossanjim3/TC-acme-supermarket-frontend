import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatawarehouseService } from 'src/app/services/datawarehouse.service';
import { Datawarehouse } from 'src/app/models/datawarehouse.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends TranslatableComponent implements OnInit {

  datawarehouse = new Datawarehouse();

  tripsPerManager: {
    _id: string;
    average: number;
    min: number;
    max: number;
    stdev: number;
  };

  applicationsPerTrip: {
    _id: string;
    average: number;
    min: number;
    max: number;
    stdev: number;
  };

  priceOfTrip: {
    average: number;
    min: number;
    max: number;
    stdev: number;
  };

  ratioApplications: {
    total: number;
    totalByStatusPending: number;
    ratioApplicationsPending: number;
    ratioApplicationsRejected: number;
    ratioApplicationsDue: number;
    ratioApplicationsAccepted: number;
    ratioApplicationsCancelled: number;
  };

  averagePriceRangeExplorers: {
      avgMinPrice: number;
      avgMaxPrice: number;
  };





  constructor(private translateService: TranslateService, private router: Router,
    private route: ActivatedRoute, private authService: AuthService, private datawarehouseService: DatawarehouseService) {
    super(translateService);
  }

  ngOnInit() {
    this.datawarehouseService.getDataWareHouseLatest()
      .then((val) => {
        this.datawarehouse = val['0'];
        this.tripsPerManager = val['0'].TripsPerManager['0'];
        this.applicationsPerTrip = val['0'].ApplicationsPerTrip['0'];
        this.priceOfTrip = this.getPriceTripsAVG(val['0'].PriceTrip);
        this.ratioApplications = val['0'].ratioApplications['0'];
        this.averagePriceRangeExplorers = val['0'].averagePriceRangeExplorers['0'];
      });
  }

  getPriceTripsAVG(arr) {
    let min = 1000000;
    let max = 0;
    let avg = 0;
    let stdev = 0;
    let count = 0;
    // tslint:disable-next-line: forin
    for (const index in arr) {
      count++;
      if (arr[index].min < min) {
        min = arr[index].min;
      }
      if (arr[index].max > max) {
        max = arr[index].max;
      }
      avg += arr[index].avg;
      stdev += arr[index].stdev;
    }

    avg = avg / count;
    stdev = stdev / count;

    return {
      average: avg,
      min: min,
      max: max,
      stdev: stdev,
    };
  }

}
