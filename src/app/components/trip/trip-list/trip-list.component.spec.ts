import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripListComponent } from './trip-list.component';
import { AppComponent } from 'src/app/app.component';
import { TripDisplayComponent } from '../trip-display/trip-display.component';
import { HeaderComponent } from '../../master/header/header.component';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { LoginComponent } from '../../security/login/login.component';
import { RegisterComponent } from '../../security/register/register.component';
import { EditProfileComponent } from '../../actor/displayProfile/editProfile.component';
import { FooterComponent } from '../../master/footer/footer.component';
import { IndexComponent } from '../../index/index.component';
import { ApplicationDisplayComponent } from '../../application/application-display/application-display.component';
import { NotFoundPageComponent } from '../../shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from '../../master/terms-and-conditions/terms-and-conditions.component';
import { DeniedAccessPageComponent } from '../../shared/denied-access-page/denied-access-page.component';
import { LocalizedDataPipe } from '../../shared/localized-data.pipe';
import { MessageComponent } from '../../master/message/message.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ActivatedRouteStub } from '../trip-display/trip-display.component.spec';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActorService } from 'src/app/services/actor.service';
import { TripService } from 'src/app/services/trip.service';
import { from } from 'rxjs';
import { Trip } from 'src/app/models/trip.model';
import { ApplicationListComponent } from '../../application/application-list/application-list.component';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { SponsorListComponent } from '../../sponsor/sponsor-list/sponsor-list.component';
import { SponsorDisplayComponent } from '../../sponsor/sponsor-display/sponsor-display.component';
import { NewAuditComponent } from '../../audit/new-audit/new-audit.component';
import { DisplayAuditComponent } from '../../audit/display-audit/display-audit.component';
import { AuditorAuditsComponent } from '../../audit/auditor-audits/auditor-audits.component';
import { DataTableModule } from 'angular-6-datatable';
import { TripFormComponent } from '../trip-form/trip-form.component';
import { CheckoutComponent } from '../../checkout/checkout.component';
import { ActorListComponent } from '../../actor/actor-list/actor-list.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { AgmCoreModule } from '@agm/core';
import { Actor } from 'src/app/models/actor.model';

describe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;
  let mockActivatedRoute;
  let tripService: TripService;
  let originalTimeout;
  let actor: Actor;

  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();
    function HttpLoaderFactory(http: HttpClient) {
      return new TranslateHttpLoader(http);
    }
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TripFormComponent,
        CheckoutComponent,
        ActorListComponent,
        TripDisplayComponent,
        HeaderComponent,
        TranslatableComponent,
        RegisterComponent,
        LoginComponent,
        EditProfileComponent,
        FooterComponent,
        IndexComponent,
        ApplicationDisplayComponent,
        NotFoundPageComponent,
        TermsAndConditionsComponent,
        TripListComponent,
        ApplicationListComponent,
        DashboardComponent,
        SponsorListComponent,
        SponsorDisplayComponent,
        NewAuditComponent,
        DisplayAuditComponent,
        AuditorAuditsComponent,
        DeniedAccessPageComponent,
        MessageComponent,
        LocalizedDataPipe
      ],
      imports: [
        BrowserModule,
        FormsModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        HttpClientModule,
        DataTableModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        NgxPayPalModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBLQG_gHOvvts7C3g_bpuV91TU-GYZHKLA',
          libraries: ['places']
        }),
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
        AppRoutingModule,
      ],
      providers: [
        AngularFireAuth,
        ActorService,
        TripService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    })
    .compileComponents();

    actor = new Actor();
    actor._id = '5e997a79a5158000194eeb08';
    actor.name = 'Explorer';
    actor.surname = 'ext2 sur';
    actor.email = 'explorerMail@mailexplorer.com';
    actor.password = '12345678';
    actor.address = 'ext2 address';
    actor.phone = '123456789';
    actor.validated = true;
    actor.role = ['EXPLORER'];

    localStorage.setItem('currentActor', JSON.stringify({ actor: actor }));
  }));

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    tripService = TestBed.get(TripService);
    fixture.detectChanges();
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    localStorage.removeItem('currentActor');
  });

  it('should defined', async (done) => {
    expect(component).toBeTruthy();
    done();
  });

  it('should have more than 0 trip', async (done) => {
    component.ngOnInit();
    fixture.detectChanges();
    // spyOn(tripService, 'searchTrips').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.data.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should get no first picture of a trip', async (done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'searchTrips').and.returnValue(Promise.resolve(true));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const trip =  new Trip();
      trip.ticker = '200610-ASCD';
      trip.title = 'Lore Ipsum';
      trip.description = 'Deserunt ea id reprehenderit labore elit amet minim esse culpa laboris nisi cupidatat laborum ipsum.';
      trip.price = 1423.50;
      trip.requeriments = [
        'Irure reprehenderit est proident labore.',
        'Mollit consequat cillum veniam ea minim quis proident deserunt excepteur consectetur do dolor cupidatat.',
        'Cillum tempor duis sunt occaecat aliqua culpa.'
      ];
      trip.startDate = new Date();
      trip.endDate = new Date();
      trip.pictures = [];
      trip.manager = '214125215125dawd21';
      expect(component.getFirstPicture(trip)).toEqual('https://i.ya-webdesign.com/images/image-not-available-png-3.png');
      done();
    });
  });
});
