import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../shared/authorization/authorization.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  private isAuthenticated: boolean;

  private searchText: string;

  constructor(private authorizeService: AuthorizationService, private router: Router) {
    this.authorizeService.isAuthenticated().subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated,
      error => console.log(error)
    );
  }

  search() {
    this.router.navigate(['./restaurants'], { queryParams: { 'searchText': this.searchText } });
  }
}
