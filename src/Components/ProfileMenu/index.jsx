import React from 'react';
import {UsersOrg} from './UsersOrg';
import {UsersJob} from './UsersJob';
import {ProfList} from './ProfList';
import {useStore} from 'effector-react';
import {LinkedUsers} from './LinkedUsers';
import {SlideDown} from 'react-slidedown';
import {CurrentAccountInfo} from './Account';
import {slide as Menu} from 'react-burger-menu';
import {$appModel, changeMenuOpen} from '../../Models/app';

export const ProfMenu = (props) => {
  const {$app: {showAccounts, menuOpen}} = useStore($appModel)

  return (
     <Menu
        isOpen={menuOpen}
        width={230} {...props}
        onOpen={() => changeMenuOpen(true)}
        onClose={() => changeMenuOpen(false)}
     >
       <CurrentAccountInfo/>
       <>
         <SlideDown transitionOnAppear={false} closed={showAccounts}>
           <ProfList/>
         </SlideDown>
         <SlideDown transitionOnAppear={false} closed={!showAccounts}>
           <LinkedUsers/>
           <UsersOrg/>
           <UsersJob/>
         </SlideDown>
       </>
     </Menu>
  )
}