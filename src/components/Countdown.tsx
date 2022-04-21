import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout

export function Countdown () {
    const [time, setTime] = useState(0.1 * 60);
    const [IsActive, setIsActive] = useState(false);
    const [HasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor (time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    
    function startCountDown() {
        setIsActive(true)
    }

    function resetCountDown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if(IsActive && time > 0) {
            countdownTimeout = setTimeout (() => {
                setTime(time - 1);
            }, 1000) 
        } else if (IsActive && time === 0) {
                setHasFinished(true);
                setIsActive(false);
        }
    },[IsActive, time]);

    return(
        <div>
        <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>    
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>    
        </div>

        {HasFinished ? (
             <button
                disabled
             className={styles.countdownButton}
             >
                Ciclo encerrado     
            </button>
        ) : (
            <>
                { IsActive ? (
            <button type='button' 
        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
        onClick={resetCountDown}
        >
            abandonar ciclo 
        </button>
        ) : (
            <button type='button' 
        className={styles.countdownButton}
        onClick={startCountDown}
        >
            iniciar um ciclo        
        </button>
        )}
            </>
        )} 
        </div>
    )
}