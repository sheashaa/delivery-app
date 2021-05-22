import { Component, OnInit } from '@angular/core';
import { BranchService } from '../shared/services/branch.service';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  constructor(private myCategoriesService:CategoryService, private myBranchesService:BranchService) { }

  allBeanches;
  allCategories;
  selectedCategories;
  temp=[];
  branchesToFilter;

  ngOnInit() {
    this.myBranchesService.getBranches().subscribe(
      (res)=>{this.allBeanches = res.body,
              this.branchesToFilter =res.body},
      (err)=>{console.log(err);}
    );
    this.myCategoriesService.getCategories().subscribe(
      (res)=>{this.allCategories = res.body;
              console.log(this.allCategories)},
      (err)=>{console.log(err);}
    );
  }

  findRestaurant(){
    console.log(this.selectedCategories);
    console.log(this.allBeanches);
    for(let i = 0; i < this.selectedCategories.length; i++){
      for(let j = 0; j < this.allBeanches.length; j++){
        if(this.allBeanches[j].products.find(p=>p.categories.find(c=>c.id == this.selectedCategories[i]))){
          console.log(this.allBeanches[j]);
          this.temp.push(this.allBeanches[j]);
        }
      }
    }
    this.branchesToFilter = this.allBeanches;
    this.branchesToFilter = this.temp;
    this.temp = [];
  }


}
