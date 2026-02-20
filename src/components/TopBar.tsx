import '../styles/topBar.css'
import closeIcon from '../assets/close.png'
import minIcon from '../assets/minus.png'
import title from '../assets/title.png'
import { motion } from "motion/react"

const handleClose = () =>{
    window.electron.send('close-window')
}

const handleMinimize = () => {
    window.electron.send('minimize-window')
}


export default function TopBar() {
    return (
        <>
            <main className='bar-main'>
                <div className="top-bar">
                   <img src={title} height={52}/>
                </div>
                <div className='bar-buttons'>
                    <motion.button onClick={handleMinimize} className='control-button' whileHover={{translateY : 4, cursor:'pointer'}}><img src={minIcon} height={30} width={30} ></img></motion.button>
                    <motion.button onClick={handleClose} className='control-button' whileHover={{translateY : 4, cursor:'pointer'}}><img src={closeIcon} height={30} width={30}></img></motion.button>
                    
                </div>
            </main>

        </>
    )
}