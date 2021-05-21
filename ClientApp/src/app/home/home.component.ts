import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../shared/authorization/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user;
  baseUrl: string = '';

  constructor(private toastr: ToastrService, private authorizeService: AuthorizationService, @Inject('BASE_URL') baseUrl: string) {
    this.authorizeService.getUser().subscribe(u => {
      this.user = u;
    });
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    //this.user = this.authorizeService.getUser().pipe(map(u => u && { email: u.email, firstName: u.given_name, lastName: u.family_name, role: u.role }));
  }

  testToastr() {
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.toastr.error('Hello world!', 'Toastr fun!');
    this.toastr.warning('Hello world!', 'Toastr fun!');
  }
}
