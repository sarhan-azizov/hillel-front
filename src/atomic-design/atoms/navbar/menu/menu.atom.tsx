import React from 'react'

import List from '@material-ui/core/List';
import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'

import AppMenuItem from './menu-item.atom'

const appMenuItems = [
    {
        name: 'Schedule',
        link: '/schedule',
        Icon: IconDashboard,
    },
    {
        name: 'groups',
        link: '/groups',
        Icon: IconDashboard,
    },
    {
        name: 'Courses',
        link: '/courses',
        Icon: IconDashboard,
    },
    {
        name: 'Attending',
        link: '/attending',
        Icon: IconShoppingCart,
    },
    {
        name: 'Users',
        link: '/users',
        Icon: IconPeople,
    },
    {
        name: 'lessons',
        link: '/lessons',
        Icon: IconBarChart,
    },
    {
        name: 'Homework',
        Icon: IconLibraryBooks,
        items: [
            {
                name: 'Level 2',
            },
            {
                name: 'Level 2',
                items: [
                    {
                        name: 'Level 3',
                    },
                    {
                        name: 'Level 3',
                    },
                ],
            },
        ],
    },
]

const AppMenu = () => (
    <List component="nav" disablePadding>
        {appMenuItems.map((item, index) => (
            <AppMenuItem {...item} key={index} />
        ))}
    </List>
)

export default AppMenu
