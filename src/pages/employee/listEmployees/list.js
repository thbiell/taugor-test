import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import defaultProfile from '@/assets/default-profile.png'
import Button from '@/components/elements/button';
import deleteDocument from '@/services/delete/deleteDocument';
import { auth } from '@/config/firebase';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]:
    { backgroundColor: "#2581C4", color: theme.palette.common.white, fontSize: 13, },
  [`&.${tableCellClasses.body}`]: { fontSize: 12, },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover, },
  // hide last border
  '&:last-child td, &:last-child th': { border: 0, },
}));

export default function CustomizedTables(rows, handleGoTo) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Funcionário</StyledTableCell>
            <StyledTableCell align="left">E-mail</StyledTableCell>
            {/* <StyledTableCell align="right">bornDate</StyledTableCell> */}
            <StyledTableCell align="left">Telefone</StyledTableCell>
            <StyledTableCell align="left">Cargo</StyledTableCell>
            <StyledTableCell align="left">Setor</StyledTableCell>
            <StyledTableCell align="left">Admissão</StyledTableCell>
            {/* <StyledTableCell align="left">Nível de acesso</StyledTableCell> */}
            <StyledTableCell align="center">Ação</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row" sx={{ width: 250, margin: 1 }}>
                <div className='containerImageName'>
                  {
                    row.photo
                      ? <img className='gridImage1' src={row.photo} alt='employee photo' />
                      : <img className='gridImage1' src={defaultProfile} alt='employee photo' />
                  }
                  {row.name}
                </div>
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 50, margin: 1 }}>{row.email}</StyledTableCell>
              {/* <StyledTableCell align="left" sx={{ width: 80, margin: 2 }}>{new Date(row.bornDate).toLocaleDateString('pt-br')}</StyledTableCell> */}
              <StyledTableCell align="left" sx={{ width: 80, margin: 1 }}>{row.phone}</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 80, margin: 1 }}>{row.office}</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 80, margin: 1 }}>{row.sector}</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 80, margin: 1 }}>{new Date(row.admissionDate).toLocaleDateString('pt-br')}</StyledTableCell>
              {/* <StyledTableCell align="left" sx={{ width: 120, margin: 1 }}>{row.levelAccess}</StyledTableCell> */}
              <StyledTableCell align="left" sx={{ width: 80 }}>
                <div className='containerButtonsAction'>
                  <Button
                    title={'Editar'}
                    typeButton='input-button-edit'
                    disabled={(row.email === 'administrador@taugor.teste.com'
                      || row.levelAccess === 'medium') && row.email !== auth.currentUser.email
                    }
                    onClick={() => handleGoTo(`edit/${row.id}`)}
                  />
                  <Button
                    title={'Desligar'}
                    typeButton='input-button-delete'
                    disabled={row.email === 'administrador@taugor.teste.com'
                      || row.levelAccess === 'medium'
                    }
                    onClick={() => deleteDocument(row.id)}
                  />

                  <Button
                  title="Ver histórico" 
                  type-button='input-button-info'
                  onClick={() => handleGoTo(`historic/${row.id}`)}
                  />                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}