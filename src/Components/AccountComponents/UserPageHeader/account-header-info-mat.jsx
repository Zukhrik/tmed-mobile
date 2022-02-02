import React from 'react'
import {Col, Row} from 'antd'
import Cookies from 'js-cookie'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {tokenMount} from '../../../Models/app'
import {LogoutSvg} from '../../../Icons/Logout'
import {usePushToCart} from '../../../Hooks/order'
import {Avatar} from '../../../UIComponents/Avatar'
import {Button} from '../../../UIComponents/Button'
import {useHistory, useParams} from 'react-router-dom'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {IconBox, SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {$accountModel, getCurrentAccount} from '../../../Models/account-model'
import {AccountHeaderActionsWrapper, AccountInfoWrap, LangWrapper} from '../style'
import {orgOfferingsListMount, resetOrgOfferingList} from '../../../Models/offerings-model'
import {$orderModel, resetOrderCartList, resetOrgOrderCart} from '../../../Models/order-model'


// const langData = [
//     {name: 'russian', code: 'ru'},
//     {name: 'uzbek', code: 'uz'}
// ]

export const AccountHeaderInfoMat = ({name, category, imgUrl, forceLoading}) => {
    const {t} = useTranslation()
    const {organization} = useParams()
    const {handlePush} = usePushToCart()
    const {location: {pathname}} = useHistory()
    // const [lang, setLang] = useState('russian')
    const {$orgOrderCartList: {result}} = useStore($orderModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    
    const handleLogout = () => {
        Cookies.remove('token')
        Cookies.remove('users')
        Cookies.remove('refresh-token')
        resetOrgOfferingList()
        getCurrentAccount()
        localStorage.removeItem('currentProfile')
        tokenMount(null)
        resetOrgOrderCart()
        resetOrderCartList()
        orgOfferingsListMount({organization: organization})
    }
    
    // const langMenu = () => (
    //     <Menu>
    //         {
    //             langData.map((item, idx) => (
    //                 <Menu.Item
    //                     key={`${idx + 1}`}
    //                     onClick={() => setLang(item.name)}
    //                 >
    //                     <Text level={4}>{`${t(item.name)}`}</Text>
    //                 </Menu.Item>
    //             ))
    //         }
    //     </Menu>
    // )
    
    
    return (
        <AccountInfoWrap>
            <Row justify='space-between'>
                <Col span={24} className='padding'>
                    <Row gutter={[12, 0]} justify='space-between' align='middle'>
                        <Col>
                            {
                                forceLoading === 2
                                    ? <Avatar
                                        imgUrl={imgUrl}
                                        shape='circle'
                                        size={110}
                                    />
                                    : <SkeletonUI
                                        variant='circle'
                                        width={110}
                                        height={110}
                                    />
                            }
                        </Col>
                        <Col>
                            <AccountHeaderActionsWrapper>
                                <LangWrapper>
                                    {/*<Dropdown overlay={langMenu} trigger={['click']}>*/}
                                    {/*    <div className='lang-wrapper'>*/}
                                    {/*        {`${t(lang)}`}*/}
                                    {/*        <ArrowIosBottomSvg/>*/}
                                    {/*    </div>*/}
                                    {/*</Dropdown>*/}
                                    {
                                        currentProfile && organization &&
                                        <IconBox onClick={handleLogout}>
                                            <LogoutSvg/>
                                        </IconBox>
                                    }
                                </LangWrapper>
                                {
                                    result && result[organization] && result[organization].count > 0 &&
                                    pathname === `/${organization}/offerings` && (
                                        <Button
                                            size='l'
                                            variant='primary'
                                            onClick={handlePush}
                                        >
                                            {`${t('issue_now')}: ${result[organization].count}`}
                                        </Button>
                                    )
                                }
                            </AccountHeaderActionsWrapper>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    {
                        forceLoading === 2
                            ? <Row
                                gutter={[0, 4]}
                                className='short-info-wrapper'
                            >
                                <Col span={24}>
                                    <Title level={2}>
                                        {name}
                                    </Title>
                                </Col>
                                <Col span={24}>
                                    <Text level={4}>
                                        {category}
                                    </Text>
                                </Col>
                            </Row>
                            : <Row style={{padding: '0 12px'}} gutter={[0, 4]}>
                                <Col
                                    span={24}
                                    style={{height: 37.7, display: 'flex', alignItems: 'center'}}
                                >
                                    <SkeletonUI
                                        variant='rect'
                                        width='100%'
                                        height={12}
                                    />
                                </Col>
                                <Col span={24} style={{height: 25.14, display: 'flex', alignItems: 'center'}}>
                                    <SkeletonUI
                                        variant='rect'
                                        width='100%'
                                        height={12}
                                    />
                                </Col>
                            </Row>
                    }
                </Col>
            </Row>
        </AccountInfoWrap>
    )
}