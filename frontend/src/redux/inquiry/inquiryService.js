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

export const fetchAgentInquiries = async (token, id) => {
    const res = await axios.get(`${BASE_URL}/agent/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Inquiries: ", res.data)
    return res.data;
  };
  
  export const replyToInquiry = async ({ id, reply }, token) => {
    const res = await axios.put(
      `${BASE_URL}/reply/${id}`,
      { reply },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  };

const inquiryService = {
    createInquiry,
    fetchAgentInquiries,
    replyToInquiry,
  };
  
  export default inquiryService;