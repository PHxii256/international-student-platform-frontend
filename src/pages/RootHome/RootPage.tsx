import {RootHeroSection} from "./root-component/RootHeroSection.tsx";
import {QuickAccess} from "./root-component/QuickAccess.tsx";
import {FacultiesSection} from "./root-component/FacultiesSection.tsx";
import {ProgramsSection} from "./root-component/ProgramsSection.tsx";
import {AdmissionsSection} from "./root-component/AdmissionsSection.tsx";
import {TuitionFees} from "./root-component/TuitionFees.tsx";
import {RegulationsSection} from "./root-component/RegulationsSection.tsx";
import {InternationalStudents} from "./root-component/International Students.tsx";
import {EventsNews} from "./root-component/EventsNews.tsx";
import {AcademicCalendar} from "./root-component/AcademicCalendar.tsx";
import {FAQ} from "./root-component/FAQ.tsx";
import {ContactSection} from "./root-component/ContactSection.tsx";

export function RootPage() {
    return (
    <>
        <RootHeroSection />
        <QuickAccess />
        <FacultiesSection />
        <ProgramsSection/>
        <AdmissionsSection />
        <TuitionFees/>
        <RegulationsSection />
        <InternationalStudents />
        <EventsNews />
        <AcademicCalendar />
        <FAQ />
        <ContactSection />
    </>
    );
}