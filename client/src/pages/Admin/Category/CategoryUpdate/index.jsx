//Core
import React, {useState, useEffect} from 'react';
import {Link, useHistory, useRouteMatch} from 'react-router-dom'

//Wrapper
import WrapperNavLink from '../../../../components/WraperNavLink'

//Admin nav link
import AdminNav from "../../../../components/nav/AdminNav";

//Redux
import {useSelector} from "react-redux";

//Form
import {CategoryForm} from "../CategoryForm";

//Function
import {
    getCategory,
    updateCategory
} from "../../../../functions/category";

//Style
import {toast} from "react-toastify";
import Spinner from "../../../../components/Spinner";

const CategoryUpdate = () => {
    const history = useHistory();
    const match = useRouteMatch();
    const {token} = useSelector(state => ({...state.userReducer.user}))
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('')
    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = () => getCategory(match.params.slug)
            .then(res => setName(res.data.category.name))
            .catch(err => console.log(err))

    const handleSubmit = (name) => {

        setLoading(true)
        updateCategory(
            match.params.slug,
            {name},
            token
        )
            .then(res => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.name}" is update`)
                history.push('/admin/category')
            })
            .catch(error => {
                setLoading(false)
                if(error.response.status === 400) toast.error(error.response.data)
            })
    }

    return (
        <WrapperNavLink nav={<AdminNav />}>
            {
                loading ?
                    <h4 className={'danger'}>Loading...</h4> :
                    <h4>Update category</h4>
            }

            {
                name ? <CategoryForm handleSubmitForm={handleSubmit} names={name}/> :
                    <Spinner />
            }

            <div className={'' +
            'border ' +
            'border-bottom-0 ' +
            'border-left-0 ' +
            'border-right-0 ' +
            'pt-4'
            }>

            </div>
        </WrapperNavLink>
    )
}

export default CategoryUpdate;