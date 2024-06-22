import { useState } from 'react';
import Calendar from 'react-calendar';
import './Cale.css'; // Import your custom CSS file

const Cale = () => {
  const [value, setValue] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  const toggleCalendar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="calendar-container">
      <button className="toggle-button" onClick={toggleCalendar}>
        {isVisible ? 'Hide Calendar' : 'Show Calendar'}
      </button>
      {isVisible && (
        <Calendar
          onChange={setValue}
          value={value}
          className="react-calendar"
        />
      )}
    </div>
  );
};

export default Cale;
