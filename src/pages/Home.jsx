import NavBar from "../components/NavBar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Box from "@mui/material/Box";
import ParallaxGallery from "../components/ParallaxGallery.jsx";
import Typography from "@mui/material/Typography";
import Footer from "../components/Footer.jsx";
export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <section
        style={{
          backgroundColor: "#E0F778",
          padding: "0px",
          width: "100%",
          margin: "0px",
          gap: "0px",
          height: "563px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "87%",
            alignContent: "center",
            gap: "48px",
            justifyContent: "center",
            px: 15,
          }}
        >
          {" "}
          {/* STACK BOX CONTENT HERE */}
          <Box
            sx={{
              paddingTop: "0px",
              overflow: "auto",
              width: "50%",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <h1
              sx={{
                fontSize: "48px",
                fontFamily: "Montserrat",
                fontWeight: "bolder",
              }}
            >
              About us
            </h1>
            <h3>Where Intuition Meets Innovation</h3>
            <p sx={{ fontSize: "32px" }}>
              At <strong>The Oracle Algorithm</strong>, ancient wisdom meets
              cutting-edge AI. We offer oracle, tarot, and lenormand decks
              alongside intelligent readings that evolve with you — blending
              technology and intuition to create a truly modern divination
              experience.
            </p>
          </Box>
          <Box>
            <ParallaxGallery
              sx={{ width: "50%", height: "100%" }}
              images={[
                "/images/1.jpg",
                "/images/2.jpg",
                "/images/3.jpg",
                "/images/4.jpg",
                "/images/5.jpg",
                "/images/6.jpg",
                "/images/7.jpg",
                "/images/8.jpg",
              ]}
            />
          </Box>
        </Box>
      </section>
      {/* Three-feature section with images 9.jpg,10.jpg,11.jpg from public/images */}
      <section
        style={{ padding: "56px 0", background: "#fff" }}
        aria-label="features"
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 20px",
            boxSizing: "border-box",
          }}
        >
          {[
            {
              title: "Decks & Divination",
              text: "Explore beautifully crafted oracle, tarot, and lenormand decks — each designed to awaken your intuition and deepen your spiritual journey.",
              img: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764470136/6_qykoco.jpg",
              reverse: false,
            },
            {
              title: "AI Readings",
              text: "Experience the future of divination with our AI-powered readings that blend intuition and intelligent analysis.",
              img: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764470094/pexels-natalie-goodwin-2148267387-31265604_vq5apt.jpg",
              reverse: true,
            },
            {
              title: "Reader Bookings",
              text: "Connect with skilled readers for personalized sessions — guidance and clarity crafted to illuminate your path.",
              img: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764470214/5_ggbexj.jpg",
              reverse: false,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: item.reverse ? "row-reverse" : "row",
                gap: 0,
                alignItems: "stretch",
                marginBottom: 0,
                width: "100%",
              }}
            >
              {/* Left: text block (square) */}
              <div
                style={{
                  flex: "1 1 50%",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    boxSizing: "border-box",
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: 25 }}>{item.title}</h3>
                  <p
                    style={{
                      marginTop: 8,
                      color: "#999999",
                      marginBottom: 0,
                      fontSize: 20,
                      fontColor: "#444",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Right: image block (square, no border radius) */}
              <div
                style={{
                  flex: "1 1 50%",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 0,
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        style={{
          padding: "3rem 0",
          background: "#fff",
          backgroundColor: "#DAD0E9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
        aria-label="Quote"
      >
        <div>
          <h1 style={{ color: "#fff" }}>
            "In <strong style={{ color: "#E0F778" }}>AI</strong> we trust,
          </h1>
          <h1 style={{ color: "#fff" }}>
            In <strong style={{ color: "#E0F778" }}>Tarot</strong> we verify."
          </h1>
          <h6 style={{ color: "#fff" }}>TOA</h6>
        </div>
      </section>
      <section
        style={{
          padding: "3rem 0",
          background: "#fff",
          backgroundColor: "#E0F778",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
        aria-label="Ads"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Sắp xếp theo HÀNG NGANG
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {/* ITEM 1: "30+ Products" (Xếp Dọc) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Sắp xếp DỌC
              textAlign: "center",
            }}
          >
            <Typography variant="h3">30+</Typography>
            <Typography variant="body1">Products.</Typography>
          </Box>

          {/* ITEM 2: "32+ Investments" (Xếp Dọc) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Sắp xếp DỌC
              textAlign: "center",
            }}
          >
            <Typography variant="h3">32+</Typography>
            <Typography variant="body1">Investments.</Typography>
          </Box>

          {/* ITEM 3: "10K Sales" (Xếp Dọc) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Sắp xếp DỌC
              textAlign: "center",
            }}
          >
            <Typography variant="h3">10K</Typography>
            <Typography variant="body1">Sales.</Typography>
          </Box>
        </Box>
      </section>
      <Footer />
    </div>
  );
}
