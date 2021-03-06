import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

import AppMenu from './menu.atom';

export const defaultDrawerWidth = 240;
const minDrawerWidth = 50;
const maxDrawerWidth = 1000;

const useStyles = makeStyles(theme => ({
    drawer: {
        flexShrink: 0
    },
    toolbar: theme.mixins.toolbar,
    dragger: {
        width: "5px",
        cursor: "ew-resize",
        padding: "4px 0 0",
        borderTop: "1px solid #ddd",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: "#f4f7f9"
    }
}));

export const CustomDrawer = () => {
    const classes = useStyles();
    const [drawerWidth, setDrawerWidth] = React.useState(defaultDrawerWidth);

    const handleMouseDown = (e:any) => {
        document.addEventListener("mouseup", handleMouseUp, true);
        document.addEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseUp = () => {
        document.removeEventListener("mouseup", handleMouseUp, true);
        document.removeEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseMove = useCallback(e => {
        const newWidth = e.clientX - document.body.offsetLeft;
        if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
            setDrawerWidth(newWidth);
        }
    }, []);

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            PaperProps={{ style: { width: drawerWidth } }}
        >
            <div className={classes.toolbar} />
            <div onMouseDown={e => handleMouseDown(e)} className={classes.dragger} />
            <AppMenu />
            <Divider />
        </Drawer>
    );
};
