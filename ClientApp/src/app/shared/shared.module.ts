import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationModule } from './authorization/authorization.module';
import { UploadComponent } from './components/upload/upload.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationModule
  ],
  declarations: [UploadComponent, MapComponent],
  exports: [UploadComponent, MapComponent]
})
export class SharedModule { }
