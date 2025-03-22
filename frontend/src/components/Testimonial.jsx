import { Container, Typography, Box, Avatar } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Adekunle Adebayo",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Finding my dream home was so easy! The process was smooth, and I got the best deal thanks to this platform.",
    occupation: "Software Engineer, Lagos"
  },
  {
    id: 2,
    name: "Chimamanda Okafor",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "I never thought renting an apartment could be this stress-free. Highly recommend their service!",
    occupation: "Entrepreneur, Abuja"
  },
  {
    id: 3,
    name: "Tunde Olatunji",
    image: "https://randomuser.me/api/portraits/men/80.jpg",
    text: "Excellent customer service and a wide range of properties to choose from. I'm impressed!",
    occupation: "Banker, Port Harcourt"
  },
  {
    id: 4,
    name: "Zainab Mohammed",
    image: "https://randomuser.me/api/portraits/women/85.jpg",
    text: "I found a beautiful short-let apartment at an amazing price. The experience was seamless!",
    occupation: "Content Creator, Kano"
  },
  {
    id: 5,
    name: "Emeka Uchenna",
    image: "https://randomuser.me/api/portraits/men/95.jpg",
    text: "This platform made my relocation so easy. I got a house that suits my needs perfectly!",
    occupation: "Civil Engineer, Enugu"
  }
];

const Testimonials = () => {
  return (
    <Container sx={{ textAlign: "center", py: 12 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
         What Our Clients Say
      </Typography>
       <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: "600px", margin: "0 auto" }}>
         Discover how our platform has helped countless users find their dream homes with ease and confidence.
       </Typography>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <Box sx={{ p: 5, boxShadow: 3, borderRadius: "12px", textAlign: "center", background: "white", mx: 2 }}>
              <Avatar src={testimonial.image} sx={{ width: 90, height: 90, margin: "0 auto", mb: 3 }} />
              <Typography variant="body1" fontStyle="italic" color="text.secondary">
                "{testimonial.text}"
              </Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>{testimonial.name}</Typography>
              <Typography variant="body2" color="text.secondary">{testimonial.occupation}</Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Testimonials;



// import { Container, Typography, Box, Card, CardContent, Avatar } from "@mui/material";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// // Testimonial Data
// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "Home Buyer",
//     feedback: "This platform made finding my dream home effortless. The process was smooth, and the agents were incredibly helpful!",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//   },
//   {
//     id: 2,
//     name: "Michael Smith",
//     role: "Landlord",
//     feedback: "Listing my property here was the best decision. I found reliable tenants within days, and the support team was great!",
//     avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//   },
//   {
//     id: 3,
//     name: "Emily Davis",
//     role: "Renter",
//     feedback: "I was able to secure an apartment in no time. The listings are accurate, and the experience was seamless!",
//     avatar: "https://randomuser.me/api/portraits/women/46.jpg",
//   },
//   {
//     id: 4,
//     name: "David Miller",
//     role: "Real Estate Agent",
//     feedback: "As an agent, this platform has helped me connect with serious buyers. It’s well-structured and easy to use!",
//     avatar: "https://randomuser.me/api/portraits/men/47.jpg",
//   },
//   {
//     id: 5,
//     name: "Jessica Brown",
//     role: "First-Time Buyer",
//     feedback: "I had no experience buying a home, but this platform guided me every step of the way. Highly recommended!",
//     avatar: "https://randomuser.me/api/portraits/women/48.jpg",
//   },
// ];

// const Testimonials = () => {
//   return (
//     <Container sx={{ textAlign: "center", py: 10 }}>
//       {/* Header Section */}
//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         What Our Clients Say
//       </Typography>
//       <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: "600px", margin: "0 auto" }}>
//         Discover how our platform has helped countless users find their dream homes with ease and confidence.
//       </Typography>

//       {/* Swiper Slider */}
//       <Swiper
//         modules={[Autoplay, Pagination]}
//         spaceBetween={30}
//         slidesPerView={1}
//         loop={true}
//         autoplay={{ delay: 4000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         breakpoints={{
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//         }}
//       >
//         {testimonials.map((testimonial) => (
//           <SwiperSlide key={testimonial.id}>
//             <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
//               <Card elevation={3} sx={{ p: 4, borderRadius: "12px", textAlign: "center" }}>
//                 {/* Avatar */}
//                 <Avatar src={testimonial.avatar} sx={{ width: 80, height: 80, margin: "0 auto", mb: 2 }} />

//                 {/* Feedback */}
//                 <Typography variant="body1" fontStyle="italic" color="text.secondary">
//                   "{testimonial.feedback}"
//                 </Typography>

//                 {/* Client Name & Role */}
//                 <Box sx={{ mt: 3 }}>
//                   <Typography variant="h6" fontWeight="bold">{testimonial.name}</Typography>
//                   <Typography variant="body2" color="text.secondary">{testimonial.role}</Typography>
//                 </Box>
//               </Card>
//             </motion.div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </Container>
//   );
// };

// export default Testimonials;
