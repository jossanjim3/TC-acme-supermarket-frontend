import { TestBed, async, inject } from '@angular/core/testing';

import { ActorRoleGuard } from './actor-role.guard';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActorService } from '../services/actor.service';
import { AngularFireModule } from 'angularfire2';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { TripDisplayComponent } from '../components/trip/trip-display/trip-display.component';
import { HeaderComponent } from '../components/master/header/header.component';
import { TranslatableComponent } from '../components/shared/translatable/translatable.component';
import { RegisterComponent } from '../components/security/register/register.component';
import { LoginComponent } from '../components/security/login/login.component';
import { EditProfileComponent } from '../components/actor/displayProfile/editProfile.component';
import { FooterComponent } from '../components/master/footer/footer.component';
import { IndexComponent } from '../components/index/index.component';
import { ApplicationDisplayComponent } from '../components/application/application-display/application-display.component';
import { NotFoundPageComponent } from '../components/shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from '../components/master/terms-and-conditions/terms-and-conditions.component';
import { TripListComponent } from '../components/trip/trip-list/trip-list.component';
import { DeniedAccessPageComponent } from '../components/shared/denied-access-page/denied-access-page.component';
import { MessageComponent } from '../components/master/message/message.component';
import { LocalizedDataPipe } from '../components/shared/localized-data.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_BASE_HREF } from '@angular/common';
import { ApplicationListComponent } from '../components/application/application-list/application-list.component';
import { SponsorListComponent } from '../components/sponsor/sponsor-list/sponsor-list.component';
import { SponsorDisplayComponent } from '../components/sponsor/sponsor-display/sponsor-display.component';
import { NewAuditComponent } from '../components/audit/new-audit/new-audit.component';
import { AuditorAuditsComponent } from '../components/audit/auditor-audits/auditor-audits.component';
import { DisplayAuditComponent } from '../components/audit/display-audit/display-audit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from 'angular-6-datatable';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

describe('ActorRoleGuard', () => {
  beforeEach(() => {
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
      ]
    });
  });

  it('should ...', inject([ActorRoleGuard], (guard: ActorRoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
