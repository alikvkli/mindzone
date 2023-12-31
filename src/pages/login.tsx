import { useMediaQuery } from 'usehooks-ts'
import Lottie from "lottie-react";
import brainAnimation from "../assets/animations/brain.json";
import { useAppDispatch, useAppSelector } from '../hooks';
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { AccountCircle, GroupAdd } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../features/app';

export default function Login() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const dispatch = useAppDispatch();
    const { appName } = useAppSelector(state => state.app);
    const navigate = useNavigate();

    const handleLogin = () => {
        dispatch(setLogin(true))
        navigate("/")

    }

    return (
        <div className="flex items-center justify-between max-md:flex-col">
            {!isMobile && <Lottie style={{ height: "600px", width: "50%", flexShrink: 0 }} animationData={brainAnimation} />}
            <div className="flex flex-col  bg-white rounded-sm shadow-sm h-screen w-full items-start justify-center p-6">
                <h1 className='text-2xl'><span className="text-gradient text-3xl">{appName}</span> / <span className="text-gray-500 text-[16px]">Giriş Yap</span></h1>
                <Divider />
                <div className='flex flex-col items-start justify-center gap-4 w-[450px] max-md:w-full mt-8'>
                    <TextField id="email" fullWidth label="Email" variant="outlined" />
                    <TextField id="password" fullWidth label="Şifre" variant="outlined" />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Beni hatırla" />
                    </FormGroup>



                    <Button onClick={handleLogin} startIcon={<AccountCircle />} sx={{ borderRadius: "16px", textTransform: "none" }} fullWidth color="primary" variant="outlined">Giriş Yap</Button>
                    <Button onClick={() => navigate("/kayit-ol")} startIcon={<GroupAdd />} sx={{ borderRadius: "16px", textTransform: "none" }} fullWidth color="primary" variant="outlined">Kayıt Ol</Button>
                </div>
            </div>
        </div>
    )
}