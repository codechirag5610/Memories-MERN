import { AUTH } from '../constants/actionTypes';
import * as api  from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        //login
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate('/', { replace: true});
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        //login
        const { data } = await api.signUp(formData)

        dispatch({ type: AUTH, data });

        navigate('/', { replace: true});


    } catch (error) {
        console.log(error)
    }
}