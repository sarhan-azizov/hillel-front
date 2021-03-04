import React from 'react';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Button, Avatar, Link, Grid, Typography, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import styles from './component.module.scss';

import { TypeSignInComponentAPI } from './types';
import { TextField } from '../../atoms';
import { ROUTES } from "../../../configs";
import { validation } from './validation';

const SignInFormComponent = (props: TypeSignInComponentAPI) => (
    <form onSubmit={props.form.handleSubmit(props.onSubmit)} onChange={props.onChange} noValidate autoComplete="off" className={styles.form}>
        <div className={styles.iconContainer}>
            <Avatar className={styles.icon}>
                <LockOutlinedIcon />
            </Avatar>
            <Box m={1}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
            </Box>
        </div>
        <TextField
            error={Boolean(props.form.errors.username)}
            helperText={props.form.errors.username?.message}
            color="primary"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
            inputRef={props.form.register(validation.username)}
        />
        <TextField
            error={Boolean(props.form.errors.password)}
            helperText={props.form.errors.password?.message}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            inputRef={props.form.register(validation.password)}
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
                Sign In
            </Button>
        </Box>
        <footer className={styles.footer}>
            <Grid container>
                <Grid item xs>
                    {/*<Link href="#" variant="body2">*/}
                    {/*    Forgot password?*/}
                    {/*</Link>*/}
                </Grid>
                <Grid item>
                    <Link href={ROUTES.SIGN_UP} variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </footer>
    </form>
);

export { SignInFormComponent };
