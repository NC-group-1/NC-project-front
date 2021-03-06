import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  private authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    this.authenticationService = authenticationService;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: this.authenticationService.getToken()
        }
      });
    }
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => this.handleAuthError(err)));
  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401){
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true
        }
      });
    }
    if (err.status === 403){
      this.router.navigate([],
        {relativeTo: this.route, queryParams: {unauthorized: true}, queryParamsHandling: 'merge'});
    }
    return throwError(err);
  }
}
