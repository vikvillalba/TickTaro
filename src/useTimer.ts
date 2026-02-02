import { useEffect, useState } from "react"
import alarm from './assets/alarmSound.mp3'

// hook to control the timer states and info
export const useTimer = () => {
    const [time, setTime] = useState({ h: '00', m: '00', s: '00' }) // dictionary to map the time
    const [isActive, setActive] = useState(false)
    const [isFinished, setFinished] = useState(false)
    

    // timer settings

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        // set 2 digit limit to each one
        const limit = field === 'm' ? 3 : 2
        const val = e.target.value.replace(/\D/g, '').slice(0, limit)
        setTime({ ...time, [field]: val })
    }

    const handleBlur = () => {
        let hours = parseInt(time.h || '0')
        let mins = parseInt(time.m || '0')
        let secs = parseInt(time.s || '0')

        // if the seconds are bigger than 60, then add it to the minutes
        if (secs >= 60) {
            mins += Math.floor(secs / 60)
            secs = secs % 60
        }

        // if the minutes are bigger than 60, add to the hours 
        if (mins >= 60) {
            hours += Math.floor(mins / 60)
            mins = mins % 60
        }

        // update time
        setTime({
            h: hours.toString().padStart(2, '0'),
            m: mins.toString().padStart(2, '0'),
            s: secs.toString().padStart(2, '0')
        })
    }

    // cleans the input when clicks
    const handleFocus = (field: 'h' | 'm' | 's') => {
        if (time[field] === '00') {
            setTime({ ...time, [field]: '' })

        }
    }

     const audio = new Audio(alarm)
    // the actual timer
    useEffect(() => {
        if(isFinished) {
            audio.play()
            setFinished(false)
        }

        let interval: any = null

        if (isActive) {
            interval = setInterval(() => {
                const totalSecs = (parseInt(time.h) * 3600) + (parseInt(time.m) * 60) + parseInt(time.s)

                if (totalSecs <= 0) {
                    setActive(false)
                    setFinished(true)
                    clearInterval(interval)
                    return
                }

                const newTotal = totalSecs - 1
                setTime({
                    h: Math.floor(newTotal / 3600).toString().padStart(2, '0'),
                    m: Math.floor((newTotal % 3600) / 60).toString().padStart(2, '0'),
                    s: (newTotal % 60).toString().padStart(2, '0')
                })
            }, 1000)
        }
      
        return () => clearInterval(interval)
    }, [isActive, time])

    // starts counting
    const startTimer = () => {
        handleBlur()

        const h = parseInt(time.h || '0')
        const m = parseInt(time.m || '0')
        const s = parseInt(time.s || '0')

        const total = (h * 3600) + (m * 60) + s

        if (total > 0) {
            setActive(true)
            setFinished(false)
        }

    }

    // stops the timer
    const stopTimer = () => {
        setActive(false)
    }

    return {
        time, setTime,
        isActive, isFinished,
        startTimer, stopTimer,
        handleChange, handleBlur, handleFocus
    }

}