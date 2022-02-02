import QR from 'qrcode-base64'

export const generateQrCodeBase64 = (data) => {
    return QR.drawImg(data, {
        typeNumber: 4,
        errorCorrectLevel: 'L',
        size: 400,
    })
}