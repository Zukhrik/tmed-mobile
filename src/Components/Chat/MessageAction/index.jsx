import {EditSvg} from '../../../Icons/Edit'
import {CopySvg} from '../../../Icons/Copy'
import {TrashSvg} from '../../../Icons/Trash'
import {useTranslation} from 'react-i18next'
import {ChatDetailActionItem} from '../../../Views/Chat/style'
import React, {Fragment} from 'react'
import {UndoLeftSvg} from '../../../Icons/Undo'

export const MessageAction = ({actions, showDelMenu, me}) => {
    const {handleCopy, handleEdit, handleReply, handleRemove} = actions

    const chatActionData = [
        {
            id: 'reply',
            icon: <UndoLeftSvg/>,
            color: 'var(--dark-dwed)',
            onClick: handleReply
        },
        {
            id: 'change',
            icon: <EditSvg/>,
            color: 'var(--dark-dwed)',
            onClick: handleEdit,
        },
        {
            id: 'copy',
            icon: <CopySvg/>,
            color: 'var(--dark-dwed)',
            onClick: handleCopy
        },
        // {
        //     id: 'forward',
        //     icon: <RedoSvg/>,
        //     color: 'var(--dark-dwed)',
        //     onClick: () => alert('forward')
        // },
        // {
        //     id: 'pin',
        //     icon: <PinSvg/>,
        //     color: 'var(--dark-dwed)',
        //     onClick: () => alert('pin')
        // },
        {
            id: 'remove',
            icon: <TrashSvg/>,
            color: 'var(--danger-dwed)',
            onClick: () => handleRemove(null)
        },
        {
            id: 'remove_from_me',
            icon: <TrashSvg/>,
            color: 'var(--danger-dwed)',
            hidden: true,
            onClick: () => handleRemove('me')
        },
        {
            id: 'remove_from_everyone',
            icon: <TrashSvg/>,
            color: 'var(--danger-dwed)',
            hidden: true,
            onClick: () => handleRemove('irrevocably')
        }
    ]
    const {t} = useTranslation()

    const renderItem = (item) => (
        <ChatDetailActionItem onClick={item.onClick} style={{color: item.color}}>
            {t(item.id)}
            {item.icon}
        </ChatDetailActionItem>
    )
    return (
        <>
            {
                chatActionData.map(item => (
                    <Fragment key={item.id}>
                        {
                            showDelMenu && item.hidden && renderItem(item)
                        }
                        {
                            !showDelMenu && !item.hidden && (
                                <>
                                    {
                                        !me
                                            ? item.id !== 'change' && renderItem(item)
                                            : renderItem(item)
                                    }
                                </>
                            )
                        }
                    </Fragment>
                ))
            }
        </>
    )
}