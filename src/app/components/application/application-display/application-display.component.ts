import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-application-display',
  templateUrl: './application-display.component.html',
  styleUrls: ['./application-display.component.css']
})
export class ApplicationDisplayComponent  extends TranslatableComponent implements OnInit {

  applyId: String;

  constructor(private translateService: TranslateService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) {
    super(translateService);

  }

  ngOnInit() {

    // Recover id param
    this.applyId = this.route.snapshot.params['id'];
    // console.log('id appli: ' + this.applyId);

    const param = this.route.snapshot.params['paramKey'];
    // console.log('param: ' + param);


  }

  goBack(): void {
    // this.router.navigate(['/']);
    window.history.back();
  }

}
