import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Audit } from 'src/app/models/audit.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuditService } from 'src/app/services/audit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-new-audit',
  templateUrl: './new-audit.component.html',
  styleUrls: ['./new-audit.component.css']
})
export class NewAuditComponent implements OnInit {
  auditForm: FormGroup;
  audit: Audit;
  tripId: String;
  auditor: any;
  errorMessage: string;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private auditService: AuditService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.tripId = this.route.snapshot.params['tripId'];
    // console.log('tripId: ' + this.tripId);

    this.createForm();

    this.authService.getCurrentActor()
      .then( currActor => {
        if (currActor !== null) {
          // console.log('this.auditor: ' + currActor._id);
          this.auditor = currActor;
        } else {
          console.log('Error recuperar actor logado!');
        }
    });
  }

  createForm() {
    this.audit = new Audit();

    this.auditForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      atachment: [''],
    });
  }

  onSubmit() {
    const formModel = this.auditForm.value;

    this.audit.title = formModel.title;
    this.audit.description = formModel.description;
    this.audit.atachment = formModel.atachment;

    this.auditService.newAudit(this.audit.title, this.audit.description, this.audit.atachment, this.tripId, this.auditor._id)
      .then( (audit: Audit) => {
          if (audit) {
            this.goBack();
            /* this.audit = audit;
            this.auditForm.controls['title'].setValue(this.audit.title);
            this.auditForm.controls['description'].setValue(this.audit.description);
            this.auditForm.controls['atachment'].setValue(this.audit.atachment); */
          } else {
            console.log('error getting audit: ' + JSON.stringify(audit));
          }
        })
      .catch(err => {
        console.log(err);
      });
  }

  goBack(): void {
    // this.router.navigate(['/']);
    window.history.back();
  }

}
