import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientService} from '../../service/users/http-client.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  userFormGroup = new FormGroup({
    emailUser: new FormControl('', [Validators.required, Validators.email]),
    roleUser: new FormControl('', [Validators.required]),
  });

  users: Role[] = [
    {role: 'Admin'},
    {role: 'Manager'},
    {role: 'Engineer'}
  ];

  displayedColumns: string[] = ['role', 'first', 'second', 'third', 'fourth','fifth','sixth','seventh','eighth', 'ninth'];
  dataSource = this.users;

  constructor(private httpClientService: HttpClientService, private router: Router) {
    this.role ='';
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
