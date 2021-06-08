import React from 'react';

//Wrapper
import WrapperNavLink from '../../../components/WraperNavLink'

//Admin nav link
import AdminNav from "../../../components/nav/AdminNav";

const AdminCoupon = () => {
    return (
        <WrapperNavLink nav={<AdminNav />}>
            <p>AdminCoupon</p>
        </WrapperNavLink>
    )
}

export default AdminCoupon;