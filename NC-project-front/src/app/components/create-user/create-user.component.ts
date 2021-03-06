import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../services/users/http-client.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../../services/auth/authentication.service";
import {UserListModel} from "../../../models/UserListModel";
import {ResetPasswordService} from "../../services/reset-pass/reset-password.service";
import {MatSelectChange} from "@angular/material/select";
import {state, style, trigger} from "@angular/animations";

interface Role {
  role: string;
}

declare var $: any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  animations: [
    trigger('invalidForm', [
      state('invalid', style({
        animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        transform: 'translate3d(0, 0, 0)',
        perspective: '1000px',
        border: '2px solid #dc3545'
      })),
      state('', style({}))
    ])
  ],
})
export class CreateUserComponent implements OnInit {

  role: string;
  hasCreatingPermission: boolean;
  user: UserListModel;

  userFormGroup = new FormGroup({
    emailUser: new FormControl('', [Validators.required, Validators.email]),
    roleUser: new FormControl('', [Validators.required]),
  });

  users: Role[] = [
    {role: 'ROLE_ADMIN'},
    {role: 'ROLE_MANAGER'},
    {role: 'ROLE_ENGINEER'}
  ];

  displayedColumns: string[] = ['role', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];
  dataSource = this.users;

  constructor(private activatedRoute: ActivatedRoute,
              private httpClientService: HttpClientService,
              private router: Router,
              private auth: AuthenticationService,
              private passwordService: ResetPasswordService) {
    this.role = '';
    this.activatedRoute.params.subscribe(() => {
      this.user = this.activatedRoute.snapshot.data.user;
      if (auth.getRole().includes('ROLE_ADMIN'))
        this.hasCreatingPermission = true;
    });
  }

  setRole(event: MatSelectChange) {
    // console.log(event.source.triggerValue);
    this.role = event.source.triggerValue;
  }


  ngOnInit(): void {
  }

  sendCode(email: string): void {
    console.log(this.role);
      this.auth.register({
        email: email,
        role: this.role,
      }).subscribe(() => {
          this.passwordService.sendCodeOnEmail(email).subscribe(
            () => {
            },
            error => console.log(error)
          );
        }, error => console.log(error)
      );
      this.router.navigate(['listUsers'], {queryParams: {created: true}});
  }


  closeAlert(): void {
    $('.alert').alert('close');
  }

  modalShow() {
    this.router.navigateByUrl('/listUsers');
  }
}
