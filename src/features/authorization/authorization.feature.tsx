import React, { Fragment } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Button, FormControlLabel, Avatar, Checkbox, Link, Grid, Container, Typography, Box } from '@material-ui/core';
import { useForm } from "react-hook-form";
import useFetch from "use-http";

import { TextField } from '../../components';
import styles from './authorization.module.scss';

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
const authorize = async (http:any, { login, password }:any) => {
    try {
        const params = decodeURIComponent(`username=${login}&password=${password}`);
        await http(`/users/authorization?${params}`);
    } catch (e) {
        console.log(e)
    }
}

const AuthorizationFeature = () => {
    const { handleSubmit, register, errors } = useForm();
    const { get } = useFetch()
    const onSubmit = async (data:any) => authorize(get, data);

  return (
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
                              <Link href="#" variant="body2">
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
};

export { AuthorizationFeature };
