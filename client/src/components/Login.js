import React from 'react';

import { GoogleLogin } from 'react-google-login';
import { useDispatch} from 'react-redux';
import { googleLogin } from '../redux/actions/usersActions';

const Login = () => {

    const dispatch = useDispatch();

    const responseSuccessGoogle = (res) => {
        const data = {
            tokenId: res.tokenId
        }
        dispatch(googleLogin(data));
    }

    const responseErrorGoogle = (error) => {
        console.log(error)
    }

    return (
        <GoogleLogin
            clientId="593666384376-ngcoi5gfh139p8jbiidf2kosedh7l1j8.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'} />
    )
}
export default Login;