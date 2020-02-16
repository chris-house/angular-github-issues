
import { filter } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import * as issueActions from '../../store/actions';
import * as fromRoot from '../../store/reducers';
import { Issue } from '../../shared';



@Component({
    selector: 'app-repo-issues',
    templateUrl: './repo-issues.component.html',
    styleUrls: ['./repo-issues.component.css']
})
export class RepoIssuesComponent implements OnInit {

    public repoIssueCollection: Issue[] = [];
    public showErrorMessage = false;
    private _storeSubject: ActionsSubject;
    private _owner: string;
    private _repo: string;


    constructor(
        private store: Store<fromRoot.AppState>,
        private actionsSubject: ActionsSubject) {

        this.actionsSubject
            .asObservable().pipe(
                filter(action => action.type === issueActions.LOAD_ALL_ISSUES_SUCCESS))
            .subscribe((data: any) => {
                switch (data.type) {
                    case '[Issue] LOAD ALL SUCCESS':
                        if (data.payload.length === 0) {
                            this.showErrorMessage = true;
                        } else {
                            this.repoIssueCollection = data.payload;
                        }
                        break;
                    default:
                }
            });

    }

    ngOnInit() {
        this.store.select(fromRoot.getSelectedRepo).subscribe(data => {
            if (data) {
                this.store.dispatch(new issueActions.LoadAllIssues({ owner: data.owner.login, repo: data.name }));
            }
        });
    }
}
