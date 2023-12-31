export interface InitialStateProps {
    appName: string;
    appDescription: string;
    step: TStep;
    isLogin: boolean;
    initalFlow: TInitialFlow;
}


type TStep = {
    week: number;
    task: number;
}

type TInitialFlow = {
    step_1: boolean;
}
