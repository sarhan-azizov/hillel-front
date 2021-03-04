import React, { Fragment } from 'react';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Button, Avatar, Link, Grid, Container, Typography, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import styles from './component.module.scss';

import { TypeSignInComponentAPI } from './types';
import { TextField } from '../../atoms';
import { ROUTES } from "../../../configs";
import { validation } from './validation';

const SignInFormComponent = (props: TypeSignInComponentAPI) => (
    <Fragment>
        <Container component="main" maxWidth="sm" classes={ { root: styles.root } }>
            <form onSubmit={props.form.handleSubmit(props.onSubmit)} onChange={props.onChange} noValidate autoComplete="off" className={styles.form}>
                <div className={styles.iconContainer}>
                    <Avatar className={styles.icon}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                </div>
                <TextField
                    error={Boolean(props.form.errors.login)}
                    helperText={props.form.errors.login?.message}
                    color="primary"
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    label="Login"
                    name="login"
                    autoFocus
                    inputRef={props.form.register(validation.login)}
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
                {/*<FormControlLabel*/}
                {/*    control={<Checkbox value="remember" color="primary" />}*/}
                {/*    label="Remember me"*/}
                {/*/>*/}
                {props.form.errors.form && <Box mb={1}><Alert severity="error">{props.form.errors.form?.message}</Alert></Box>}
                <Button
                    type="submit"
                    fullWidth
                    disabled={props.isSubmitting}
                    variant="contained"
                    color="primary"
                >
                    Log In
                </Button>
                <footer className={styles.footer}>
                    <Grid container>
                        <Grid item xs>
                            {/*<Link href="#" variant="body2">*/}
                            {/*    Forgot password?*/}
                            {/*</Link>*/}
                        </Grid>
                        <Grid item>
                            <Link href={ROUTES.REGISTRATION} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </footer>
            </form>
        </Container>
        <Container component="footer" maxWidth="md">
            <Box mt={2}>
                <Typography variant="body2" color="textSecondary" align="center">
                    Copyright © 2021.
                </Typography>
            </Box>
        </Container>
    </Fragment>
);

export { SignInFormComponent };
