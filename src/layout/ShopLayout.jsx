import NavBar from '../components/NavBar';
import ShopBar from '../components/ShopBar';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';

export default function ShopLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <ShopBar />
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
