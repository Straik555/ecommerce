//Icons
import {
    AppstoreOutlined,
    SettingOutlined,
    UserAddOutlined,
    UserOutlined
} from '@ant-design/icons';

export const LinkNav = [{
        name: 'Home',
        icon: <AppstoreOutlined />,
        router: '/home',
        className: 'float-left'
    },
    {
        name: 'Redister',
        icon: <UserAddOutlined />,
        router: '/register',
        className: 'float-right'
    },
    {
        name: 'Login',
        icon: <UserOutlined />,
        router: '/login',
        className: 'float-right'
    },
]

export const LinkDropDown = {
    name: 'User Name',
    icon: <SettingOutlined />,
    dropdown: [
        {
            name: 'Setting 1',
            router: '/setting1'
        },
        {
            name: 'Setting 2',
            router: '/setting2'
        },
        {
            name: 'LogoOut',
            router: '/',
            icon: <UserOutlined />
        }
    ]
}