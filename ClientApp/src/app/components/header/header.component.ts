import { Component } from '@angular/core';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isAuthenticated: boolean;
  userName: string;
  role: string;
  cartLength;

  constructor(private cart: CartService, private authorizeService: AuthorizationService, private router: Router) {
    this.cartLength = this.cart.length;
    this.authorizeService.isAuthenticated().subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if (!this.isAuthenticated) {
          this.role = 'Customer';
        }
      },
      error => console.log(error)
    );
    this.authorizeService.getUser().subscribe(
      user => {
        this.userName = user && user.name;
        this.role = user && user.role;
        this.isManager = this.role == 'Manager';
      },
      error => console.log(error)
    );
  }

  isHome(fragment) {
    const route = this.router.url;
    if (route === '/' || route === '/index.html') {
      return fragment + '-transparent';
    }
    return '';
  }
}
