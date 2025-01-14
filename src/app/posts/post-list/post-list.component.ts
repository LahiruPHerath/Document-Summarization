import { NgFor, NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../post.model';
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    standalone: true,
    imports: [MatExpansionModule, NgFor, NgIf, HttpClientModule],
    providers: [PostsService]
})
export class PostListComponent implements OnInit, OnDestroy {
    // posts = [
    //     {title: 'First Post', content: 'This is the first post\'s content'},
    //     {title: 'Second Post', content: 'This is the second post\'s content'},
    //     {title: 'Third Post', content: 'This is the third post\'s content'}
    // ]
    posts: Post[] = [];
    isLoading = false;
    totalPosts = 0;
    postPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1, 2, 5, 10];
    userIsAuthenticated = false;
    private postSub: Subscription;
    private authStatusSub: Subscription;

    constructor(public postsService: PostsService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.isLoading = true;
        console.log("Initializing post list component");
        this.posts = this.postsService.getPosts();
        this.postSub = this.postsService.getPostUpdateListener()
            .subscribe((posts: Post[]) => {
                this.posts = posts;
            });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
            })
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId);
    }

    ngOnDestroy() {
        console.log("PostListComponent: ngOnDestroy called");
        this.postSub.unsubscribe();
    }
}