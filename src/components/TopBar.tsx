import '../styles/topBar.css'
import closeIcon from '../assets/close.png'
import minIcon from '../assets/minus.png'

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
                    <p> TickTaro </p>
                </div>
                <div className='bar-buttons'>
                    <button onClick={handleMinimize} className='control-button'><img src={minIcon} height={30} width={30}></img></button>
                    <button onClick={handleClose} className='control-button'><img src={closeIcon} height={30} width={30}></img></button>
                    
                </div>
            </main>

        </>
    )
}