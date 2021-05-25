import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../shared/authorization/authorization.service';
import { Restaurant } from '../shared/models/restaurant.model';
import { RestaurantService } from '../shared/services/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user;
  baseUrl: string = '';
  res;
  uploaded;
  path;

  constructor(private toastr: ToastrService, private authorizeService: AuthorizationService, @Inject('BASE_URL') baseUrl: string, private restaurants: RestaurantService) {
    //this.authorizeService.getUser().subscribe(u => {
    //  this.user = u;
    //});
    //this.baseUrl = baseUrl;
    //this.restaurants.getRestaurants().subscribe(data => {
    //  for (let r of data.body) {

    //  }
    //});


    //console.log(this.res);

  }

  ngOnInit(): void {
    //this.user = this.authorizeService.getUser().pipe(map(u => u && { email: u.email, firstName: u.given_name, lastName: u.family_name, role: u.role }));

  }

  //uploadFile(files) {
  //  this.upload.upload(files).subscribe(event => {
  //    if (event.type === HttpEventType.Response) {
  //      this.uploaded = true;
  //      this.path = event.body.imagePath;
  //    }
  //  });
  //}

  testToastr() {
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.toastr.error('Hello world!', 'Toastr fun!');
    this.toastr.warning('Hello world!', 'Toastr fun!');
  }
}
