import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';
import { setLoadingSpinner } from './shared.actions';

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(
  getSharedState,
  (state) => state.showloading
);
