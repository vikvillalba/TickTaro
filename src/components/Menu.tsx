import { MenuProps } from "../App";

export default function Menu({ setView, timer, setMode, timerMode }: MenuProps) {

    const startTaroMilk = () => {
        timer.setTime({ h: '00', m: '00', s: '05' }) // 5 minutes timer 
        setView('timer')
        setMode('defined')
    }

    const startHotTaro = () => {
        timer.setTime({ h: '00', m: '00', s: '10' }) // 10 minutes timer 
        setView('timer')
        setMode('defined')
    }

    const startSundaeTaro = () => {
        timer.setTime({ h: '00', m: '00', s: '15' }) // 15 minutes timer 
        setView('timer')
        setMode('defined')
    }

    const startBubbleLatte = () => {
        timer.setTime({ h: '00', m: '00', s: '20' }) // 20 minutes timer 
        setView('timer')
        setMode('defined')
    }

    const startTaroSmoothie = () => {
        timer.setTime({ h: '00', m: '00', s: '30' }) // 30 minutes timer 
        setView('timer')
        setMode('defined')
    }
    
    const startCustomTaro = () => {
        timer.startTimer()
        setView('timer')
        setMode('custom')
    }
    return (
        <>
            <div>
                <button onClick={startTaroMilk}>Taro Milk Bubble Tea</button>
                <button onClick={startHotTaro}>Hot Taro Latte</button>
                <button onClick={startSundaeTaro}>Taro Sundae</button>
                <button onClick={startBubbleLatte}>Taro Bubble Latte</button>
                <button onClick={startTaroSmoothie}>Taro Smoothie</button>
                <button onClick={startCustomTaro}>Custom Taro</button>
            </div>

        </>
    )
}