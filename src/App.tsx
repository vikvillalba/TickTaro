import './App.css'
import { useEffect, useState, useRef } from 'react'
import TopBar from './components/TopBar'
import Timer from './components/Timer'
import TimeEnded from './components/TimerEnded';

import { useTimer } from './useTimer';
import TimerOverlay from './components/TimerOverlay';


export interface TimeController {
  time: { h: string, m: string, s: string }
  isActive: boolean
  startTimer: () => void
  stopTimer: () => void
  handleChange: (e: any, field: string) => void
  handleBlur: () => void
  handleFocus: (field: 'h' | 'm' | 's') => void
  isFinished: boolean
}

export interface TimerViewProps {
  timer: TimeController
}


function App() {
 

  const [isOverlay, setOverlay] = useState(false)
  const [view, setView] = useState<'timer' | 'alarm'>('timer')
  const timeController = useTimer()

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
    }
  }, [timeController.isFinished])


  return (
    <>
    {!isOverlay && <TopBar />}
      
      <div className='app-container'>
        {isOverlay ? (
          // mini timer 
          <TimerOverlay timer={timeController} onExpand = {handleExpand}/>
        ) : (
          <>
            {view === 'timer' && (
              <Timer timer={timeController} />
            )}

            {view === 'alarm' && (
              <TimeEnded />
            )}
          </>
        )}

      </div>



    </>
  )
}

export default App
