import { v4 as uuidv4 } from 'uuid';

export type TRandomImage = {
    id: string;
    shape: 'cross' | 'dot' | 'star' | 'triangle';
    number: 1 | 2 | 3 | 4;
    color: 'blue' | 'green' | 'red' | 'yellow';
    rule: 'Rule1' | 'Rule2' | 'Rule3';
    image: string;
}

export const generateRandomImage = (): TRandomImage => {

    const colors = ['blue', 'green', 'red', 'yellow'];
    const numbers = [1, 2, 3, 4];
    const shapes = ['Crosses', 'Dots', 'Stars', 'Triangles']
    const rules = ['Rule1', 'Rule2', 'Rule3'];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomRule = rules[Math.floor(Math.random() * rules.length)];

    const resultString = `${randomNumber}${randomColor}${randomShape}.jpg`;

    let readableShape = "triangle";
    if (randomShape === "Crosses") {
        readableShape = "cross"
    } else if (randomShape === "Dots") {
        readableShape = "dot"
    } else if (randomShape === "Stars") {
        readableShape = "star";
    } else {
        readableShape = "triangle";
    }

    return {
        id: uuidv4(),
        shape: readableShape as never,
        number: randomNumber as never,
        color: randomColor as never,
        image: resultString,
        rule: randomRule as never,
    };
}


export const generateRandomSequence = (sequenceLength: number = 1, sequences: string[]): string[] => {
    const alphabet = 'ABCDEHIKLMOPRST';
    const newSequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        newSequence.push(alphabet[randomIndex]);
    }

    if (sequences.length >= 4) {
        const lastFourElements = sequences.slice(-4);
        if (Math.random() < 0.5) {
            const randomIndex = Math.floor(Math.random() * lastFourElements.length);
            newSequence.push(lastFourElements[randomIndex]);
        }

    }
    return newSequence;
};
