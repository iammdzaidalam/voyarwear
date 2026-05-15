import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import FeaturedProducts from './components/FeaturedProducts';
import Philosophy from './components/Philosophy';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <FeaturedProducts />
      <Philosophy />
      <Footer />
    </>
  );
}
