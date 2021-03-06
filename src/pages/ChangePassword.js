import React, { useEffect, useState } from 'react';
import { URL } from '../utils/Constants';
import axios from 'axios';
import BreadcrumbBar from '../components/BreadcrumbBar';
import LoadingWrapper from '../components/LoadingWrapper';
import Heading from '../components/Heading';
import Form from '../components/Form';
import ErrorPage from './ErrorPage';
import TokenManager from '../utils/token-manager';
import { withRouter } from 'react-router';
import '../style/CreateEmployee.scss';

const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

const ChangePassword = ({history, user, setUser}) => {
    const [password, setPassword] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
                const decodedToken = TokenManager.getTokenPayload();
                const id = decodedToken.unique_name;
                const response = await axios.get(`${URL}/user/${id}`, axiosHeaders);
                setUser(response.data.user);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                let errorMessage;
                const { data, status } = error.response;
                data.message ? errorMessage = data.message : errorMessage = data.title;
                setErrorMessage({message: errorMessage, status: status});
            }
        };
        fetchUser();
    }, [setUser]);

    const handleInputChange = event => {
        if (errorMessage) {
            setErrorMessage('');
        }
        setPassword({
            ...password,
            [event.target.name]: event.target.value}
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password.newPassword !== password.confirmNewPassword) {
            setFormErrorMessage('Your passwords do not match');
            return;
        };

        try {
            setLoading(true);
            const { confirmNewPassword, ...updateObj } = password;
            const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
            await axios.put(`${URL}/user/${user.userId}/password`, updateObj, axiosHeaders);
            setLoading(false);
            history.push('/home');
        } catch (error) {
            setLoading(false);
            setFormErrorMessage(error.response.data.message);
        }
    }

    
    const { oldPassword, newPassword, confirmNewPassword } = password;
    const formArr = [
        { type: 'password', value: oldPassword, name: 'oldPassword', label: 'Old Password' },
        { type: 'password', value: newPassword, name: 'newPassword', label: 'New Password' },
        { type: 'password', value: confirmNewPassword, name: 'confirmNewPassword', label: 'Confirm New Password' },
    ];

    if (errorMessage) return <ErrorPage errorMessage={errorMessage} />
    return (
        <>
            <BreadcrumbBar page='Change Password' />
            <div className='headingContainer'>
                <Heading>Change Password</Heading>
            </div>
            <LoadingWrapper loading={loading}>
                <div className='formContainer'>
                    {formArr &&
                        <Form 
                            formArr={formArr}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            btnText='Save'
                            errorMessage={formErrorMessage}
                        />
                    }       
                </div>
            </LoadingWrapper>
        </>

    );
}

export default withRouter(ChangePassword);