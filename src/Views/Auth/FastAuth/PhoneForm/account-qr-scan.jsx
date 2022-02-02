import React, { useState } from 'react'
import QrReader from 'react-web-qr-reader'
import { CloseSvg } from '../../../../Icons/Close';
import { IconBox } from '../../../../UIComponents/GlobalStyles';
import { Title } from '../../../../UIComponents/Typography/Title';
import { AccountQRScanWrapper } from '../../style';

export const AccountQRScan = ({ setOpenScan }) => {
    const [result, setResult] = useState('No result');

    const delay = 500;
    const previewStyle = {
        height: 250,
        width: 250,
    };


    const handleScan = (result) => {
        if (result) {
            setResult(result);
        }
    };

    const handleError = (error) => {
        console.log(error);
    };

    console.log(result);


    return (
        <AccountQRScanWrapper>
            <IconBox onClick={() => setOpenScan(false)}>
                <CloseSvg />
            </IconBox>
            <Title>QRCodni kameraga yaqinlashtiring</Title>
            <QrReader
                style={previewStyle}
                delay={delay}
                onScan={handleScan}
                onError={handleError}
            />
        </AccountQRScanWrapper>
    )
}