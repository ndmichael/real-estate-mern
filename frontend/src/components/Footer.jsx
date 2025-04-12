import { Container, Typography, TextField, Button, IconButton, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { LinkedIn, Twitter, GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ 
      bgcolor: "success.lighter", 
      py: 6, 
     }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Brand + Newsletter */}
          <Grid size={{xs:12, md:4}}>
            <Typography variant="h5" fontWeight="bold" color="success.dark">
              RENTATOWN
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Subscribe to our newsletter for weekly updates and promotions.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your email address"
                size="small"
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
              <Button variant="contained" color="success" sx={{ ml: 1 }}>
                Subscribe
              </Button>
            </Box>
          </Grid>

          {/* Links */}
          <Grid size={{xs:12, md:2}}>
            <Typography variant="subtitle1" fontWeight="bold">
              Product
            </Typography>
            {["Features", "Testimonials", "Highlights", "Listings", "FAQs"].map((item) => (
              <Typography key={item} variant="body2" sx={{ mt: 1, cursor: "pointer", color: "text.secondary" }}>
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid size={{xs:12, md:2}}>
            <Typography variant="subtitle1" fontWeight="bold">
              Company
            </Typography>
            {["About us", "Blog", "Press Release"].map((item) => (
              <Typography key={item} variant="body2" sx={{ mt: 1, cursor: "pointer", color: "text.secondary" }}>
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid size={{xs:12, md:2}}>
            <Typography variant="subtitle1" fontWeight="bold">
              Legal
            </Typography>
            {["Terms", "Privacy", "Contact"].map((item) => (
              <Typography key={item} variant="body2" sx={{ mt: 1, cursor: "pointer", color: "text.secondary" }}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Social Icons */}
          <Grid size={{xs:12, md:2}} sx={{ textAlign: { xs: "center", md: "right" } }}>
            <IconButton>
              <GitHub sx={{ color: "text.secondary" }} />
            </IconButton>
            <IconButton>
              <Twitter sx={{ color: "text.secondary" }} />
            </IconButton>
            <IconButton>
              <LinkedIn sx={{ color: "text.secondary" }} />
            </IconButton>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ mt: 4, textAlign: "center", borderTop: "1px solid", borderColor: "divider", pt: 3 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Privacy Policy • Terms of Service
          </Typography>
          <Typography variant="body2" sx={{ color: "success.dark", mt: 1 }}>
            Copyright © Rentatown 2025
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
