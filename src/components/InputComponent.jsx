import { useState } from "react";

const InputComponent = (props) => {
    const [date, setDate] = useState({day: props.currentDay , month: props.currentMonth, year: props.currentYear})
    
    

    return ( 
        <div>
            <input type="text" defaultValue={`${date.month} ${date.day}, ${date.year}`}/>
        </div>
     );
}
 
export default InputComponent;