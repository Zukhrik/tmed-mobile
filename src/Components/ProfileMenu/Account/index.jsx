import React from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import {useStore} from 'effector-react';
import {ArrowWrap, MenuHead} from '../style';
import {ShortCard} from '../../Cards/ShortCard';
import {ArrowBottomSvg} from '../../../Icons/Arrow';
import {$accountModel} from '../../../Models/account-model';
import {$appModel, changeShowAccounts} from '../../../Models/app';

export const CurrentAccountInfo = () => {
  const token = Cookies.get('token')
  const {$app: {showAccounts}} = useStore($appModel)
  const {$accountInfo: {data}} = useStore($accountModel)

  return (
     <>
       {
         data && Object.values(data).length > 0
         && (
            <MenuHead>
              <ShortCard
                 imgSize={60}
                 imgUrl={data.avatar}
                 name={`${data.name} ${data.lastname}`}
                 text={token ? `@${jwtDecode(token).username}` : ''}
              />
              <ArrowWrap status={showAccounts} onClick={() => changeShowAccounts(!showAccounts)}>
                <ArrowBottomSvg/>
              </ArrowWrap>
            </MenuHead>
         )
       }
     </>
  )
}