import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedListings from '../components/FeaturedListings';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonial';
import MarketTrends from '../components/MarketTrends';
import FeaturedListingCarousel from '../components/FeaturedListingCarousel';

const Home = () => {
    return (
        <>
            {/* Hero section */}
            <HeroSection />

            {/* Featured Listing Carousel */}
            <FeaturedListingCarousel />

            {/* Featured Listing */}
            <FeaturedListings />

            {/** How it works section */}
            <HowItWorks />

            {/** Testimonials */}
            <Testimonials />

            <MarketTrends />
        </>
    );
};

export default Home;