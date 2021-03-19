import React, { useCallback  } from 'react';
import { string, bool } from 'prop-types';
import cn from 'classnames';
import { default as Field, TextFieldProps } from '@material-ui/core/TextField';

import styles from './text-field.module.scss';

const TextField = (props: TextFieldProps): JSX.Element => {
    const handleFocus = useCallback((e): void => {
        e.target.readOnly = false;
    }, []);

  return (
      <Field
          error={props.error}
          helperText={props.helperText}
          color={props.color}
          classes={{ root: cn(styles.root, props.className) }}
          InputProps={{
              readOnly: true
          }}
          value={props.value}
          disabled={props.disabled}
          margin={props.margin}
          variant={props.variant}
          required={props.required}
          fullWidth={props.fullWidth}
          label={props.label}
          name={props.name}
          type={props.type}
          autoFocus={props.autoFocus}
          onFocus={handleFocus}
          inputRef={props.inputRef}
      />
  );
};

TextField.propTypes = {
    className: string,
    readOnly: bool
}

TextField.defaultProps = {
    className: undefined,
    readOnly: true
}

export { TextField };
