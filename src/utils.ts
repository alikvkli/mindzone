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


export const generateSelfManikin = () => {

    const data = [
        {
            "emotion": "negative",
            "path": "negative/1"
        },
        {
            "emotion": "negative",
            "path": "negative/2"
        },
        {
            "emotion": "negative",
            "path": "negative/3"
        },
        {
            "emotion": "negative",
            "path": "negative/4"
        },
        {
            "emotion": "negative",
            "path": "negative/5"
        },
        {
            "emotion": "negative",
            "path": "negative/6"
        },
        {
            "emotion": "negative",
            "path": "negative/7"
        },
        {
            "emotion": "negative",
            "path": "negative/8"
        },
        {
            "emotion": "negative",
            "path": "negative/9"
        },
        {
            "emotion": "negative",
            "path": "negative/10"
        },
        {
            "emotion": "negative",
            "path": "negative/11"
        },
        {
            "emotion": "negative",
            "path": "negative/12"
        },
        {
            "emotion": "negative",
            "path": "negative/13"
        },
        {
            "emotion": "negative",
            "path": "negative/14"
        },
        {
            "emotion": "negative",
            "path": "negative/15"
        },
        {
            "emotion": "negative",
            "path": "negative/16"
        },
        {
            "emotion": "negative",
            "path": "negative/17"
        },
        {
            "emotion": "negative",
            "path": "negative/18"
        },
        {
            "emotion": "notr",
            "path": "notr/1"
        },
        {
            "emotion": "notr",
            "path": "notr/2"
        },
        {
            "emotion": "notr",
            "path": "notr/3"
        },
        {
            "emotion": "notr",
            "path": "notr/4"
        },
        {
            "emotion": "positive",
            "path": "positive/1"
        },
        {
            "emotion": "positive",
            "path": "positive/2"
        },
        {
            "emotion": "positive",
            "path": "positive/3"
        },
        {
            "emotion": "positive",
            "path": "positive/4"
        },
        {
            "emotion": "positive",
            "path": "positive/5"
        },
        {
            "emotion": "positive",
            "path": "positive/6"
        },
        {
            "emotion": "positive",
            "path": "positive/7"
        },
        {
            "emotion": "positive",
            "path": "positive/8"
        }
    ];
    for (let i = data.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }

    return data;

}

