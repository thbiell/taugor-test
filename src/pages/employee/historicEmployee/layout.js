import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',

  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    color: '#145AA0',
    fontSize: 13,
  },
  text: {
    color: '#145AA0',
    fontSize: 11,
  },

});
function convertFirestoreTimestampToDateTime(timestamp) {
  const seconds = timestamp.seconds;
  const nanoseconds = timestamp.nanoseconds;
  return new Date(seconds * 1000 + nanoseconds / 1000000);
}

function Layout(dataUser) {
  const data = dataUser.data
  
  return (

    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Histórico de alterações do funcionário</Text>
        </View>
        {data.map(item => (


          <View style={styles.page} key={item.id}>
            <Text style={styles.text}>Documento registrado por: {item.data?.createdBy}</Text>
            <Text style={styles.text}>
              Documento registrado em:
              {new Date(item.data.createdAt).toLocaleDateString('pt-br')}
              {' '}
              {new Date(item.data.createdAt).toLocaleTimeString('pt-br')}
            </Text>
            <Text style={styles.text}>Documento alterado por: {item.data?.alteredBy}</Text>
            <Text style={styles.text}>
              Documento alterado em:
              {new Date(item.data.alteredAt).toLocaleDateString('pt-br')}
              {' '}
              {new Date(item.data.alteredAt).toLocaleTimeString('pt-br')}
            </Text>
            <View style={styles.section}>
              <Text style={styles.title}>Dados pessoais</Text>

              <Text style={styles.text}>Nome completo: </Text>
              <Text style={styles.text}>{item.data?.firstName}{' '}{item.data?.lastName}</Text>

              <Text style={styles.text}> Data de nascimento: </Text>
              <Text style={styles.text}>{new Date(item.data?.bornDate).toLocaleDateString('pt-br')} </Text>

              <Text style={styles.text}> Sexo: </Text>
              <Text style={styles.text}>{(item.data?.gender === 'female') ? 'Feminino' : 'Masculino'} </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Dados de contato e nível de acesso</Text>

              <Text style={styles.text}>Telefone: </Text>
              <Text style={styles.text}>{item.data?.phone}</Text>

              <Text style={styles.text}> Endereço: </Text>
              <Text style={styles.text}>{item.data?.address} </Text>

              <Text style={styles.text}> Email: </Text>
              <Text style={styles.text}>{item.data?.email} </Text>


            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Dados profissionais</Text>

              <Text style={styles.text}>Cargo: </Text>
              <Text style={styles.text}>{item.data?.office}</Text>

              <Text style={styles.text}>Setor: </Text>
              <Text style={styles.text}>{item.data?.sector}</Text>

              <Text style={styles.text}>Salário: </Text>
              <Text style={styles.text}>{item.data?.salary}</Text>

              <Text style={styles.text}> Data de admissão: </Text>
              <Text style={styles.text}>{new Date(item.data?.admissionDate).toLocaleDateString('pt-br')} </Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default Layout;