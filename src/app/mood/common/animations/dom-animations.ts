import { trigger, state, style, animate, transition } from '@angular/animations';

export const domAnimations = trigger(
    'inOutAnimation',
    [
        transition(
            ':enter',
            [
                style({ height: 0, opacity: 0 }),
                animate('0.3s ease-out',
                    style({ height: 300, opacity: 1 }))
            ]
        ),
        transition(
            ':leave',
            [
                style({ height: 300, opacity: 1 }),
                animate('0.3s ease-in',
                    style({ height: 0, opacity: 0 }))
            ]
        )
    ]
)