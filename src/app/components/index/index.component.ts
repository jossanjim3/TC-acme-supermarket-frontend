import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  extends TranslatableComponent implements OnInit {
  name: String;

  constructor(private translateService: TranslateService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) {
    super(translateService);

    // para que cuando hasgas logout se muestre los params que tu quieras, el routing se ha hecho en el logout del auth service
    route.params.subscribe(val => {
      // put the code from `ngOnInit` here
      this.name = this.route.snapshot.paramMap.get('name');
    });

  }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');

    if (this.authService.checkRole('EXPLORER')) {
      // console.log('soy explorer');
      this.router.navigate(['/trips/search'], { 'queryParams': { 'keyword': '' }});
    } else {
      // console.log('no soy explorer');
    }

  }

}
