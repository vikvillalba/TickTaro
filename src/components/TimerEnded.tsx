
import { TimerViewProps } from "../App";


export default function TimeEnded({ timer }: TimerViewProps) {

    return (
        <>
            <div>timer ended :)</div>
            <button onClick={timer.stopTimer}>close</button>
            <button onClick={timer.snooze}>snooze</button>
        </>
    )
}