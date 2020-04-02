import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent extends TranslatableComponent implements OnInit {
  actor: Actor;
  email: string;
  errorMessage: string;
  registerSuccess: string;

  constructor(private translateService: TranslateService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) {
    super(translateService);
    this.registerSuccess = 'false';
  }

  ngOnInit(): void {
    this.registerSuccess = this.route.snapshot.paramMap.get('registerSuccess');

    this.authService.getCurrentActor().then((actor) => {
      this.actor = actor;
      // console.log('ngOnInit actor: ' + actor);
      if (actor !== null) {
        this.router.navigate(['/index', {name: actor.name}]);
      }
    });

  }

  onLogout() {
    this.authService.logout()
      .then(_ => {
        this.email = null;
        console.log('logout');
      }).catch(error => {
        console.log(error);
        this.errorMessage = error;
      });
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password).then(data => {
      form.reset();
      this.email = email;
      this.router.navigate(['/index', {name: this.email}]);
      // console.log('data: ' + data); // devuelve el token
    }).catch((error) => {
      console.log(error);
      this.errorMessage = 'Error Login: ' + error;
    });
  }

  onclickEditProfile() {
    this.router.navigate(['/profile/edit']);
  }
}


