import Resizer from 'react-image-file-resizer';

export const fileToBase64 = (file) => {
    return new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });
};

const memType = {
    'image/bmp': 'BMP',
    'image/gif': 'GIF',
    'image/x-icon': 'ICO',
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'image/svg+xml': 'SVG',
    'image/tiff': 'TIFF',
    'image/webp': 'WEBP'

};


export const resizeFile = (file, ext, type, width = 2000, height=2000) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            width,
            height,
            ext ? memType[ext] : 'JPEG',
            85,
            0,
            (uri) => {
                resolve(uri);
            },
            type
        );
    });


export const createImage = url =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.src = url;
    });

export function base64StringtoFile(base64String, filename) {
    var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type: mime})
}
