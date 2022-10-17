import axios from 'axios';
import { message } from 'antd';
export const getAllPolicies = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('/api/policies/getallpolicies')
        dispatch({ type: 'GET_ALL_POLICIES', payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const addPolicy = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('/api/policies/addpolicy', reqObj)

        dispatch({ type: 'LOADING', payload: false })
        message.success('New Policy added successfully')
        setTimeout(() => {
            window.location.href = '/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const editPolicy = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('/api/policies/editpolicy', reqObj)

        dispatch({ type: 'LOADING', payload: false })
        message.success('Policy details updated successfully')
        setTimeout(() => {
            window.location.href = '/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}

export const deletePolicy = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('/api/policies/deletepolicy', reqObj)

        dispatch({ type: 'LOADING', payload: false })
        message.success('Policy deleted successfully')
        setTimeout(() => {
            window.location.reload()
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}