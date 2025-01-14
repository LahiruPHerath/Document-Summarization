import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { PostsService } from '../posts.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css'],
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatError, NgIf, HttpClientModule],
    providers: [PostsService]
})
export class PostCreateComponent {
    enteredTitle = '';
    enteredContent = '';

    constructor(public postsService: PostsService) { }

    onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        console.log(form.value.title);
        this.postsService.addPost(form.value.title, form.value.content);
        form.resetForm();
    }
}