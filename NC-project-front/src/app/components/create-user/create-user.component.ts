import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../services/users/http-client.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../../services/auth/authentication.service";
import {UserListModel} from "../../../models/UserListModel";
import {ResetPasswordService} from "../../services/reset-pass/reset-password.service";
import {MatSelectChange} from "@angular/material/select";

interface Role {
  role: string;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
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
    {role: 'Admin'},
    {role: 'Manager'},
    {role: 'Engineer'}
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
      if (auth.getRole().includes('admin'))
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
    this.auth.register({
      email: email,
      role: this.role,
    }).subscribe(() => {
        this.passwordService.sendCodeOnEmail(email).subscribe(
          () => {},
          error => console.log(error)
        );
      }, error => console.log(error)
    );
  }


  modalShow() {
    this.router.navigateByUrl('/listUsers');
  }
}
