import { getUserByEmail, getUserById } from "@/services/consults";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react"
import { useParams } from "react-router-dom";
import Layout from "./layout";
import '../style.css';
export default function Historic() {
    const { id } = useParams();
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        getData(id)

    }, [id]);

    async function getData(id) {
        const dataByCollectionUsers = (await getUserById('users', id));

        const dataByCollectionReferences =
            await getUserByEmail('referencesAlterations', dataByCollectionUsers.data.email);

        setData(dataByCollectionReferences.concat(dataByCollectionUsers))
    }

    if(data.length > 0){
        return (
            <div className='containerHistoric'>
                < span > Histórico</span >
               <PDFViewer className='containerHistoric'>
                    <Layout data={data} />
                </PDFViewer> 
            </div >
        )

    }else{ return (  <>Carregando...</>  )

    }
    
}