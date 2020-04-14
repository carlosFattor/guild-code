import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { UserModel } from '@domain/user.model';
import { TagsService } from '../tags-service/tags.service';


@Component({
  selector: 'gc-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit {

  inputTag = false;
  @Input() user: UserModel | null = null;

  constructor(
    private tagService: TagsService
  ) { }

  ngOnInit(): void {
    this.tagService.userTags = this.user.tags;
    this.tagService.userEmail = this.user.email;
  }

  showInputTag(value: boolean): void {
    this.inputTag = value;
  }

  addTag($event: any): void {
    const value = $event.value;
    this.tagService.addTags(value);
    this.inputTag = false;
    this.user.tags = this.tagService.userTags;
  }

  removeTag(tag: string): void {
    this.tagService.removeTag(tag);
    this.user.tags = this.tagService.userTags;
  }

}
