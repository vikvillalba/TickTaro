
import { TimerViewProps } from "../App";
import { motion } from "motion/react"


export default function TimeEnded({ timer, icon }: TimerViewProps) {

    return (
        <>
            <main className="main-timer">
                <div className="timer-container">
                    <p className="timer-text">Time to taro!</p>
                    <img src={icon} height={267} width={267} alt="icon" className="timer-animation"></img>
                    <div className="buttons-container">
                        <motion.button onClick={timer.stopTimer} className="timer-btn" whileHover={{translateY : -5, cursor:'pointer'}}>close</motion.button>
                        <motion.button onClick={timer.snooze} className="timer-btn" whileHover={{translateY : -5, cursor:'pointer'}}>snooze</motion.button>
                    </div>
                </div>


            </main>

        </>
    )
}