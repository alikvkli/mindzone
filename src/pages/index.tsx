import { Step, StepConnector, StepLabel, Stepper } from "@mui/material";
import brainVideo from "../assets/videos/brain.mp4";
import WeekCard from "../components/WeekCard";

const stepperData = [
    {
        title: "Week 1",
        done: true,
    },
    {
        title: "Week 2",
        done: true,
    },
    {
        title: "Week 3",
        done: false,
    },
    {
        title: "Week 4",
        done: false,
    },
    {
        title: "Week 5",
        done: false,
    },
    {
        title: "Week 6",
        done: false,
    },
]


const weekData = [
    {
        title: "Week 1",
        done: true,
        link: "/week/1/task-1",
        subtitle: [
            "Working Memory",
            "Cognitive Flexibility",
            "Cognitive Empathy",
            "Affective Empathy"
        ]
    },
    {
        title: "Week 2",
        link: "/week/2/task-1",
        done: false,
        subtitle: [
            "Working Memory",
            "Cognitive Flexibility",
            "Inhibition",
            "Cognitive Empathy",
            "Affective Empathy"
        ]
    },
    {
        title: "Week 3",
        link: "/week/3/task-1",
        done: false,
        subtitle: [
            "Working Memory",
            "Inhibition",
            "Cognitive Flexibility",
            "Cognitive Empathy",
            "Affective Empathy"
        ]
    },
    {
        title: "Week 4",
        link: "/week/4/task-1",
        done: false,
        subtitle: [
            "Working Memory",
            "Inhibition",
            "Cognitive Flexibility",
            "Cognitive Empathy",
            "Affective Empathy"
        ]
    },
    {
        title: "Week 5",
        link: "/week/5/task-1",
        done: false,
        subtitle: [
            "Working Memory",
            "Inhibition",
            "Cognitive Flexibility",
            "Cognitive Empathy",
            "Affective Empathy"
        ]
    },
    {
        title: "Week 6",
        link: "/week/6/task-1",
        done: false,
        subtitle: [
            "Working Memory",
            "Inhibition",
            "Cognitive Flexibility",
            "Cognitive Empathy",
            "Affective Empathy"
        ]
    }
]

export default function HomePage() {
    return (
        <div>
            <section className="bg-gradient-to-l video-gradient w-full h-80 relative">
                <video loop className="w-full h-full" src={brainVideo} autoPlay muted />
            </section>
            <div className="flex flex-col items-center justify-center overflow-x-auto">
                <Stepper className="mt-4" activeStep={1} alternativeLabel>
                    {stepperData.map((item, key) => (
                        <Step active={item.done} key={key}>
                            <StepLabel>{item.title}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className="grid grid-cols-3 max-md:grid-cols-1 gap-16 justify-center items-center p-4 h-full">
                    {weekData.map((item, key) => (
                        <WeekCard key={key} link={item.link} done={item.done} title={item.title} subtitle={item.subtitle} />
                    ))}
                </div>

            </div>

        </div>
    )
}