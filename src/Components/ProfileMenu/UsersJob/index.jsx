import React from 'react';
import {AccountsLinkedWrap, LinkedWrapTitle, AccountData, AccountDataItems} from '../style';
import {ShortCard} from '../../Cards/ShortCard';
import {useTranslation} from 'react-i18next';
import {Text} from '../../../UIComponents/Typography/Text';
import {useStore} from 'effector-react';
import {$accountModel} from '../../../Models/account-model';

export const UsersJob = () => {
  const {t} = useTranslation()
  const {$accountInfo: {data}} = useStore($accountModel)

  return (
     <AccountsLinkedWrap>
       <LinkedWrapTitle>
         <Text level={4}>{t('my_job')}</Text>
       </LinkedWrapTitle>
       {
         !!data && Object.values(data).length > 0
         && (
            <>
              {
                data.specialisms && data.specialisms.length > 0
                && (
                   <AccountData>
                     {
                       data.specialisms.map((item, idx) => (
                          <AccountDataItems key={`${idx + 1}`}>
                            <ShortCard
                               imgUrl={item.org.logo}
                               name={item.org.name}
                               text={item.job.name}
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