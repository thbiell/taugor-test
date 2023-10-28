//o próprio usuário se cadsatra
import { auth } from '@/config/firebase';
import registerData from '../create/registerDoc';
import VerifyErroCode from '../errorCode';

export default async function registerNewUser(event, setErrorMessage, navigate, incrementUser, userState) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
        setErrorMessage("E-mail e/ou senha não preenchidos.");
    } else {
        setErrorMessage('')
        await auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const configureUser = {
                    id: user.uid,
                    firstName: data.get('firstName'),
                    lastName: data.get('lastName'),
                    email: data.get('email'),
                    createdAt: new Date(),
                }
                
                incrementUser(configureUser);
                registerData(userState);
                navigate('/login');
            })
            .catch((error) => {
                const errorText = VerifyErroCode(error.message)
                setErrorMessage(errorText);
            });
    }
}