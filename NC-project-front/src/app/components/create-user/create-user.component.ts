import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../services/users/http-client.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from "../../services/profile/profile.service";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {UserListModel} from "../../../models/UserListModel";

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

  constructor(private activatedRoute: ActivatedRoute, private httpClientService: HttpClientService, private router: Router, private auth: AuthenticationService) {
    this.role = '';
    this.activatedRoute.params.subscribe(param => {
      this.user = this.activatedRoute.snapshot.data.user;
      if (auth.getRole().includes('admin')){
        this.hasCreatingPermission = true;
      }
    });
  }

  setRole(role: string) {
    this.role = role;
  }

  ngOnInit(): void {}

  createUser(emailUser: string) {
    this.httpClientService.createUser(emailUser, this.role)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );

    this.router.navigateByUrl('/listUsers');
  }
}
