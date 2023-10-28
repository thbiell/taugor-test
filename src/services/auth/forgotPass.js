import { auth } from "@/config/firebase";
import VerifyErroCode from "../errorCode";

export default async function forgotPass(event, setMessage) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');

    if (!email) {
        setMessage({ messageUser: "E-mail não preenchido.", error: true });
    } else {
        setMessage({ messageUser: '', error: false })
        await auth.sendPasswordResetEmail(email)
            .then(function () {
                setMessage({
                    messageUser: 'Verifique seu email.',
                    error: false
                });
            })
            .catch((error) => {
                const errorText = VerifyErroCode(error.message)
                setMessage({ messageUser: errorText, error: true });
            });
    }
}