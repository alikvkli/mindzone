export interface InitialStateProps {
    appName: string;
    step: TStep;
}


type TStep = {
    week: number;
    task: number;
}
