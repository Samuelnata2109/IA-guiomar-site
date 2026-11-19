import SchoolLocation, { Enrollment } from "../sections/Escola/SchoolLocation";
import CinematicHero from "../sections/Hero/CinematicHero";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <Enrollment />
      <SchoolLocation />
    </>
  );
}
