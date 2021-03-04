import React from "react";
import { Avatar, Box, Link, Typography } from "@material-ui/core";
import FindInPageIcon from '@material-ui/icons/FindInPage';

import { BaseTemplate } from "../templates/base";
import styles from "./unauthorized.module.scss";
import { ROUTES } from "../../../configs";


const UnauthorizedPage = () => (
    <BaseTemplate>
        <div className={styles.root}>
            <Avatar className={styles.icon}>
                <FindInPageIcon />
            </Avatar>
            <Box m={1}>
                <Typography component="h1" variant="h4">
                    401 Not Authorized
                </Typography>
                <Typography variant="body1">
                    We're sorry, looks like your authorization token is expired.
                </Typography>
                <Typography variant="body2">
                    Please go back to the <Link href={ROUTES.SIGN_IN} variant="body2">Sign In</Link> page or contact us at <Link href="#" variant="body2">support@hillel.com</Link>
                </Typography>
            </Box>
        </div>
    </BaseTemplate>
);

export { UnauthorizedPage };
