import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { query } from '@angular/core/src/render3/query';

@Injectable({
  providedIn: 'root'
})
export class ActorRoleGuard implements CanActivate {

  /* public router: Router;
  public authService: AuthService;
 */
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(async (resolve, reject) => {
      const expectedRole = next.data.expectedRole;
      // console.log('expectedRole: ' + expectedRole);
      const currentActor = await this.authService.getCurrentActor();
      // console.log('currentActor: ' + currentActor);
      let result = false;

      if (currentActor !== null) {
        // console.log('expectedRole: ' + expectedRole);
        // console.log('actor role: ' + currentActor.role.toString());
        const activeRole = new RegExp(currentActor.role.toString(), 'i');
        // console.log('activeRole: ' + activeRole);
        if (expectedRole.search(activeRole) !== -1) {
          result = true;
        } else {
          this.router.navigate(['denied-access'], {queryParams: {previousURL: state.url}});
        }
        // console.log('result1: ' + result);
        resolve(result);
      } else {
        if (expectedRole.indexOf('anonymous') !== -1) {
          result = true;
        } else {
          this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
        }
        // console.log('result2: ' + result);
        resolve(result);
      }
    });
  }

}
