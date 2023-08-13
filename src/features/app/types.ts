export interface InitialStateProps {
    images: ImageProps[] | undefined;
}

export interface ImageProps {
    id:string;
    date: string;
    file: string;
}