import React from 'react';

//Wrapper
import WrapperNavLink from '../../../components/WraperNavLink'

//Admin nav link
import AdminNav from "../../../components/nav/AdminNav";

const AdminDashboard = () => {
    return (
        <WrapperNavLink nav={<AdminNav />}>
            <p>AdminDashboard</p>
        </WrapperNavLink>
    )
}

export default AdminDashboard;