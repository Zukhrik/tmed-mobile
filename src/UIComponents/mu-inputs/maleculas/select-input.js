import React, {useCallback} from 'react'
import {
    MultipleSelectedWrap,
    OptionLoading,
    StyledChip,
    StyledFormControl,
    StyledHelperText,
    StyledInputError,
    StyledOptionItem,
    StyledSelected
} from '../atoms'
import {TextField} from '@material-ui/core'
import {Avatar} from '../../Avatar'

export const SelectInput = (
    {
        label,
        name,
        error,
        hideErrorText,
        helperText,
        loading,
        multiple,
        options,
        staticError,
        ...props
    }
) => {
    const renderValue = useCallback((selected) => {
        const data = options.find((item) => item.value === selected)
        return (
            <StyledSelected>
                {
                    data && data.label
                }
            </StyledSelected>
        )
    }, [options])
    
    const multipleRenderValue = useCallback((selected) => {
        const data = []
        for (let i = 0; i < selected.length; i++) {
            for (let j = 0; j < options.length; j++) {
                if (selected[i] === options[j].value) {
                    data.push(options[j])
                }
            }
        }
        return (
            <MultipleSelectedWrap>
                {
                    data.map((item) => (
                        <StyledChip
                            key={item.value}
                            label={item.label}
                        />
                    ))
                }
            </MultipleSelectedWrap>
        )
    }, [options])
    return (
        <StyledFormControl>
            <TextField
                {...props}
                label={label}
                error={!!error}
                select
                variant='filled'
                SelectProps={
                    {
                        renderValue: (selected) => (
                            multiple ? multipleRenderValue(selected) : renderValue(selected)
                        ),
                        multiple: multiple || false,
                        MenuProps: {
                            PaperProps: {
                                style: {
                                    maxHeight: 30 * 8 + 8
                                }
                            },
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left'
                            },
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left'
                            },
                            classes: {paper: 'select-dropdown'},
                            getContentAnchorEl: null
                        }
                    }
                }
            >
                {
                    !loading && options && options.length > 0 && options.map((option, idx) => (
                        <StyledOptionItem
                            key={`${idx + 1}`}
                            value={option.value}
                            disableRipple
                        >
                            {option.image && <Avatar imgUrl={option.image} size={24}/>}
                            {option.label}
                        </StyledOptionItem>
                    ))
                }
                {
                    (options === undefined || options.length === 0)
                    && (
                        <OptionLoading>
                            {/*{*/}
                            {/*    loading && <CircularProgress size={16} />*/}
                            {/*}*/}
                            {/*<img src={noData} alt="noData" />*/}
                            no data
                        </OptionLoading>
                    )
                }
            </TextField>
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError staticError={staticError}>{error}</StyledInputError>}
        </StyledFormControl>
    )
}