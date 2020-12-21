import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../../services/profile/profile.service';
import {UserModel} from '../../../models/UserModel';
import {UserDataModel} from '../../../models/UserDataModel';
import {WebSocketService} from '../../services/webSocket/web-socket.service';
import {UserNotificationModel} from '../../../models/UserNotificationModel';
import {TestCaseService} from '../../services/testCase/test-case.service';
import {TestCaseProgressModel} from '../../../models/TestCaseProgressModel';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: UserDataModel;
  notifications: UserNotificationModel[];
  username: string;
  loggedIn: boolean;
  stompClient;
  tcProgress: TestCaseProgressModel[] = [];

  constructor(private auth: AuthenticationService,
              private profileService: ProfileService,
              private router: Router,
              private webSocketService: WebSocketService,
              private tcService: TestCaseService,
              private nService: NotificationService) {
    this.stompClient = this.webSocketService.connect();
    auth.authSubscribe().subscribe(value => {
      this.loggedIn = value;
      if (!!value) {
        setTimeout(() => {
          this.username = this.auth.getUsername();
          this.profileService.getUserByEmail(this.username).subscribe(user => {
            this.user = user;
          });
        }, 50);
      } else {
        this.router.navigate(['login']);
      }
    });
    this.stompClient.connect({}, () => {
      this.stompClient.send('/app/notify', {}, +this.auth.getId());
      this.stompClient.subscribe('/topic/notification/' + this.auth.getId(), notifications => {
        this.notifications = JSON.parse(notifications.body);
        for (const notification of this.notifications) {
          const find = this.tcProgress.find(value => value.testCaseId === notification.notification.testCase.id);
          if (!find) {
            this.subscribeOnTc(notification.notification.testCase.id);
          }
        }
      });
      this.tcService.getTestCaseWatchers(this.auth.getId()).subscribe(tc => {
        this.tcProgress = [];
        for (const id of tc) {
          this.subscribeOnTc(id);
        }
      });
    });
  }

  private subscribeOnTc(id: number){
    this.stompClient.send('/app/progress/tc', {}, id);
    this.stompClient.subscribe('/topic/progress/' + id, progress => {
      const p = JSON.parse(progress.body);
      const find = this.tcProgress.find(value => value.testCaseId === p.testCaseId);
      if (find){
        this.tcProgress.splice(this.tcProgress.indexOf(find), 1, p);
      }else {
        this.tcProgress.push(JSON.parse(progress.body));
      }
    });
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.username = null;
    this.router.navigate(['login']);
    this.auth.logout();
  }

  remove(ntf: UserNotificationModel): void {
    this.nService.delete(this.auth.getId(), ntf.notification.notificationId).subscribe(value => {
      if (value){
        this.notifications.splice(this.notifications.indexOf(ntf), 1);
      }
    });
  }

  markAsRead(ntf: UserNotificationModel) {
    if (!ntf.isRead){
      this.nService.markRead(this.auth.getId(), ntf.notification.notificationId).subscribe(value => {
        if (value){
          ntf.isRead = true;
        }
      });
    }
  }
}
