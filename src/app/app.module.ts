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
import { LoginComponent } from './components/security/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { EditProfileComponent } from './components/actor/displayProfile/editProfile.component';
import { ActorService } from './services/actor.service';
import { FooterComponent } from './components/master/footer/footer.component';
import { IndexComponent } from './components/index/index.component';

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
    IndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [AngularFireAuth, ActorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
