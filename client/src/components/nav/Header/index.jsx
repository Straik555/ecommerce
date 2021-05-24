//Core
import React, {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

//Actions
import {userLogOutFirebase} from "../../../_actions/actions";

//Design
import { Menu } from 'antd';

//Router
import {LinkNav} from "./link";

//Redux
import {connect, useSelector} from "react-redux";

//Icon
import {
    AppstoreOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserAddOutlined,
    UserOutlined
} from "@ant-design/icons";


const { SubMenu, Item } = Menu;

const Header = ({userLogOutFirebase}) => {
    const location = useLocation();
    const path = LinkNav.map(el => location.pathname.indexOf(el.router) ? el.router : '/home')
    const [current, setCurrent] = useState(path);
    const {user, isLogin} = useSelector((state) => ({...state.userReducer}))
    useEffect(() => {
        setCurrent(location.pathname)
    }, [location])
    const handleClick = e => {
        setCurrent(e.key)
    }
    const logOut = () => {
        userLogOutFirebase()
    }
    return (
        <div className={'container'}>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Item key={'home'} icon={<AppstoreOutlined />} className={'float-left'}>
                    <Link to={'/home'}>
                        Home
                    </Link>
                </Item>
                {!isLogin &&
                <Item key={'register'} icon={<UserAddOutlined />} className={'float-right'}>
                    <Link to={'/register'}>
                        Redister
                    </Link>
                </Item>
                }
                {!isLogin &&
                <Item key={'login'} icon={<UserOutlined />} className={'float-right'}>
                    <Link to={'/login'}>
                        Login
                    </Link>
                </Item>
                }
                {
                    isLogin &&
                    <SubMenu
                        icon={<SettingOutlined />}
                        title={
                            user.email &&
                            user.email.split('@')[0]
                        }
                        className={'float-right'}
                    >
                        <Item key={'setting_one'}>
                            <Link to={'/setting_one'}>Setting 1</Link>
                        </Item>
                        <Item key={'setting_two'}>
                            <Link to={'/setting_two'}>Setting 2</Link>
                        </Item>
                        <Item key={'logout'} icon={<LogoutOutlined />} onClick={logOut}>
                            <Link to={'/login'}>LogoOut</Link>
                        </Item>
                    </SubMenu>
                }

            </Menu>
        </div>
    )

}

const mapStateToProps = () => {
    return{}
}

export default connect(mapStateToProps, {userLogOutFirebase})(Header);
