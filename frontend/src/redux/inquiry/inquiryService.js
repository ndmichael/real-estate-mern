import axios from "axios";

const BASE_URL = "http://localhost:5000/api/inquiry";


const createInquiry = async (inquiryData, token) => {
    console.log("slice: ", inquiryData)
    const res = await axios.post(`${BASE_URL}/create`, inquiryData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
};

export const fetchAgentInquiries = async (token, id) => {
    const res = await axios.get(`${BASE_URL}/agent/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };
  
  export const replyToInquiry = async ({inquiryId, replyMessage }, token) => {
    const res = await axios.put(
      `${BASE_URL}/reply/${inquiryId}`,
      { replyMessage },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  };

  export const fetchClientInquiries = async (token, clientId) => {
    const res = await axios.get(`${BASE_URL}/client/${clientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };
  

const inquiryService = {
    createInquiry,
    fetchAgentInquiries,
    replyToInquiry,
    fetchClientInquiries
  };
  
  export default inquiryService;