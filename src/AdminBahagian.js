import React from 'react';
import {
  Container,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { useAuth } from './AuthContext';

const AdminBahagian = ({ kpiList }) => {
  const { userDepartment } = useAuth();

  // Filter KPI list based on user's department
  const filteredKpiList = kpiList.filter(kpi => kpi.department === userDepartment);

  // Function to calculate achievement percentage
  const kiraPeratusPencapaian = (kpi) => {
    if (kpi.kategori === "Bilangan") {
      const sasaran = parseFloat(kpi.target);
      const capai = parseFloat(kpi.bilangan?.pencapaian);
      if (!isNaN(sasaran) && sasaran > 0 && !isNaN(capai)) {
        let percent = (capai / sasaran) * 100;
        if (percent > 100) percent = 100;
        return percent.toFixed(2) + "%";
      }
      return "-";
    }
    if (kpi.kategori === "Peratus") {
      const y = parseFloat(kpi.peratus?.y);
      const x = parseFloat(kpi.peratus?.x);
      const target = parseFloat(kpi.target);
      if (!isNaN(y) && y > 0 && !isNaN(x)) {
        let peratus = (x / y) * 100;
        if (!isNaN(target) && target > 0) {
          let percent = (peratus >= target ? 100 : (peratus / target) * 100);
          if (percent > 100) percent = 100;
          return percent.toFixed(2) + "%";
        }
        if (peratus > 100) peratus = 100;
        return peratus.toFixed(2) + "%";
      }
      return "-";
    }
    if (kpi.kategori === "Masa") {
      const sasaran = kpi.target;
      const capai = kpi.masa?.tarikhCapai;
      if (sasaran && capai) {
        const sasaranDate = new Date(sasaran);
        const capaiDate = new Date(capai);
        if (capaiDate <= sasaranDate) return "100.00%";
        const msPerDay = 24 * 60 * 60 * 1000;
        const hariLewat = Math.ceil((capaiDate - sasaranDate) / msPerDay);
        let peratus = 100 - (hariLewat * 0.27);
        if (peratus < 0) peratus = 0;
        if (peratus > 100) peratus = 100;
        return peratus.toFixed(2) + "%";
      }
      return "-";
    }
    if (kpi.kategori === "Tahap Kemajuan") {
      if (typeof kpi.tahapSelected !== 'undefined' && kpi.tahapSelected !== null) {
        const row = kpi.tahap?.[kpi.tahapSelected];
        if (row && row.percent !== "" && !isNaN(parseFloat(row.percent))) {
          let percent = parseFloat(row.percent);
          if (percent > 100) percent = 100;
          return percent.toFixed(2) + "%";
        }
      }
      return "-";
    }
    return "-";
  };

  // Function to format currency
  const formatRM = (value) => {
    if (!value || value === "" || value === "0" || value === "0.00") return "RM 0.00";
    const number = Number(value);
    if (isNaN(number)) return "RM 0.00";
    return "RM " + number.toLocaleString("ms-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bil</TableCell>
                <TableCell>Bahagian</TableCell>
                <TableCell>Kategori</TableCell>
                <TableCell>Pernyataan</TableCell>
                <TableCell>Kaedah Pengukuran</TableCell>
                <TableCell>Target</TableCell>
                <TableCell>Peratus Pencapaian</TableCell>
                <TableCell>Peruntukan (RM)</TableCell>
                <TableCell>Perbelanjaan (RM)</TableCell>
                <TableCell>% Perbelanjaan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredKpiList.map((kpi, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Chip label={kpi.department} color="primary" size="small" />
                  </TableCell>
                  <TableCell>{kpi.kategoriUtama || '-'}</TableCell>
                  <TableCell>{kpi.kpi}</TableCell>
                  <TableCell>{kpi.kategori}</TableCell>
                  <TableCell>{kpi.target}</TableCell>
                  <TableCell>
                    <Chip 
                      label={kiraPeratusPencapaian(kpi)} 
                      color={kiraPeratusPencapaian(kpi) === "100.00%" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatRM(kpi.peruntukan)}</TableCell>
                  <TableCell>{formatRM(kpi.perbelanjaan)}</TableCell>
                  <TableCell>{kpi.percentBelanja}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminBahagian; 