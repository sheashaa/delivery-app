import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizeService } from '../../api-authorization/authorize.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public uploaded: boolean = false;
  imagePath: string = '';
  user;

  constructor(private authorizeService: AuthorizeService) {
    this.authorizeService.getUser().subscribe(u => {
      this.user = u;
    });
  }

  ngOnInit(): void {
    //this.user = this.authorizeService.getUser().pipe(map(u => u && { email: u.email, firstName: u.given_name, lastName: u.family_name, role: u.role }));
  }

  public uploadFinished(event) {
    this.imagePath = event.imagePath;
    this.uploaded = true;
  }

  public getImageFullPath(imagePath: string) {
    return `https://localhost:44392/${imagePath}`;
  }
}
