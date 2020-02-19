import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../types';
import { UserService } from '../services/user.service';

@Component({
  moduleId: module.id,
  selector : 'users',
  styles: [`.sticky {
  position: fixed;
  top: 5%;
  right: 0;
  width: 45%;
  overflow: auto;
  height:100%;
}`],
  templateUrl: '../../Templates/user-list.component.html'
})

export class UserListComponent implements OnInit {
  //@Input() users : User[];
  users: User[];
  selectedUser: User;
  constructor(
    private userService: UserService
  ) { }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(
        users => {
          users.forEach(u => u.editable = false);
          this.users = users;
        }, //Bind to view
        err => console.log(err));
  }

  toggleEditable(user: User): void {
    user.editable = !(user.editable);
  }

  save(user: User): void {
    user.editable = false;
    this.userService.upsertUser(user)
      .subscribe(uid => console.log(uid), err => console.log(err));
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
