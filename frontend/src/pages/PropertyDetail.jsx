import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPropertyById } from "../redux/propertySlice";
import { 
  Box, Typography, Grid, Button, Card, Divider, Stack, 
  CircularProgress, Alert, Chip, Modal 
} from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import WcIcon from "@mui/icons-material/Wc";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import InquiryForm from "../components/InquiryForm";

const PropertyDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { property = {}, loading, error } = useSelector((state) => state.property || {});
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPropertyById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!user) {
      navigate("/login");  // Redirect to login page if user is not authenticated
    }
  }, [user, navigate]);

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  if (loading) return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh", // Adjust height as needed
      }}
    >
      <CircularProgress size={60} color="success" />
    </Box>
  );
  

  if (error) return (
    <Box sx={{ maxWidth: "1400px", mx: "auto", p: 4 }}>
      <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
    </Box>
  );

  if (!property) return (
    <Box sx={{ maxWidth: "1400px", mx: "auto", p: 4 }}>
      <Typography variant="h6">Property not found</Typography>
    </Box>
  );

  const formattedPrice = property.category === 'rent'
    ? `₦${property.price?.toLocaleString()}/year`
    : `₦${property.price?.toLocaleString()}`;

  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto", p: { xs: 2, md: 4 }, my: 4 }}>
      {/* Property Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          {property.title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <LocationOnIcon color="success" />
          <Typography variant="body1" color="text.secondary">
            {property?.location?.address}, {property?.location?.city}, {property?.location?.state}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5" color="success.main" fontWeight="bold">
            {formattedPrice}
          </Typography>
          <Chip 
            label={property.category?.toUpperCase()} 
            color="secondary" 
            sx={{ fontWeight: 'bold' }}
          />
        </Stack>
      </Box>

      {/* Image Slider + Details Grid */}
      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12} md={7}>
          {property.images?.length > 0 ? (
            <Box sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 4 }}>
              <Swiper
                modules={[Navigation, Pagination, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                effect="fade"
                loop
              >
                {property.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <Box
                      sx={{
                        height: { xs: 300, md: 500 },
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          ) : (
            <Box
              sx={{
                height: { xs: 300, md: 500 },
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
              }}
            >
              <Typography color="text.secondary">No images available</Typography>
            </Box>
          )}
        </Grid>

        {/* Right Panel */}
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, borderRadius: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Property Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {[
                { icon: <BedIcon color="success" />, label: "Bedrooms", value: property.bedrooms },
                { icon: <BathtubIcon color="success" />, label: "Bathrooms", value: property.bathrooms },
                { icon: <WcIcon color="success" />, label: "Toilets", value: property.toilets },
                { label: "Category", value: property.category, capitalize: true },
                {
                  label: "Availability",
                  value: property.isAvailable ? "Available" : "Not Available",
                  color: property.isAvailable ? "success.main" : "error.main"
                }
              ].map(({ icon, label, value, capitalize, color }, i) => (
                <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {icon}
                    <Typography>{label}</Typography>
                  </Stack>
                  <Typography 
                    fontWeight="bold" 
                    textTransform={capitalize ? "capitalize" : "none"} 
                    color={color || "text.primary"}
                  >
                    {value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Card>

          {/* Agent Contact */}
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Agent
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" mb={2}>
              Contact the agent for more info or to book a viewing.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              size="large"
              color="success"
              disabled={!property.agent}
              onClick={handleOpen}
            >
              {property.agent ? "Contact Agent" : "No Agent Assigned"}
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Description Section */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Description
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" lineHeight={1.8} color="text.secondary">
          {property.description}
        </Typography>
      </Box>

      {/* Modal for Inquiry Form */}
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography variant="h6" mb={2}>
            Send an Inquiry
          </Typography>
          <InquiryForm
            propertyId={property?._id}
            agentId={property?.agent?._id}
            clientId={user?.user._id} // Assuming the user is logged in and stored in Redux
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default PropertyDetail;
