import { Container, Typography, Box, Grid, Button, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

// Market trend data
const marketTrends = [
  { id: 1, title: "🏠 Properties Available", value: "5,000+" },
  { id: 2, title: "📍 Cities Covered", value: "50+" },
  { id: 3, title: "💰 Avg Rental Price", value: "₦500K/month" },
  { id: 4, title: "🔑 Successful Transactions", value: "10,000+" },
];

const MarketTrends = () => {
  return (
    <Box sx={{ bgcolor: "#f8f9fa", py: 8, textAlign: "center" }}>
      <Container>
        {/* Section Heading */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Nigeria Real Estate Market Trends
        </Typography>
        <Typography variant="body1" color="text.secondary" pb={4} sx={{ mb: 4, maxWidth: "600px", margin: "15px auto" }}>
          Stay updated with the latest housing trends in Nigeria and make informed property decisions.
        </Typography>

        {/* Market Trend Stats */}
        <Grid container spacing={3} justifyContent="center">
          {marketTrends.map((trend) => (
            <Grid item xs={12} sm={6} md={3} key={trend.id}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card elevation={3} sx={{ py: 4, borderRadius: "12px", textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" color="success">
                      {trend.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {trend.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Call-to-Action (CTA) */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Ready to Make a Move?
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="success" size="large">
                Start Searching
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="inherit" size="large">
                List Your Property
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default MarketTrends;
