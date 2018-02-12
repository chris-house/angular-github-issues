import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ActionsSubject, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as userActions from '@app/github/store/actions';
import * as fromRoot from '@app/github/store/reducers';
import { GithubService } from '@app/github/shared/services';
import { User } from '@app/github/shared/models';

@Component({
    selector: 'app-user-auth',
    templateUrl: './auth.component.html'
})
export class UserAuthComponent implements OnInit {

    public code: any;
    public token = '';
    public user: any = null;
    constructor(
        public afAuth: AngularFireAuth,
        private route: ActivatedRoute,
        private router: Router,
        private githubService: GithubService,
        private _http: HttpClient) {

            firebase.auth().getRedirectResult().then((result) => {
                if (result.credential) {
                  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                  this.token = result.credential.accessToken;
                  // ...
                }
                // The signed-in user info.
                this.user = result.user;
              }).catch((error) => {
                console.log(error);
              });
    }

    ngOnInit() {
    }

    signIn() {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    signOut() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            // todo: put this in the redux store
            this.user = undefined;
            this.token = '';
          }).catch((error) => {
            console.log(error);
          });
    }

}
