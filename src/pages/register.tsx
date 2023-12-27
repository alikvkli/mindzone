import { useMediaQuery } from 'usehooks-ts'
import Lottie from "lottie-react";
import brainAnimation from "../assets/animations/brain.json";
import { useAppSelector } from '../hooks';
import { Button, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useState } from 'react';

export default function Register() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { appName } = useAppSelector(state => state.app);
    const [gender, setGender] = useState<string>("");
    const [education, setEducation] = useState<string>("");
    const handleGenderChange = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
    };

    const handleEducationChange = (event: SelectChangeEvent) => {
        setEducation(event.target.value as string);
    };

    return (
        <div className="flex items-start justify-between max-md:flex-col">
            <Lottie style={{ height: isMobile ? "300px" : "600px", width: isMobile ? "100%" : "50%", flexShrink: 0 }} animationData={brainAnimation} />
            <div className="flex flex-col h-full w-full items-start justify-center p-6">
                <h1 className='text-2xl'><span className="text-gradient text-3xl">{appName}</span> / <span className="text-gray-500 text-[16px]">Kayıt ol</span></h1>
                <Divider />
                <div className='flex flex-col items-start justify-center gap-4 w-[450px] max-md:w-full mt-8'>
                    <div className='flex w-full gap-2'>
                        <TextField id="email" fullWidth label="Email" variant="outlined" />
                        <TextField id="phone" fullWidth label="Telefon" variant="outlined" />
                    </div>
                    <TextField id="password" fullWidth label="Şifre" variant="outlined" />
                    <TextField id="age" fullWidth label="Yaş" variant="outlined" />
                    <TextField id="salary" fullWidth label="Maddi Durum" variant="outlined" />

                    <div className='flex w-full gap-2'>
                        <FormControl fullWidth>
                            <InputLabel id="gender">Cinsiyet</InputLabel>
                            <Select
                                labelId="gender"
                                id="gender"
                                value={gender}
                                label="Cinsiyet"
                                onChange={handleGenderChange}>
                                <MenuItem value="kadin">Kadın</MenuItem>
                                <MenuItem value="erkek">Erkek</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="education">Eğitim Durumu</InputLabel>
                            <Select
                                labelId="education"
                                id="education"
                                value={education}
                                label="Eğitim Durumu"
                                onChange={handleEducationChange}>
                                <MenuItem value="Ön Lisans">Ön Lisans</MenuItem>
                                <MenuItem value="Lisans">Lisans</MenuItem>
                                <MenuItem value="Yüksek Lisans">Yüksek Lisans</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='flex w-full gap-2'>
                        <TextField
                            fullWidth
                            id="illness"
                            label="Fiziksel - Kronik Rahatsızlıklar"
                            multiline
                            rows={4}
                            defaultValue=""
                        />
                        <TextField
                            fullWidth
                            id="illness"
                            label="Psikolojik / Psikiyatrik Geçmiş"
                            multiline
                            rows={4}
                            defaultValue=""
                        />
                    </div>

                    <Button sx={{ borderRadius: "16px", textTransform: "none" }} fullWidth variant="outlined">Kayıt Ol</Button>


                </div>

            </div>
        </div>
    )
}