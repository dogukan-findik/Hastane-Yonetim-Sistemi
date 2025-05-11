import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { Box, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';

function Notifications() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bildirimler
        </Typography>
        <Box sx={{ mt: 3 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Yeni randevu talebi"
                secondary="Hasta Ahmet Yılmaz randevu talebinde bulundu."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Rapor güncellemesi"
                secondary="Dr. Mehmet Demir yeni bir rapor ekledi."
              />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  );
}

export default Notifications; 