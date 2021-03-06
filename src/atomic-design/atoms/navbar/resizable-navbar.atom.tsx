import React from "react";
import { Drawer, Divider } from "@material-ui/core";

import styles from "./resizable-navbar.module.scss";
import AppMenu from './menu/menu.atom'

import { Resizable } from '../resizable';

export const defaultNavbarWidth = 340;
const minNavbarWidth = 50;
const maxNavbarWidth = 1000;


const MemoizedNavbar = React.memo(() => (
    <Drawer
        className={styles.navbar}
        variant="permanent"
    >
        <Divider />
        <AppMenu />
        <Divider />
    </Drawer>
));

const ResizableNavbar = () => (
    <div className={styles.root}>
        <Resizable defaultWidth={defaultNavbarWidth} minWidth={minNavbarWidth} maxWidth={maxNavbarWidth}>
            <MemoizedNavbar />
        </Resizable>
    </div>
);

export { ResizableNavbar }
