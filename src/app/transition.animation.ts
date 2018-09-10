import {
  trigger,
  stagger,
  animate,
  style,
  state,
  query as q,
  transition
} from '@angular/animations';

export function query(s, a, o = { optional: true }) {
  return q(s, a, o);
}
// const query = (s, a, o = { optional: true }) => q(s, a, o);

export const transitionAnimation = trigger('transitionAnimation', [
  transition(':enter', [
    query('.block', style({ opacity: 0 })),
    query(
      '.block',
      stagger(300, [
        style({ transform: 'translateY(100px)' }),
        animate(
          '1s cubic-bezier(.75,-0.48,.26,1.52)',
          style({ transform: 'translateY(0px)', opacity: 1 })
        )
      ])
    )
  ]),
  transition(':leave', [
    query(
      '.block',
      stagger(300, [
        style({ transform: 'translateY(0px)', opacity: 1 }),
        animate(
          '1s cubic-bezier(.75,-0.48,.26,1.52)',
          style({ transform: 'translateY(100px)', opacity: 0 })
        )
      ])
    )
  ])
]);
