import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import logo from './img/buurtboer_logo.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';

type DayType = {
    day: string;
    present: boolean;
    absent: boolean;
  };

function Employee_Week_Overview() {

    const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());

    function getCurrentWeek(): string {
        const today: Date = new Date(); // Current date
        const firstDayOfYear: Date = new Date(today.getFullYear(), 0, 1); // First day of the current year
      
        const days: number = Math.floor(((today.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000)) as number);
      
        const currentWeek: number = Math.ceil(((days + firstDayOfYear.getDay() + 1) / 7) as number);
        
        return `${today.getFullYear()}-W${currentWeek.toString().padStart(2, '0')}`;
      }
      

    const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWeek(e.target.value);
    };
    

  const imageContainerStyle = {
    backgroundColor: '#09a090',
    padding: '10px'
  };

  const linkStyle = {
    color: '#000000', 
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  };

  const [hoveredLinkStyle, setHoveredLinkStyle] = useState({
    color: '#F9834C',  
  });

  const [attendance, setAttendance] = useState([
    { day: 'Monday', present: true, absent: false },
    { day: 'Tuesday', present: false, absent: true },
    { day: 'Wednesday', present: true, absent: false },
    { day: 'Thursday', present: true, absent: false },
    { day: 'Friday', present: false, absent: true },
  ]);

  //  handle checkbox change
  const handleCheckboxChange = (index: number, field: keyof DayType) => {
    setAttendance((prevAttendance) => {
      const updatedAttendance = [...prevAttendance];
      updatedAttendance[index] = {
        ...updatedAttendance[index],
        [field]: !updatedAttendance[index][field],
      };
      return updatedAttendance;
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg buurtboer_nav">
        <a className="navbar-brand img_logo" href="#">
          <div style={imageContainerStyle}>
              <img
                src={logo}
                className="img-fluid buurtboerlogo"
                style={{ width: '100px', height: 'auto' }}
                alt="Buurtboer Logo"
              />
            </div>
        </a>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav me-auto ms-3 mb-lg-0">
            <li className="nav-item">
            <span className="nav-link text-black"> Welkom ....</span>
            </li>
        </ul>
        </div>
        <div className="nav-button me-5 ">
        <Link
            to="#"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            Bestellen
          </Link>
        </div>
        <div className="nav-button me-5">
        <Link
            to="#"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            Week Overview
        </Link>        
        </div>
        <div className="nav-button me-5">
        <Link
            to="/Invite_Employee"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            Invite Medewerker
        </Link>        
        </div>
        <div className="nav-button me-5">
        <Link
            to="/"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            Loguit
        </Link>        
        </div>
      </nav>


       {/* Week selecteren */}
       <div className="container justify-content-center mt-1 p-4">
        <div className="row">
          <div className="col-lg-8 float-end content">
              <div className="  form_items ms-5 justify-content-center p-5">
                <h2>Medewerker Overview</h2>
                <form action="/action_page.php">
                    <label htmlFor="week">Selecteer een week:</label>
                    {/* <input type="week" id="week" name="week" /> */}
                    <input
                        type="week"
                        id="week"
                        name="week"
                        value={selectedWeek}
                        onChange={handleWeekChange}
                    />
                    <input type="submit" value="Submit" />
                </form>

                {/* Tabel voor aanwezigen (wordt later verbonden met de week die geselecteerd is) */}
                <table className="roundedCorners">
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Aanwezig</th>
                            <th>Afwezig</th>
                        </tr>
                    </thead>
                    <tbody>
          {attendance.map((day, index) => (
            <tr key={index}>
              <td>{day.day}</td>
              <td>
                <input
                  type="checkbox"
                  checked={day.present}
                  onChange={() => handleCheckboxChange(index, 'present')}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={day.absent}
                  onChange={() => handleCheckboxChange(index, 'absent')}
                />
              </td>
            </tr>
          ))}
        </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employee_Week_Overview;
