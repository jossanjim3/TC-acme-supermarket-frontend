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
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { ApplicationDisplayComponent } from './components/application/application-display/application-display.component';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { SponsorListComponent } from './components/sponsor/sponsor-list/sponsor-list.component';
import { SponsorDisplayComponent } from './components/sponsor/sponsor-display/sponsor-display.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NewAuditComponent } from './components/audit/new-audit/new-audit.component';
import { DisplayAuditComponent } from './components/audit/display-audit/display-audit.component';
import { AuditorAuditsComponent } from './components/audit/auditor-audits/auditor-audits.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { TripFormComponent } from './components/trip/trip-form/trip-form.component';
import { CanDeactivateGuard } from './guards/can-deactivate.service';

const appRoutes: Routes = [

  // {path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'login', component: LoginComponent},

  // {path: 'register', component: RegisterComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/edit', component: EditProfileComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'explorer'}},

  {path: 'trips', children: [
    {path: 'search', component: TripListComponent},
    {path: 'display/:id', component: TripDisplayComponent},
    {path: '', component: TripListComponent},
    {path: ':id', component: TripFormComponent, canDeactivate: [CanDeactivateGuard],
     canActivate: [ActorRoleGuard], data: {expectedRole: 'manager'}}
  ]},

  {path: 'trips-applies', children: [
    {path: 'display/:id', component: ApplicationDisplayComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'explorer|manager'}},
    {path: 'trip/:id', component: ApplicationListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'manager'}},
    {path: '', component: ApplicationListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'explorer'}},
  ]},

  {path: 'trips-created', component: TripListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'manager'}},
  {path: 'trips-new', component: TripFormComponent, canDeactivate: [CanDeactivateGuard],
   canActivate: [ActorRoleGuard], data: {expectedRole: 'manager'}},

  {path: 'index', component: IndexComponent},

  {path: 'checkout', component: CheckoutComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'explorer'}},

  {path: 'datawarehouse', component: DashboardComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'administrator'}},
  {path: 'olap-cube', component: TermsAndConditionsComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'administrator'}},
  {path: 'new-manager', component: RegisterComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'administrator'}},

  {path: 'sponsor', children: [
    {path: 'list', component: SponsorListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'sponsor'}},
    {path: 'display/:id', component: SponsorDisplayComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'sponsor'}}
  ]},

  {path: 'audit', children: [
    {path: 'new', component: NewAuditComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'auditor'}},
    {path: 'display/:id', component: DisplayAuditComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'auditor'}},
    {path: '', component: AuditorAuditsComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'auditor'}},
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
