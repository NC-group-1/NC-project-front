import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NC-project-front';
  loggedIn: boolean;
  unauthorized: boolean;

  constructor(private auth: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(value => {
        this.unauthorized = value.unauthorized === 'true';
        if (this.unauthorized) {
          this.modalShow();
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {unauthorized: null},
            queryParamsHandling: 'merge'
          });
        }
      }
    );
    auth.authSubscribe().subscribe(value => {
      this.loggedIn = value;
    });
  }

  modalShow() {
    $('#unauthorizedModal').modal('show');
  }
}
