import React from 'react';
import {
  AccountData,
  LinkedWrapBtn,
  LinkedWrapTitle,
  AccountDataItems,
  AccountsLinkedWrap,
} from '../style';
import {Link} from 'react-router-dom';
import {useStore} from 'effector-react';
import {ShortCard} from '../../Cards/ShortCard';
import {useTranslation} from 'react-i18next';
import {URL_VALUES} from '../../../Constants/url';
import {SubscribeSvg} from '../../../Icons/Subscribe';
import {Text} from '../../../UIComponents/Typography/Text';
import {$accountModel} from '../../../Models/account-model';

export const UsersOrg = () => {
  const {t} = useTranslation()
  const {$accountInfo: {data}} = useStore($accountModel)

  return (
     <AccountsLinkedWrap>
       <LinkedWrapTitle>
         <Text level={4}>{t('organizations')}</Text>
         <Link to={`${URL_VALUES.CREATE_ORGANIZATION}`}>
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
                data.organizations && data.organizations.length > 0
                && (
                   <AccountData>
                     {
                       data.organizations.map((item, idx) => (
                          <AccountDataItems key={`${idx + 1}`}>
                            <ShortCard
                               name={item.name}
                               imgUrl={item.logo}
                               text={`@${item.slug_name}`}
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