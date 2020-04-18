import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent extends TranslatableComponent implements OnInit {

  trip = new Trip();
  id: string;
  pictures: string[] = [];

  constructor(private _sanitizer: DomSanitizer, private tripService: TripService,
    private translateService: TranslateService, private router: Router,
    private route: ActivatedRoute, private authService: AuthService, private messageService: MessageService) {
    super(translateService);
  }

  ngOnInit() {
    // Recover id param
    this.id = this.route.snapshot.params['id'];
    // console.log('id trip: ' + this.id);
    const param = this.route.snapshot.params['paramKey'];
    // console.log('param: ' + param);

    if (param === 'application') {
      // recover item from _id
      this.tripService.getTripById(this.id)
      .then((trip) => {
        // console.log(trip);
        this.trip = trip;
        this.pictures = this.trip.pictures;
        // console.log('trip detail: ' + this.trip.ticker);
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      // recover item from SKU
      this.tripService.getTrip(this.id)
      .then((trip) => {
        console.log(trip);
        this.trip = trip;
        this.pictures = this.trip.pictures;
        console.log('trip detail: ' + this.trip.ticker);
      })
      .catch((err) => {
        console.error(err);
      });
    }

  }

  getPicture(id: number) {
    if ( this.trip.pictures.length > 0) {
      return this.trip.pictures[id];
    } else {
      return 'https://i.ya-webdesign.com/images/image-not-available-png-3.png';
    }
  }

  goBack(): void {
    // this.router.navigate(['/']);
    window.history.back();
  }

  onApply(idTrip: string) {

    console.log('idTrip: ' + idTrip);

    this.authService.getCurrentActor().then( currActor => {
      if (currActor !== null) {
        console.log('currActor: ' + currActor._id);

        // creamos la application
        this.tripService.applyTrip(idTrip, currActor._id)
          .then((appli) => {
            console.log('appli detail: ' + appli);
            this.messageService.notifyMessage('application.appli.success', 'alert alert-success');
          })
          .catch((err) => {
            console.error(err);
            console.error(err.status + ' - ' + err.error);
            const mes = err.status + ' - ' + err.error;
            // this.messageService.notifyMessage('application.appli.fail', 'alert alert-danger');
            this.messageService.notifyMessage(mes, 'alert alert-danger');
          });

      } else {
        console.log('Error recuperar actor logado!');
      }
    });
    return true;
  }


}
