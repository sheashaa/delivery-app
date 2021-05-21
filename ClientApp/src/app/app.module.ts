import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthorizationModule } from './shared/authorization/authorization.module';
import { AuthorizationInterceptor } from './shared/authorization/authorization.interceptor';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/components/about/about.component';
import { WhyUsComponent } from './home/components/why-us/why-us.component';
import { MenuComponent } from './home/components/menu/menu.component';
import { SpecialsComponent } from './home/components/specials/specials.component';
import { EventsComponent } from './home/components/events/events.component';
import { BookATableComponent } from './home/components/book-a-table/book-a-table.component';
import { TestimonialsComponent } from './home/components/testimonials/testimonials.component';
import { GalleryComponent } from './home/components/gallery/gallery.component';
import { ChefsComponent } from './home/components/chefs/chefs.component';
import { ContactComponent } from './home/components/contact/contact.component';
import { HeroComponent } from './home/components/hero/hero.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      maxOpened: 5
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
