//administrador cadastra um novo funcionário
import { auth } from '@/config/firebase';
import VerifyErroCode from '../errorCode';


export default async function registerUser(email, password, setErrorMessage) {
    await auth.createUserWithEmailAndPassword(email, password)
        .then(() => { })
        .catch((error) => {
            const errorText = VerifyErroCode(error.message)
            setErrorMessage(errorText);
        });
}