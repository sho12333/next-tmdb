"use crient";

import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";

const ErrorSnack = ({ message }: { message: string }) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (message) {
      setError(message);
      const timeoutId = setTimeout(() => {
        setError("");
      }, 10000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <div>
      {error && (
        <Box sx={{ width: 600 }}>
          <Snackbar
            open={!!error}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => setError("")}
            message="I love snacks"
            key={"top" + "center"}
            autoHideDuration={3000}
          />
        </Box>
      )}
    </div>
  );
};

export default ErrorSnack;
