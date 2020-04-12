import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedAccessPageComponent } from './denied-access-page.component';
import { TranslatableComponent } from '../translatable/translatable.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { TripDisplayComponent } from '../../trip/trip-display/trip-display.component';
import { HeaderComponent } from '../../master/header/header.component';
import { RegisterComponent } from '../../security/register/register.component';
import { LoginComponent } from '../../security/login/login.component';
import { EditProfileComponent } from '../../actor/displayProfile/editProfile.component';
import { FooterComponent } from '../../master/footer/footer.component';
import { IndexComponent } from '../../index/index.component';
import { ApplicationDisplayComponent } from '../../application/application-display/application-display.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from '../../master/terms-and-conditions/terms-and-conditions.component';
import { MessageComponent } from '../../master/message/message.component';
import { LocalizedDataPipe } from '../localized-data.pipe';
import { TripListComponent } from '../../trip/trip-list/trip-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { APP_BASE_HREF } from '@angular/common';

describe('DeniedAccessPageComponent', () => {
  let component: DeniedAccessPageComponent;
  let fixture: ComponentFixture<DeniedAccessPageComponent>;

  beforeEach(async(() => {
    function HttpLoaderFactory(http: HttpClient) {
      return new TranslateHttpLoader(http);
    }
    TestBed.configureTestingModule({
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
        DeniedAccessPageComponent,
        MessageComponent,
        LocalizedDataPipe,
        TripListComponent
      ],
      imports: [
        BrowserModule,
        // tslint:disable-next-line: deprecation
        HttpModule,
        FormsModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        AppRoutingModule,
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
