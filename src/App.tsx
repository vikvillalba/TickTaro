import './App.css'
import { useState } from 'react'
import TopBar from './components/TopBar'
import Timer from './components/Timer'
import TimeEnded from './components/TimerEnded';

export interface timerProps {
    isOverlay: boolean;
    setOverlay: (value: boolean) => void;
    onTimerFinish: () => void; 
}

function App() {
  const [isOverlay, setOverlay] = useState(false)
  const [view, setView] = useState <'timer' | 'alarm'>('timer')

  return (
    <>
      <TopBar />

      {view === 'timer' && (
        <Timer isOverlay = {isOverlay} setOverlay={setOverlay} onTimerFinish={() => setView('alarm')} />
      )}

       {view === 'alarm' && (
       <TimeEnded />
      )}
      
      
    </>
  )
}

export default App
