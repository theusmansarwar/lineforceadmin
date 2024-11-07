import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPaymentDetail } from "../../DAL/fetch";
import { fileUrl } from "../../Config/Config";
import "./PaymentDetail.css";
import Dummyimg from '../../assets/bdl32bnd4dob1.png';
import { updateStatus } from "../../DAL/edit";
import { Container, Typography, Button, Card, CardContent, CardMedia, FormControlLabel, Switch, ThemeProvider } from "@mui/material";
import useDarkTheme from "../../Theme/useDarkTheme";

const PaymentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useDarkTheme();
  // State variables for each data field
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [proof, setProof] = useState(Dummyimg); // Set default image here
  const [price, setPrice] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [trx, setTRX] = useState("");
  const [status, setStatus] = useState(false); // Default to false (Pending)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPaymentDetail(id);

        if (response && Array.isArray(response.data) && response.data.length > 0) {
          const paymentData = response.data[0];
          const { user, course } = paymentData; // Destructure for clarity

          setName(user.name || "");
          setCity(user.city || "");
          setPhone(user.phone || "");
          setEmail(user.email || "");
          setTitle(course.title || "");
          setDescription(course.description || "");
          setProof(user.proof ? fileUrl + user.proof : Dummyimg); // Check for valid proof URL
          setPrice(paymentData.price || "");
          setCreatedAt(paymentData.created_at || "");
          setTRX(paymentData.trx_id || "");
          setStatus(paymentData.status === 1); // Set status based on response
        }
      } catch (error) {
        console.error(`Failed to fetch payment details:`, error);
      }
    };

    fetchData();
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.checked); 
  };

  const handleUpdateStatus = async () => {
    const confirmSubmit = window.confirm(
        "Are you sure you want to submit the course?"
      );
      if(confirmSubmit){

      
    try {
      const formData = new FormData(); 
      formData.append('status', status ? 1 : 0); 
      formData.append('_method', 'PUT'); 

      const response = await updateStatus(id, formData); 
      
      if (response.status===true) {
        alert(response.message)
        navigate('/payments')
        console.log("Status updated successfully:", response);
        
      } else if(response.status===false){
        alert("Failed to update status. ")
        console.error("Failed to update status:");
      }
    } catch (error) {
      console.error(`Failed to update payment status:`);
      alert("Failed to update status. ")
    }
}

  };

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="md">
      <Card className="paymentdetails" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <CardContent style={{ flex: 1 }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body1"><strong>Description: </strong>{description}</Typography>
          <Typography variant="body1"><strong>Price: </strong>${price}</Typography>
          <Typography variant="body1"><strong>TRX ID: </strong>{trx}</Typography>
          <Typography variant="body1"><strong>Name: </strong>{name}</Typography>
          <Typography variant="body1"><strong>City: </strong>{city}</Typography>
          <Typography variant="body1"><strong>Phone: </strong>{phone}</Typography>
          <Typography variant="body1"><strong>Email: </strong>{email}</Typography>
          <Typography variant="body1"><strong>Created at: </strong>{createdAt ? new Date(createdAt).toLocaleDateString() : ""}</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={status}
                onChange={handleStatusChange}
                color="primary"
              />
            }
            label={status ? "Approved" : "Pending"}
          />
          <br/>
           <Button variant="contained" color="primary" onClick={handleUpdateStatus}>
        Update Status
      </Button>
        </CardContent>
        <CardMedia
          component="img"
          image={proof}
          alt="Course proof"
          sx={{ width: "auto", height: "40vh",marginRight:'20px' }}
        />
      </Card>
     
    </Container>
     </ThemeProvider>
  );
};

export default PaymentDetail;
