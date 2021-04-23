import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

const optional = { optional: true };

export const routeTransitionAnimations = trigger('triggerName', [
    transition('One => Two', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ right: '-100%'})
        ]),
        group([
            query(':leave', [
                animate('700ms ease', style({ right: '100%'}))
            ], optional),
            query(':enter', [
                animate('700ms ease', style({ right: '0%'}))
            ]),
        ])
    ]),
    transition('Two => One', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ left: '-100%'})
        ]),
        group([
            query(':leave', [
                animate('700ms ease', style({ left: '100%'}))
            ], optional),
            query(':enter', [
                animate('700ms ease', style({ left: '0%'}))
            ]),
        ])
    ]),
]);