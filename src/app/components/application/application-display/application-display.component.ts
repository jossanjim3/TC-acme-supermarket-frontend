import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationsService } from 'src/app/services/applications.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Application } from 'src/app/models/application.model';
import { app } from 'firebase';

@Component({
  selector: 'app-application-display',
  templateUrl: './application-display.component.html',
  styleUrls: ['./application-display.component.css']
})
export class ApplicationDisplayComponent  extends TranslatableComponent implements OnInit {

  cancelForm: FormGroup;
  applyId: String;
  param: String;
  application: Application;

  constructor(private translateService: TranslateService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private applicationService: ApplicationsService) {
    super(translateService);

  }

  ngOnInit() {

    // Recover id param
    this.applyId = this.route.snapshot.params['id'];
    // console.log('id appli: ' + this.applyId);

    this.param = this.route.snapshot.params['paramKey'];
    // console.log('param: ' + param);

    this.createForm();

  }

  createForm() {

    this.cancelForm = this.fb.group({
      id: [''],
      status: [''],
      comment: [''],
      reasonCancel: [''],
    });

    this.applicationService.getApplicationById(this.applyId)
      .then( (appli: Application) => {
          if (appli) {
            this.application = appli;
            this.cancelForm.controls['id'].setValue(this.application._id);
            this.cancelForm.controls['status'].setValue(this.application.status);
            this.cancelForm.controls['comment'].setValue(this.application.comment);
            this.cancelForm.controls['reasonCancel'].setValue(this.application.reasonCancel);
          } else {
            console.log('error getting application: ' + JSON.stringify(appli));
          }
        })
      .catch(err => {
        console.log(err);
      });
  }

  onSubmit() {
    const formModel = this.cancelForm.value;

    this.application.id = formModel.id;
    this.application.status = formModel.status;
    this.application.comment = formModel.comment;
    this.application.reasonCancel = formModel.reasonCancel;
    // console.log('comment: ' + this.application.comment);

    if (this.param === 'cancelar') {
      this.applicationService.cancelApplication(this.applyId, this.application.reasonCancel)
        .then( (appli: Application) => {
            if (appli) {
              this.application = appli;
              // console.log('this.application.comment: ' + this.application.comment);
              this.cancelForm.controls['id'].setValue(this.application._id);
              this.cancelForm.controls['status'].setValue(this.application.status);
              this.cancelForm.controls['comment'].setValue(this.application.comment);
              this.cancelForm.controls['reasonCancel'].setValue(this.application.reasonCancel);
            } else {
              console.log('error getting application: ' + JSON.stringify(appli));
            }
          })
        .catch(err => {
          console.log(err);
        });

    } else if (this.param === 'editar') {
      this.applicationService.editApplication(this.applyId, this.application.comment, this.application.reasonCancel)
        .then( (appli: Application) => {
            if (appli) {
              this.application = appli;
              // console.log('this.application.comment: ' + this.application.comment);
              this.cancelForm.controls['id'].setValue(this.application._id);
              this.cancelForm.controls['status'].setValue(this.application.status);
              this.cancelForm.controls['comment'].setValue(this.application.comment);
              this.cancelForm.controls['reasonCancel'].setValue(this.application.reasonCancel);
            } else {
              console.log('error getting application: ' + JSON.stringify(appli));
            }
          })
        .catch(err => {
          console.log(err);
        });
    }

  }

  goBack(): void {
    // this.router.navigate(['/']);
    window.history.back();
  }

}
