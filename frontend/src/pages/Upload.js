import React, { useState } from 'react';
import { Upload as UploadIcon } from '@mui/icons-material';
import { Box, Button, Container, Paper, Typography, TextField, Alert } from '@mui/material';
import { uploadReport } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function UploadReport({ onUpload }) {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [icerik, setIcerik] = useState('');
  const [ekVeri, setEkVeri] = useState('');
  const [uploadStatus, setUploadStatus] = useState({ success: null, message: '' });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus({ success: null, message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus({ success: false, message: 'Lütfen bir dosya seçin' });
      return;
    }

    if (!user) {
      setUploadStatus({ success: false, message: 'Dosya yüklemek için giriş yapmalısınız' });
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadReport({
        file,
        icerik,
        ekVeri: ekVeri ? JSON.parse(ekVeri) : {},
        userId: user._id,
        userRole: user.role
      });

      if (result.success) {
        setUploadStatus({ success: true, message: 'Dosya başarıyla yüklendi' });
        setFile(null);
        setIcerik('');
        setEkVeri('');
        if (onUpload) onUpload();
      } else {
        setUploadStatus({ success: false, message: result.message || 'Dosya yüklenirken bir hata oluştu' });
      }
    } catch (error) {
      setUploadStatus({ success: false, message: 'Dosya yüklenirken bir hata oluştu' });
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning">Dosya yüklemek için giriş yapmalısınız.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dosya Yükleme
        </Typography>

        {uploadStatus.message && (
          <Alert severity={uploadStatus.success ? "success" : "error"} sx={{ mb: 2 }}>
            {uploadStatus.message}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<UploadIcon />}
                  disabled={isUploading}
                >
                  Dosya Seç
                </Button>
              </label>
              {file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Seçilen dosya: {file.name}
                </Typography>
              )}
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              value={icerik}
              onChange={(e) => setIcerik(e.target.value)}
              placeholder="Rapor içeriği"
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              multiline
              rows={2}
              value={ekVeri}
              onChange={(e) => setEkVeri(e.target.value)}
              placeholder="Ek JSON veri (opsiyonel)"
              sx={{ mb: 2 }}
              helperText="Geçerli bir JSON formatında girin"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isUploading || !file}
              sx={{ mt: 2 }}
            >
              {isUploading ? 'Yükleniyor...' : 'Yükle'}
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default UploadReport; 