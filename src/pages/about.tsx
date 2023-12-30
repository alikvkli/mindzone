import img1 from "../assets/img/img_1.png";
import img2 from "../assets/img/img_2.png";
export default function About() {
    return (
        <section className="flex flex-col mt-4 items-center justify-center px-4 md:px-12">
            <div className="flex flex-col gap-4 items-start justify-center mt-2 bg-white p-4 rounded-md shadow-md">
                <h1 className="text-gradient font-semibold text-xl">Biz Kimiz?</h1>
                <p className="mt-2 text-sm">
                    Bu çalışma Uzm. Klinik Psikolog Dilruba Sönmez’in doktora programı kapsamında tasarladığı bir web sitedir. Prof. Dr. Timothy Jordan tarafından danışmanlık verilmektedir. Bu web sitesindeki uygulamaları denemek ve devamlılık sağlamada gönüllülük esastır ve sizler için herhangi bir risk bulunmamaktadır. Herhangi bir sorunuzda araştırmacıya <a className="text-gradient" href="mailto:dilruba.sonmez@stu.ihu.edu.tr">dilruba.sonmez@stu.ihu.edu.tr</a> adresinden ulaşabilirsiniz.
                </p>
            </div>

            <div className="flex max-md:flex-col w-full gap-2 mb-4">
                <div className="flex md:w-1/2 flex-col gap-4 items-start justify-start mt-2 bg-white p-4 rounded-md shadow-md">
                    <h1 className="text-gradient font-semibold text-xl">Dilruba Sönmez</h1>
                    <div className="flex max-md:flex-col items-start justify-start gap-4">
                        <img className="w-28 h-28 rounded-full" src={img1} alt="Dilruba Sönmez" />
                        <div className="flex flex-col gap-2.5">
                            <p className="text-l font-semibold">Eğitim Bilgileri:</p>
                            <div className="flex item-start justify-center max-md:flex-col">
                                <ul className="flex flex-col gap-1.5 ml-4 text-sm">
                                    <li className="list-disc">
                                        <span className="font-semibold">İbn Haldun Üniversitesi</span>
                                        <p className="text-xs ml-2">Yüksek Lisans ve Doktora</p>
                                        <ul className="ml-6">
                                            <li className="list-disc mt-1.5" >Klinik Psikoloji</li>
                                            <li className="list-disc"><b>Ülke:</b> Türkiye</li>
                                        </ul>
                                    </li>
                                    <li className="text-sm"><b>Yüksek Lisans:</b> 2018-2020</li>
                                    <li className="text-sm"><b>Doktora:</b> 2020-Devam</li>
                                </ul>
                                <ul className="flex flex-col gap-1.5 ml-4 text-sm">
                                    <li className="list-disc">
                                        <span className="font-semibold">İstanbul Şehir Üniversitesi</span>
                                        <p className="text-xs ml-2">Lisans</p>
                                        <ul className="ml-6">
                                            <li className="list-disc mt-1.5" >Psikoloji (İngilizce)</li>
                                            <li className="list-disc"><b>Ülke:</b> Türkiye</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p className="mt-2 text-sm">
                        Dilruba Sönmez, İstanbul Şehir Üniversitesi Psikoloji bölümünden yüksek onur derecesiyle mezun olmuştur. Ardından tam burslu olarak İbn Haldun Üniversitesi – Klinik Psikoloji alanında yüksek lisansını “Otizmli ergenlerde sosyal kaygının bilişsel ve duygusal empati ile ilişkisi” tezi ile Profesör Timothy R. Jordan süpervizörlüğünde tamamlamıştır ve çalışması International Journal of Developmental Disabilities dergisinde yayınlanmıştır.
                        Halen İbn Haldun Üniversitesinde – Doktora eğitimine Profesör Timothy Jordan süpervizörlüğünde devam etmektedir ve tez aşamasındadır.
                        Ayrıca şu an Medipol Üniversitesi’nde klinik psikolog olarak görev yapmakta ve İbn Haldun Üniversitesi Psikoterapi Uygulama ve Araştırma Merkezi’nde klinik psikolog olarak ergen ve yetişkin alanında danışanlarını kabul etmektedir.
                    </p>
                    <p className="font-semibold">Akademik çalışmalarına buradan ulaşabilirsiniz:</p>
                    <a className="text-sm text-gradient" href="https://scholar.google.com/citations?user=92I4Dw8AAAAJ&hl=tr" target="_blank">https://scholar.google.com/citations?user=92I4Dw8AAAAJ&hl=tr</a>

                </div>

                <div className="flex md:w-1/2 flex-col gap-4 items-start justify-start mt-2 bg-white p-4 rounded-md shadow-md">
                    <h1 className="text-gradient font-semibold text-xl">Profesör Dr. Timothy Richard Jordan</h1>
                    <div className="flex max-md:flex-col items-start justify-start gap-4">
                        <img className="w-28 h-28 rounded-full" src={img2} alt="Profesör Dr. Timothy Richard Jordan" />
                        <div className="flex flex-col gap-2.5">
                            <p className="text-sm">İbn Haldun Üniversitesi Psikoloji bölümü öğretim üyesi ve Biliş ve Algı Laboratuvarı’nın yürütücüsüdür. </p>
                            <p className="text-l font-semibold">Eğitim Bilgileri:</p>
                            <ul className="flex flex-col gap-1.5 ml-4 text-sm">
                                <li className="list-disc">
                                    <span className="font-semibold">The University of Reading</span>
                                    <p className="text-xs ml-2">Doktora(1981-1985)</p>
                                    <ul className="ml-6">
                                        <li className="list-disc mt-1.5" >Psychology/Cognitive Psychology </li>
                                        <li className="list-disc"><b>Ülke:</b> İngiltere</li>
                                    </ul>
                                </li>
                                <li className="list-disc">
                                    <span className="font-semibold">The University of Reading</span>
                                    <p className="text-xs ml-2">Lisans(1978-1981)</p>
                                    <ul className="ml-6">
                                        <li className="list-disc mt-1.5" >Psychology</li>
                                        <li className="list-disc"><b>Ülke:</b> İngiltere</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p className="font-semibold">Akademik çalışmalarına buradan ulaşabilirsiniz:</p>
                    <a className="text-sm text-gradient" href="https://scholar.google.ae/citations?user=_iw29XQAAAAJ&hl=en" target="_blank">https://scholar.google.ae/citations?user=_iw29XQAAAAJ&hl=en</a>

                </div>
            </div>

        </section>
    )
}