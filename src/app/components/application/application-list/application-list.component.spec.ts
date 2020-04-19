import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from 'angular-6-datatable';

import { ApplicationListComponent } from './application-list.component';
import { AppComponent } from 'src/app/app.component';
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
import { AppRoutingModule } from 'src/app/app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActorService } from 'src/app/services/actor.service';
import { ApplicationsService } from 'src/app/services/applications.service';
import { from } from 'rxjs';
import { Application } from 'src/app/models/application.model';
import { ActivatedRouteStub } from '../../trip/trip-display/trip-display.component.spec';
import { TripListComponent } from '../../trip/trip-list/trip-list.component';
import { TripDisplayComponent } from '../../trip/trip-display/trip-display.component';
import { AuditorAuditsComponent } from '../../audit/auditor-audits/auditor-audits.component';
import { SponsorListComponent } from '../../sponsor/sponsor-list/sponsor-list.component';
import { SponsorDisplayComponent } from '../../sponsor/sponsor-display/sponsor-display.component';
import { NewAuditComponent } from '../../audit/new-audit/new-audit.component';
import { DisplayAuditComponent } from '../../audit/display-audit/display-audit.component';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { Actor } from 'src/app/models/actor.model';

describe('ApplicationListComponent', () => {
  let component: ApplicationListComponent;
  let fixture: ComponentFixture<ApplicationListComponent>;
  let mockActivatedRoute;
  let applicationService: ApplicationsService;
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
        ApplicationListComponent,
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
        DeniedAccessPageComponent,
        MessageComponent,
        LocalizedDataPipe,
        TripListComponent,
        TripDisplayComponent,
        SponsorListComponent,
        SponsorDisplayComponent,
        DashboardComponent,
        NewAuditComponent,
        AuditorAuditsComponent,
        DisplayAuditComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        DataTableModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
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
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: ActivatedRoute, useValue: {
          queryParams: from([{keyword: ''}]),
        }},
      ],
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
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
    fixture = TestBed.createComponent(ApplicationListComponent);
    component = fixture.componentInstance;
    applicationService = TestBed.get(ApplicationsService);
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

  it('should have more than 1 application', async (done) => {
    component.ngOnInit();
    fixture.detectChanges();
    // TODO necesito simular el login antes para que el siguiente metodo del servicio devuelva algo
    spyOn(applicationService, 'getApplications').and.returnValue(Promise.resolve(true));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.data.length).toBeGreaterThan(1);
      done();
    });
  });

  it('should get status PENDING', async (done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(applicationService, 'getApplications').and.returnValue(Promise.resolve(true));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.data[0].status).toEqual('PENDING');
      done();
    });
  });

});
