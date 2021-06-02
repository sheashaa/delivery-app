import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalDialogModule } from 'ngx-modal-dialog';

import { HomeModule } from './home/home.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { SharedModule } from './shared/shared.module';
import { OrdersModule } from './orders/order.module';

import { AuthorizationInterceptor } from './shared/authorization/authorization.interceptor';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HomeModule,
    RestaurantsModule,
    OrdersModule,
    SharedModule,
    RouterModule.forRoot([
      { path: '**', component: NotFoundComponent },
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      maxOpened: 5
    }),
    ModalDialogModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
