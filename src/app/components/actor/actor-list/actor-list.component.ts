import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/services/actor.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent extends TranslatableComponent implements OnInit {

  data: Actor[] = [];

  constructor(private actorService: ActorService, private translateService: TranslateService,
    private authService: AuthService, private router: Router, private route: ActivatedRoute) {
      super(translateService);

  }

  ngOnInit() {


    this.actorService.getAllActor()
      .then((actors) => {
        // console.log('audits: ' + audits);
        this.data = actors;
      })
      .catch((err) => {
        console.error(err.message);
      });

    // solo se activa cuando se produce un cambio en el datatable
    this.actorService.actorUpdated.subscribe((isUpdated: boolean) => {
      if (isUpdated) {
        this.actorService.getAllActor()
        .then((actors) => {
          // console.log('audits: ' + audits);
          this.data = actors;
        })
        .catch((err) => {
          console.error(err.message);
        });
      }
    });
  }

  validatedActor(actorId: string, validated: boolean) {
    this.actorService.validatedActor(actorId, validated)
    .then(_ => {
      // console.log('actualizado');
    }).catch(error => {
      console.log(error);
    });
  }

  goBack(): void {
    // this.router.navigate(['/']);
    window.history.back();
  }

}
