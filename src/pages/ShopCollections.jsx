// src/components/ShopCollection.jsx 

import { useState, useEffect, useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { getAllProductsApi, getAllCategoriesApi } from '../api/productApi'; // Import thêm getAllCategoriesApi
import { formatVND } from '../utils/currency';


const toSlug = (text) => {
    if (!text) return '';
    return text
        .toLowerCase()
        .normalize("NFD") // Chuẩn hóa Unicode
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
        .replace(/đ/g, "d").replace(/Đ/g, "D") // Xử lý chữ Đ/đ
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng gạch ngang
        .replace(/[^\w\-]+/g, '') // Loại bỏ tất cả ký tự không phải chữ, số, gạch ngang
        .replace(/\-\-+/g, '-') // Thay thế nhiều gạch ngang bằng một
        .replace(/^-+/, '').replace(/-+$/, ''); // Loại bỏ gạch ngang ở đầu và cuối
};

export default function ShopCollections() {
  const { category } = useParams();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [categories, setCategories] = useState([]); // new state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // load category list
        const catRes = await getAllCategoriesApi();
        if (catRes.status === 200 && catRes.categoryDTOs) {
            setCategories(catRes.categoryDTOs);
        } else {
            console.warn("Failed to load categories.");
        }

        // load product list
        const prodRes = await getAllProductsApi();
        if (prodRes.status === 200 && prodRes.productList) {
          setProductsList(prodRes.productList);
        } else {
          setError(prodRes.message || "Failed to load products.");
        }
      } catch (err) { 
        console.error("Error loading shop data", err); 
        setError("Network error or server connection failed.");
      }
      finally { 
        setLoading(false); 
      }
    };
    loadData();
  }, []);

  // 2. create category ( slug -> categoryID)
  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach(cat => {
        
        const slug = toSlug(cat.name);
        map[slug] = cat.categoryID; 
    });
    return map;
  }, [categories]);

    
  // 3.filter product based on slug 
  const filteredProducts = useMemo(() => {
    
    if (!category || category === 'all') return productsList;
    
   
    const targetId = categoryMap[category.toLowerCase()]; 
    
    if (!targetId) return productsList; 

    
    return productsList.filter(p => p.category?.categoryID === targetId);
  }, [category, productsList, categoryMap]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ p: 4, maxWidth: '1400px', margin: '0 auto' }}><Alert severity="error">{error}</Alert></Box>;
  if (filteredProducts.length === 0 && !category || category === 'all' && productsList.length === 0) return <Typography sx={{ textAlign: 'center', py: 10 }}>Chưa có sản phẩm nào được thêm.</Typography>;
  if (filteredProducts.length === 0 && category && category !== 'all') return <Typography sx={{ textAlign: 'center', py: 10 }}>Không tìm thấy sản phẩm nào trong danh mục **{category.toUpperCase().replace('-', ' ')}**.</Typography>;


  return (
    <Box sx={{ p: 4, minHeight: '80vh' }}>
      <Typography variant="h4" sx={{ textTransform: 'uppercase', fontWeight: 700, mb: 4, textAlign: 'center' }}>
        {category ? category.toUpperCase().replace('-', ' ') : 'SHOP ALL'}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, maxWidth: '1400px', margin: '0 auto' }}>
        {filteredProducts.map((product) => (
          <Card key={product.productID} 
                onMouseEnter={() => setHoveredProduct(product.productID)} 
                onMouseLeave={() => setHoveredProduct(null)}
                sx={{ transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}
          >
            <RouterLink to={`/shop/product/${product.productID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ position: 'relative', height: '350px', overflow: 'hidden' }}>
                <CardMedia 
                  component="img" 
                  image={product.imageUrl} 
                  alt={product.name}
                  sx={{ height: '100%', objectFit: 'cover', transition: 'opacity 0.5s', 
                        opacity: hoveredProduct === product.productID ? 0 : 1 }} 
                />
                <CardMedia 
                  component="img" 
                  image={product.backgroundUrl || product.imageUrl} 
                  alt={`${product.name} detail`}
                  sx={{ position: 'absolute', top: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s', 
                        opacity: hoveredProduct === product.productID ? 1 : 0 }} 
                />
                {hoveredProduct === product.productID && (
                  <Button variant="contained" sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', bgcolor: '#FF9500', transition: '0.3s' }}>
                    VIEW ITEM
                  </Button>
                )}
              </Box>
            </RouterLink>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#666' }}>
                {product.categoryDTO?.name?.toUpperCase() || "MYSTIC"}
              </Typography>
              <Typography sx={{ fontWeight: 700, my: 1, height: '2.5rem', overflow: 'hidden' }}>{product.name}</Typography>
              <Typography sx={{ fontWeight: 600, color: '#FF9500' }}>{formatVND(product.price)}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}