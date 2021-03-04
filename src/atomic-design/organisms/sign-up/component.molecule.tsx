import React from 'react';

import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import { Button, Avatar, Link, Grid, Typography, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import styles from './component.module.scss';

import { TypeSignUpComponentAPI } from './types';
import { TextField } from '../../atoms';
import { ROUTES } from "../../../configs";
import { validation } from './validation';

const SignUpFormComponent = (props: TypeSignUpComponentAPI) => (
    <form onSubmit={props.form.handleSubmit(props.onSubmit)} onChange={props.onChange} noValidate autoComplete="off" className={styles.form}>
        <div className={styles.iconContainer}>
            <Avatar className={styles.icon}>
                <AssignmentOutlinedIcon />
            </Avatar>
            <Box m={1}>
                <Typography component="h1" variant="h5">
                    Sign Up
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
            error={Boolean(props.form.errors.firstName)}
            helperText={props.form.errors.firstName?.message}
            color="primary"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="First Name"
            name="firstName"
            inputRef={props.form.register(validation.firstName)}
        />
        <TextField
            error={Boolean(props.form.errors.lastName)}
            helperText={props.form.errors.lastName?.message}
            color="primary"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="Last Name"
            name="lastName"
            inputRef={props.form.register(validation.lastName)}
        />
        <TextField
            error={Boolean(props.form.errors.email)}
            helperText={props.form.errors.email?.message}
            color="primary"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="E-mail"
            name="email"
            inputRef={props.form.register(validation.email)}
        />
        <TextField
            type="password"
            error={Boolean(props.form.errors.password)}
            helperText={props.form.errors.password?.message}
            color="primary"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="Password"
            name="password"
            inputRef={props.form.register(validation.password)}
        />
        <TextField
            type="password"
            error={Boolean(props.form.errors.confirmPassword)}
            helperText={props.form.errors.confirmPassword?.message}
            color="primary"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
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
                Sign Up
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
                    <Link href={ROUTES.SIGN_IN} variant="body2">
                        Already have an account? Sign In
                    </Link>
                </Grid>
            </Grid>
        </footer>
    </form>
);

export { SignUpFormComponent };
