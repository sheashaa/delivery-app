import { Component } from '@angular/core';
import { AuthorizationService } from '../shared/authorization/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private isAuthenticated: boolean;
  constructor(private authorizeService: AuthorizationService) {
    this.authorizeService.isAuthenticated().subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated,
      error => console.log(error)
    );
  }
}
