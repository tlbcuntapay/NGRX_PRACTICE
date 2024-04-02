import { createAction, props } from '@ngrx/store';

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');

export const customIncrement = createAction(
  'customincrement',
  props<{ count: number }>()
);

export const changeDevName = createAction('change dev name');

// export const customIncrement = (payload: { value: number }) => {
//   return { type: 'CUSTOM_INCREMENT', payload };
// };
