import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Trip } from 'src/app/models/trip.model';
import { Picture } from 'src/app/models/picture.model';
import { TripService } from 'src/app/services/trip.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import swal from 'sweetalert';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent extends TranslatableComponent implements OnInit {
  actor: Actor;
  tripForm: FormGroup;
  stages: FormArray;
  requeriments: FormArray;
  pictures: FormArray;
  trip = new Trip();
  isNew: boolean;
  totalprice = 0;
  trip_new = true;

  constructor(private fb: FormBuilder, private translateService: TranslateService, private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute, private authService: AuthService) {
    super(translateService);
  }

  ngOnInit() {
    this.createForm();
    this.tripForm.controls['price'].setValue(this.totalprice);
    this.route.url.subscribe(url => {
      console.log(url[0].path);
      if (url[0].path !== 'trips-new') {
        this.trip_new = false;
        this.route.params
          .subscribe(async params => {
            this.trip = await this.tripService.getTrip(params['id']);
            console.log(this.authService.checkId(this.trip.manager));
            if (!this.authService.checkId(this.trip.manager)) {
              this.router.navigate(['/denied-access']);
            } else {
              this.tripForm.controls['title'].setValue(this.trip.title);
              this.tripForm.controls['description'].setValue(this.trip.description);
              this.totalprice = Number(this.trip.price);
              this.tripForm.controls['price'].setValue(this.trip.price);
              this.initRequeriments(this.trip.requeriments);
              this.tripForm.controls['startDate'].setValue(this.formatDate(new Date(this.trip.startDate)));
              this.tripForm.controls['endDate'].setValue(this.formatDate(new Date(this.trip.endDate)));
              this.initPictures(this.trip.pictures);
              this.initStages(this.trip.stages);
            }
          });
      }
    });
    this.authService.getCurrentActor().then((actor) => {
      this.actor = actor;
    this.tripForm.controls['manager'].setValue(this.actor._id);
    });
  }

  formatDate(d: Date) {
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        // tslint:disable-next-line: prefer-const
        year = d.getFullYear();

    if (month.length < 2) {month = '0' + month; }
    if (day.length < 2) {day = '0' + day; }

    return [year, month, day].join('-');
}

  createForm() {
    this.tripForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      requeriments: this.fb.array(['']),
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      pictures: this.fb.array(['']),
      stages: this.fb.array([this.createStage()]),
      manager: ['']
    });
  }

  updatePrice() {
    // Obtenemos los inputs de price de los stages y los recorremos para rellenar
    // El input de precio del trip
    const stages_price = document.getElementsByClassName('price-stage');
    this.totalprice = 0;
    for (let i = 0; i < stages_price.length; i++) {
      const stage = <HTMLInputElement>stages_price[i];
      console.log(stage.value);
      this.totalprice += Number(stage.value);
    }
    this.tripForm.controls['price'].setValue(this.totalprice);
  }

  createStage() {
    return this.fb.group({
      title: [''],
      description: [''],
      price: ['']
    });
  }

  removeStage(index: number) {
    this.stages.removeAt(index);
    this.updatePrice();
  }

  addStage() {
    this.stages = this.tripForm.get('stages') as FormArray;
    this.stages.push(this.createStage());
  }

  initStages(stagesList: any[]) {
    this.stages = this.tripForm.get('stages') as FormArray;
    stagesList.map(item => {
      this.stages.push(this.fb.group(
        {
          title: [item.title],
          description: [item.description],
          price: [item.price]
        }));
    });
    this.removeStage(0);
    this.tripForm.setControl('stages', this.stages);
  }

  addRequeriments() {
    this.requeriments = this.tripForm.get('requeriments') as FormArray;
    this.requeriments.push(new FormControl(['']));
  }

  removeReq(index: number) {
    this.requeriments.removeAt(index);
  }

  initRequeriments(requerimentsList: string[]) {
    this.requeriments = this.tripForm.get('requeriments') as FormArray;
    requerimentsList.map(item => {
      this.requeriments.push(new FormControl(item));
    });
    this.removeReq(0);
    this.tripForm.setControl('requeriments', this.requeriments);
  }

  addPicture() {
    this.pictures = this.tripForm.get('pictures') as FormArray;
    this.pictures.push(new FormControl(['']));
  }

  removePic(index: number) {
    this.pictures.removeAt(index);
  }

  initPictures(picturesList: string[]) {
    this.pictures = this.tripForm.get('pictures') as FormArray;
    picturesList.map(item => {
      this.pictures.push(new FormControl(item));
    });
    this.removePic(0);
    this.tripForm.setControl('pictures', this.pictures);
  }

  onFileChange(event, i, picture) {
    const reader = new FileReader();
    const showOut = <HTMLTextAreaElement>document.getElementById('showpicresult' + i);
    const pic = <HTMLImageElement>document.getElementById('showpic' + i);
    let res;

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.addEventListener('loadend', function () {
        res = reader.result;
        showOut.value = res;
        picture.setValue(res);
        pic.src = res;
      });
      reader.readAsDataURL(file);
    }
  }


  deleteTrip() {
    if (!this.trip_new) {
      swal({
        title: this.translateService.instant('trip.delete.tit'),
        text: this.translateService.instant('trip.delete.msg'),
        icon: 'warning',
        buttons: [this.translateService.instant('trip.cancel'), this.translateService.instant('trip.delete')],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.tripService.deleteTrip(this.trip.ticker).then( val => {
            this.router.navigate(['/trips-created']);
          });
        }
      });
    }
  }


  onSubmit() {
    const formTrip = this.tripForm.value;
    console.log(formTrip);
    if (this.trip_new) {
      this.tripService.postTrip(formTrip).then( val => {
        console.log(val);
        this.router.navigate(['/trips-created']);
        // TODO : poner mensaje creado
      }, err => { console.log(err); });
    } else {
      this.tripService.updateTrip(formTrip, this.trip.ticker).then( val => {
        console.log(val);
        this.router.navigate(['/trips-created']);
      }, err => { console.log(err); });
    }
  }

}
