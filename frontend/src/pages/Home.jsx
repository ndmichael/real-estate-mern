import React from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonial';
import MarketTrends from '../components/MarketTrends';
import NewListings from '../components/NewListings';
import FeaturedListingCarousel from '../components/FeaturedListingCarousel';

const Home = () => {
    return (
        <>
            {/* Hero section */}
            <HeroSection />

            {/* Featured Listing Carousel */}
            <FeaturedListingCarousel />

            {/* Featured Listing */}
            <NewListings />

            {/** How it works section */}
            <HowItWorks />

            {/** Testimonials */}
            <Testimonials />

            <MarketTrends />
        </>
    );
};

export default Home;