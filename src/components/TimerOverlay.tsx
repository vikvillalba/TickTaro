import { TimeController } from "../App"
import '../styles/timer.css'
import expand from '../assets/max.png'
import { motion } from "motion/react"

interface Props {
    timer: TimeController
    onExpand: () => void
    animation: string 
}

export default function TimeOverlay({ timer, onExpand, animation }: Props) { 
    const { time, isActive, stopTimer, startTimer } = timer

    const hasHours = parseInt(time.h) > 0;

    return (
        <>
            <div className="main-overlay">
                <div className="mini-overlay" onDoubleClick={onExpand}>
                    
                    <motion.button onClick={onExpand} id="btn-expand" whileHover={{translateY : -1, cursor:'pointer', scale:1.1}}>
                        <img src={expand} height={29} width={29} />
                    </motion.button>


                    <img src={animation} className="mini-gif" alt="timer animation" height={100} width={100}/>

                    <div className="mini-content-wrapper">
                        <div 
                            id="allow-click" 
                            className={`text-wrapper-mini ${hasHours ? 'small-text' : ''}`}
                        >
                            {hasHours && <span>{time.h}:</span>}
                            <span>{time.m}:</span>
                            <span>{time.s}</span>
                        </div>

                        <div className="button-area-mini">
                            <div style={{ marginLeft: '10px' }} className="allow-click">
                                <motion.button onClick={isActive ? stopTimer : () => startTimer()} className="timer-btn-mini" whileHover={{translateY : -5, cursor:'pointer'}}>
                                    {isActive ? 'Stop' : 'Start'}
                                </motion.button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}