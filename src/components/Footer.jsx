import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// Giả sử màu accent của bạn là màu xanh chanh (#E0F778)
const ACCENT_COLOR = "#E0F778";
const DARK_BACKGROUND = "#1E1E1E"; 
const TEXT_COLOR = "#FFFFFF";

export default function Footer() {
  return (
    // Container chính cho Footer (sử dụng component="footer" cho tính ngữ nghĩa)
    <Box
      component="footer"
      sx={{
        bgcolor: DARK_BACKGROUND, // Nền tối
        color: TEXT_COLOR,
        py: 2, // Padding trên dưới
        px: { xs: 3, md: 8 }, // Padding ngang
        display: "flex",
        justifyContent: "space-between", // Chia 2 bên
        alignItems: "center",
        minHeight: "60px",
      }}
    >
      {/* KHU VỰC BÊN TRÁI: Logo (T.O.A.) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Đây là phần mô phỏng 3 hình học của logo */}
        <Box sx={{ 
            width: 12, 
            height: 12, 
            bgcolor: ACCENT_COLOR, 
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', // Hình tam giác
            marginRight: '6px'
        }} />
        <Typography 
            variant="h6" 
            sx={{ 
                color: ACCENT_COLOR, 
                fontWeight: 700, 
                fontSize: { xs: '1rem', md: '1.2rem' } 
            }}
        >
            TOA
        </Typography>
      </Box>

      {/* KHU VỰC BÊN PHẢI: Links */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, md: 4 }, // Khoảng cách giữa các link
          fontSize: { xs: '0.75rem', md: '0.9rem' },
        }}
      >
        <Link 
            color={TEXT_COLOR} 
            underline="none" 
            href="/contact"
            sx={{ '&:hover': { color: ACCENT_COLOR } }} // Hiệu ứng hover
        >
          Contact
        </Link>
        <Link 
            color={TEXT_COLOR} 
            underline="none" 
            href="/blog"
            sx={{ '&:hover': { color: ACCENT_COLOR } }}
        >
          Blog
        </Link>
        <Link
            color={TEXT_COLOR}
            underline="none"
            href="/collaboration"
            sx={{ '&:hover': { color: ACCENT_COLOR } }}
        >
          Collaboration
        </Link>
      </Box>
    </Box>
  );
}