import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUploaderComponent } from './ngx-uploader.component';
import { UploaderService } from './uploader.service';
import { iAppend } from './iAppend';

export * from './ngx-uploader.component';
export * from './uploader.service';
export * from './iAppend';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxUploaderComponent
  ],
  exports: [
    NgxUploaderComponent
  ]
})
export class NgxUploderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxUploderModule,
      providers: [UploaderService]
    };
  }
}
