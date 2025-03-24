import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const DashboardCard = ({ title, count, icon, link, backgroundColor }) => {
  return (
    <Card
      component={Link}
      to={link}
      sx={{
        display: "block",
        textDecoration: "none",
        color: 'inherit',
        backgroundColor: backgroundColor || "inherit",
        boxShadow: 3, // Custom shadow
        borderRadius: 2,
        border: "1px solid #ddd", // Light gray border
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
        },
      }}
    >
      <CardContent
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,  // Adjusts spacing between elements
            p: 2,
        }}
        >
        <IconButton size="large" disableRipple sx={{ p: 0 }}>
            {icon}
        </IconButton>

        <Box textAlign="right" sx={{ flexGrow: 1 }}>
            <Typography variant="body1" fontWeight="bold" noWrap>
            {title}
            </Typography>
            <Typography variant="h5" color="success" fontWeight="bold">
            {count}
            </Typography>
        </Box>
        </CardContent>

    </Card>
  );
};

export default DashboardCard;