export const generateEyes = () => {
    return [
        {
            "id": 1,
            "path": "eyes/1",
            "buttons": [
                "kıskanmış",
                "panik içinde",
                "küstah",
                "nefret dolu"
            ]
        },
        {
            "id": 2,
            "path": "eyes/2",
            "buttons": [
                "şen",
                "rahatlatıcı",
                "irrite olmuş",
                "sıkılmış"
            ]
        },
        {
            "id": 3,
            "path": "eyes/3",
            "buttons": [
                "ödü kopmuş",
                "üzgün",
                "küstah",
                "sinir olmuş"
            ]
        },
        {
            "id": 4,
            "path": "eyes/4",
            "buttons": [
                "muzip",
                "telaşlı",
                "çok istekli",
                "ikna olmuş"
            ]
        },
        {
            "id": 5,
            "path": "eyes/5",
            "buttons": [
                "muzip",
                "ısrarcı",
                "eğlenen",
                "gevşemiş"
            ]
        },
        {
            "id": 6,
            "path": "eyes/6",
            "buttons": [
                "irrite olmuş",
                "alaycı",
                "endişeli",
                "samimi"
            ]
        },
        {
            "id": 7,
            "path": "eyes/7",
            "buttons": [
                "dona kalmış",
                "hayal kuran",
                "sabırsız",
                "dikkat kesilmiş"
            ]
        },
        {
            "id": 8,
            "path": "eyes/8",
            "buttons": [
                "mahcup",
                "samimi",
                "huzursuz",
                "çökmüş"
            ]
        },
        {
            "id": 9,
            "path": "eyes/9",
            "buttons": [
                "umutsuzluğa kapılmış",
                "rahatlamış",
                "içine kapanık",
                "heyecanlı"
            ]
        },
        {
            "id": 10,
            "path": "eyes/10",
            "buttons": [
                "sinir olmuş",
                "düşmanca",
                "dehşete düşmüş",
                "kafası meşgul"
            ]
        },
        {
            "id": 11,
            "path": "eyes/11",
            "buttons": [
                "temkinli",
                "ısrarcı",
                "sıkılmış",
                "dona kalmış"
            ]
        },
        {
            "id": 12,
            "path": "eyes/12",
            "buttons": [
                "ödü kopmuş",
                "eğlenen",
                "pişman olmuş",
                "cilveli"
            ]
        },
        {
            "id": 13,
            "path": "eyes/13",
            "buttons": [
                "umursamaz",
                "utanmış",
                "şüpheci",
                "çökmüş"
            ]
        },
        {
            "id": 14,
            "path": "eyes/14",
            "buttons": [
                "kararlı",
                "beklenti içinde",
                "tehditkar",
                "içine kapanık"
            ]
        },
        {
            "id": 15,
            "path": "eyes/15",
            "buttons": [
                "irrite olmuş",
                "hayal kırıklığına uğramış",
                "sıkıntılı",
                "itham eden"
            ]
        },
        {
            "id": 16,
            "path": "eyes/16",
            "buttons": [
                "derin düşüncelere dalmış",
                "telaşlı",
                "cesaretlendiren",
                "eğlenen"
            ]
        },
        {
            "id": 17,
            "path": "eyes/17",
            "buttons": [
                "irrite olmuş",
                "düşünceli",
                "cesaretlendiren",
                "rahatlatıcı"
            ]
        },
        {
            "id": 18,
            "path": "eyes/18",
            "buttons": [
                "kuşkulu",
                "şefkatli",
                "şen",
                "dona kalmış"
            ]
        },
        {
            "id": 19,
            "path": "eyes/19",
            "buttons": [
                "kararlı",
                "eğlenen",
                "dona kalmış",
                "sıkılmış"
            ]
        },
        {
            "id": 20,
            "path": "eyes/20",
            "buttons": [
                "küstah",
                "minnettar",
                "alaycı",
                "çekingen"
            ]
        },
        {
            "id": 21,
            "path": "eyes/21",
            "buttons": [
                "dominant",
                "samimi",
                "suçluluk duyan",
                "dehşete düşmüş"
            ]
        },
        {
            "id": 22,
            "path": "eyes/22",
            "buttons": [
                "utanmış",
                "hayal kuran",
                "kafası karışık",
                "panik içinde"
            ]
        },
        {
            "id": 23,
            "path": "eyes/23",
            "buttons": [
                "kafası meşgul",
                "minnettar",
                "ısrarcı",
                "yalvaran"
            ]
        },
        {
            "id": 24,
            "path": "eyes/24",
            "buttons": [
                "halinden memnun",
                "mahcup",
                "direnen",
                "merak içinde"
            ]
        },
        {
            "id": 25,
            "path": "eyes/25",
            "buttons": [
                "dalgın",
                "irrite olmuş",
                "heyecanlı",
                "düşmanca"
            ]
        },
        {
            "id": 26,
            "path": "eyes/26",
            "buttons": [
                "panik içinde",
                "inanamayan",
                "umutsuzluğa kapılmış",
                "ilgili"
            ]
        },
        {
            "id": 27,
            "path": "eyes/27",
            "buttons": [
                "dikkat kesilmiş",
                "içine kapanık",
                "düşmanca",
                "kaygılı"
            ]
        },
        {
            "id": 28,
            "path": "eyes/28",
            "buttons": [
                "muzip",
                "temkinli",
                "küstah",
                "güven veren"
            ]
        },
        {
            "id": 29,
            "path": "eyes/29",
            "buttons": [
                "ilgili",
                "muzip",
                "şefkatli",
                "halinden memnun"
            ]
        },
        {
            "id": 30,
            "path": "eyes/30",
            "buttons": [
                "sabırsız",
                "dona kalmış",
                "irrite olmuş",
                "tefekküre dalmış"
            ]
        },
        {
            "id": 31,
            "path": "eyes/31",
            "buttons": [
                "minnettar",
                "cilveli",
                "düşmanca",
                "hayal kırıklığına uğramış"
            ]
        },
        {
            "id": 32,
            "path": "eyes/32",
            "buttons": [
                "ezilip büzülen",
                "kendinden emin",
                "muzip",
                "çökmüş"
            ]
        },
        {
            "id": 33,
            "path": "eyes/33",
            "buttons": [
                "ciddi",
                "ezilip büzülen",
                "afallamış",
                "dikkat kesilmiş"
            ]
        },
        {
            "id": 34,
            "path": "eyes/34",
            "buttons": [
                "utanmış",
                "suçluluk duyan",
                "hayal kuran",
                "tedirgin"
            ]
        },
        {
            "id": 35,
            "path": "eyes/35",
            "buttons": [
                "dona kalmış",
                "şaşkına dönmüş",
                "karşısındakine güvenmeyen",
                "ödü kopmuş"
            ]
        },
        {
            "id": 36,
            "path": "eyes/36",
            "buttons": [
                "aklı kalmış",
                "sinirli",
                "ısrarcı",
                "derin düşüncelere dalmış"
            ]
        },
        {
            "id": 37,
            "path": "eyes/37",
            "buttons": [
                "ezilip büzülen",
                "sinirli",
                "şüphelenen",
                "kararsız"
            ]
        }
    ]
}

