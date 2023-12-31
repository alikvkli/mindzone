import { Button, Step, StepLabel, Stepper } from "@mui/material";
import WeekCard from "../components/WeekCard";
import { AccountCircle, GroupAdd, Info } from "@mui/icons-material";
import Lottie from "lottie-react";
import backgroundAnimation from "../assets/animations/background.json"
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import Step1 from "./flows/step_1";

const stepperData = [
    {
        title: "Hafta 1",
        done: true,
    },
    {
        title: "Hafta 2",
        done: true,
    },
    {
        title: "Hafta 3",
        done: false,
    },
    {
        title: "Hafta 4",
        done: false,
    },
    {
        title: "Hafta 5",
        done: false,
    },
    {
        title: "Hafta 6",
        done: false,
    },
]


const weekData = [
    {
        title: "Hafta 1",
        done: true,
        link: "/hafta/1/task-1",
        enabled: true,
    },
    {
        title: "Hafta 2",
        link: "/hafta/2/task-1",
        done: false,
        enabled: false,

    },
    {
        title: "Hafta 3",
        link: "/hafta/3/task-1",
        done: false,
        enabled: false,
    },
    {
        title: "Hafta 4",
        link: "/hafta/4/task-1",
        done: false,
        enabled: false,
    },
    {
        title: "Hafta 5",
        link: "/hafta/5/task-1",
        done: false,
        enabled: false,
    },
    {
        title: "Hafta 6",
        link: "/hafta/6/task-1",
        done: false,
        enabled: false,
    }
]

export default function HomePage() {
    const navigate = useNavigate();
    const { isLogin, initalFlow } = useAppSelector(state => state.app);
    return (
        <main className="flex flex-col items-center justify-center relative">
            <Lottie style={{ position: "absolute", left: 0, top: 0, opacity: "0.1", zIndex: "-1" }} animationData={backgroundAnimation} />

            {!isLogin && (
                <section className="max-md:p-2 flex items-center justify-center overflow-auto">
                    <div className="md:max-w-[720px] flex flex-col items-center justify-center overflow-x-auto">
                        <div className="bg-white flex flex-col gap-1.5 mt-10 p-4 rounded-md shadow-xl w-full">
                            <h1 className="text-xl font-semibold mt-2">Hoş geldiniz!</h1>
                            <p className="mt-2 text-sm">
                                Sizler için ruh sağlığına yönelik hazırladığımız <b className="underline">online ve ücretsiz</b> egzersiz programımıza hoş geldiniz.
                            </p>
                            <p className="text-sm">
                                Amacımız kaygı, stres ve depresyon gibi ruh sağlığı problemlerine hızlı ve eğlenceli çözüm yolları üretmektedir.  Bu amaç doğrultusunda sizlerden birkaç hafta tasarladığımız egzersizleri deneyimlemeniz beklenmektedir.
                            </p>
                            <p className="text-sm">
                                Egzersizleri tamamladığınız da <b>200 TL, 300 TL, 400 TL ve 500 TL</b>’lik hediye çekleri kazanma fırsatınız olacaktır. Bu çekleri istediğiniz şekilde kullanmanız için sizlere ulaştırılacaktır.
                            </p>
                            <p className="text-sm">
                                Uygulamalar 6 hafta sürmesi beklenirken her egzersiz 10-15 dakikalık çalışmalardan oluşmaktadır ve dilediğiniz saat ve günde haftalık egzersizleri deneyimleyeme hakkına sahip olacaksınız.
                            </p>

                            <p className="text-sm">
                                Bizlerle ilgili bilgilere ulaşmak ve iletişime geçmek için <b>"Biz kimiz"</b> kısmına tıklayabilirsiniz.
                            </p>
                        </div>
                        <div className="bg-white flex flex-col gap-1.5 mt-4 p-4 rounded-md shadow-xl w-full">

                            <p className="mt-2 text-sm">
                                Bu çalışma Uzm. Klinik Psikolog Dilruba Sönmez’in doktora programı kapsamında tasarladığı bir web sitedir. Prof. Dr. Timothy Jordan tarafından danışmanlık verilmektedir. Bu web sitesindeki uygulamaları denemek ve devamlılık sağlamada gönüllülük esastır ve sizler için herhangi bir risk bulunmamaktadır. Herhangi bir sorunuzda araştırmacıya <a className="text-gradient" href="mailto:dilruba.sonmez@stu.ihu.edu.tr">dilruba.sonmez@stu.ihu.edu.tr</a> adresinden ulaşabilirsiniz.
                            </p>
                        </div>
                        <div className="flex  my-4  items-center justify-center gap-2">
                            <Button onClick={() => navigate("/giris-yap")} startIcon={<AccountCircle />} sx={{ borderRadius: "16px", flex: "none", textTransform: "none", width: "fit-content" }} fullWidth color="primary" variant="contained">Giriş Yap</Button>
                            <Button onClick={() => navigate("/kayit-ol")} startIcon={<GroupAdd />} sx={{ borderRadius: "16px", flex: "none", textTransform: "none", width: "fit-content" }} color="primary" variant="contained">Kayıt Ol</Button>
                            <Button onClick={() => navigate("/hakkimizda")} startIcon={<Info />} sx={{ borderRadius: "16px", flex: "none", textTransform: "none", width: "fit-content" }} color="secondary" variant="contained">Biz Kimiz</Button>
                        </div>

                    </div>
                </section>
            )}

            {isLogin && (
                <>
                    {initalFlow.step_1 ? (
                        <>
                            <Stepper className="mt-4" activeStep={1} alternativeLabel>
                                {stepperData.map((item, key) => (
                                    <Step active={item.done} key={key}>
                                        <StepLabel>{item.title}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <div className="grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2  gap-16 justify-center items-center p-4 h-full">
                                {weekData.map((item, key) => (
                                    <WeekCard key={key} {...item} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <Step1 />
                        </>
                    )}

                </>
            )}



        </main>
    )
}