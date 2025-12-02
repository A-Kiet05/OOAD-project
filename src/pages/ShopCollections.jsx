import { useState, useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { products } from '../api/data';
import { formatVND } from '../utils/currency';
import '../styles/shop.css';

export default function ShopCollections() {
  const { category } = useParams();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Map category from URL to filter
  const getCategoryFilter = (cat) => {
    const categoryMap = {
      all: null,
      tarot: 'tarot',
      lenormand: 'lenormand',
      accessories: 'accessories',
      'new-arrivals': null,
      sale: null,
    };
    return categoryMap[cat] ?? null;
  };

  // Filter products based on category
  const filteredProducts = useMemo(() => {
    const catFilter = getCategoryFilter(category);
    // Lưu ý: Nếu URL là 'new-arrivals' hoặc 'sale', bạn có thể cần logic lọc bổ sung
    // Hiện tại, nếu catFilter là null, nó trả về TẤT CẢ sản phẩm.
    if (!catFilter) return products;
    return products.filter((p) => p.category === catFilter);
  }, [category]);

  return (
    <Box sx={{ p: 4, minHeight: '80vh' }}>
      {/* Category Title */}
      <Typography
        variant="h4"
        sx={{
          textTransform: 'uppercase',
          fontWeight: 700,
          letterSpacing: '0.08em',
          mb: 4,
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        {category ? category.toUpperCase().replace('-', ' ') : 'SHOP ALL'}
      </Typography>

      {/* Products Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 2,
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              },
            }}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Product Image Container */}
            <RouterLink to={`/shop/product/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <Box sx={{ position: 'relative', overflow: 'hidden', height: '350px' }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 0.3s ease',
                    opacity: hoveredProduct === product.id ? 0 : 1,
                  }}
                />

                <CardMedia
                  component="img"
                  image={product.image2}
                  alt={`${product.name} (detail)`}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 0.3s ease',
                    opacity: hoveredProduct === product.id ? 1 : 0,
                    width: '100%',
                  }}
                />

                {hoveredProduct === product.id && (
                  <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                    <Button variant="contained" sx={{ bgcolor: '#FF9500', color: '#fff', textTransform: 'uppercase', px: 3, fontFamily: 'Space Grotesk, sans-serif' }}>VIEW ITEM</Button>
                  </Box>
                )}
              </Box>
            </RouterLink>

            {/* Product Info - Clickable */}
            <RouterLink to={`/shop/product/${product.id}`} style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
              <CardContent sx={{ textAlign: 'center', py: 2, bgcolor: '#fff' }}>
                <Typography variant="body2" sx={{ fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.04em', mb: 1, fontStyle: 'italic' }}>
                  {product.category.toUpperCase()}
                </Typography>
                <Typography sx={{ fontFamily: 'Montserrat, sans-serif',fontWeight: 700, fontSize: '1rem', mb: 1 }}>{product.name}</Typography>
                
                {/* ĐÃ SỬA: Áp dụng hàm định dạng tiền tệ */}
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#FF9500' }}>
                  {formatVND(product.price)}
                </Typography>
              </CardContent>
            </RouterLink>
          </Card>
        ))}
      </Box>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>No products found</Typography>
          <RouterLink to="/shop" style={{ textDecoration: 'none' }}>
            <Button variant="contained">Back to Shop</Button>
          </RouterLink>
        </Box>
      )}
    </Box>
  );
}