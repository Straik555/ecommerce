//Core
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'

//Wrapper
import WrapperNavLink from '../../../components/WraperNavLink'

//Admin nav link
import AdminNav from "../../../components/nav/AdminNav";

//Redux
import {useSelector} from "react-redux";

//Form
import {CategoryForm} from "./CategoryForm";

//Function
import {
    createCategory,
    getCategories,
    removeCategory
} from "../../../functions/category";

//Style
import {toast} from "react-toastify";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'

const AdminCategory = () => {
    const {token} = useSelector(state => ({...state.userReducer.user}))
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => getCategories()
        .then(res => {
            setCategories(res.data)
        })
        .catch(error => console.log(error))

    const handleRemove = async(slug) => {
        if(window.confirm("Delete?")){
            setLoading(true)
            removeCategory(slug, token)
                .then(res => {
                    setLoading(false)
                    toast.error(`Category ${res.data.name} deleted`)
                    loadCategories();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                })
        }

    }

    const handleSubmit = (name) => {
        setLoading(true)
        createCategory(
            {name},
            token
        )
            .then(res => {
                setLoading(false)
                toast.success(`"${res.data.name}" is create`)
                loadCategories()
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
                    <h4>Create category</h4>
            }
            <CategoryForm handleSubmitForm={handleSubmit} />
            <div className={'' +
                'border ' +
                'border-bottom-0 ' +
                'border-left-0 ' +
                'border-right-0 ' +
                'pt-4'
            }>
                {
                    categories.map(category => (
                        <div
                            key={category._id}
                            className={
                                'alert alert-info ' +
                                'justify-content-between ' +
                                'align-items-center'
                            }
                        >
                            {category.name}

                                <span
                                    className={'btn btn-sm float-right '}
                                >
                                    <DeleteOutlined
                                        className={'text-danger'}
                                        onClick={() => handleRemove(category.slug)}
                                    />
                                </span>
                                <Link
                                    to={`/admin/category/${category.slug}`}
                                    className={'btn btn-sm float-right mr-3 mt-0'}
                                >
                                    <EditOutlined
                                        className={'text-success'}
                                    />
                                </Link>

                        </div>
                    ))
                }
            </div>
        </WrapperNavLink>
    )
}

export default AdminCategory;