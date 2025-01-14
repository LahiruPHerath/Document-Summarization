import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', component: PostListComponent }, // Default route
    { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] }, // Route for creating a post
    { path: 'login', component: LoginComponent},// Route for login
    { path: 'signup', component: SignupComponent }, // Route for signin

];