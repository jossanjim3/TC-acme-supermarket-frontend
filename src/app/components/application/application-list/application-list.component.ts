import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationsService } from 'src/app/services/applications.service';
import { Application } from 'src/app/models/application.model';
import { forEach } from '@angular/router/src/utils/collection';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {

  data: any[] = [];
  tripAux: Trip = null;

  constructor(private applicatioService: ApplicationsService, private translateService: TranslateService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute, private tripService: TripService) {
    super(translateService);

  }

  async ngOnInit() {

    // usamos funciones async porque se llaman unas a otras y asi funciona

    // Recover id param
    const tripId = this.route.snapshot.params['id'];
    // console.log('id trip: ' + tripId);

    const param = this.route.snapshot.params['paramKey'];
    // console.log('param: ' + param);

    if (param === 'manager') {
      // get all trip applications
      this.data = await this.applicatioService.getTripApplications(tripId);
      // console.log('data:' + this.data);
      for (const d of this.data ) {
        // console.log('d: ' + d._id);
        // console.log('d trip: ' + d.trip);
        this.tripAux = await this.tripService.getTripById(d.trip);
        d.tripObj = this.tripAux;
        // console.log('d.tripObj ticker: ' + d.tripObj.ticker);
      }
    } else {

      // get all explorer applications
      this.data = await this.applicatioService.getExplorerApplications();
      // console.log('data:' + this.data);
      for (const d of this.data ) {
        // console.log('d: ' + d._id);
        // console.log('d trip: ' + d.trip);
        this.tripAux = await this.tripService.getTripById(d.trip);
        d.tripObj = this.tripAux;
        // console.log('d.tripObj ticker: ' + d.tripObj.ticker);
      }
    }


    /* this.applicatioService.getApplications()
    .then((applis) => {
      console.log('applis: ' + applis);
      this.data = applis;
    })
    .catch((err) => {
      console.error(err.message);
    }); */

  }

  updateApplyToDue(itemId: String) {
    this.applicatioService.updateApplyToDue(itemId)
      .then(_ => {
        console.log('actualizado');
      }).catch(error => {
        console.log(error);
      });
  }

}
