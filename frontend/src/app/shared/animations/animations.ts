import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const breath = trigger('breath', [
  transition('* => true', [
    animate(
      '3s ease-in-out',
      style({
        transform: 'scale({{scale}})  translateX({{translate}})',
      })
    ),
    animate('3s ease-in-out', style({ transform: 'scale(1)  translateX(0)' })),
  ]),
]);

const imageReveal_keyframes = [
  style({ opacity: 0, transform: 'translateX(50px)', offset: 0 }),
  style({ opacity: 1, transform: 'translateX(-10px)', offset: 0.6 }),
  style({ transform: 'translateX(5px)', offset: 0.75 }),
  style({ transform: 'translateX(-2.5px)', offset: 0.9 }),
  style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 }),
];

export const imageReveal = trigger('imageReveal', [
  state('hidden', style({ opacity: 0, transform: 'translateX(50px)' })),
  state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('hidden => visible', [
    animate('800ms 200ms ease-out', keyframes(imageReveal_keyframes)),
  ]),
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(50px)' }),
    animate('800ms 200ms ease-out', keyframes(imageReveal_keyframes)),
  ]),
]);

export const reveal = trigger('reveal', [
  state('hidden', style({ opacity: 0, transform: 'translateX(-50px)' })),
  state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('hidden => visible', [animate('{{delay}}ms ease-out')]),
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-50px)' }),
    animate(
      '{{delay}}ms ease-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);

const fadeInUp_keyframes = [
  style({ opacity: 0, transform: 'translateY(100px)', offset: 0 }),
  style({ opacity: 1, transform: 'translateY(-20px)', offset: 0.6 }),
  style({ transform: 'translateY(10px)', offset: 0.75 }),
  style({ transform: 'translateY(-5px)', offset: 0.9 }),
  style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
];

export const fadeInUp = trigger('fadeInUp', [
  state('hidden', style({ opacity: 0, transform: 'translateY(100px)' })),
  state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('hidden => visible', [
    animate('{{delay}}ms ease-out', keyframes(fadeInUp_keyframes)),
  ]),
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(100px)' }),
    animate('{{delay}}ms ease-out', keyframes(fadeInUp_keyframes)),
  ]),
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-20px)' }),
    animate(
      '{{ delay }}ms ease-in-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '300ms ease-in-out',
      style({ opacity: 0, transform: 'translateY(-20px)' })
    ),
  ]),
]);
