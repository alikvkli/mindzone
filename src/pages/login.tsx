import { useMediaQuery } from 'usehooks-ts'
import Lottie from "lottie-react";
import brainAnimation from "../assets/animations/brain.json";
import { useAppSelector } from '../hooks';
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField } from '@mui/material';

export default function Login() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { appName } = useAppSelector(state => state.app);


    return (
        <div className="flex items-center justify-between max-md:flex-col">
            <Lottie style={{ height: isMobile ? "300px" : "600px", width: isMobile ? "100%" : "50%", flexShrink: 0 }} animationData={brainAnimation} />
            <div className="flex flex-col h-full w-full items-start justify-center p-6">
                <h1 className='text-2xl'><span className="text-gradient text-3xl">{appName}</span> / <span className="text-gray-500 text-[16px]">Giriş Yap</span></h1>
                <Divider />
                <div className='flex flex-col items-start justify-center gap-4 w-[450px] max-md:w-full mt-8'>
                    <TextField id="email" fullWidth label="Email" variant="outlined" />
                    <TextField id="password" fullWidth label="Şifre" variant="outlined" />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox  />} label="Beni hatırla" />
                    </FormGroup>

                    <Button sx={{ borderRadius: "16px", textTransform: "none" }} fullWidth color="primary" variant="outlined">Giriş Yap</Button>
                </div>
            </div>
        </div>
    )
}