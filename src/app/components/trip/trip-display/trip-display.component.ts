import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute) {
    super(translateService);
  }

  ngOnInit() {
    // Recover id param
    this.id = this.route.snapshot.params['id'];
    // recover item
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

  getPicture(id: number) {
    if ( this.trip.pictures.length > 0) {
      return this.trip.pictures[id];
    } else {
      return 'https://i.ya-webdesign.com/images/image-not-available-png-3.png';
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }


}
