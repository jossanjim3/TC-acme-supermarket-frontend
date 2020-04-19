import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-auditor-audits',
  templateUrl: './auditor-audits.component.html',
  styleUrls: ['./auditor-audits.component.css']
})
export class AuditorAuditsComponent extends TranslatableComponent implements OnInit {

  data: any[] = [];

  constructor(private translateService: TranslateService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute, private tripService: TripService,
    private auditService: AuditService) {
    super(translateService);
  }

  ngOnInit() {

    this.auditService.getAllAuditorAudits()
    .then((audits) => {
      // console.log('audits: ' + audits);
      this.data = audits;
    })
    .catch((err) => {
      console.error(err.message);
    });

  }

}