export const generateExpression = (rule: 'letter' | 'number'): { rule: 'letter' | 'number', output: string } => {

    const vowels = ['A', 'E', 'I', 'U'];
    const consonants = ['G', 'K', 'M', 'R'];
    const oddNumbers = [3, 5, 7, 9];
    const evenNumbers = [2, 4, 6, 8];

    function getRandomElement(arr: string[] | number[]) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    let output = '';
    if (rule === 'letter' || rule === 'number') {
        const letter = Math.random() < 0.5 ? getRandomElement(consonants) : getRandomElement(vowels);
        const number = Math.random() < 0.5 ? getRandomElement(oddNumbers) : getRandomElement(evenNumbers);
        output = `${letter}${number}`;
    }

    return {
        rule,
        output,
    };
}

export const getRuleDetail = (rule: 'letter' | 'number'): string => {
    if (rule === "letter") {
        return "Sessiz harf ise X, sesli harf ise Y'ye basın";
    } else {
        return "Tek sayı ise X, çift sayı ise Y'ye basın."
    }
}

export const generateColor = () => {
    const colors = [
        {
            text: "YEŞİL",
            colorCode: "#dfdf00"
        },
        {
            text: "MAVİ",
            colorCode: "#008000"
        },
        {
            text: "KIRMIZI",
            colorCode: "#0000FF"
        },
        {
            text: "SARI",
            colorCode: "#FF0000"
        },
        {
            text: "MOR",
            colorCode: "#ff00ff"
        },
        {
            text: "PEMBE",
            colorCode: "#FFA500"
        },
    ]

    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex]
}


export const generateWeek2Task1 = () => {
    const genders = ['male', 'female'];
    const selectedGender = genders[Math.floor(Math.random() * genders.length)];

    const folderNames: string[] = Array.from({ length: 15 }, (_, index) => {
        const folderNumber = index + 1;
        const paddedFolderNumber = folderNumber < 10 ? `0${folderNumber}` : `${folderNumber}`;
        return `${selectedGender === 'male' ? 'AM' : 'AF'}${paddedFolderNumber}`;
    });

    const selectedFiles: { show: boolean, name: string }[] = [];
    const fileNamePool = ['AFS', 'ANS', 'DIS', 'HAS', 'NES', 'SAS', 'SUS'];

    const selectedFolder = Math.floor(Math.random() * folderNames.length);

    let folderFileName1 = fileNamePool[Math.floor(Math.random() * fileNamePool.length)];
    selectedFiles.push({
        show: true,
        name: `${selectedGender}/${folderNames[selectedFolder]}/${folderNames[selectedFolder] + folderFileName1}`
    })

    let folderFileName2 = fileNamePool[Math.floor(Math.random() * fileNamePool.length)];
    do {
        folderFileName2 = fileNamePool[Math.floor(Math.random() * fileNamePool.length)];
    } while (folderFileName1 === folderFileName2)

    selectedFiles.push({
        show: true,
        name: `${selectedGender}/${folderNames[selectedFolder]}/${folderNames[selectedFolder] + folderFileName2}`
    })


    let selectDifferentFolder1 = Math.floor(Math.random() * folderNames.length);

    do {
        selectDifferentFolder1 = Math.floor(Math.random() * folderNames.length);
    } while (selectDifferentFolder1 === selectedFolder)
    selectedFiles.push({
        show: true,
        name: `${selectedGender}/${folderNames[selectDifferentFolder1]}/${folderNames[selectDifferentFolder1] + folderFileName1}`
    })


    let selectDifferentFolder2 = Math.floor(Math.random() * folderNames.length);
    selectDifferentFolder2 = Math.floor(Math.random() * folderNames.length);
    do {
        selectDifferentFolder1 = Math.floor(Math.random() * folderNames.length);
    } while (selectDifferentFolder2 === selectedFolder || selectDifferentFolder2 === selectDifferentFolder1)

    selectedFiles.push({
        show: true,
        name: `${selectedGender}/${folderNames[selectDifferentFolder2]}/${folderNames[selectDifferentFolder2] + folderFileName2}`
    })


    const result: { gender: string, output: { show: boolean, name: string }[] } = {
        gender: selectedGender,
        output: selectedFiles.sort(() => Math.random() - 0.5),
    };

    return result;
}