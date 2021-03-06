import { Injectable } from '@angular/core';

const list = [
    'anger',
    'stress',
    'void',
    'sick',
    'love',
    'fear',
    'relax',
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
    public getAll(): string[] {
        return list
    }

    public getOuterJoin(activeEmotions: string[]): string[] {
        let array = list.filter(e => activeEmotions.indexOf(e) === -1)
        return array
    }
}