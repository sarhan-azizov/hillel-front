import React, { useState } from "react";
import { Menu, MenuItem, Grid, Drawer, Divider, Avatar, Typography } from "@material-ui/core";
import { ExpandMore, AccountCircle } from "@material-ui/icons";
import styles from "./resizable-navbar.module.scss";

import AppMenu from './menu/menu.atom'
import { Resizable } from '../resizable';
import { removeTokenFromCookie } from '../../../helpers';

export const defaultNavbarWidth = 340;
const minNavbarWidth = 50;
const maxNavbarWidth = 1000;


const MemoizedNavbar = React.memo(() => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        removeTokenFromCookie();
        handleClose();
        window.location.reload()
    }

    return (
        <Drawer
        className={styles.navbar}
        variant="permanent"
    >
        <div className={styles.user}>
            <Grid container alignItems="center" wrap="nowrap">
                <Grid item>
                    <Avatar className={styles.icon}>
                        <AccountCircle />
                    </Avatar>
                </Grid>
                <Grid item xs={7}>
                    <Typography component="span" variant="body1" onClick={handleClick} className={styles.username}>
                        Admin Admin <ExpandMore />
                    </Typography>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className={styles.userMenu}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Change Password</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                    <Typography variant="body2">
                        role: Manager
                    </Typography>
                </Grid>
            </Grid>
        </div>
        <Divider />
        <AppMenu />
        <Divider />
    </Drawer>
    );
});

const ResizableNavbar = () => (
    <div className={styles.root}>
        <Resizable defaultWidth={defaultNavbarWidth} minWidth={minNavbarWidth} maxWidth={maxNavbarWidth}>
            <MemoizedNavbar />
        </Resizable>
    </div>
);

export { ResizableNavbar }
