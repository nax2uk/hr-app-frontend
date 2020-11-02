import React, { useReducer, useState } from 'react'
import '../style/Login.scss';

// const initialState = {
//     username: '',
//     password: '',
// };

// const loginReducer = (currentState, action) => {
//     switch (action.type) {
//         case 'USERNAME_CHANGE':
//             return { ...currentState, username: action.payload };
//         case 'PASSWORD_CHANGE':
//             return { ...currentState, password: action.payload };
//         default:
//             return currentState;
//     };
// };

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [loginFail, setLoginFail] = useState(false)

    const inputChangeHandler = event => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else {
            setPassword(value);
        }
        console.log('username', username);
        console.log('password', password)
    };


    const submitHandler = event => {
        event.preventDefault();
        if (username === 'Richard' && password === 'aaaa') {
            setLoginFail(false)
            setLoginSuccess(true);
        } else {
            setLoginSuccess(false);
            setLoginFail(true);
        }
    }
    return (
        <div className='loginPage'>
            <h1 className='text'>Login Page</h1>
            <div className='loginContainer'>
                <form className='loginForm' onSubmit={submitHandler}>
                    <label>Username</label>
                    <input 
                        className='loginForm__input'
                        type='text' 
                        value={username}
                        name='username'
                        onChange={inputChangeHandler}
                    />
                    <label>Password</label>
                    <input 
                        className='loginForm__input'
                        type='password' 
                        value={password}
                        name='password'
                        onChange={inputChangeHandler}
                    />
                    <button type='submit'>Login</button>
                </form>
                {loginSuccess && <div>You have successfully logged in as {username}</div>}
                {loginFail && <div>There was an error logging in</div>}
            </div>
        </div>
    )
}

export default Login