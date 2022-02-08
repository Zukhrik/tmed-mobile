import {Col, Row} from 'antd'
import React, {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {OrgSearchInputWrapper} from '../atoms'
import {ArrowLeftSvg} from '../../../Icons/Arrow'
import {CloseMiniSvg} from '../../../Icons/Close'
import {AllScreenModal} from '../../../UIComponents/GlobalStyles'
import {$orgModel, allOrgMount} from '../../../Models/org-model'
import {ShortCard} from '../../../Components/Cards'
import {useStore} from 'effector-react'

export const OrgsSearchInput = ({onCancel, visible, setModal}) => {
    const {t} = useTranslation()
    const {$allOrgList: {data}} = useStore($orgModel)
    const [orgSearch, setOrgSearch] = useState('')
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        if (orgSearch.length > 0) {
            const data = {
                clear: true,
                params: {
                    search: orgSearch
                }
            }
            allOrgMount(data)
        }
    }, [orgSearch])
    
    return (
        <AllScreenModal
            width='100%'
            title={false}
            closable={true}
            onCancel={onCancel}
            visible={visible}
            destroyOnClose
        >
            <OrgSearchInputWrapper onSubmit={(e) => handleSubmit(e)}>
                <Row
                    wrap={false}
                    align='middle'
                    gutter={[12, 0]}
                    justify='space-between'
                    className='fixed-header'
                >
                    <Col className='icon' onClick={() => setModal(false)}>
                        <ArrowLeftSvg/>
                    </Col>
                    <Col flex={1}>
                        <input
                            value={orgSearch}
                            onChange={(e) => setOrgSearch(e.target.value)}
                            placeholder={t('search')}
                        />
                    </Col>
                    <Col className='icon' onClick={() => setOrgSearch('')}>
                        <CloseMiniSvg/>
                    </Col>
                </Row>
                <Row gutter={[0, 12]} style={{paddingTop: 62}}>
                    {
                        data && data.map((item, idx) => (
                            <Col span={24} key={`${idx + 1}`}>
                                <ShortCard
                                    imgSize={50}
                                    imgUrl={item.logo}
                                    name={item.name}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </OrgSearchInputWrapper>
        </AllScreenModal>
    )
}