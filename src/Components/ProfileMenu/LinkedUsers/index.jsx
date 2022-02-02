import React from 'react';
import {LinkedWrapTitle, AccountData, AccountsLinkedWrap, LinkedWrapBtn, AccountDataItems} from '../style';
import {ShortCard} from '../../Cards/ShortCard';
import {useTranslation} from 'react-i18next';
import {Text} from '../../../UIComponents/Typography/Text';
import {useStore} from 'effector-react';
import {$accountModel} from '../../../Models/account-model';
import {SubscribeSvg} from '../../../Icons/Subscribe';
import {Link} from 'react-router-dom';

export const LinkedUsers = () => {
  const {t} = useTranslation()
  const {$accountInfo: {data}} = useStore($accountModel)

  return (
     <AccountsLinkedWrap>
       <LinkedWrapTitle>
         <Text level={4}>{t('users')}</Text>
         <Link to='/sign-in'>
           <LinkedWrapBtn>
             <SubscribeSvg/>
           </LinkedWrapBtn>
         </Link>
       </LinkedWrapTitle>
       {
         data && Object.values(data).length > 0
         && (
            <>
              {
                data.linked_users && data.linked_users.length > 0
                && (
                   <AccountData>
                     {
                       data.linked_users.map((item, idx) => (
                         <AccountDataItems key={`${idx + 1}`}>
                           <ShortCard
                              imgUrl={item.avatar}
                              name={item.full_name}
                              text={`@${item.username}`}
                           />
                         </AccountDataItems>
                       ))
                     }
                   </AccountData>
                )
              }
            </>
         )
       }
     </AccountsLinkedWrap>
  )
}