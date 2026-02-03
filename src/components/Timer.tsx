import { TimerViewProps } from "../App"


export default function Timer({ timer, timerMode, icon, onBack, animation}: TimerViewProps) {


    const { time, isActive, startTimer, stopTimer, handleChange, handleBlur, handleFocus } = timer

    // show hours only if its needed
    const showHours = parseInt(time.h) > 0

    return (
        <>
            <div>Timer</div>

            <div>

                {!isActive && timerMode === 'custom' ? (
                    // Editing mode
                    <div className="set-timer-container">
                        <img src={icon} height={203} width={203}></img>
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
                    </div>


                ) : (
                    // text mode
                    <div className="timer-container">
                       <img 
                            src={isActive ? animation : icon} 
                            height={203} 
                            width={203} 
                            alt="timer-animation"
                        />
                        <div className="text-wrapper">
                            {showHours && <span>{time.h}:</span>}
                            <span>{time.m}:</span>
                            <span>{time.s}</span>
                        </div>
                    </div>

                )}

                {!isActive && (
                    <button onClick={onBack} className="back-btn">
                        ← Back
                    </button>
                )}

                <button onClick={isActive ? stopTimer : () => startTimer()}>
                    {isActive ? 'Stop' : 'Start'}</button>
            </div >
        </>
    )

}

