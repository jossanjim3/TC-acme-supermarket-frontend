import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Audit } from 'src/app/models/audit.model';
import { AuditService } from 'src/app/services/audit.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-display-audit',
  templateUrl: './display-audit.component.html',
  styleUrls: ['./display-audit.component.css']
})
export class DisplayAuditComponent implements OnInit {
  auditForm: FormGroup;
  audit: Audit;
  auditId: String;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private auditService: AuditService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.auditId = this.route.snapshot.params['id'];
    this.createForm();
  }

  createForm() {
    this.audit = new Audit();

    this.auditForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      atachment: [''],
    });

    this.auditService.getAudit(this.auditId)
      .then( (auditData: Audit) => {
        if (auditData) {
          this.audit = auditData;
          this.auditForm.controls['id'].setValue(this.audit._id);
          this.auditForm.controls['title'].setValue(this.audit.title);
          this.auditForm.controls['description'].setValue(this.audit.description);
          this.auditForm.controls['atachment'].setValue(this.audit.atachment);
        } else {
          console.log('error getting current audit: ' + JSON.stringify(auditData));
        }
      }).catch(err => console.log(err));
  }

  onSubmit() {
    const formModel = this.auditForm.value;

    this.audit._id = formModel.id;
    this.audit.title = formModel.title;
    this.audit.description = formModel.description;
    this.audit.atachment = formModel.atachment;

    this.auditService.editAudit(this.audit._id, this.audit.title, this.audit.description, this.audit.atachment)
      .then( (audit: Audit) => {
          if (audit) {
            this.goBack();
            /* this.audit = audit;
            this.auditForm.controls['id'].setValue(this.audit._id);
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
