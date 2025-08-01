import React from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import { useAuth } from './AuthContext';

const AdminBahagian = ({ kpiList }) => {
  const { userDepartment } = useAuth();

  // Filter KPI list based on user's department
  const filteredKpiList = kpiList.filter(kpi => kpi.department === userDepartment);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Bahagian - {userDepartment}
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Anda sedang melihat data untuk bahagian: <strong>{userDepartment}</strong>
      </Alert>

      <Typography variant="h6" gutterBottom>
        Senarai KPI untuk Bahagian {userDepartment}
      </Typography>

      {filteredKpiList.length === 0 ? (
        <Alert severity="warning">
          Tiada data KPI untuk bahagian {userDepartment}
        </Alert>
      ) : (
        <Box>
          <Typography variant="body1">
            Jumlah KPI: {filteredKpiList.length}
          </Typography>
          {/* Add table or list of KPIs here */}
        </Box>
      )}
    </Container>
  );
};

export default AdminBahagian; 