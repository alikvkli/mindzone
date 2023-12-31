
export type TRandomImage = {
    shape: 'cross' | 'dot' | 'star' | 'triangle';
    number: 1 | 2 | 3 | 4;
    color: 'blue' | 'green' | 'red' | 'yellow';
    image: string;
}

export const generateRandomImage = (): TRandomImage => {

    const colors = ['blue', 'green', 'red', 'yellow'];
    const numbers = [1, 2, 3, 4];
    const shapes = ['Crosses', 'Dots', 'Stars', 'Triangles']

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

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
        shape: readableShape as never,
        number: randomNumber as never,
        color: randomColor as never,
        image: resultString
    };
}