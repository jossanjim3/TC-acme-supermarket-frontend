import { Component, OnInit } from '@angular/core';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Actor } from 'src/app/models/actor.model';
import { Sponsorship } from 'src/app/models/sponsorship.model';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.css']
})
export class SponsorListComponent extends TranslatableComponent implements OnInit {
  actor: Actor;
  data: Sponsorship[];
  constructor(private sponsorshipService: SponsorshipService, public authService: AuthService,
    private translateService: TranslateService, private router: Router,
    private route: ActivatedRoute) {
      super(translateService);
    }

  ngOnInit() {
    this.authService.getCurrentActor()
      .then( (actorData: Actor) => {
        // console.log('actorData ngOnInit: ' + actorData);

        if (actorData !== null) {
          // console.log('actorData ngOnInit: ' + actorData);
          this.actor = actorData;
          this.sponsorshipService.getListSponsorshipsOfSponsor(this.actor._id)
            .then((val) => {
              console.log(val);
              this.data = val;
            })
            .catch((err) => console.error(err.message));
        } else {
          this.actor = null;
        }
      })
    .catch( (err) => {
      console.log(err);
      this.actor = null;
    });
  }

  isFullPaid(sponsorship: Sponsorship) {
    let res = '<i class="fa fa-check" aria-hidden="true"></i>';
    // tslint:disable-next-line: prefer-const
    for (let index in sponsorship.tripSponsorships) {
      if (!sponsorship.tripSponsorships[index].paid) {
        res = '<i class="fa fa-times" aria-hidden="true"></i>';
      }
    }
    return res;
  }

}
