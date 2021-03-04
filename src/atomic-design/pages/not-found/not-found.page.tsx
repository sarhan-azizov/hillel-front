import React from "react";
import { Avatar, Box, Link, Typography } from "@material-ui/core";
import FindInPageIcon from '@material-ui/icons/FindInPage';

import { BaseTemplate } from "../templates/base";
import styles from "./not-found.module.scss";
import { ROUTES } from "../../../configs";


const NotFoundPage = () => (
    <BaseTemplate>
        <div className={styles.root}>
            <Avatar className={styles.icon}>
                <FindInPageIcon />
            </Avatar>
            <Box m={1}>
                <Typography component="h1" variant="h4">
                    404 Page not found
                </Typography>
                <Typography variant="body1">
                    We're sorry, the page you requested couldn't be found.
                </Typography>
                <Typography variant="body2">
                    Please go back to the  <Link href={ROUTES.HOME} variant="body2">Home Page</Link> or contact us at <Link href="#" variant="body2">support@hillel.com</Link>
                </Typography>
            </Box>
        </div>
    </BaseTemplate>
);

export { NotFoundPage };
