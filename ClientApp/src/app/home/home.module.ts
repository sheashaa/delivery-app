import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { MenuComponent } from './components/menu/menu.component';
import { SpecialsComponent } from './components/specials/specials.component';
import { EventsComponent } from './components/events/events.component';
import { BookATableComponent } from './components/book-a-table/book-a-table.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ChefsComponent } from './components/chefs/chefs.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ]),
    SharedModule
  ],
  declarations: [
    HeroComponent,
    AboutComponent,
    WhyUsComponent,
    MenuComponent,
    SpecialsComponent,
    EventsComponent,
    BookATableComponent,
    TestimonialsComponent,
    GalleryComponent,
    ChefsComponent,
    ContactComponent,
    HomeComponent,
  ]
  ,
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
