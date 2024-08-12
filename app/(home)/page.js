import Blog from "@/components/home/blog";
import Contact from "@/components/home/contact";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import Plans from "@/components/home/plans";
import Questions from "@/components/home/questions";
import Reviews from "@/components/home/reviews";
import Services from "@/components/home/services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Services />
      <Reviews />
      <Plans />
      <Questions />
      <Contact />
      <Blog />
    </main>
  );
}
