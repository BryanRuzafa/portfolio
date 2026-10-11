import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="contenido">
        <Hero />
        <About />
        <Journey />
        <Experience />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
