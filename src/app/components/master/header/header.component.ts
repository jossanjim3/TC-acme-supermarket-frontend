import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  constructor(private translateService: TranslateService, private authService: AuthService) {
    super(translateService);
  }

  changeLanguage(language: string) {
    super.changeLanguage(language);
  }

  ngOnInit() {
  }

}
