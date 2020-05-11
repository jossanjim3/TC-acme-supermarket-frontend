import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileComponent } from './editProfile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActorService } from 'src/app/services/actor.service';
import { AgmCoreModule } from '@agm/core';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { auth } from 'firebase';

describe('ProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let actor: Actor;
  let authService: AuthService;

  beforeEach(async(() => {
    function HttpLoaderFactory(http: HttpClient) {
      return new TranslateHttpLoader(http);
    }
    TestBed.configureTestingModule({
      declarations: [ EditProfileComponent, TranslatableComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        AngularFireModule.initializeApp({
          apiKey: 'AIzaSyBLQG_gHOvvts7C3g_bpuV91TU-GYZHKLA',
          authDomain: 'acme-viaje-el-corte-andaluh.firebaseapp.com',
          databaseURL: 'https://acme-viaje-el-corte-andaluh.firebaseio.com',
          projectId: 'acme-viaje-el-corte-andaluh',
          storageBucket: 'acme-viaje-el-corte-andaluh.appspot.com',
          messagingSenderId: '785752393006',
          appId: '1:785752393006:web:b3ba408388312107d6e6bf',
          measurementId: 'G-ZKX46KJLB8'
        }),
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBLQG_gHOvvts7C3g_bpuV91TU-GYZHKLA',
          libraries: ['places']
        }),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
      providers: [AngularFireAuth, ActorService]
    })
    .compileComponents();

    actor = new Actor();
    actor._id = '5e941acfb83b5a0019ea9c4f';
    actor.name = 'ext2';
    actor.surname = 'ext2 sur';
    actor.email = 'ext2@gmail.com';
    actor.password = '123456';
    actor.address = 'ext2 address';
    actor.phone = '123456789';
    actor.validated = true;
    actor.role = ['EXPLORER'];

    localStorage.setItem('currentActor', JSON.stringify({ actor: actor }));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', async (done) => {
    expect(component).toBeTruthy();
    done();
  });

  it('should have same actor', async (done) => {
    component.ngOnInit();
    spyOn(authService, 'getCurrentActor').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.actor._id).toEqual(actor._id);
      expect(component.actor.role).toEqual(actor.role);
      expect(component.actor.name).toEqual(actor.name);
      expect(component.actor.surname).toEqual(actor.surname);
      expect(component.actor.email).toEqual(actor.email);
      done();
    });
  });

  it('should have all form functions', async (done) => {
    expect(component.canDeactivate).toBeDefined();
    expect(component.onSubmit).toBeDefined();
    expect(component.createForm).toBeDefined();
    expect(component.goBack).toBeDefined();
    done();
  });
});
