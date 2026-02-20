import { MenuProps } from "../App";
import '../styles/menu.css'
import { motion } from "motion/react"


export default function Menu({ setView, timer, setMode, setIcon, icons }: MenuProps) {


    const height = 100
    const width = 100

    const startTaroMilk = () => {
        timer.setTime({ h: '00', m: '05', s: '00' }) // 5 minutes timer 
        setView('timer')
        setMode('defined')
        setIcon('milk_bubble_tea')
    }

    const startHotTaro = () => {
        timer.setTime({ h: '00', m: '10', s: '00' }) // 10 minutes timer 
        setView('timer')
        setMode('defined')
        setIcon('hot_latte')
    }

    const startSundaeTaro = () => {
        timer.setTime({ h: '00', m: '15', s: '00' }) // 15 minutes timer 
        setView('timer')
        setMode('defined')
        setIcon('sundae')
    }

    const startBubbleLatte = () => {
        timer.setTime({ h: '00', m: '20', s: '00' }) // 20 minutes timer 
        setView('timer')
        setMode('defined')
        setIcon('bubble_latte')
    }

    const startTaroSmoothie = () => {
        timer.setTime({ h: '00', m: '30', s: '00' }) // 30 minutes timer 
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
                    <motion.img src={icons['milk_bubble_tea']} height={height} width={width} whileHover={{scale: 1.1, translateY : -9, cursor:'pointer'}} whileTap={{scale:0.96}} />
                    <p>Taro Milk Bubble Tea</p>
                </div>

                <div onClick={startHotTaro} className="menu-option">
                    <motion.img src={icons['hot_latte']} height={height} width={width} whileHover={{scale: 1.1, translateY : -9, cursor:'pointer'}} whileTap={{scale:0.96}}/>
                    <p>Hot Taro Latte</p>
                </div>

                <div onClick={startSundaeTaro} className="menu-option">
                    <motion.img src={icons['sundae']} height={height} width={width} whileHover={{scale: 1.1, translateY : -9, cursor:'pointer'}} whileTap={{scale:0.96}}/>
                    <p>Taro Sundae</p>
                </div>
                <div onClick={startBubbleLatte} className="menu-option">
                    <motion.img src={icons['bubble_latte']} height={height} width={width} whileHover={{scale: 1.1, translateY : -9, cursor:'pointer'}} whileTap={{scale:0.96}}/>
                    <p>Taro Bubble Latte</p>
                </div>

                <div onClick={startTaroSmoothie} className="menu-option">
                    <motion.img src={icons['smoothie']} height={height} width={width} whileHover={{scale: 1.1, translateY : -9, cursor:'pointer'}} whileTap={{scale:0.96}}/>
                    <p>Taro Smoothie</p>
                </div>

                <div onClick={startCustomTaro} className="menu-option">
                    <motion.img src={icons['custom']} height={height} width={width} whileHover={{scale: 1.1, translateY : -9, cursor:'pointer'}} whileTap={{scale:0.96}}/>
                    <p>Custom Taro</p>
                </div>
            </main>

        </>
    )
}