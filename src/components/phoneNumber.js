import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination} from '@mui/material'
import  React, {useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { Button , Modal , Box , Typography , TextField } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Axios from 'axios' 
import BookmarkIcon from '@mui/icons-material/Bookmark';
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
export default function Cat(props) {

    const directoryId = props.id;
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
    
    const [userDt,setUserDt] = useState()
    const [bolin,setBolin] = useState(false)
    const [error,setError] = useState()
    const [ id, setId ] = useState(0)
    const [ tag, setTag ] = useState("");
    const [ number, setNumber ] = useState("");
    const [ phoneError,setPhoneError ] = useState("");
    const [ tagError,setTagError ] = useState("");
    const [ regStatus, setRegStatus ] = useState("");
    const [ data, setData ] = useState([]);
    
    const numbers =  {tag: tag, number: number} 

    /****post */
    const numberAdd = () =>{
        if( numbers.number === '' || numbers.tag === ''){
            //alert("Lütfen tüm alanları doldurunuz")
            setError(true);
        }
        else{
            if(phoneValidation(numbers.number) ){
                setError(false);
                numbers.directory_Id = directoryId;
                console.log("user>>>", numbers);
                Axios.post('http://localhost:5000/numberAdd', numbers )
                    .then((response) => {
                    if(response.data){
                        console.log("22",response)
                        setRegStatus(response.data)
                        setTimeout(() => user_Data(), 200);
                    }else{
                        setRegStatus("Kaydınız oluşturulamadı.")
                    }
                });
                setBolin("")
            } 

        }
    }
    /*****/
    /****get */
    const user_Data = async () => {
        const users = await Axios.get('http://localhost:5000/numberGet', { params: {
            directory_Id: directoryId,
          }
        });
             setData(users.data)
            console.log("kqqkk",users.data)
    
        
        // console.log("kkk",data)
    }
    useEffect(() => {
        user_Data();
    }, []); 
    /*******/
    function phoneValidation(){
        const phoneRegEx = /^[(]?[0-9]{11}$/;
        let phone;
        if(!phoneRegEx.test(numbers.number)){
            phone=0
            setPhoneError(true);
        }else{
            setPhoneError(false);
            phone=1
        }
        return phone;
    }
    /*****delete */
    function dlt(id){
        dltOpen();
        console.log(id,"silinecek")
         setUserDt(id) 
    }
    const dltBtn = () => {
        Axios.delete(`http://localhost:5000/numberDelete/${userDt}`);
        setTimeout(() => user_Data(), 500);
        dltClose();
    }
    /******/
    /*****up****/    
    function update(id){
        sbmtOpen();
        setBolin(true)
        Axios.get(`http://localhost:5000/numberUpGet/${id}`)
        .then((response) => {
            if(response.data){
                setId(response.data[0].id)
                setTag(response.data[0].tag)
                setNumber(response.data[0].phoneNumber)
            }else{
                alert("Bir hata oluştu.")
            }            
        })
    }    
    const numberUpdate = () =>{
        if( numbers.number === '' ){
            setError(true);
        }else{
            if(phoneValidation(numbers.number) ){
                setError(false);
                Axios.put(`http://localhost:5000/numberUpdate/${id}`, numbers )
                    .then((response) => {
                    if(response.data){
                        setRegStatus(response.data)
                        setTimeout(() => user_Data(), 400);
                    }else{
                        setRegStatus("Kaydınız oluşturulamadı.")
                    }
                });
                sbmtClose();
                setRegStatus("")
                setTag("")
                setNumber("")
                setBolin("")
            } 
        }
    }
    /**********/
    function clear(){
        sbmtClose("")
        setRegStatus("")
        setNumber("")
        setBolin("")
    }

    return(
        <div >
            <Button onClick={sbmtOpen}  variant="outlined" sx={{ float:'right', mb:3, textTransform: 'capitalize' }} color="success">Numara Ekle</Button>
            {/* user table */}
            <TableContainer component={Paper} className='userTable'>
                <Table  aria-label="simple table">
                    <TableHead>
                    <TableRow className='tableHeader' >
                        <TableCell sx={{ fontWeight: 'bold' }}>Etiket</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Telefon Numarası</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>İşlemler</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell sx={{ textTransform: 'capitalize' }}>{row.tag}</TableCell>
                        <TableCell >{row.phoneNumber}</TableCell>
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
            {/* submit modal */}
            <Modal
                open={open3}
                onClose={sbmtClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                         {!bolin?`Yeni Numara Ekle`:`Numarayı Güncelle`} 
                        <IconButton aria-label="borderColor" sx={{ float: 'right' }} onClick={clear}>
                            <ClearIcon color='success' fontSize='medium'/>
                        </IconButton>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '44ch' },}} noValidate autoComplete="off">
                            <form  >
                                <div>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <LocalPhoneIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                                    <TextField
                                    //  id="userPhone"
                                    name="userPhone"
                                    label="Telefon Numarası"
                                    variant="standard"
                                    color="success"
                                    type="number"
                                    required
                                    value={numbers.number}
                                    onChange={(e) => {
                                        setNumber(e.target.value)
                                    }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                    helperText={"Lütfen bu alanı doldurunuz"}
                                    {...(phoneError && {error:true, helperText:"Telefon numaranız eksik ya da yanlış. Lütfen kontrol ediniz."})}
                                    {...(error && {error:true, helperText:"Bu alan boş bırakılamaz."})}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <BookmarkIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                                    <TextField
                                    id="tag"
                                    name="tag"
                                    type="text"
                                    label="Etiket"
                                    variant="standard"
                                    color="success"
                                    value={numbers.tag}
                                    onChange={(e) => {
                                        setTag(e.target.value)
                                    }}
                                    required
                                    helperText={"Lütfen bu alanı doldurunuz"}
                                    {...(tagError && {error:true, helperText:"Lütfen etiket belirtiniz."})}
                                    {...(error && {error:true, helperText:"Bu alan boş bırakılamaz."})}
                                    />
                                    <p>{error}</p>
                                </Box>
                                    </div>
                                <Typography component="h4" variant="h5" className='alert' style={{ color:"red", background:"rgb(253, 237, 237)", padding:'0 10px', fontSize:'15px' }}>
                                    {regStatus}
                                </Typography>
                                <Button id='sbmtBtn' onClick={!bolin?numberAdd:numberUpdate} variant="contained" sx={ submitButton } >{!bolin?`Kaydet`:`Güncelle`}</Button>
                            </form>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
