import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onClearCalendar, onLogin, onLogOut } from "../store";

export const useAuthStore = () => {

    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector( state => state.auth );

    const logIn = async(email, password) => {
        dispatch( onChecking() )
        try {
            const { data } = await calendarApi.post('/auth/login', {email, password});
            window.localStorage.setItem('token', data.token);
            dispatch( onLogin(data.user) )

        } catch (error) {
            dispatch( onLogOut('Incorrect credentials') )
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 100);
        }
    }

    const signUp = async(name, email, password) => {
        dispatch( onChecking() )

        try {
            const { data } = await calendarApi.post('/auth/new', {email, password, name})
            localStorage.setItem('token', data.token);
            dispatch( onLogin(data.user) )

        } catch (error) {
            dispatch( onLogOut(error.response.data.error || 'Server error, try it later') )
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 100);
        }
    }
    
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch( onLogOut() );

        try {
            const { data } = await calendarApi.post('auth/renew');
            window.localStorage.setItem('token', data.token);
            dispatch( onLogin(data.user) )
        } catch (error) {
            localStorage.clear();
            dispatch(onLogOut());
        }
    }

    const logOut = () => {
        localStorage.clear();
        dispatch( onClearCalendar() );
        dispatch( onLogOut() );
    }

    return {
        // Properties
        user,
        status,
        errorMessage,
        // Methods
        logIn,
        signUp,
        checkAuthToken,
        logOut
    }

}