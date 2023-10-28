import Header from '@/components/header';
import { db } from '@/config/firebase';
import React from 'react';
import CustomizedTables from './list';
import '../style.css';
import { useNavigate } from 'react-router-dom';


export default function ListInactives() {
  const [users, setUsers] = React.useState([])
  const navigate = useNavigate();
  React.useEffect(() => {
    const data = db.collection('users').orderBy('savedAt', 'desc');
    data.onSnapshot((items) => {
      setUsers(items.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    })
  }, []);

  function createData(id, photo, name, email, bornDate, phone, office, sector, admissionDate, levelAccess, action) {
    return { id, photo, name, email, bornDate, phone, office, sector, admissionDate, levelAccess, action };
  }

  function handleGoTo(uri){
    navigate(uri);
  }

  const rows = users ? users.filter(user => user.data.status === 'inactive').map((user) =>
    createData(
      user.id,
      user.data.urlImage,
      `${user.data.firstName} ${user.data.lastName}`,
      user.data.email,
      user.data.bornDate,
      user.data.phone,
      user.data.office,
      user.data.sector,
      user.data.admissionDate,
      user.data.levelAccess,
    )
  ) : []
  return (
    <div className='containerListEmployees'>
      <Header />
 
      <section className='containerTable' style={{ marginTop: '8rem' }}>
        {CustomizedTables(rows, handleGoTo)}
      </section>
    </div>
  );
}