import type Profession from "../../interfaces/Profession";

import Airline_Pilot from "./AirlinePilot/Airline_Pilot.json";
import Business_Manager from "./BusinessManager/Business_Manager.json";
import Doctor from "./Doctor/Doctor.json";
import Engineer from "./Engineer/Engineer.json";
import Janitor from "./Janitor/Janitor.json";
import Lawyer from "./Lawyer/Lawyer.json";
import Nurse from "./Nurse/Nurse.json";
import Police_Officer from "./PoliceOfficer/Police_Officer.json";
import Secretary from "./Secretary/Secretary.json";
import Teacher from "./Teacher/Teacher.json";
import Truck_Driver from "./TruckDriver/Truck_Driver.json";

const professions: Profession[] = [
    Airline_Pilot as Profession,
    Business_Manager as Profession,
    Doctor as Profession,
    Engineer as Profession,
    Janitor as Profession,
    Lawyer as Profession,
    Nurse as Profession,
    Police_Officer as Profession,
    Secretary as Profession,
    Teacher as Profession,
    Truck_Driver as Profession,
];

export default professions;
