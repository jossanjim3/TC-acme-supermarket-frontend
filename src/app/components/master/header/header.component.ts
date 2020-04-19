import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {
  currentActor: Actor;
  userLoggedIn: boolean;
  activeRole = 'anonymous';

  name: String;
  search: string;
  constructor(private translateService: TranslateService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) {
    super(translateService);
    // route.queryParams.subscribe(val => this.ngOnInit());
  }

  changeLanguage(language: string) {
    super.changeLanguage(language);
  }

  ngOnInit() {

    // console.log('ngonit');
    // console.log('loggedIn: ' + this.userLoggedIn);
    // console.log('currentActor: ' + this.currentActor);

    // esto solo se activa cuando se hace login correctamente tanto en mongo como en firebase
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      // console.log('log in subsccribe: ' + loggedIn);
      if (loggedIn) {
        this.authService.getCurrentActor()
          .then( (actorData: Actor) => {
            // console.log('actorData subscribe ngOnInit: ' + actorData);

            if (actorData !== null) {
              // console.log('actorData ngOnInit: ' + actorData);
              this.currentActor = actorData;
              this.activeRole = actorData.role.toString();
            } else {
              this.activeRole = 'anonymous';
              this.currentActor = null;
            }

          })
        .catch( (err) => {
          console.log(err);
          this.activeRole = 'anonymous';
          this.currentActor = null;
        });
      } else {
        this.activeRole = 'anonymous';
        this.currentActor = null;
      }
      // console.log('eoooo: ' + this.currentActor);
    });

    // esto se activa cuando se hace refresh F5 de la pantalla
    this.authService.getCurrentActor()
      .then( (actorData: Actor) => {
        // console.log('actorData ngOnInit: ' + actorData);

        if (actorData !== null) {
          // console.log('actorData ngOnInit: ' + actorData);
          this.currentActor = actorData;
          this.activeRole = actorData.role.toString();
        } else {
          this.activeRole = 'anonymous';
          this.currentActor = null;
        }

      })
    .catch( (err) => {
      console.log(err);
      this.activeRole = 'anonymous';
      this.currentActor = null;
    });

  }

   searchKeyword(search: string) {
    console.log(search);
    this.router.navigate(['/trips/search'], { 'queryParams': { 'keyword': search }});
   }

  onLogout() {
    this.authService.logout()
      .then(_ => {
        this.currentActor = null;
        this.activeRole = 'anonymous';
        // this.router.navigate(['/login']);
      }).catch(error => {
        console.log(error);
      });
  }

}
