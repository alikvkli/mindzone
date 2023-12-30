import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialStateProps, TQuestion } from "./type";



const initialState: InitialStateProps = {
    currentQuestion: 1,
    done: false,
    questions: [
        {
            "id": 1,
            "qa": "İşleri tek başıma yapmaktansa başkaları ile birlikte yapmayı tercih ederim",
            "answer": ""
        },
        {
            "id": 2,
            "qa": "İşleri tekrar tekrar aynı şekilde yapmayı tercih ederim",
            "answer": ""
        },
        {
            "id": 3,
            "qa": "Hayal ederek zihnimde bir resim yaratmak benim için kolaydır",
            "answer": ""
        },
        {
            "id": 4,
            "qa": "Sıklıkla bir işe diğer işleri gözden kaçıracak kadar kendimi kaptırırım",
            "answer": ""
        },
        {
            "id": 5,
            "qa": "Sıklıkla diğerlerinin dikkat etmedikleri durumlarda, ben küçük gürültülere dikkat ederim",
            "answer": ""
        },
        {
            "id": 6,
            "qa": "Genellikle araba plakalarına veya benzer sıralı bilgilere dikkat ederim",
            "answer": ""
        },
        {
            "id": 7,
            "qa": "Ben nazik olduğumu düşünsem de, diğer insanlar sıklıkla söylediklerimin kaba olduğunu belirtiyorlar",
            "answer": ""
        },
        {
            "id": 8,
            "qa": "Bir hikaye okurken, karakterlerin neye benzediklerini kolaylıkla hayal edebilirim",
            "answer": ""
        },
        {
            "id": 9,
            "qa": "Olayların tarihlerini bilmekten çok hoşlanırım",
            "answer": ""
        },
        {
            "id": 10,
            "qa": "Sosyal bir ortamda, farklı insanların konuşmalarını kolaylıkla takip edebilirim",
            "answer": ""
        },
        {
            "id": 11,
            "qa": "Sosyal ortamlarda rahat ederim",
            "answer": ""
        },
        {
            "id": 12,
            "qa": "Diğerlerinin dikkat etmediği ayrıntılara dikkat etme eğilimindeyim",
            "answer": ""
        },
        {
            "id": 13,
            "qa": "Kütüphaneye gitmeyi bir partiye tercih ederim",
            "answer": ""
        },
        {
            "id": 14,
            "qa": "Hikaye uydurmak bana kolay gelir",
            "answer": ""
        },
        {
            "id": 15,
            "qa": "Cansız şeylerden çok insanlar ilgimi çeker",
            "answer": ""
        },
        {
            "id": 16,
            "qa": "Derin ilgi alanlarım vardır ancak ya sürdüremezsem diye üzülürüm",
            "answer": ""
        },
        {
            "id": 17,
            "qa": "Sosyal muhabbetten (lak-lak) hoşlanırım",
            "answer": ""
        },
        {
            "id": 18,
            "qa": "Ben konuşurken, başkalarının söze girmek istedilerini hiç fark etmiyorum",
            "answer": ""
        },
        {
            "id": 19,
            "qa": "Rakamlarla ilgilenirim",
            "answer": ""
        },
        {
            "id": 20,
            "qa": "Bir hikaye okurken karakterlerin niyetlerini çıkarsamak bana zor gelir",
            "answer": ""
        },
        {
            "id": 21,
            "qa": "Kurgu okumaktan özellikle hoşlanmam (yazar tarafından hayal edilerek yazılmış hikaye, roman gibi eserler)",
            "answer": ""
        },
        {
            "id": 22,
            "qa": "Yeni arkadaşlar edinmeyi zor bulurum",
            "answer": ""
        },
        {
            "id": 23,
            "qa": "Her zaman işlerdeki kalıplara dikkat ederim",
            "answer": ""
        },
        {
            "id": 24,
            "qa": "Tiyatroya gitmeyi, müzeye gitmeye tercih ederim",
            "answer": ""
        },
        {
            "id": 25,
            "qa": "Günlük rutinim (alıştığım günlük düzenimin) bozulması beni üzmez",
            "answer": ""
        },
        {
            "id": 26,
            "qa": "Sık sık sohbetin akışını nasıl sürdüreceğimi bilmediğimi düşünürüm",
            "answer": ""
        },
        {
            "id": 27,
            "qa": "Birisi benimle konuşuyorken “satır aralarını okumayı” kolay bulurum",
            "answer": ""
        },
        {
            "id": 28,
            "qa": "Resmin bütününe, genellikle küçük ayrıntılardan daha çok konsantre olurum",
            "answer": ""
        },
        {
            "id": 29,
            "qa": "Telefon numaralarını hatırlamada çok iyi değilimdir",
            "answer": ""
        },
        {
            "id": 30,
            "qa": "Bir durum veya bir insanın görünüşündeki küçük değişikliklere sıklıkla dikkat etmem",
            "answer": ""
        },
        {
            "id": 31,
            "qa": "Beni dinleyen biri sıkılmaya başladıysa bunu hissedebilirim",
            "answer": ""
        },
        {
            "id": 32,
            "qa": "Bir defada birden çok şey yapmak bana kolay gelir",
            "answer": ""
        },
        {
            "id": 33,
            "qa": "Telefonda konuşurken, konuşma sırasının ne zaman bende olduğundan emin olamam",
            "answer": ""
        },
        {
            "id": 34,
            "qa": "İşleri spontan (içimden geldiği gibi) olarak yapmaktan hoşlanırım",
            "answer": ""
        },
        {
            "id": 35,
            "qa": "Şakanın püf (can alıcı) noktasını en son anlayan sıklıkla benimdir",
            "answer": ""
        },
        {
            "id": 36,
            "qa": "Kişinin sadece yüzüne bakarak, ne düşündüğünü veya hissettiğini çıkarsamayı kolay bulurum",
            "answer": ""
        },
        {
            "id": 37,
            "qa": "Eğer birisi yapmakta olduğum işi bölerse o işe çok çabuk geri dönebilirim",
            "answer": ""
        },
        {
            "id": 38,
            "qa": "Sosyal muhabbette iyiyimdir",
            "answer": ""
        },
        {
            "id": 39,
            "qa": "İnsanlar sıklıkla sürekli aynı şey üzerinde uğraştığımı söylerler",
            "answer": ""
        },
        {
            "id": 40,
            "qa": "Küçükken, diğer çocuklar ile rol yapmayı da içeren oyunlar oynamaktan hoşlanırdım",
            "answer": ""
        },
        {
            "id": 41,
            "qa": "Bazı şeylerin kategorileri (sınıfları) hakkında bilgi toplamayı severim (örn; araba tipleri, kuş tipleri, tren tipleri, bitki tipleri vs",
            "answer": ""
        },
        {
            "id": 42,
            "qa": "Başka biri gibi olmanın neye benzeyebileceğini hayal etmek bana zor gelir",
            "answer": ""
        },
        {
            "id": 43,
            "qa": "Katıldığım etkinlikleri özenle planlamaktan hoşlanırım",
            "answer": ""
        },
        {
            "id": 44,
            "qa": "Önemli günlerden (doğum günü partisi, düğün,…) hoşlanırım",
            "answer": ""
        },
        {
            "id": 45,
            "qa": "İnsanların niyetlerini anlamak bana zor gelir",
            "answer": ""
        },
        {
            "id": 46,
            "qa": "Yeni durumlar beni kaygılandırır",
            "answer": ""
        },
        {
            "id": 47,
            "qa": "Yeni insanlarla tanışmaktan hoşlanırım",
            "answer": ""
        },
        {
            "id": 48,
            "qa": "İyi bir diplomatımdır (insan ilişkilerinde her iki tarafı da idare edip çıkarlarımı korumayı bilirim)",
            "answer": ""
        },
        {
            "id": 49,
            "qa": "İnsanların doğum günlerini hatırlamakta iyi değilimdir",
            "answer": ""
        },
        {
            "id": 50,
            "qa": "Çocuklarla rol yapmayı da içeren oyunlar oynamak bana çok kolay gelir",
            "answer": ""
        }
    ]

}

const autism = createSlice({
    name: "autism",
    initialState,
    reducers: {
        answerQuestion: (state, action: PayloadAction<string>) => {
            if (state.currentQuestion < 50) {
                console.log(state.currentQuestion);
                state.currentQuestion = state.currentQuestion + 1;
                const findIndex = state.questions.findIndex(item => item.id === state.currentQuestion);
                if (findIndex !== -1) {
                    state.questions[findIndex].answer = action.payload;
                }
            } else {
                state.done = true;
                return;
            }
        },
    }
})
    ;

export const {
    answerQuestion
} = autism.actions;

export default autism.reducer;