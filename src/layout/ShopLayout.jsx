import NavBar from '../components/NavBar';
import ShopBar from '../components/ShopBar';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

export default function ShopLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <NavBar />
      <ShopBar />

      {/* CONTENT */}
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
