import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination} from '@mui/material'
import  React, {useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { Button , Modal , Box , Typography , TextField } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import Axios from 'axios' 
import CallIcon from '@mui/icons-material/Call';
import PhoneNumber from './phoneNumber'

//modal css
const modal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 14,
    p: 4,
};

const submitButton = {
    float:'right',
    background: 'black',
    textTransform: 'capitalize',
    '&:hover': { background: '#262626' }

}

function UserTable () {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    const [open2, setOpen2] = React.useState(false);
    const dltOpen = () => setOpen2(true);
    const dltClose = () => setOpen2(false);

    const [open3, setOpen3] = React.useState(false);
    const sbmtOpen = () => setOpen3(true);
    const sbmtClose = () => setOpen3(false);

    const [open4, setOpen4] = React.useState(false);
    const addOpen = () => setOpen4(true);
    const addClose = () => setOpen4(false);
    
    const [userDt,setUserDt] = useState()
    const [numberDt,setNumberDt] = useState()
    const [bolin,setBolin] = useState(false)
    const [error,setError] = useState()
    const [ id, setId ] = useState(0)
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ nameError,setNameError ] = useState("");
    const [ mailError,setMailError ] = useState("");
    const [ regStatus, setRegStatus ] = useState("");
    const [ data, setData ] = useState([]);
    
    const user = {name: name, email: email} 

    const userAdd = () =>{
        if(user.name ==='' || user.email === ''){
            //alert("Lütfen tüm alanları doldurunuz")
            setError(true);
        }else if( user.name.length < 2){
            setNameError(true)
        }
        else{
            if(emailValidation(user.email) ){
                setError(false);
                user.token = localStorage.getItem("token");
                Axios.post('http://localhost:5000/userAdd', user )
                    .then((response) => {
                    if(response.data){
                        setRegStatus(response.data)
                        setTimeout(() => userData(), 200);
                    }else{
                        setRegStatus("Kaydınız oluşturulamadı.")
                    }
                });
                setBolin("")
            } 

        }
    }
    /******get */
    const userData = async () => {
        const users = await Axios.get('http://localhost:5000/userGet', {
            headers:{Authorization: `Bearer ${window.localStorage.getItem("token")}`}
        })
        setData(users.data)
    }
    useEffect(() => {
        userData();
    }, []); 
    /******/
   
    function emailValidation(){
        const emailRegex = /^\S+@\S+\.\S+$/;
        let mail;
        if(!emailRegex.test(user.email)){
            setMailError(true);
            mail=0
        }else{
            setMailError(false);
            mail=1
        }
        return mail;
    }
       
    /*****delete */
    function dlt(id){
        dltOpen();
        console.log(id,"silinecek")
         setUserDt(id) 
    }
    const dltBtn = () => {
        Axios.delete(`http://localhost:5000/userDelete/${userDt}`);
        setTimeout(() => userData(), 500);
        console.log(userData)
        dltClose();
    }
    /*********/
    /******update */
    function update(id){
        sbmtOpen();
        setBolin(true)
        Axios.get(`http://localhost:5000/userUpGet/${id}`)
        .then((response) => {
            if(response.data){
                setId(response.data[0].id)
                setName(response.data[0].name)
                // setNumber(response.data[0].number)
                setEmail(response.data[0].email)
            }else{
                alert("Bir hata oluştu.")
            }            
        })

    }
    const userUpdate = () =>{
        if(user.name ==='' ||  user.email === ''){
            //alert("Lütfen tüm alanları doldurunuz")
            setError(true);
        }else{
            if(emailValidation(user.email) ){
                setError(false);
                Axios.put(`http://localhost:5000/userUpdate/${id}`, user )
                    .then((response) => {
                    if(response.data){
                        setRegStatus(response.data)
                        setTimeout(() => userData(), 400);
                    }else{
                        setRegStatus("Kaydınız oluşturulamadı.")
                    }
                });
            } 
            clear()

        }
    }
    /********/
    /*****phoneNumber func */
    function add(id) {
        console.log(id)
        addOpen();
        setNumberDt(id)
    }
    /*******/
    function clear(){
        sbmtClose("")
        setRegStatus("")
        setName("")
        setEmail("")
        setBolin("")
    }

    return(
        <div >
            <Button onClick={sbmtOpen}  variant="outlined" sx={{ float:'right', mb:3, textTransform: 'capitalize' }} color="success">Kişi Ekle</Button>
            {/* user table */}
            <TableContainer component={Paper} className='userTable'>
                <Table  aria-label="simple table">
                    <TableHead>
                    <TableRow className='tableHeader' >
                        <TableCell sx={{ fontWeight: 'bold' }}>Ad Soyad</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Mail Adresi</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Telefon </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>İşlemler</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                        <TableRow
                        key={row.id}
                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell sx={{ textTransform: 'capitalize' }}>{row.name}</TableCell>
                        <TableCell >{row.email}</TableCell>
                        <TableCell >
                            <IconButton aria-label="borderColor" onClick={() => add(row.id)}>
                                <CallIcon color='success' fontSize='medium'/>
                            </IconButton>
                        </TableCell>
                        <TableCell>
                            <IconButton aria-label="borderColor" onClick={() => update(row.id)}>
                                <BorderColorIcon color='success' />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => dlt(row.id)} >
                                <DeleteIcon color='success'/>
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* delete modal */}
            <Modal
                open={open2}
                onClose={dltClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Bu Kişiyi Silmek İstiyor Musunuz?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '44ch' },}} noValidate autoComplete="off">
                            <div>
                                <Button variant="contained" sx={{ background: 'black', float: 'right', mx:2 }} onClick={dltClose}>Hayır</Button>
                                <Button variant="contained" sx={{ background: '#2E7D32', float: 'right' }} onClick={dltBtn}>Evet</Button>

                            </div>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
            {/* add modal */}
            <Modal
                open={open4}
                onClose={addClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={modal}>
                   <PhoneNumber id={numberDt}/>
                </Box>
            </Modal>
            {/* submit modal */}
            <Modal
                open={open3}
                onClose={sbmtClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                         {!bolin?`Yeni Kişi Ekle`:`Kişiyi Güncelle`} 
                        <IconButton aria-label="borderColor" sx={{ float: 'right' }} onClick={clear}>
                            <ClearIcon color='success' fontSize='medium'/>
                        </IconButton>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '44ch' },}} noValidate autoComplete="off">
                                <form  >
                                    <div>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                                        <TextField
                                        id='userName'
                                        name='userName'
                                        label="Ad Soyad"
                                        variant="standard"
                                        color="success"
                                        value={user.name}
                                        minLength="2"
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                        required
                                        helperText={"Lütfen bu alanı doldurunuz"}
                                        {...(nameError && {error:true, helperText:"İsminiz 2 karakterden az olamaz."})}
                                        {...(error && {error:true, helperText:"Bu alan boş bırakılamaz."})}
                                        />
                                    </Box>
                                    {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <LocalPhoneIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                                        <TextField
                                        //  id="userPhone"
                                        name="userPhone"
                                        label="Telefon Numarası"
                                        variant="standard"
                                        color="success"
                                        type="number"
                                        required
                                        value={user.number}
                                        onChange={(e) => {
                                            setNumber(e.target.value)
                                        }}
                                        InputProps={{ inputProps: { min: 0 } }}
                                        helperText={"Lütfen bu alanı doldurunuz"}
                                        {...(phoneError && {error:true, helperText:"Telefon numaranız eksik ya da yanlış. Lütfen kontrol ediniz."})}
                                        {...(error && {error:true, helperText:"Bu alan boş bırakılamaz."})}
                                        />
                                    </Box> */}
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                                        <TextField
                                        // id="userMail"
                                        name="userMail"
                                        type="email"
                                        label="Mail Adresi"
                                        variant="standard"
                                        color="success"
                                        value={user.email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        required
                                        helperText={"Lütfen bu alanı doldurunuz"}
                                        {...(mailError && {error:true, helperText:"Mail adresiniz eksik ya da yanlış. Lütfen kontrol ediniz.. (xx@xx.com)"})}
                                        {...(error && {error:true, helperText:"Bu alan boş bırakılamaz."})}

                                        />
                                        {/* <p>{error}</p> */}
                                    </Box>
                                     </div>
                                    <Typography component="h4" variant="h5" className='alert' style={{ color:"red", background:"rgb(253, 237, 237)", padding:'0 10px', fontSize:'15px' }}>
                                        {regStatus}
                                    </Typography>
                                    <Button id='sbmtBtn' onClick={!bolin?userAdd:userUpdate} variant="contained" sx={ submitButton } >{!bolin?`Kaydet`:`Güncelle`}</Button>
                                </form>
                            </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default UserTable;