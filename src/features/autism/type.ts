export interface InitialStateProps {
    currentQuestion: number;
    questions: TQuestion[],
    done:boolean;
}

export type TQuestion = {
    id: number;
    qa: string;
    answer: string;
}
