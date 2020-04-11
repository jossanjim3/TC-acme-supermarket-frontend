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
import { ActorRoleGuard } from './guards/actor-role.guard';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';

const appRoutes: Routes = [

  // {path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'login', component: LoginComponent},

  // {path: 'register', component: RegisterComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/edit', component: EditProfileComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'explorer'}},
  {path: 'trips', children: [
    {path: 'search', component: TripListComponent},
    {path: 'display/:id', component: TripDisplayComponent},
  ]},
  {path: 'index', component: IndexComponent},

  {path: 'datawarehouse', component: TermsAndConditionsComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'administrator'}},
  {path: 'olap-cube', component: TermsAndConditionsComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'administrator'}},
  {path: 'new-manager', component: TermsAndConditionsComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'administrator'}},

  {path: 'trips', children: [
    {path: 'trips-applies', component: TripDisplayComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'explorer'}},
    {path: 'trips-created', component: TripDisplayComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'manager'}},
    {path: 'trips-new', component: TripDisplayComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'manager'}},
    {path: '', component: TripDisplayComponent},
  ]},

  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'not-found', component: NotFoundPageComponent},
  {path: 'denied-access', component: DeniedAccessPageComponent},

  {path: '', redirectTo: '/index', pathMatch: 'full'},
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
