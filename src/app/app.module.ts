import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HeaderComponent } from './components/master/header/header.component';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { RegisterComponent } from './components/security/register/register.component';
import { AngularFireAuth } from 'angularfire2/auth';

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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
