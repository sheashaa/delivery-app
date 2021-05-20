import { Component, Inject, OnInit } from '@angular/core';
import { AuthorizationService } from '../shared/authorization/authorization.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user;
  baseUrl: string = '';

  constructor(private alert: AlertService, private authorizeService: AuthorizationService, @Inject('BASE_URL') baseUrl: string) {
    this.authorizeService.getUser().subscribe(u => {
      this.user = u;
    });
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    //this.user = this.authorizeService.getUser().pipe(map(u => u && { email: u.email, firstName: u.given_name, lastName: u.family_name, role: u.role }));
  }

  testAlert() {
    this.alert.danger('testing... 1... 2... 3...');
  }
}
