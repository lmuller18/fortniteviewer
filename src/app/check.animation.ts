import {
  trigger,
  state,
  animate,
  style,
  query as q,
  transition
} from '@angular/animations';

export const checkAnimation = trigger('changeState', [
  state(
    'true',
    style({
      opacity: '1'
    })
  ),
  state(
    'false',
    style({
      opacity: '.5'
    })
  ),
  transition('*=>*', animate('150ms'))
]);
