//Core
import React, {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

//Actions
import {userLogOutFirebase} from "../../../_actions/actions";

//Design
import { Menu } from 'antd';

//Redux
import {connect} from "react-redux";

//Icon
import {
    AppstoreOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserAddOutlined,
    UserOutlined
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

const Header = ({userLogOutFirebase, user, isLogin}) => {
    const location = useLocation();
    const [current, setCurrent] = useState('/home');
    useEffect(() => {
            setCurrent(location.pathname)
    }, [location.pathname])
    const handleClick = e => {
        setCurrent(e.key)
    }
    const logOut = () => {
        userLogOutFirebase()
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Item key={'/home'} icon={<AppstoreOutlined />} className={'float-left'}>
                    <Link to={'/home'}>
                        Home
                    </Link>
                </Item>
                {!isLogin &&
                <Item key={'/register'} icon={<UserAddOutlined />} className={'float-right'}>
                    <Link to={'/register'}>
                        Redister
                    </Link>
                </Item>
                }
                {!isLogin &&
                    <Item
                        key={'/login'}
                        icon={<UserOutlined />}
                        className={'float-right'}
                    >
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
                            // user.email && user.email.split('@')[0]
                            user.name && user.name
                        }
                        className={'float-right'}
                        key={'sub1'}
                    >
                        {
                            user && user.role === 'subscriber' &&
                            <Item
                                key={'/user/history'}
                                icon={<AppstoreOutlined />}
                            >
                            <Link to={'/user/history'}>Dashboard</Link>
                            </Item>
                        }

                        {
                            user && user.role === 'admin' &&
                            <Item
                                key={'/admin/dashboard'}
                                icon={<AppstoreOutlined />}
                            >
                                <Link to={'/admin/dashboard'}>Dashboard</Link>
                            </Item>
                        }

                        <Item
                            key={'logout'}
                            icon={<LogoutOutlined />}
                            onClick={logOut}
                        >
                            <Link to={'/login'}>LogoOut</Link>
                        </Item>
                    </SubMenu>
                }

            </Menu>
    )

}

const mapStateToProps = ({userReducer: {user, isLogin}}) => {
    return{user, isLogin}
}

export default connect(mapStateToProps, {userLogOutFirebase})(Header);
