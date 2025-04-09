import axios from "axios";

const BASE_URL = "http://localhost:5000/api/inquiry";


const createInquiry = async (inquiryData, token) => {
    console.log("slice: ", inquiryData)
    const res = await axios.post(`${BASE_URL}/create`, inquiryData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`res dashboard: ${res.data}`)
    return res.data;
};

  // Get dashboard stats
const fetchAllInquiries = async (token) => {
    const res = await axios.get(`${BASE_URL}/create`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`res dashboard: ${res.data}`)
    return res.data;
};

const inquiryService = {
    fetchAllInquiries,
    createInquiry
  };
  
  export default inquiryService;