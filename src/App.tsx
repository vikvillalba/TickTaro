import './App.css'
import { useEffect, useState, useRef } from 'react'
import TopBar from './components/TopBar'
import Timer from './components/Timer'
import TimeEnded from './components/TimerEnded';

import { useTimer } from './useTimer';
import TimerOverlay from './components/TimerOverlay';
import Menu from './components/Menu';

import milkBubbleTea from './assets/taroMilkBubbleTea.png'
import hotLatte from './assets/taroHotLatte.png'
import sundae from './assets/taroSundae.png'
import bubbleLatte from './assets/taroBubbleLatte.png'
import smoothie from './assets/taroSmoothie.png'
import custom from './assets/customTimer1.png'


import milkBubbleTeaGif from './assets/gifs/taroMilkBubbleTeaGif.gif'
import hotLatteGif from './assets/gifs/taroHotLatteGif.gif'
import sundaeGif from './assets/gifs/taroSundaeGif.gif'
import bubbleLatteGif from './assets/gifs/taroBubbleLatteGif.gif'
import smoothieGif from './assets/gifs/taroSmoothieGif.gif'
import customGif from './assets/gifs/customTimerGif.gif'


export interface TimeController {
  time: { h: string, m: string, s: string }
  isActive: boolean
  startTimer: (customTime?: { h: string, m: string, s: string }) => void
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
  icon: string
  onBack?: () => void
  animation? : string
}

export interface MenuProps {
  setView: (view: 'timer' | 'alarm' | 'menu') => void
  timer: TimeController
  timerMode: ('defined' | 'custom')
  setMode: (mode: 'defined' | 'custom') => void
  setIcon: (icon: string) => void
  icons: Record<string, string>
}

const icons: Record<string, string> = {
  'milk_bubble_tea': milkBubbleTea,
  'hot_latte': hotLatte,
  'sundae': sundae,
  'bubble_latte': bubbleLatte,
  'smoothie': smoothie,
  'custom': custom
}

const animations: Record<string, string> = {
  'milk_bubble_tea': milkBubbleTeaGif,
  'hot_latte': hotLatteGif,
  'sundae': sundaeGif,
  'bubble_latte': bubbleLatteGif,
  'smoothie': smoothieGif,
  'custom': customGif
}

function App() {
  const [icon, setIcon] = useState(icons['milk_bubble_tea'])

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
        window.electron.resizeWindow(400, 129)
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
          <TimerOverlay timer={timeController} onExpand={handleExpand} animation={animations[icon]} />
        ) : (
          <>
            {view === 'menu' && (
              <Menu setView={setView} timer={timeController} setMode={setMode} timerMode={timerMode} icons={icons} setIcon={setIcon} /> // enviarle el array de iconos
            )}
            {view === 'timer' && (
              <Timer timer={timeController} timerMode={timerMode} icon={icons[icon]} onBack={() => setView('menu')} animation={animations[icon]}/>
            )}

            {view === 'alarm' && (
              <TimeEnded timer={timeController} timerMode={timerMode} icon={icons[icon]} />
            )}
          </>
        )}

      </div>



    </>
  )
}

export default App
