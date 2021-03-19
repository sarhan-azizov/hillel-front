import React from "react";

import { BoardTemplate } from '../templates'
import { ChangePasswordForm } from '../../organisms';
import { Box, Breadcrumbs, Link, Typography } from "@material-ui/core";


const ChangePasswordPage = () => (
    <BoardTemplate title="Change Password">
        <Box mb={1} mt={1}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Typography color="textPrimary">Change Password</Typography>
            </Breadcrumbs>
        </Box>
        <ChangePasswordForm />
    </BoardTemplate>
);

export { ChangePasswordPage };
