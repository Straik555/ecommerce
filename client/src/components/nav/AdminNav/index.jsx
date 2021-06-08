// Core
import React, {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom'

//Link
import {AdminNavLink} from '../Header/link'

//Design
import { Menu } from 'antd';

const { Item } = Menu;

const AdminNav = () => {
    const location = useLocation();
    const [current, setCurrent] = useState('/user/history');
    useEffect(() => {
        setCurrent(location.pathname)
    }, [location.pathname])
    const handleClick = e => {
        setCurrent(e.key)
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="inline">
            {
                AdminNavLink.map(nav => {
                    return (
                        <Item
                            icon={nav.icon}
                            key={nav.router}
                        >
                            <Link to={nav.router}>{nav.name}</Link>
                        </Item>
                    )
                })
            }
        </Menu>
    )

}

export default AdminNav;