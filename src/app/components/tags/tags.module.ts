import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags-component/tags.component';
import { TagsApi } from './tags-service/tags.api';
import { TagsService } from './tags-service/tags.service';



@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule
  ],
  providers: [
    TagsApi,
    TagsService
  ],
  exports: [
    TagsComponent
  ]
})
export class TagsModule { }
