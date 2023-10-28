import React from "react";
import Button from "@/components/elements/button";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "@/config/firebase";
import alterDataAdmin from "@/services/update/alterDataAdmin";
import InputGeneral from "@/components/elements/input/input";
import SelectGeneral from "@/components/elements/input/select";
import '../style.css'
export default function UpdateEmployee() {
    const [user, setUser] = React.useState(null);
    const [userCopy, setUserCopy] = React.useState(null);
    const [sentinela, setSentinela] = React.useState(true)
    const [urlImage, setUrlImage] = React.useState(''); 
    const [changedImg, setChangedImg] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const atualUser = auth.currentUser.email === 'administrador@taugor.teste.com';

    React.useEffect(() => {
        if (sentinela) {
            getUserFirestore(id);
            setSentinela(false);
        }

    }, [])

    const setPhoto = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        (file && file.type.match('image.*')) ? reader.readAsDataURL(file) : setUrlImage('');
        reader.onloadend = function () { setUrlImage(reader.result); setChangedImg(true) }
    }



    const getUserFirestore = async (id) => {
        const data = await db.collection('users').doc(id).get();
        if (data.exists) {
            if (user === null) {
                const getData = data.data();
                setUser(getData);
                setUserCopy(getData);
                setUrlImage(getData.urlImage);
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };



    function handleRedirect(uri) { navigate(uri) }

    const handleSubmit = async (event) =>
        alterDataAdmin(
            event,
            setErrorMessage,
            handleRedirect,
            userCopy,
            id,
            urlImage,
            changedImg);


    return (
        user ?
            <section className="containerFormGeneral">
                <div className="containerForm">
                    <h2 >
                        Alterar funcionário
                    </h2>
                    <form onSubmit={handleSubmit}>

                        <h3>
                            Dados pessoais
                        </h3>
                        <div className="containerRow">
                            <div className="itemForm">
                                <InputGeneral
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleChange}
                                    required
                                    classess={'general-input '}
                                    id="firstName"
                                    title="Nome"
                                    autoFocus
                                />
                            </div>
                            <div className="itemForm">
                                <InputGeneral
                                    required
                                    classess={'general-input '}
                                    id="lastName"
                                    title="Sobrenome"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="itemForm">
                                <InputGeneral
                                    classess={'general-input'}
                                    name="bornDate"
                                    value={user.bornDate}
                                    onChange={handleChange}
                                    title="Data de nascimento"
                                    type="date"
                                    id="bornDate"
                                />
                            </div>


                            <div className="itemForm">
                                <SelectGeneral
                                    required
                                    classess={'general-input '}
                                    name="gender"
                                    title="Sexo"
                                    value={user.gender}
                                    onChange={handleChange}
                                    items={[{ value: 'female', name: 'Feminino' }, { value: 'male', name: 'Masculino' }]}
                                    id="gender" />
                            </div>


                            <div className="itemForm containerInputPhoto">
                                <img className='imageEmployee' alt='Foto do funcionário' src={urlImage} />
                                < InputGeneral
                                    classess={'general-input '}
                                    name="photo"
                                    title="Foto do perfil"
                                    type="file"
                                    onChange={setPhoto}
                                    id="photo"
                                />
                            </div>
                        </div>
                        <h3>
                            Dados de acesso e contato
                        </h3>

                        <div className="containerRow">
                            <div className="itemForm">
                                <InputGeneral
                                    required
                                    classess={'general-input '}
                                    id="phone"
                                    title="Telefone"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleChange}
                                    type="tel"
                                />
                            </div>
                            <div className="itemForm">
                                <InputGeneral
                                    required
                                    classess={'general-input address-input'}
                                    name="address"
                                    value={user.address}
                                    onChange={handleChange}
                                    title="Endereço"
                                    type="text"
                                    id="address"
                                />
                            </div>
                        </div>
                        <div className="containerRow">
                            <div className="itemForm">
                                <InputGeneral
                                    required
                                    classess={'general-input '}
                                    id="email"
                                    disabled
                                    title="E-mail"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    type="email"
                                />
                            </div>

                        </div>
                        <h3>
                            Dados do funcionário
                        </h3>
                        <div className="containerRow">
                            <div className="itemForm">
                                <InputGeneral
                                    required
                                    classess={'general-input '}
                                    name="office"
                                    value={user.office}
                                    onChange={handleChange}
                                    title="Cargo"
                                    type="text"
                                    id="office"
                                />
                            </div>
                            <div className="itemForm">
                                <InputGeneral
                                    required
                                    classess={'general-input '}
                                    name="sector"
                                    value={user.sector}
                                    onChange={handleChange}
                                    title="Setor"
                                    type="text"
                                    id="sector"
                                />
                            </div>
                            <div className="itemForm">
                                <InputGeneral
                                    required
                                    classess={'general-input'}
                                    name="admissionDate"
                                    value={user.admissionDate}
                                    onChange={handleChange}
                                    title="Data de admissão"
                                    type="date"
                                    id="admissionDate"
                                />
                            </div>
                            <div className="itemForm">
                                <InputGeneral
                                    required
                                    classess={'general-input '}
                                    name="salary"
                                    value={user.salary}
                                    onChange={handleChange}
                                    title="Salário"
                                    type="number"
                                    id="salary"
                                />
                            </div>
                        </div>
                        <h3>
                            {errorMessage}
                        </h3>

                        <div className="containerButton">
                            <Button
                                title="Alterar"
                                typeButton="input-button"
                                type="submit"
                            />

                            <Button
                                title="Cancelar"
                                typeButton="input-button"
                                onClick={() => handleRedirect('/employees')}
                            />

                        </div>
                    </form>
                </div>

            </section >


            : <> Carregando...</>

    )
}
