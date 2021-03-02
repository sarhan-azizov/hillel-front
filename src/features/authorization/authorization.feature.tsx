import React, { Fragment, useContext } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Button, FormControlLabel, Avatar, Checkbox, Link, Grid, Container, Typography, Box } from '@material-ui/core';
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { Redirect } from "react-router-dom";

import { TextField } from '../../components';
import styles from './authorization.module.scss';
import { ROUTES } from "../../constants";
import { CurrentUserContext, CurrentUserContextType, getUserFromToken } from "../../context";

// TODO temporarily solution
const validation = {
    login: {
        required: {
            value: true,
            message: 'The field is required'
        },
        minLength: {
            value: 3,
            message: "The field shouldn't be less then 3"
        },
        maxLength: {
            value: 80,
            message: "The field shouldn't be more then 80"
        }
    },
    password: {
        required: {
            value: true,
            message: 'The field is required'
        },
        minLength: {
            value: 5,
            message: "The field shouldn't be less then 5"
        },
        maxLength: {
            value: 80,
            message: "The field shouldn't be more then 80"
        }
    }
}

type UserCredentials = {
    login: string;
    password:string;
}

const authorize = async (currentUserCtx: CurrentUserContextType, http:any, { login, password }: UserCredentials) => {
    const params = decodeURIComponent(`username=${login}&password=${password}`);
    const response = await http.get(`/users/authorization?${params}`);

    if(!response.error) {
        currentUserCtx.changeContext(getUserFromToken(response));
    }
    response.error && console.error(response);
}

const AuthorizationFeature = () => {
    const { handleSubmit, register, errors } = useForm();
    const http = useFetch();
    const currentUserCtx:CurrentUserContextType = useContext(CurrentUserContext);
    const onSubmit = async (data: UserCredentials) => authorize(currentUserCtx, http, data);
    const authorized = currentUserCtx.user.username;
    const authFrom = (
        <Fragment>
            <Container component="main" maxWidth="sm" classes={ { root: styles.root } }>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className={styles.form}>
                    <div className={styles.iconContainer}>
                        <Avatar className={styles.icon}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log In
                        </Typography>
                    </div>
                    <TextField
                        error={Boolean(errors.login)}
                        helperText={errors.login?.message}
                        color="primary"
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        label="Login"
                        name="login"
                        autoFocus
                        inputRef={register(validation.login)}
                    />
                    <TextField
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        inputRef={register(validation.password)}
                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary" />}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    <Button
                        type="submit"
                        fullWidth
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

    return authorized ? <Redirect to={ROUTES.HOME} /> : authFrom;
};

export { AuthorizationFeature };
