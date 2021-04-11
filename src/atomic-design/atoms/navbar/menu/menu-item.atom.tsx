import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import { ChevronRight, ExpandMore } from '@material-ui/icons';

import AppMenuItemComponent from './menu-item-component.atom'

// React runtime PropTypes
export const AppMenuItemPropTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
    Icon: PropTypes.elementType,
    items: PropTypes.array,
}

// TypeScript compile-time props type, infered from propTypes
// https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88
type AppMenuItemPropTypes = PropTypes.InferProps<typeof AppMenuItemPropTypes>
type AppMenuItemPropsWithoutItems = Omit<AppMenuItemPropTypes, 'items'>

// Improve child items declaration
export type AppMenuItemProps = AppMenuItemPropsWithoutItems & {
    items?: AppMenuItemProps[]
}

const AppMenuItem: React.FC<AppMenuItemProps> = props => {
    const { name, link, Icon, items = [] } = props
    const isExpandable = items && items.length > 0
    const [open, setOpen] = React.useState(false)

    function handleClick() {
        setOpen(!open)
    }

    const MenuItemRoot = (
        <AppMenuItemComponent  link={link} onClick={handleClick}>
            {/* Display an icon if any */}
            {!!Icon && (
                <ListItemIcon >
                    <Icon />
                </ListItemIcon>
            )}
            <ListItemText primary={name} inset={!Icon} />
            {/* Display the expand menu if the item has children */}
            {isExpandable && !open && <ChevronRight />}
            {isExpandable && open && <ExpandMore />}
        </AppMenuItemComponent>
    )

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
                {items.map((item, index) => (
                    <AppMenuItem {...item} key={index} />
                ))}
            </List>
        </Collapse>
    ) : null

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    )
}


export default AppMenuItem
