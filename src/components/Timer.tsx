import { useEffect, useState } from "react"
import { timerProps } from "../App"
import { useTimer } from "../useTimer"


export default function Timer({ isOverlay, setOverlay, onTimerFinish }: timerProps) {
    const isOverlays = isOverlay

    const { time, isActive, isFinished, startTimer, stopTimer, handleChange, handleBlur, handleFocus } = useTimer()

    // notifies the app component when the timer ended
    useEffect(() => {
        if (isFinished) { onTimerFinish() }
    }, [isFinished, onTimerFinish])

    // show hours only if its needed
    const showHours = parseInt(time.h) > 0

    return (
        <>
            <div>Timer</div>

            <div>
                {!isActive ? (
                    // Editing mode
                    <div className="inputs-wrapper">
                        {showHours && (
                            <>
                                <input value={time.h} onChange={(e) => handleChange(e, 'h')} onBlur={handleBlur} placeholder="00" onFocus={() => handleFocus('h')} />
                                <span> : </span>
                            </>
                        )}
                        <input value={time.m} onChange={(e) => handleChange(e, 'm')} onBlur={handleBlur} placeholder="00" onFocus={() => handleFocus('m')} />
                        <span> : </span>
                        <input value={time.s} onChange={(e) => handleChange(e, 's')} onBlur={handleBlur} placeholder="00" onFocus={() => handleFocus('s')} />

                    </div>

                ): (
                    // text mode
                    <div className="text-wrapper">
                        {showHours && <span>{time.h}:</span>}
                        <span>{time.m}:</span>
                        <span>{time.s}</span>
                    </div>

                )}

                <button onClick={isActive ? stopTimer : startTimer}>
                    {isActive ? 'Stop' : 'Start'}</button>
            </div>
        </>
    )

}

