import { Table, TableCell, TableHead, TableRow, } from '@mui/material'
import  React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Box , Typography   } from "@mui/material";
import Axios from 'axios' 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import UserTable from './UserTable'

function Row(props) {
    const [bolin,setBolin] = useState(false)
    const [ id, setId ] = useState(0)
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ number, setNumber ] = useState("");

    const [open2, setOpen2] = React.useState(false);
    const dltOpen = () => setOpen2(true);
    const dltClose = () => setOpen2(false);

    const [open3, setOpen3] = React.useState(false);
    const sbmtOpen = () => setOpen3(true);
    const sbmtClose = () => setOpen3(false);

    const [userDt,setUserDt] = useState()

    function dlt(id){
        dltOpen();
        console.log(id,"silinecek")
        setUserDt(id) 
    }


    function update(id){
        sbmtOpen();
        setBolin(true)
        Axios.get(`http://localhost:5000/userUpGet/${id}`)
        .then((response) => {
            if(response.data){
                setId(response.data[0].id)
                setName(response.data[0].name)
                setNumber(response.data[0].number)
                setEmail(response.data[0].email)
            }else{
                alert("Bir hata oluştu.")
            }            
        })

    }
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell >{row.email}</TableCell>
          {/* <TableCell align="right">{row.fat}</TableCell> */}
            <TableCell>
                <IconButton aria-label="borderColor" onClick={() => update(row.id)}>
                    <BorderColorIcon color='success' />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => dlt(row.id)} >
                    <DeleteIcon color='success'/>
                </IconButton>
            </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Telefon Numarası
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Numaralar</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {row.number.map((historyRow) => (
                      <TableRow key={historyRow.number}>
                        <TableCell component="th" scope="row">
                          {historyRow.number}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );



  }
export default Row;