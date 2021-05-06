import { Injectable } from '@angular/core';

const shortName = [
    'anger',
    'stress',
    'void',
    'sick',
    'love',
    'fear',
    'relax',
]

const longName = [
    'ansiety',
    'optimistic',
    'nervous',
    'depression',
    'motivated',
    'creative',
    'sadness',
    'happiness',
]

@Injectable({
    providedIn: 'root'
})

export class emotions {
    public getSpan(emotion: string) {
        if(longName.includes(emotion)) {
            return 'span 2'
        }

        if(shortName.includes(emotion)) {
            return 'span 1'
        }

        return 'span 1'
    }
}