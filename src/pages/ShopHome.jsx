import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link as RouterLink } from "react-router-dom";
import "../styles/shop.css";

export default function ShopHome() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const carouselItems = [
    {
      productId: 2,
      title: "CELESTIAL UNICORN TAROT",
      subtitle: "ORACLE",
      image:
        "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764485447/Celestial-Unicorn-Tarot-1_r20pnh.jpg",
      badge: "MUST GET",
    },
    {
      productId: 1,
      title: "TEZUKA TAROT",
      subtitle: "ORACLE",
      image:
        "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764478375/Tezuka-Tarot-1-300x300_lsc8xq.jpg",
      badge: "MUST GET",
    },
    {
      productId: 3,
      title: "TAROT OF THE GODDESSES",
      subtitle: "ORACLE",
      image:
        "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764478374/Tarot-of-the-Goddesses-1-300x300_jk7kow.jpg",
      badge: "MUST GET",
    },
    {
      productId: 5,
      title: "AZRA'S GOLDEN LENORMAND",
      subtitle: "ORACLE",
      image:
        "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764478462/Azras-Golden-Lenormand-Cards-1_qiyflo.jpg",
      badge: "BEST SELLER",
    },
    {
      productId: 7,
      title: "EVERY LITTLE THING TAROT",
      subtitle: "ORACLE",
      image:
        "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764478373/Every-Little-Thing-You-Do-Is-Magic-Tarot-1-300x300_zdg5mk.jpg",
      badge: "NEW",
    },
  ];

  const categoryCards = [
    {
      title: "TAROT",
      image:
        "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764470454/TarotCategory_eoy06l.jpg",
      link: "/shop/collection/tarot",
    },
    {
      title: "LENORMAND",
      image:
        "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764470453/LenormandCategory_qeb7hw.jpg",
      link: "/shop/collection/lenormand",
    },
  ];

  const scroll = (direction) => {
    const container = document.getElementById("carousel-container");
    if (!container) return;

    const scrollAmount = 350;
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
  };

  return (
    <Box>
      {/* Category Cards Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 0,
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {categoryCards.map((card, index) => (
          <RouterLink
            key={index}
            to={card.link}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                cursor: "pointer",
                overflow: "hidden",
                transition: "0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                  "& .MuiCardContent-root": {
                    bgcolor: "#FF9500",
                    color: "#fff",
                  },
                },
              }}
            >
              <CardMedia
                component="img"
                height="600"
                image={card.image}
                alt={card.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  textAlign: "center",
                  bgcolor: "#f5f5f5",
                  py: 2,
                  transition: "0.3s ease",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </RouterLink>
        ))}
      </Box>

      {/* Carousel */}
      <Box sx={{ bgcolor: "#fff", py: 6, mt: 4 }}>
        <Box sx={{ maxWidth: "100%", margin: "0 auto", px: 2 }}>
          {/* Title + buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              px: 4,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "#666",
                  mb: 1,
                }}
              >
                FEATURED PRODUCTS
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                EXPLORE OUR COLLECTION
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                onClick={() => scroll("left")}
                sx={{
                  border: "1px solid #000",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>

              <IconButton
                onClick={() => scroll("right")}
                sx={{
                  border: "1px solid #000",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Carousel items */}
          <Box
            id="carousel-container"
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollBehavior: "smooth",
              pb: 2,
              px: 4,
              "&::-webkit-scrollbar": { height: "6px" },
              "&::-webkit-scrollbar-track": { bgcolor: "#f5f5f5" },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "#ccc",
                borderRadius: "3px",
                "&:hover": { bgcolor: "#999" },
              },
            }}
          >
            {carouselItems.map((item, index) => (
              <Box key={index} sx={{ minWidth: "350px", position: "relative" }}>
                <RouterLink
                  to={`/shop/product/${item.productId}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      overflow: "hidden",
                      transition: "0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 450,
                        overflow: "hidden",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.title}
                        sx={{ height: "100%", objectFit: "cover" }}
                      />

                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "#FF9500",
                          color: "#fff",
                          px: 2,
                          py: 0.5,
                          borderRadius: "2px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      >
                        {item.badge}
                      </Box>

                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: "rgba(0,0,0,0.7)",
                          color: "#fff",
                          p: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            mb: 0.5,
                          }}
                        >
                          {item.subtitle}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.95rem",
                            fontWeight: 700,
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </RouterLink>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
