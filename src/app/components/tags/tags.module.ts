import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags-component/tags.component';
import { TagsApi } from './tags-service/tags.api';
import { TagsService } from './tags-service/tags.service';
import { ChipsModule } from '@components/chips/chips.module';



@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    ChipsModule
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
