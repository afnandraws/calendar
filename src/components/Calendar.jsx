import { useEffect, useState } from "react";

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const initialYearHandler = () => {
    const currentYear = new Date().getFullYear()
    var years = [];
    for (var a = 0; a < 5; a++) {
        years.push(currentYear+a)
    }
    return years
    }

const years = initialYearHandler()

const Calendar = () => {
    const [selectedYear, setSelectedYear] = useState('2023')
    const [selectedMonth, setSelectedMonth] = useState('01')
    const [calendar, setCalendar] = useState([])

    const dateIsValid = (date) => {
        return date instanceof Date && !isNaN(date);
    }
    
    const yearHandler = (event) => {
        setSelectedYear(event.target.value)
    }
    
    const monthHandler = (event) => {
        //need to make it so that it passes on the number of the month, not the actual month value
        if (month.indexOf(`${event.target.value}`) + 1 < 10) {
        const temp = `0${month.indexOf(`${event.target.value}`) + 1}`
        setSelectedMonth(temp)
        } else {
        const temp = `${month.indexOf(`${event.target.value}`) + 1}`
        setSelectedMonth(temp)   
        }
        setCalendar([])
    }

    useEffect(() => {
    var days = [];

    for (var a = 1; a < 10; a++) {
        let weekday = new Date(`${selectedYear}-${selectedMonth}-0${a}`).getDay()
        if (weekday === 0) {
            weekday = 7
        }

        if (a === 1) {

            if (weekday !== 1) {
                let dayCount = 0
    

                for (let b = weekday -1 ; b > 0; b--) {
                    let prevMonth = (selectedMonth * 1) - 1
                    let prevYear = (selectedYear * 1) - 1
                    if (prevMonth === 0) {
                        prevMonth = 12

                        let prevDate = new Date(`${prevYear}-${prevMonth}-${31 - dayCount}`)
                        if (dateIsValid(prevDate) && (prevDate.getDay() !== 0)) {
                            days.unshift({
                                date: `${31 - dayCount}`,
                                day: prevDate.getDay(),
                                prev: true
                            })
                            dayCount = dayCount + 1
                        } 
                    } else if (prevMonth < 10) {
                        let prevDate = new Date(`${selectedYear}-0${prevMonth}-${31 - dayCount}`)

                        console.log(dateIsValid(prevDate))
                        console.log(`${selectedYear}-0${prevMonth}-${31 - dayCount}`)
                        
                        if (dateIsValid(prevDate) && (prevDate.getDay() !== 0)) {
                            days.unshift({
                                date: `${31 - dayCount}`,
                                day: prevDate.getDay(),
                                prev: true
                            })
                            dayCount = dayCount + 1

                        } else {
                            dayCount = dayCount + 1
                            b++;
                        }
                    } else {
                        let prevDate = new Date(`${selectedYear}-${prevMonth}-${31 - dayCount}`)

                        console.log(dateIsValid(prevDate))
                        console.log(`${selectedYear}-0${prevMonth}-${31 - dayCount}`)
                        
                        if (dateIsValid(prevDate) && (prevDate.getDay() !== 0)) {
                            days.unshift({
                                date: `${31 - dayCount}`,
                                day: prevDate.getDay(),
                                prev: true
                            })
                            dayCount = dayCount + 1

                        } else {
                            dayCount = dayCount + 1
                            b++;
                        }
                    }
                    }
                }
            }
            console.log(weekday)

       
        days.push({
            date: `0${a}`,
            day: weekday,
        }) }

    for (var a = 10; a < 32; a++) { 
        if (dateIsValid(new Date(`${selectedYear}-${selectedMonth}-${a}`))) {
        
        days.push({
            date: `${a}`,
            day: new Date(`${selectedYear}-${selectedMonth}-${a}`).getDay()
        })
    }
    }
    
    console.log(days)
    
    let start = 0;
    let end = 7;
    for (let b = 0; b < 6; b++) {   
        const temp = days.slice(start, end).map(item => {return <td><button>{item.date}</button></td>})
        setCalendar(prevState => [...prevState, <tr>{temp}</tr>])
        start += 7
        end += 7
    
    }}, [selectedMonth, selectedYear])
    

    return (
    <div>
        <div>
        <select onChange={monthHandler} id="month">
            {month.map((data) => <option key={month.indexOf(data)}>{data}</option>)}
        </select>
        
        <select onChange={yearHandler} value={selectedYear} id="year">
            {years.map((data) => <option key={years.indexOf(data)}>{data}</option>)}
        </select>
        <br/>
     
        <table>
            <thead>
                <tr>
                    <th><span>Mo</span></th>
                    <th><span>Tu</span></th>
                    <th><span>We</span></th>
                    <th><span>Th</span></th>
                    <th><span>Fr</span></th>
                    <th><span>Sa</span></th>
                    <th><span>Su</span></th>
                </tr>
            </thead>
            <tbody>
            {calendar}
            </tbody>


        </table>
        
    </div>
</div>
    );
}
 
export default Calendar;