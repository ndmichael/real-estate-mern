import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />  {/* Navbar for Public Pages */}
      <Box sx={{ minHeight: "80vh"}}>{children}</Box> {/* Page Content */}
      <Footer />  {/* Footer for Public Pages */}
    </>
  );
};

export default PublicLayout;
