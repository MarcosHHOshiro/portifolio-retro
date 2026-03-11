import { Hero } from "@/components/hero"
import { QuickLinks } from "@/components/quick-links"
import { FeaturedProjects } from "@/components/featured-projects"
import { Skills } from "@/components/skills"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <FeaturedProjects />
      <Skills />
      <Footer />
    </>
  )
}
