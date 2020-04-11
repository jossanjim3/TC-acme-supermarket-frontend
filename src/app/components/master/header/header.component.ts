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
  private currentActor: Actor;
  private userLoggedIn: boolean;
  private activeRole = 'anonymous';

  name: String;
  search: string;
  constructor(private translateService: TranslateService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) {
    super(translateService);

  }

  changeLanguage(language: string) {
    super.changeLanguage(language);
  }

  ngOnInit() {
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.authService.getCurrentActor().then( currActor => {
          if (currActor !== null) {
            this.currentActor = currActor;
            this.activeRole = currActor.role.toString();
          } else {
            this.activeRole = 'anonymous';
            this.currentActor = null;
          }
        });
      } else {
        this.activeRole = 'anonymous';
        this.currentActor = null;
      }
      console.log(this.currentActor);
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
