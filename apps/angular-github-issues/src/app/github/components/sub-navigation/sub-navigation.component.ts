import { Component } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import * as userActions from '../../store/actions';
import * as fromRoot from '../../store/reducers';
import { User } from '../../shared';

@Component({
    selector: 'app-gsub-navigation',
    templateUrl: './sub-navigation.component.html',
    styleUrls: ['./sub-navigation.component.css']
})
export class SubNavigationComponent {

    public login = '';
    public user: User;
    constructor(private store: Store<fromRoot.AppState>,
        private actionsSubject: ActionsSubject) {
        this.store.select(fromRoot.getSelectedUserId).subscribe(data => {
            if (data) {
                this.login = data;
                // need to dispatch getting the full user object
                this.store.dispatch(new userActions.LoadFullUser({ login: this.login }));
            }
        });

        this.actionsSubject
            .asObservable()
            .subscribe((data: any) => {
                switch (data.type) {
                    case '[User] LOAD FULL USER SUCCESS':
                        this.user = data.payload;
                        console.log(this.user);
                        break;
                    default:
                }
            });
    }
}
