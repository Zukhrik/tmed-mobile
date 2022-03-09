import React from 'react';
import {useStore} from 'effector-react';
import {useTranslation} from 'react-i18next';
import {Button} from '../../../UIComponents/Button';
import {$accountModel} from '../../../Models/account-model';
import {ShortCard} from '../../../Components/Cards/ShortCard';
import {SliderItemWrapper, UserAvatarSliderWrapper, UserWorkWrapper} from '../style';

export const UserWork = () => {
  const {$profiles: {specialisms}} = useStore($accountModel)
  const {t} = useTranslation()

  return (
     <UserWorkWrapper>
       <UserAvatarSliderWrapper>
         {
           specialisms && specialisms.map((item) => (
              <SliderItemWrapper key={item.id}>
                <ShortCard
                   imgSize={124}
                   name={item.name}
                   imgUrl={item.avatar}
                   text={item.category}
                />
              </SliderItemWrapper>
           ))
         }
       </UserAvatarSliderWrapper>
       <Button variant="primary" size="l">{t('go_over')}</Button>
     </UserWorkWrapper>
  )
}