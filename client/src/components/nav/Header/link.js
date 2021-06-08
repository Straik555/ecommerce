//Icons
import {
    AppstoreOutlined,
    DesktopOutlined,
    HistoryOutlined,
    UnorderedListOutlined,
    EditOutlined,
    FolderOutlined,
    TagOutlined,
    SaveOutlined
} from '@ant-design/icons';

export const AdminNavLink = [
    {
        name: 'Dashboard',
        icon: <AppstoreOutlined />,
        router: '/admin/dashboard'
    },
    {
        name: 'Product',
        icon: <DesktopOutlined />,
        router: '/admin/product'
    },
    {
        name: 'Category',
        icon: <FolderOutlined />,
        router: '/admin/category'
    },
    {
        name: 'Sub Category',
        icon: <SaveOutlined />,
        router: '/admin/sub'
    },
    {
        name: 'Coupon',
        icon: <TagOutlined />,
        router: '/admin/coupon'
    },
    {
        name: 'Password',
        icon: <EditOutlined />,
        router: '/user/password'
    },
]

export const UserNavLink = [
    {
        name: 'History',
        icon: <HistoryOutlined />,
        router: '/user/history'
    },
    {
        name: 'Password',
        icon: <EditOutlined />,
        router: '/user/password'
    },
    {
        name: 'Wishlist',
        icon: <UnorderedListOutlined />,
        router: '/user/wishlist'
    },
]
