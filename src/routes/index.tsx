import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { SkillMatrix } from "@/components/portfolio/SkillMatrix";
import {
  ExperienceTimeline,
  EducationTimeline,
  Recognition,
} from "@/components/portfolio/Timelines";
import { RecruiterSnapshot, HowIThink } from "@/components/portfolio/Sections";
import { ContactForm, Footer, ScrollToTop } from "@/components/portfolio/Contact";

const title = "Hema Harsan — Data × Intelligence | Portfolio";
const description =
  "Portfolio of Hema Harsan R, an AI/ML Engineer focused on Machine Learning, Deep Learning, Computer Vision and software development.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Hema Harsan R",
          jobTitle: "AI/ML Engineer",
          email: "mailto:hemaharsan3@gmail.com",
          sameAs: ["https://github.com/HEMAHARSAN-3", "https://www.linkedin.com/in/hema-harsan-r/"],
          knowsAbout: ["Machine Learning", "Deep Learning", "Computer Vision", "Python", "Django"],
          alumniOf: "Dr. N.G.P. Institute of Technology, Coimbatore",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main className="min-w-0 overflow-x-clip">
        <Hero />
        <About />
        <Projects />
        <SkillMatrix />
        <ExperienceTimeline />
        <EducationTimeline />
        <Recognition />
        <RecruiterSnapshot />
        <HowIThink />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
