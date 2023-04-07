import UserTable from './UserTable'
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';



function Screen() {

    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./login";
    }

  return (
    <div className='phone'>
        <div className='border'>
            <div className='screen'><UserTable/></div>
            <div className='key'>
            <IconButton  onClick={logOut}>
                <LogoutIcon  color='black' fontSize='large'/>
            </IconButton>
            </div>
        </div>
    </div> 

  );
}

export default Screen;




