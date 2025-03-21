import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedListings from '../components/FeaturedListings';

const Home = () => {
    return (
        <>
            {/* Hero section */}
            <HeroSection />

            {/* Featured Listing */}
            <FeaturedListings />
        </>
    );
};

export default Home;