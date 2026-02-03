import { MenuProps } from "../App";
import '../styles/menu.css'


export default function Menu({ setView, timer, setMode, setIcon, icons }: MenuProps) {


    const height = 100
    const width = 100

    const startTaroMilk = () => {
        timer.setTime({ h: '00', m: '00', s: '05' }) // 5 minutes timer 
        setView('timer')
        setMode('defined')
        setIcon('milk_bubble_tea')
    }

    const startHotTaro = () => {
        timer.setTime({ h: '00', m: '00', s: '10' }) // 10 minutes timer 
        setView('timer')
        setMode('defined')
        setIcon('hot_latte')
    }

    const startSundaeTaro = () => {
        timer.setTime({ h: '00', m: '00', s: '15' }) // 15 minutes timer 
        setView('timer')
        setMode('defined')
        setIcon('sundae')
    }

    const startBubbleLatte = () => {
        timer.setTime({ h: '00', m: '00', s: '20' }) // 20 minutes timer 
        setView('timer')
        setMode('defined')
        setIcon('bubble_latte')
    }

    const startTaroSmoothie = () => {
        timer.setTime({ h: '00', m: '00', s: '30' }) // 30 minutes timer 
        setView('timer')
        setMode('defined')
        setIcon('smoothie')
    }

    const startCustomTaro = () => {
        setView('timer')
        setMode('custom')
        setIcon('custom')
    }
    return (
        <>
            <main className="main-menu">
                <div onClick={startTaroMilk} className="menu-option">
                    <img src={icons['milk_bubble_tea']} height={height} width={width}></img>
                    <p>Taro Milk Bubble Tea</p>
                </div>

                <div onClick={startHotTaro} className="menu-option">
                    <img src={icons['hot_latte']} height={height} width={width}></img>
                    <p>Hot Taro Latte</p>
                </div>

                <div onClick={startSundaeTaro} className="menu-option">
                    <img src={icons['sundae']} height={height} width={width}></img>
                    <p>Taro Sundae</p>
                </div>
                <div onClick={startBubbleLatte} className="menu-option">
                    <img src={icons['bubble_latte']} height={height} width={width}></img>
                    <p>Taro Bubble Latte</p>
                </div>

                <div onClick={startTaroSmoothie} className="menu-option">
                    <img src={icons['smoothie']} height={height} width={width}></img>
                    <p>Taro Smoothie</p>
                </div>

                <div onClick={startCustomTaro} className="menu-option">
                    <img src={icons['custom']} height={height} width={width}></img>
                    <p>Custom Taro</p>
                </div>
            </main>

        </>
    )
}