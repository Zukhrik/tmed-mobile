import React from 'react';
import {useStore} from 'effector-react';
import {UserAvatarSliderWrapper} from '../style';
import {PersonAddSvg} from '../../../Icons/Person';
import {IconBox} from '../../../UIComponents/GlobalStyles';
import {$accountModel} from '../../../Models/account-model';
import {ShortCard} from '../../../Components/Cards/ShortCard';

export const OrganizationsList = () => {
  const {$profiles: {organizations}} = useStore($accountModel)

  return (
     <>
       <UserAvatarSliderWrapper>
         {
           organizations && organizations.map((item, idx) => (
              <ShortCard
                 key={`${idx + 1}`}
                 imgSize={124}
                 name={item.name}
                 imgUrl={item.avatar}
                 text={item.category && item.category.name}
              />
           ))
         }
         <IconBox><PersonAddSvg/></IconBox>
       </UserAvatarSliderWrapper>
     </>
  )
}