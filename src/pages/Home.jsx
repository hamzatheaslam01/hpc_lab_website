import SiteNav from "../components/ui/hero/Site-Nav";
import Hero from "../components/ui/hero/Hero";
import FeaturedProjects from "../components/ui/featured-projects/FeaturedProjects";
import TheLab from "../components/ui/the-lab";
import Research from "../components/ui/research";
import Publications from "../components/ui/publications";
import People from "../components/ui/people";
import Footer from "../components/ui/footer";
import Infrastructure from "../components/ui/infrastructure";
import News from "../components/ui/news/News";

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero />
      <TheLab />
      <Infrastructure />
      <People />
      <Research />
      <FeaturedProjects />
      <News />
      <Publications />
      <Footer />
    </>
  );
}