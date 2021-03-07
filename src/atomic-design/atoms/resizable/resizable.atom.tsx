import React, { useState, useCallback } from "react";

import styles  from "./resizable-navbar.module.scss";
import { TypeNavbarParams, TypeNavbarReturn } from "./types";


const Resizable = (props: TypeNavbarParams & { children: React.ComponentElement<any, any> }) => {
    const { width, handleMouseDown }: TypeNavbarReturn = useResizable({
        defaultWidth: props.defaultWidth,
        minWidth: props.minWidth,
        maxWidth: props.maxWidth
    });

    return (
        <div className={styles.root} style={{ width }}>
            {props.children}
            <div onMouseDown={handleMouseDown} className={styles.resizable} />
        </div>
    );
};

const useResizable = (params: TypeNavbarParams): TypeNavbarReturn => {
    const [width, setWidth] = useState(params.defaultWidth);

    const handleMouseDown = () => {
        document.addEventListener("mouseup", handleMouseUp, true);
        document.addEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseUp = () => {
        document.removeEventListener("mouseup", handleMouseUp, true);
        document.removeEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseMove = useCallback(e => {
        const newWidth = e.clientX -  document.body.offsetLeft;
        if (newWidth > params.minWidth && newWidth < params.maxWidth) {
            setWidth(newWidth);
        }
    }, []);

    return {
        handleMouseDown,
        width
    };
}

export { Resizable };
