//Core
import React from "react";

//Wrapper
import WrapperNavLink from '../../../components/WraperNavLink'

//Nav
import UserNav from "../../../components/nav/UserNav";

const Wishlist = () => {
    return  (
        <WrapperNavLink nav={<UserNav />}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        Wishlist
                    </div>
                </div>
            </div>
        </WrapperNavLink>
    )
}

export default Wishlist;