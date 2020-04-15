import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationsService } from 'src/app/services/applications.service';
import { Application } from 'src/app/models/application.model';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {

  data: Application[];

  constructor(private applicatioService: ApplicationsService, private translateService: TranslateService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) {
    super(translateService);

  }

  async ngOnInit() {

    // usamos funciones async porque se llaman unas a otras y asi funciona

    // get all my applications
    this.data = await this.applicatioService.getApplications();

    /* this.applicatioService.getApplications()
    .then((applis) => {
      console.log('applis: ' + applis);
      this.data = applis;
    })
    .catch((err) => {
      console.error(err.message);
    }); */

  }

}
