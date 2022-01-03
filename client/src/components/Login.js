import React from 'react';

import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, logoutUser } from '../redux/actions/usersActions';

const Login = () => {

    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.users.isAuthenticated);

    const responseSuccessGoogle = (res) => {
        const data = {
            tokenId: res.tokenId
        }
        dispatch(googleLogin(data));
    }

    const responseErrorGoogle = (error) => {
        console.log(error)
    }

    //Log out user
    const logout = () => {
        dispatch(logoutUser())
    }

    return (
        <div>
            {
                !isAuth ? <GoogleLogin
                    clientId="593666384376-ngcoi5gfh139p8jbiidf2kosedh7l1j8.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'} />
                    :
                    <button className='btn btn-danger btn-md' onClick={logout}>Log out</button>
            }
        </div>
    )
}
export default Login;