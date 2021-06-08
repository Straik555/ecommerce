import React from 'react';

//Wrapper
import WrapperNavLink from '../../../components/WraperNavLink'

//Admin nav link
import AdminNav from "../../../components/nav/AdminNav";

const AdminSub = () => {
    return (
        <WrapperNavLink nav={<AdminNav />}>
            <p>AdminSub</p>
        </WrapperNavLink>
    )
}

export default AdminSub;