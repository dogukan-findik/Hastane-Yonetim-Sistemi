import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { Box, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, Alert, CircularProgress } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { getNotifications } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadNotifications = useCallback(async () => {
    if (!user) return;

    try {
      const response = await getNotifications(user._id);
      if (response.success) {
        setNotifications(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Bildirimler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning">Bildirimleri görüntülemek için giriş yapmalısınız.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Yükleniyor...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bildirimler
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          {notifications.length === 0 ? (
            <Typography>Bildirim bulunmuyor.</Typography>
          ) : (
            <List>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification._id}>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={notification.baslik}
                      secondary={notification.mesaj}
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Notifications; 