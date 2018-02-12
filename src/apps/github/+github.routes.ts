import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubComponent } from './+github.component';
import { UserExistsGuard } from './guards';
import { RepoSearchComponent,
  RepoIssuesComponent,
  UserSearchComponent,
  UserFollowerComponent,
  UserFollowingComponent,
  UserReposComponent,
  UserGistsComponent,
  UserAuthComponent
} from '@app/github';
import { NotFoundComponent } from '@core/components/not-found';

const routes: Routes = [
  {
    path: '',
    component: GithubComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'search' },
      { path: 'search', component: RepoSearchComponent },
      { path: 'issues', component: RepoIssuesComponent },
      { path: 'user', component: UserSearchComponent },
      { path: 'followers/:id', canActivate: [ UserExistsGuard ], component: UserFollowerComponent},
      { path: 'following/:id', canActivate: [ UserExistsGuard ], component: UserFollowingComponent},
      { path: 'repos/:id', canActivate: [ UserExistsGuard ], component: UserReposComponent},
      { path: 'gists/:id', canActivate: [ UserExistsGuard ], component: UserGistsComponent},
      { path: 'auth_redirect', component: UserAuthComponent },
      { path: 'auth', component: UserAuthComponent }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubRoutingModule { }
