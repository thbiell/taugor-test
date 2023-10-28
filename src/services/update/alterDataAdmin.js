import { logout, removeItem, removeUrl } from '@/config/auth';
import { auth } from '@/config/firebase';
import registerUser from '../auth/registerUser';
import registerDoc from '../create/registerDoc';
import registerImage from '../create/registerImage';
import alterDoc from './alterDoc';

async function alterByAdmin(data, setErrorMessage, userData) {
    if (data.get('password')) {
        //cadastra o novo usuário no auth
        await registerUser(userData.email, data.get('password'), setErrorMessage);
        const newUser = auth.currentUser.uid;
        await alterDoc(userData, newUser);
    }
    else {
        await alterByEmployee(data, userData)
    }
}

async function alterByEmployee(userData, id) {
    await alterDoc(userData, id);
}


export default async function alterDataAdmin(event, setErrorMessage, handleRedirect, userCopy, id) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

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
        email: userCopy.email,
        address: data.get('address'),
        phone: data.get('phone'),
        bornDate: data.get('bornDate'),
        office: data.get('office'),
        sector: data.get('sector'),
        admissionDate: data.get('admissionDate'),
        salary: data.get('salary'),
        status: 'activated',
        alteredBy: atualUser,
        alteredAt: new Date(),
        previousRecord: id,
    }

        await registerDoc(userCopy, 'referencesAlterations')
    // único que pode criar novos usuários com login e senha
    if (atualUser === 'administrador@taugor.teste.com') {
        await alterByAdmin(data, setErrorMessage, userData);
        removeItem();
        removeUrl();
        if (data.get('password')) {
            logout();
            auth.signOut
            handleRedirect('/login')
        } else { handleRedirect('/employees') }
    }
    //funcionário gerando novo funcionário
    else {
        await alterByEmployee(userData, id)
        removeUrl();
        removeItem();
        handleRedirect('/employees');
    }
}


