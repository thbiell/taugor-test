import { logout, removeItem, removeUrl } from '@/config/auth';
import registerDoc from './registerDoc';
import { auth, db } from '@/config/firebase';
import registerUser from '../auth/registerUser';
import registerImage from './registerImage';
import alterDoc from '../update/alterDoc';

async function verifyEmail(email) {
    const usersRef = db.collection('users').where('email', '==', email);
    return (await usersRef.get()).docs.length;
}

async function registerByAdmin(data, setErrorMessage, userData, urlImage) {
    if (userData.levelAccess === 'medium') {
        //cadastra o novo usuário no auth
        await registerUser(data.get('email'), data.get('password'), setErrorMessage);
        const newUser = auth.currentUser.uid;
        await alterDoc(userData, newUser)
    }
    else { await registerByEmployee(userData) }
}

async function registerByEmployee(userData) {
    await registerDoc(userData, 'users');
}

export default async function registerDataAdmin(event, setErrorMessage, handleRedirect) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const totalEmail = await verifyEmail(data.get('email'));
    if (totalEmail === 0) {
        setErrorMessage('');
        const atualUser = auth.currentUser.email;

        let urlImage = null;
        console.log(data.get('photo'));
        if (data.get('photo') && data.get('photo').type.match('image.*')) {
            urlImage = await registerImage(data.get('photo'), data.get('email')); //cadastra foto
        }

        const userData = {
            urlImage,
            gender: data.get('gender'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            address: data.get('address'),
            phone: data.get('phone'),
            bornDate: data.get('bornDate'),
            office: data.get('office'),
            sector: data.get('sector'),
            admissionDate: data.get('admissionDate'),
            salary: data.get('salary'),
            status: 'activated',
            createdBy: atualUser,
            createdAt: new Date(),
        }

        // único que pode criar novos usuários com login e senha
        if (atualUser === 'administrador@taugor.teste.com') {
            await registerByAdmin(data, setErrorMessage, userData, urlImage);
            removeItem();
            removeUrl();

            if (data.get('password')) {
                logout();
                auth.signOut();
                handleRedirect('/login');
            } else {
                handleRedirect('/employees');
            }
        }
        //funcionário gerando novo funcionário
        else {
            await registerByEmployee(userData);
            removeUrl();
            removeItem();
            handleRedirect('/employees');
        }

    } else { setErrorMessage('E-mail já cadastrado.'); }

}
