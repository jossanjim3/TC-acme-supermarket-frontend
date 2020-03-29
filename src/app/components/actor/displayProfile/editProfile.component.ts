import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Actor } from '../../../models/actor.model';
import { ActorService } from '../../../services/actor.service';
import { AuthService } from '../../../services/auth.service';

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
    private actorService: ActorService) { }

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
          this.profileForm.controls['id'].setValue(this.actor.id);
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
    const formModel = this.profileForm.value;

    this.actor.name = formModel.name;
    this.actor.surname = formModel.surname;
    this.actor.password = formModel.password;
    this.actor.email = formModel.email;
    this.actor.address = formModel.address;
    this.actor.language = formModel.language;
    this.actor.phone = formModel.phone;

    this.authService.getCurrentActor().then(actor => {
      this.actorService.updateProfile(this.actor).then((val) => {
        this.errorMessage = 'Profile successfully updated for actor with email: ' + this.actor.email;
      }).catch((err) => { this.errorMessage = err.statusText; console.error(err); });
    });

  }


}
