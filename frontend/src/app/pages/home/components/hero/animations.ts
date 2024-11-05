import { animate, style, transition, trigger } from '@angular/animations';

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
