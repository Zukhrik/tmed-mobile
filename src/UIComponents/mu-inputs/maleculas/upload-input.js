import React, {useRef} from 'react';
import {Button} from '../../Button';
import {IconBox} from '../../GlobalStyles';
import {UploadInputWrapper} from '../atoms';
import {useTranslation} from 'react-i18next';
import {CloseSvg} from '../../../Icons/Close';
import {AttachSvg} from '../../../Icons/Attach';

export const UploadInput = ({value, onChange}) => {
  const {t} = useTranslation();
  const uploadRef = useRef(null);

  return (
     <UploadInputWrapper>
       <Button size='lg' onClick={() => uploadRef.current.click()}>
         <AttachSvg/>
         {t('files')}
       </Button>
       <input
          readOnly
          value={value ? value.name : ''}
          onChange={() => false}
          placeholder={t('select_photo_video_to_upload')}
       />
       <IconBox onClick={() => onChange(null)}>
         <CloseSvg/>
       </IconBox>
       <input
          ref={uploadRef}
          type="file"
          onChange={(e) => onChange(e.target.files[0])}
          style={{display: 'none'}}
       />
     </UploadInputWrapper>
  );
};