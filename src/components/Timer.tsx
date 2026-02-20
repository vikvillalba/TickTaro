import { TimerViewProps } from "../App"
import { motion } from "motion/react"


export default function Timer({ timer, timerMode, icon, onBack, animation }: TimerViewProps) {


    const { time, isActive, startTimer, stopTimer, handleChange, handleBlur, handleFocus } = timer

    // show hours only if its needed
    const showHours = parseInt(time.h) > 0

    return (
        <>
            <div className="main-timer">
                {!isActive && timerMode === 'custom' ? (
                    <div className="timer-container">
                        <p className="timer-text">Your taro will be ready in</p>
                        <img src={icon} height={203} width={203} alt="icon"></img>

                        <div className="inputs-wrapper">
                            {showHours && (
                                <>
                                    <input value={time.h} onChange={(e) => handleChange(e, 'h')} onBlur={handleBlur} placeholder="00" onFocus={() => handleFocus('h')} className="time-input" />
                                    <span className="time-input"> : </span>
                                </>
                            )}
                            <input value={time.m} onChange={(e) => handleChange(e, 'm')} onBlur={handleBlur} placeholder="00" onFocus={() => handleFocus('m')} className="time-input" />
                            <span className="time-input"> : </span>
                            <input value={time.s} onChange={(e) => handleChange(e, 's')} onBlur={handleBlur} placeholder="00" onFocus={() => handleFocus('s')} className="time-input" />
                        </div>


                        <div className="buttons-container">
                            <motion.button onClick={onBack} className="timer-btn" whileHover={{translateY : -5, cursor:'pointer'}}>
                                Back
                            </motion.button>

                            <motion.button onClick={() => startTimer()} className="timer-btn" whileHover={{translateY : -5, cursor:'pointer'}}>
                                Start
                            </motion.button>
                        </div>
                    </div>

                ) : (
                    <div className="timer-container">
                        <p className="timer-text">{isActive ? 'Your taro is ready in' : 'Your taro will be ready in'} </p>
                        <img
                            src={isActive ? animation : icon}
                            height={203}
                            width={203}
                            className="timer-animation"
                        />
                        <div className={`text-wrapper ${showHours ? 'small-font' : ''}`}>
                            {showHours && <span>{time.h}:</span>}
                            <span>{time.m}:</span>
                            <span>{time.s}</span>
                        </div>



                        <div className="buttons-container">

                            {!isActive && (
                                <motion.button onClick={onBack} className="timer-btn" whileHover={{translateY : -5, cursor:'pointer'}}>
                                    Back
                                </motion.button>
                            )}

                            <motion.button onClick={isActive ? stopTimer : () => startTimer()} className="timer-btn" id={isActive ? 'stop' : ''} whileHover={{translateY : -5, cursor:'pointer'}} >
                                {isActive ? 'Stop' : 'Start'}
                            </motion.button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}

