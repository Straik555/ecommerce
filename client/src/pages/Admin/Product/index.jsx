import React from 'react';

//Wrapper
import WrapperNavLink from '../../../components/WraperNavLink'

//Admin nav link
import AdminNav from "../../../components/nav/AdminNav";

const AdminProduct = () => {
    return (
        <WrapperNavLink nav={<AdminNav />}>
            <p>AdminProduct</p>
        </WrapperNavLink>
    )
}

export default AdminProduct;