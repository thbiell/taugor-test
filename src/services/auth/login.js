import { login, setItem } from '@/config/auth';
import { auth } from '@/config/firebase';
import VerifyErroCode from '../errorCode';

async function loginUser(event, setErrorMessage, navigate) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
        setErrorMessage("E-mail e/ou senha não preenchidos.");
    } else {
        setErrorMessage('')
        await auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                login(JSON.stringify(user.refreshToken));
                setItem(user.email)
                navigate('/');
            })
            .catch((error) => {
                const errorText = VerifyErroCode(error.message)
                setErrorMessage(errorText)
            });
    }
}
export default loginUser;