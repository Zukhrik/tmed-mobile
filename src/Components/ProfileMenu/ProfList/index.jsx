import React from 'react';
import {MenuItemLink} from '../style';
import {useHistory, useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {profMenuData} from '../../../data/prof-menu-data';
import {changeMenuOpen, tokenMount} from '../../../Models/app';
import Cookies from 'js-cookie'

export const ProfList = () => {
  const {t} = useTranslation()
  const {pathname} = useLocation()
  const {push} = useHistory()

  function logout() {
    Cookies.remove('token')
    Cookies.remove('refresh-token')
    Cookies.remove('users')
    tokenMount(null)
    push('/')
  }

  return (
     <>
       {
         profMenuData.map((item) => {
           const Icon = item.icon
           return (
              <MenuItemLink
                 key={item.path}
                 to={item.path}
                 isActive={() => pathname === item.path}
                 onClick={() => item.path === '/logout' ? logout() : changeMenuOpen(false)}
              >
                <Icon/>
                {t(item.name)}
              </MenuItemLink>
           )
         })
       }
     </>
  )
}