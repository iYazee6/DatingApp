import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerErrorComponent } from './Errors/server-error/server-error.component';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '',                 component: HomeComponent },
  { path:'',
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'members',      component: MemberListComponent },
      // { path: 'members/:id',  component: MemberDetailComponent },
      { path: 'members/:username',  component: MemberDetailComponent },
      { path: 'lists',        component: ListsComponent },
      { path: 'messages',     component: MessagesComponent }
    ]
  },
  { path:'errors',            component: TestErrorsComponent },
  { path:'404',               component: NotFoundComponent },
  { path:'server-error',      component: ServerErrorComponent },
  { path: '**',               component:NotFoundComponent, pathMatch: 'full' } 
  // This is wild card path match (to catch errors)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
