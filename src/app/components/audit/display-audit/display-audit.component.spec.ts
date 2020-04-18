import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from 'src/app/app.component';
import { ApplicationListComponent } from '../../application/application-list/application-list.component';
import { HeaderComponent } from '../../master/header/header.component';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { RegisterComponent } from '../../security/register/register.component';
import { LoginComponent } from '../../security/login/login.component';
import { EditProfileComponent } from '../../actor/displayProfile/editProfile.component';
import { FooterComponent } from '../../master/footer/footer.component';
import { IndexComponent } from '../../index/index.component';
import { ApplicationDisplayComponent } from '../../application/application-display/application-display.component';
import { NotFoundPageComponent } from '../../shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from '../../master/terms-and-conditions/terms-and-conditions.component';
import { DeniedAccessPageComponent } from '../../shared/denied-access-page/denied-access-page.component';
import { MessageComponent } from '../../master/message/message.component';
import { LocalizedDataPipe } from '../../shared/localized-data.pipe';
import { TripListComponent } from '../../trip/trip-list/trip-list.component';
import { TripDisplayComponent } from '../../trip/trip-display/trip-display.component';
import { SponsorListComponent } from '../../sponsor/sponsor-list/sponsor-list.component';
import { SponsorDisplayComponent } from '../../sponsor/sponsor-display/sponsor-display.component';
import { NewAuditComponent } from '../new-audit/new-audit.component';
import { DisplayAuditComponent } from '../display-audit/display-audit.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from 'angular-6-datatable';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { AngularFireModule } from 'angularfire2';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActorService } from 'src/app/services/actor.service';
import { APP_BASE_HREF } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { AuditorAuditsComponent } from '../auditor-audits/auditor-audits.component';

describe('AuditorAuditsComponent', () => {
  let component: DisplayAuditComponent;
  let fixture: ComponentFixture<DisplayAuditComponent>;

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
