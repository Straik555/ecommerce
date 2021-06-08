// Core
import React from 'react';

const WrapperNavLink = ({children, nav}) => {

    return(
        <div className="container">
            <div className={'row'}>
                <div className="col-md-2">
                    {nav}
                </div>
                <div className="col-md-10">
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}

export default WrapperNavLink