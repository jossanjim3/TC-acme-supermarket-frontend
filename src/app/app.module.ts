import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HeaderComponent } from './components/master/header/header.component';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';

import { AngularFireModule } from 'angularfire2';
import { RegisterComponent } from './components/security/register/register.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginComponent } from './components/security/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { EditProfileComponent } from './components/actor/displayProfile/editProfile.component';
import { ActorService } from './services/actor.service';
import { FooterComponent } from './components/master/footer/footer.component';
import { IndexComponent } from './components/index/index.component';
import { ApplicationDisplayComponent } from './components/application/application-display/application-display.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { HttpModule } from '@angular/http';
import { MessageComponent } from './components/master/message/message.component';
import { DeniedAccessPageComponent } from './components/shared/denied-access-page/denied-access-page.component';
import { LocalizedDataPipe } from './components/shared/localized-data.pipe';
import { registerLocaleData } from '@angular/common';
import locales from '@angular/common/locales/es';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { SponsorListComponent } from './components/sponsor/sponsor-list/sponsor-list.component';
import { SponsorDisplayComponent } from './components/sponsor/sponsor-display/sponsor-display.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

registerLocaleData(locales, 'es');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const firebaseConfig = {
  apiKey: 'AIzaSyBLQG_gHOvvts7C3g_bpuV91TU-GYZHKLA',
  authDomain: 'acme-viaje-el-corte-andaluh.firebaseapp.com',
  databaseURL: 'https://acme-viaje-el-corte-andaluh.firebaseio.com',
  projectId: 'acme-viaje-el-corte-andaluh',
  storageBucket: 'acme-viaje-el-corte-andaluh.appspot.com',
  messagingSenderId: '785752393006',
  appId: '1:785752393006:web:b3ba408388312107d6e6bf',
  measurementId: 'G-ZKX46KJLB8'
};

@NgModule({
  declarations: [
    AppComponent,
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
    MessageComponent,
    DeniedAccessPageComponent,
    MessageComponent,
    LocalizedDataPipe,
    TripListComponent,
    ApplicationListComponent,
    SponsorListComponent,
    SponsorDisplayComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    HttpClientModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    // tslint:disable-next-line: deprecation
    HttpModule,
    DataTableModule
  ],
  exports: [AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AngularFireAuth, ActorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
