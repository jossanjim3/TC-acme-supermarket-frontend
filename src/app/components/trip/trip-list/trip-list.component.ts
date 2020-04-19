import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { Trip } from 'src/app/models/trip.model';

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

  direction: string;

  constructor(private tripService: TripService, public authService: AuthService,
    private translateService: TranslateService, private router: Router,
    private route: ActivatedRoute) {
      super(translateService);
      route.queryParams.subscribe(val => this.ngOnInit());
  }

  ngOnInit() {
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
  }

  getFirstPicture(trip: Trip) {
    if ( trip.pictures.length > 0) {
      return trip.pictures[0];
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

  // Functions to infinite scroll

  onScrollDown (ev) {
    const start = this.numObjects;
    this.numObjects += MAX_ITEMS;
    this.appendTrips(start, this.numObjects);

    this.direction = 'down';
  }

  onScrollUp (ev) {
    const start = this.numObjects;
    this.numObjects += MAX_ITEMS;
    this.prependTrips(start, this.numObjects);

    this.direction = 'up';
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

}
