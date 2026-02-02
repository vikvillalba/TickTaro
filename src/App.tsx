import './App.css'
import { useEffect, useState, useRef } from 'react'
import TopBar from './components/TopBar'
import Timer from './components/Timer'
import TimeEnded from './components/TimerEnded';

import { useTimer } from './useTimer';
import TimerOverlay from './components/TimerOverlay';
import Menu from './components/Menu';


export interface TimeController {
  time: { h: string, m: string, s: string }
  isActive: boolean
  startTimer: (customTime? : {h:string, m:string, s:string}) => void
  stopTimer: () => void
  handleChange: (e: any, field: string) => void
  handleBlur: () => void
  handleFocus: (field: 'h' | 'm' | 's') => void
  isFinished: boolean
  snooze: () => void
  setTime: React.Dispatch<React.SetStateAction<{ h: string, m: string, s: string }>>
}

export interface TimerViewProps {
  timer: TimeController
  timerMode: ('defined' | 'custom')
}

export interface MenuProps {
  setView: (view: 'timer' | 'alarm' | 'menu') => void
  timer: TimeController
  timerMode: ('defined' | 'custom')
  setMode: (mode: 'defined' | 'custom') => void
}
function App() {


  const [isOverlay, setOverlay] = useState(false)
  const [view, setView] = useState<'timer' | 'alarm' | 'menu'>('menu')
  const timeController = useTimer()
  const [timerMode, setMode] = useState<'custom' | 'defined'>('defined')

  const isActiveRef = useRef(timeController.isActive)

  useEffect(() => {
    isActiveRef.current = timeController.isActive
  }, [timeController.isActive])

  useEffect(() => {
    const handleBlur = () => {
      if (isActiveRef.current) {
        setOverlay(true)
        window.electron.resizeWindow(376, 129)
      }
    }
    /*
        const handleFocus = () => {
          setOverlay(false)
          window.electron.resizeWindow(376, 497)
        }
    */
    window.addEventListener('blur', handleBlur)
    // window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('blur', handleBlur)
      // window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const handleExpand = () => {
    setOverlay(false)
    window.electron.resizeWindow(376, 497)
  }

  useEffect(() => {
    if (timeController.isFinished) {
      setOverlay(false)
      handleExpand()
      setView('alarm')
    } else {
      setView((prevView) => {
        if (prevView === 'alarm') {
          return timeController.isActive ? 'timer' : 'menu'
        }
        return prevView
      })
    }
  }, [timeController.isFinished, timeController.isActive])


  return (
    <>
      {!isOverlay && <TopBar />}

      <div className='app-container'>
        {isOverlay ? (
          // mini timer 
          <TimerOverlay timer={timeController} onExpand={handleExpand} />
        ) : (
          <>
            {view === 'menu' && (
              <Menu setView={setView} timer={timeController} setMode={setMode} timerMode={timerMode}/>
            )}
            {view === 'timer' && (
              <Timer timer={timeController} timerMode={timerMode} />
            )}

            {view === 'alarm' && (
              <TimeEnded timer={timeController} timerMode={timerMode} />
            )}
          </>
        )}

      </div>



    </>
  )
}

export default App
