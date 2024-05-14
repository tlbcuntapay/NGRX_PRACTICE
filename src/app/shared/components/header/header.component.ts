import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, concat, of } from 'rxjs';
import { autoLogout } from 'src/app/auth/state/auth.actions';
import { isLoggedIn } from 'src/app/auth/state/auth.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: Observable<boolean>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isLoggedIn = this.store.select(isLoggedIn);

  }
  
  onLogOut(event: Event): void {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
