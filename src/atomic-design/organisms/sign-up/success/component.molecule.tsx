import React from 'react';

import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { Avatar, Box, Link, Typography } from '@material-ui/core';

import styles from './component.module.scss';
import { ROUTES } from "../../../../configs";

const SignUpFormSuccessComponent = (props: { username: string }) => (
    <div className={styles.iconContainer}>
        <Avatar className={styles.icon}>
            <CheckCircleOutlinedIcon />
        </Avatar>
        <Typography variant="subtitle1">
            <b>Congrats!</b> Your user <b>"{props.username}"</b> successfully created.
        </Typography>
        <Typography variant="body2">
            You have to wait until administrator will activated it.
        </Typography>
        <Box mb={2} />
        <Link href={ROUTES.SIGN_IN} variant="body2">
            Already have an account? Sign In
        </Link>
    </div>
);

export { SignUpFormSuccessComponent };
