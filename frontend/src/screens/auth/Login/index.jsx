import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import http from '../../../controllers/http';

const Main = styled.section`
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0%);
    padding: 1em 8em 4em;
    border-radius: .8rem;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.418);
    background-color: #dcdfe0;


    h1 {
        font-family: ${({ theme }) => theme.fonts.primary};
        margin-bottom: 1.8rem;
    }

    input {
        padding: .8rem;
        margin-bottom: 1rem;
        border-radius: .5rem;
        border: 1px solid black;
        font-family: ${({ theme }) => theme.fonts.secondary};
        outline: none;
    }

    button {
        width: 5rem;
        height: 2rem;
        border: 1px solid;
        border-radius: .3rem;
        font-family: ${({ theme }) => theme.fonts.secondary};
        cursor: pointer;
        transition: all .3s ease-in-out;
        font-size: 1.05rem;
        margin-top: 1rem;
        transform: translateX(130%);

        &:hover {
            background-color: ${({ theme }) => theme.colors.grey};
            color: ${({ theme }) => theme.colors.white};
        }

    }

    form {
        display: flex;
        flex-direction: column;
    }

    a {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: .8rem;
        color: black;
        margin-bottom: 1rem;
    }
    
    #logo {
        width: 18rem;
    }
`

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['token']);
    async function verifyIfTokenIsTrue() {
        await http.post('/user/verifyToken', { token: cookies.token })
            .then((res => {
                window.location.href = `/dashboard/${res.data.link}`

            }))
            .catch(err => {
                toast.error(err.response.data.msg)
            })
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    async function handleLogin(e) {
        e.preventDefault();

        await http.post('/user/login', { email, password })
            .then((res => {
                toast.success(res.data.msg);
                setCookie('token', res.data.token);
                verifyIfTokenIsTrue()
            }))
            .catch(err => {
                toast.error(err.response.data.msg)
            })
    }

    return (
        <Main>
            <img src="/img/logo.png" alt="logo" id='logo' />
            <h1>Login in your account</h1>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Email' value={email} onChange={handleEmailChange} />
                <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} />
                <a href="/signup">I don't have an account</a>
                <button type='submit'>Login</button>
            </form>
        </Main>
    )
}