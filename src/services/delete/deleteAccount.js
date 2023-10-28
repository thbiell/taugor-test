import { auth } from "@/config/firebase";

export default async function deleteAccount(handleLogout){
    const atualUser = auth.currentUser;
    if(atualUser.email === 'administrador@taugor.teste.com'){
      alert('Não foi possível completar a ação.')
    }else{
      const password = prompt('Insira sua senha para continuar.');
      const user = (await auth.signInWithEmailAndPassword(auth.currentUser.email, password)).user;
      user.delete();
      handleLogout();
    }   
  
  }