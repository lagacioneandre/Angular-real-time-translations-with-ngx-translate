import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SomeComponent } from './some.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SomeComponent
  ],
  exports: [
    SomeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ]
})
export class SomeModule { }
