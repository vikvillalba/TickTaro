import { TimeController } from "../App"
import '../styles/timer.css'

interface Props {
    timer: TimeController
    onExpand: () => void
}

export default function TimeOverlay({ timer, onExpand }: Props) {
    const { time } = timer

    return (
        <div className="mini-overlay" onDoubleClick={onExpand}>
            <button onClick={onExpand}>expand</button>
            <div className="allow-click">
                {parseInt(time.h) > 0 && <span>{time.h}:</span>}
                <span>{time.m}:</span>
                <span>{time.s}</span>
            </div>

            <div style={{ marginLeft: '10px' }} className="allow-click">
                <button onClick={timer.stopTimer}>pause</button>
            </div>
            <div style={{ marginLeft: '10px' }} className="allow-click">
                <button onClick={() => timer.startTimer()}>continue</button>
            </div>
            <div>double click to change view !</div>
        </div>
    )
}