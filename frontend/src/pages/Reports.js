import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';

function Reports() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Raporlar
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Raporlar sayfası içeriği burada görüntülenecek.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Reports; 