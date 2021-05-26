import { trigger, state, style, animate, transition } from '@angular/animations';

export const stickyAnimation = trigger(
    'stickyScroll',
    [
        state('up', style({ position: 'absolute'})),
        state('down', style({ position: 'absolute'})),
        transition(
            'up <=> down',
            [
                style({ opacity: 1 }),
                animate('0.1s ease-out',
                    style({ opacity: 0 }))
            ]
        ),
    ]
)