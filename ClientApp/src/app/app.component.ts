import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../api-authorization/authorize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authorizeService: AuthorizeService) { }

  ngOnInit(): void {
    this.authorizeService.signInSilent();
  }
}
