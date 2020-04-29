import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Actor } from '../../../models/actor.model';
import { ActorService } from '../../../services/actor.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  actor: Actor;
  errorMessage: string;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private actorService: ActorService,
    private router: Router,
    private messageService: MessageService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.actor = new Actor();

    this.profileForm = this.fb.group({
      id: [''],
      name: [''],
      surname: [''],
      email: [''],
      password:[''],
      address:[''],
      language:[''],
      phone:['']

    });

    this.actor = new Actor();

    this.authService.getCurrentActor().then(
      (actorData: Actor) => {
        if (actorData) {
          this.actor = actorData;
          this.profileForm.controls['id'].setValue(this.actor._id);
          this.profileForm.controls['name'].setValue(this.actor.name);
          this.profileForm.controls['surname'].setValue(this.actor.surname);
          this.profileForm.controls['email'].setValue(this.actor.email);
          // this.profileForm.controls['password'].setValue(this.actor.password);
          this.profileForm.controls['address'].setValue(this.actor.address);
          this.profileForm.controls['language'].setValue(this.actor.language);
          this.profileForm.controls['phone'].setValue(this.actor.phone);

        } else {
          console.log('error getting current actor: ' + JSON.stringify(actorData));
        }
      }).catch(err => console.log(err));
  }

  onSubmit() {
    console.log('boton guardar editar');

    const formModel = this.profileForm.value;

    this.actor.name = formModel.name;
    this.actor.surname = formModel.surname;
    this.actor.password = formModel.password;
    this.actor.email = formModel.email;
    this.actor.address = formModel.address;
    this.actor.language = formModel.language;
    this.actor.phone = formModel.phone;

    this.authService.getCurrentActor()
      .then(actor => {
        this.actorService.updateProfile(this.actor)
          .then((val) => {
            console.log(val);
            this.authService.setCurrentActor(val);
            const mesAux = this.translate.instant('actor.edit.success');
            const mes = mesAux + this.actor.email;
            // this.errorMessage = mes;
            this.errorMessage = '';
            this.messageService.notifyMessage(mes, 'alert alert-success');
            // this.router.navigate(['/index']);
          })
          .catch((err) => {
            this.errorMessage = err.statusText;
            console.error(err);
          });
    })
    .catch((err) => {
      this.errorMessage = err.statusText;
      console.error(err);
    });

  }

  goBack(): void {
    // this.router.navigate(['/']);
    window.history.back();
  }

}

