import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { changeDevName, customIncrement } from '../state/counter.actions';
import { getDeveloperName } from '../state/counter.selector';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;
  developerName$!: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.developerName$ = this.store.select(getDeveloperName);
    
  }

  onAdd() {
    this.store.dispatch(customIncrement({count: +this.value}));
    console.log(this.value);
  }

  onChangeDevName() {
    this.store.dispatch(changeDevName());
  }
}
