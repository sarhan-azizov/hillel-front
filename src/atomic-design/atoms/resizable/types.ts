export type TypeNavbarParams = {
    defaultWidth: number;
    minWidth: number;
    maxWidth: number;
}

export type TypeNavbarReturn = {
    handleMouseDown(): void;
    width: number
}