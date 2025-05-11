import { Upload as UploadIcon } from '@mui/icons-material';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React from 'react';

function Upload() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dosya Yükleme
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            component="label"
          >
            Dosya Seç
            <input
              type="file"
              hidden
              onChange={(e) => {
                // Dosya yükleme işlemi burada yapılacak
                console.log(e.target.files[0]);
              }}
            />
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Upload; 