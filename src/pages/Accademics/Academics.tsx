import Hero from "./homepage/Hero.tsx";
import AcademicStaff from "./homepage/AcademicStaff.tsx";
import StudyPlans from "./homepage/StudyPlans.tsx";
import HowToApply from "./homepage/HowToApply.tsx";
import Schedules from "./homepage/Schedules.tsx";
import Advising from "./homepage/Advising.tsx";
import Postgraduate from "./homepage/Postgraduate.tsx";

export function Academics() {

  return (
    <>
        {/*<Hero />*/}
        <AcademicStaff />
        <StudyPlans />
        <HowToApply />
        <Schedules />
        <Advising />
        <Postgraduate />
    </>
  );
}

