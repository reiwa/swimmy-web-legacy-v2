import { Component, Input } from '@angular/core';

import { createdAt } from '../helpers/createdAt';
import { AngularFireAuth } from 'angularfire2/auth';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-list-item-post',
  templateUrl: './list-item-post.component.html',
  styleUrls: ['./list-item-post.component.css']
})
export class ListItemPostComponent {
  @Input() content: string;

  @Input() createdAt: string;

  @Input() id: string;

  @Input() images: string[];

  @Input() owner: object;

  @Input() ownerId: string;

  @Input() plus;

  @Input() repliedPostIds: string[];

  @Input() replyPostIds: string[];

  @Input() tags;

  @Input() updatedAt: string;

  public isOpen = false;

  public newTag = '';

  constructor(
    public afAuth: AngularFireAuth,
    private posts: PostsService) {
  }

  private onOpenClick() {
    this.isOpen = !this.isOpen;
  }

  public get createdAtStr() {
    return createdAt(this.createdAt);
  }

  public onUpdateTagClick(name = 'like') {
    const variables = {
      id: this.id,
      name: name
    };
    this.posts.updateTag(variables)
      .subscribe(() => {
      }, (err) => {
        console.log(err);
      });
  }

  public onAddTagClick() {
    const variables = {
      id: this.id,
      name: this.newTag
    };
    this.posts.updateTag(variables)
      .subscribe(() => {
      }, (err) => {
        console.log(err);
      });
  }
}
