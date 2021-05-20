import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../shared/authorization/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user;

  constructor(private authorizeService: AuthorizationService) {
    this.authorizeService.getUser().subscribe(u => {
      this.user = u;
    });
  }

  ngOnInit(): void {
    //this.user = this.authorizeService.getUser().pipe(map(u => u && { email: u.email, firstName: u.given_name, lastName: u.family_name, role: u.role }));
  }
}
