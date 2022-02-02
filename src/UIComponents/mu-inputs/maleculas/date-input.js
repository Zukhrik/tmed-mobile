import moment from 'moment';
import {TextField} from '@material-ui/core';
import React, {useEffect, useRef} from 'react';
import {DatePicker} from '@material-ui/pickers';
import {StyledFormControl, StyledHelperText, StyledInputError} from '../atoms';

export const DateInput = ({label, value, error, onChange, helperText, views, hideErrorText, staticError, ...props}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = useRef();

  useEffect(() => {
    setAnchorEl(divRef.current);
  }, [divRef]);

  const generateDateFormat = () => {
    switch (views) {
      case 'year':
        return 'YYYY';
      default:
        return 'YYYY-MM-DD';
    }
  };

    return (
     <StyledFormControl ref={divRef}>
       <DatePicker
          {...props}
          autoOk
          label={label}
          error={!!error}
          variant="inline"
          value={moment(value)}
          format={generateDateFormat()}
          onChange={(e) => onChange(moment(e._d))}
          views={views ? [views] : ['year', 'month', 'date']}
          PopoverProps={{
            anchorEl,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            },
            classes: {paper: 'select-dropdown'}
          }}
          inputVariant='outlined'
          TextFieldComponent={(inputProps) => <TextField {...inputProps} />}
       />
       {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
       {!hideErrorText && error && <StyledInputError staticError={staticError}>{error}</StyledInputError>}
     </StyledFormControl>
  );
};