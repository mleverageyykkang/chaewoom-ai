import Section1 from './sec1/section';
import Section2 from './sec2/section';
import Section3 from './sec3/section';
import Section4 from './sec4/section';
import Section5 from './sec5/section';
import Section6 from './sec6/section';
import Section7 from './sec7/section';
import Section8 from './sec8/section';
import LandingMotion from './components/landingMotion';

const MainPage = () => {
    return (
        <main>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
            <Section8 />
            <LandingMotion />
        </main>
    );
};

export default MainPage;
