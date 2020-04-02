import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { LoginComponent} from './components/security/login/login.component';
import { RegisterComponent} from './components/security/register/register.component';
import { EditProfileComponent } from './components/actor/displayProfile/editProfile.component';
import { IndexComponent} from './components/index/index.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { DeniedAccessPageComponent } from './components/shared/denied-access-page/denied-access-page.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  // {path: 'logout', redirectTo: '/index'},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/edit', component: EditProfileComponent},
  {path: 'index', component: IndexComponent},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'not-found', component: NotFoundPageComponent},
  {path: 'denied-access', component: DeniedAccessPageComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule {
}
