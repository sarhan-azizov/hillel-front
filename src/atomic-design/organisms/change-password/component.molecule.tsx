import React from 'react';

import { Button,  Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import styles from './component.module.scss';

import { TypeChangePasswordComponentAPI } from './types';
import { TextField } from '../../atoms';
import { validation } from './validation';

const ChangePasswordComponent = (props: TypeChangePasswordComponentAPI) => (
    <form onSubmit={props.form.handleSubmit(props.onSubmit)} onChange={props.onChange} noValidate autoComplete="off" className={styles.form}>
        <TextField
            color="primary"
            margin="normal"
            variant="outlined"
            value={props.initialValue.username}
            fullWidth
            label="Username"
            disabled
        />
        <TextField
            error={Boolean(props.form.errors.password)}
            helperText={props.form.errors.password?.message}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="password"
            label="Password"
            type="password"
            inputRef={props.form.register(validation.password)}
        />
        <TextField
            error={Boolean(props.form.errors.confirmPassword)}
            helperText={props.form.errors.confirmPassword?.message}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            inputRef={props.form.register(validation.confirmPassword(props.form.watch))}
        />
        {props.form.errors.form && <Alert severity="error">{props.form.errors.form?.message}</Alert>}
        <Box mt={1}>
            <Button
                type="submit"
                fullWidth
                disabled={props.isSubmitting}
                variant="contained"
                color="primary"
            >
                Change Password
            </Button>
        </Box>
    </form>
);

export { ChangePasswordComponent };
