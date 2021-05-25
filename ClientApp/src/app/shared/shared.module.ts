import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationModule } from './authorization/authorization.module';
import { UploadComponent } from './components/upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationModule
  ],
  declarations: [UploadComponent],
  exports: [UploadComponent]
})
export class SharedModule { }
