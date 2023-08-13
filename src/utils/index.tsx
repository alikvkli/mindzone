export const base64ToBlob = (base64Data: string): Blob => {
    const byteString = atob(base64Data.split(",")[1]);
    const mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], {type: mimeString});
}


export const BlobToObjectUrl = (blob: Blob): string => {
    return URL.createObjectURL(blob);
}

export const getImageDimensions = (image: HTMLImageElement) => {
    return {width: image.width, height: image.height};
};