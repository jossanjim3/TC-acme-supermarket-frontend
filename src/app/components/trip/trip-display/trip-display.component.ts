import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent implements OnInit {

  private trip: Trip;
  private pictures: SafeResourceUrl[];

  constructor(private _sanitizer: DomSanitizer, private tripService: TripService) {
    this.trip = tripService.createTrip();
  }

  ngOnInit() {
  }

  getRequeriments() {
    return this.trip.requirements;
    this.trip.startDate.toLocaleDateString()
  }

  getImageSrc(imageBase64) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageBase64);
  }
}
