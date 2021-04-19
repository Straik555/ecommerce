//Core
import React, {useState} from 'react';
import {Link} from "react-router-dom";

//Design
import { Menu } from 'antd';

//Router
import {LinkDropDown, LinkNav} from "./link";

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('/home');

    const handleClick = e => {
        setCurrent(e.key)
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">

            {LinkNav.map(el =>
                <Item key={el.router} icon={el.icon} className={el.className}>
                    <Link to={el.router}>
                        {el.name}
                    </Link>
                </Item>
                )
            }
            <SubMenu icon={LinkDropDown.icon} title={LinkDropDown.name}>
                {
                    LinkDropDown.dropdown.map(down =>
                        <Item key={down.router}>
                            <Link to={down.router}>{down.name}</Link>
                        </Item>
                    )
                }
            </SubMenu>

        </Menu>
    )

}

export default Header;