import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { Trip } from 'src/app/models/trip.model';
import swal from 'sweetalert';

const MAX_ITEMS = 10;

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  numObjects = MAX_ITEMS;

  actor: Actor;
  data: any[];
  roles: string[];

  keyword: string;
  minPrice: string;
  maxPrice: string;
  minDate: string;
  maxDate: string;

  showfilter = true;

  direction: string;

  constructor(private tripService: TripService, public authService: AuthService,
    private translateService: TranslateService, private router: Router,
    private route: ActivatedRoute) {
      super(translateService);
      route.queryParams.subscribe(val => this.ngOnInit());
  }

  ngOnInit() {
    this.route.url.subscribe(url => {
      console.log(url[0].path);
      if (url[0].path !== 'trips-created') {
        this.route.queryParams
          .subscribe(params => {
            this.keyword = params['keyword'];
            this.minDate = params['minDate'];
            this.maxDate = params['maxDate'];
            this.minPrice = params['minPrice'];
            this.maxPrice = params['maxPrice'];
          });
        this.tripService.searchTrips(0, MAX_ITEMS, this.keyword, this.minPrice, this.maxPrice,
          this.minDate, this.maxDate)
          .then((val) => {
            this.data = val;
          })
          .catch((err) => console.error(err.message));

          this.roles = [];
          this.authService.getCurrentActor().then((actor) => {
            this.actor = actor;
          });
      } else {
        this.showfilter = false;
        this.authService.getCurrentActor().then((actor) => {
          this.actor = actor;
          this.tripService.getTripsOfManager(this.actor._id).then((val) => {
            this.data = val;
          })
          .catch((err) => console.error(err.message));
        });
      }
    });
  }

  getFirstPicture(trip: Trip) {
    if ( trip.pictures.length > 0) {
      if (trip.pictures[0] === ''){
        return 'https://i.ya-webdesign.com/images/image-not-available-png-3.png';
      } else {
        return trip.pictures[0];
      }
    } else {
      return 'https://i.ya-webdesign.com/images/image-not-available-png-3.png';
    }
  }

  searchFilter() {
    console.log(this.minPrice);
    this.router.navigate(['/trips/search'], { 'queryParams': {
      'keyword': this.keyword,
      'minPrice': this.minPrice,
      'maxPrice': this.maxPrice,
      'minDate': this.minDate,
      'maxDate': this.maxDate
    }});
  }

  displayTrip(trip: Trip) {
    const a = new Date();
    const startDate = new Date(trip.startDate);
    return trip.isPublished && (startDate.getTime() >  a.getTime());
  }

  // Functions to infinite scroll

  onScrollDown (ev) {
    if (this.showfilter) {
      const start = this.numObjects;
      this.numObjects += MAX_ITEMS;
      this.appendTrips(start, this.numObjects);
      this.direction = 'down';
    }
  }

  onScrollUp (ev) {
    if (this.showfilter) {
      const start = this.numObjects;
      this.numObjects += MAX_ITEMS;
      this.prependTrips(start, this.numObjects);
      this.direction = 'up';
    }
  }

  appendTrips (startIndex, endIndex) {
    this.addTrips(startIndex, endIndex, 'push');
  }

  prependTrips (startIndex, endIndex) {
    this.addTrips(startIndex, endIndex, 'unshift');
  }

  addTrips (startIndex, endIndex, _method) {
    this.tripService.searchTrips(startIndex, MAX_ITEMS, this.keyword, this.minPrice, this.maxPrice,
      this.minDate, this.maxDate)
      .then((val) => {
        this.data = this.data.concat(val);
      })
      .catch((err) => console.error(err.message));
  }

  showReasonCancel(trip: Trip) {
    swal({
      title: this.translateService.instant('trip.cancel.reason'),
      text: trip.reasonCancel,
      icon: 'info'
    });
  }

  newTrip() {
    this.router.navigate(['/trips-new']);
  }

}
