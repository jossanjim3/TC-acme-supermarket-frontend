import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Sponsorship } from 'src/app/models/sponsorship.model';

@Component({
  selector: 'app-sponsor-display',
  templateUrl: './sponsor-display.component.html',
  styleUrls: ['./sponsor-display.component.css']
})
export class SponsorDisplayComponent extends TranslatableComponent implements OnInit {
  id: string;
  sponsorship = new Sponsorship();
  tripSponsorship: [{trip: string, paid: boolean}];

  constructor(private sponsorShipService: SponsorshipService,
    private authService: AuthService,
    private translateService: TranslateService, private router: Router,
    private route: ActivatedRoute) {
      super(translateService);
    }

  ngOnInit() {
    // Recover id param
    this.id = this.route.snapshot.params['id'];

    this.sponsorShipService.getSponsorshipById(this.id)
      .then((val) => {
        this.sponsorship = val;
        this.tripSponsorship = val.tripSponsorships;
      });
  }

  goBack(): void {
    // this.router.navigate(['/']);
    window.history.back();
  }


  isPaid(paid: boolean) {
    if (paid) {
      return '<i class="fa fa-check" aria-hidden="true"></i>';
    } else {
      return '<i class="fa fa-times" aria-hidden="true"></i>';
    }
  }

}
