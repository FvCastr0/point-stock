import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import http from './http';

async function verifyToken() {
    const [cookies] = useCookies(['token']);
    const location = useLocation();

    const userId = location.pathname.split('/')[2];
    if (!cookies.token) {
        window.location.href = '/'
    }

    const login = await http.post('/user/verifyToken', { token: cookies.token })
    const id = login.data.link

    if (id !== userId) {
        window.location.href = '/'
    }

}

export default verifyToken;