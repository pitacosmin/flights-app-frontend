import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { getMetadataFromStripe } from "../api/apiClient";

function SuccessPage() {
  const [metadata, setMetadata] = useState(false);

  const [searchParams] = useSearchParams();
  const { sessionId } = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    const fetchMetada = async () => {
      const data = await getMetadataFromStripe(sessionId);
      setMetadata(data);
    };

    fetchMetada();
  }, []);

  console.log("metadata", metadata);

  return (
    <div>
      {metadata.paymentStatus === "paid" ? (
        <Typography>
          Congratulations, your booking has been confirmed! Your payment of
          amout was successful and your booking reference number is reference
          number. Below are the details of your booking: Flight details
        </Typography>
      ) : (
        "Payment unsuccesfull"
      )}
    </div>
  );
}

export default SuccessPage;
