import { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { readLenormand } from "../api/read.js";
import GradientText from "../components/GradientText.jsx";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

// All 36 Lenormand cards with their Cloudinary image URLs
const LENORMAND_CARDS = [
  {
    id: 0,
    name: "Rider",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469943/H09_fwthth.png",
  },
  {
    id: 1,
    name: "Clover",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469935/D06_b1p347.png",
  },
  {
    id: 2,
    name: "Ship",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469949/S10_atafaq.png",
  },
  {
    id: 3,
    name: "House",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469945/H13_yidrpk.png",
  },
  {
    id: 4,
    name: "Tree",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469942/H07_qy1noc.png",
  },
  {
    id: 5,
    name: "Clouds",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469935/C13_fx7ntv.png",
  },
  {
    id: 6,
    name: "Snake",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469935/C12_xnvob1.png",
  },
  {
    id: 7,
    name: "Coffin",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469938/D09_f6y2fo.png",
  },
  {
    id: 8,
    name: "Bouquet",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469951/S12_dcqx50.png",
  },
  {
    id: 9,
    name: "Scythe",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469939/D11_ja68gv.png",
  },
  {
    id: 10,
    name: "Whip",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469935/C11_gj1qmd.png",
  },
  {
    id: 11,
    name: "Birds",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469936/D07_yeotf8.png",
  },
  {
    id: 12,
    name: "Child",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469949/S11_pma5st.png",
  },
  {
    id: 13,
    name: "Fox",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469934/C09_sxunpz.png",
  },
  {
    id: 14,
    name: "Bear",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469934/C10_bzzjim.png",
  },
  {
    id: 15,
    name: "Stars",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469941/H06_jydmeg.png",
  },
  {
    id: 16,
    name: "Stork",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469946/H12_wizsjb.png",
  },
  {
    id: 17,
    name: "Dog",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469945/H10_evg4zr.png",
  },
  {
    id: 18,
    name: "Tower",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469946/S06_jyrcge.png",
  },
  {
    id: 19,
    name: "Garden",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469948/S08_qzih2a.png",
  },
  {
    id: 20,
    name: "Mountain",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469934/C08_ymfafr.png",
  },
  {
    id: 21,
    name: "Crossroad",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469939/D12_qomz2q.png",
  },
  {
    id: 22,
    name: "Mice",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469933/C07_jaabul.png",
  },
  {
    id: 23,
    name: "Heart",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469944/H11_f2p5gi.png",
  },
  {
    id: 24,
    name: "Ring",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469933/C01_ellmcg.png",
  },
  {
    id: 25,
    name: "Book",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469938/D10_rddooe.png",
  },
  {
    id: 26,
    name: "Letter",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469949/S07_vu3gsa.png",
  },
  {
    id: 27,
    name: "Man",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469941/H01_l99vtb.png",
  },
  {
    id: 28,
    name: "Woman",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469946/S01_xysvsw.png",
  },
  {
    id: 29,
    name: "Lily",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469952/S13_j7a5qx.png",
  },
  {
    id: 30,
    name: "Sun",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469935/D01_tww7bo.png",
  },
  {
    id: 31,
    name: "Moon",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469942/H08_g1e7eo.png",
  },
  {
    id: 32,
    name: "Key",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469936/D08_fq8upv.png",
  },
  {
    id: 33,
    name: "Fish",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469940/D13_uxstyl.png",
  },
  {
    id: 34,
    name: "Anchor",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469948/S09_z1vwxq.png",
  },
  {
    id: 35,
    name: "Cross",
    url: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469933/C06_k2cnw3.png",
  },
];

const CARD_BACK =
  "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764469935/cardback_u7vwtb.png";

// Shuffle function
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function ReadingPage() {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShuffledCards(shuffleArray(LENORMAND_CARDS));
  }, []);

  const handleCardClick = (cardId) => {
    if (!prompt.trim()) return;
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    } else if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const handleFlip = () => setFlipped(true);

  const handleReset = () => {
    setSelectedCards([]);
    setFlipped(false);
    setResult("");
    setShuffledCards(shuffleArray(LENORMAND_CARDS));
  };

  const handleReading = async () => {
    if (!prompt.trim()) {
      alert("Please enter your question.");
      return;
    }
    if (selectedCards.length !== 3) {
      alert("Please select 3 cards.");
      return;
    }
    setLoading(true);
    try {
      const selectedCardNames = selectedCards
        .map((id) => shuffledCards.find((c) => c.id === id)?.name)
        .filter(Boolean);
      const res = await readLenormand(prompt, selectedCardNames);
      setResult(res ?? "No results.");
    } catch (err) {
      console.error(err);
      setResult("Error calling reading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <NavBar />
      <Box
        sx={{ minHeight: "100vh", bgcolor: "#000000ff", color: "#fff", p: { xs: 2, sm: 3, md: 4 } }}
      >
        {/* Title */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <GradientText
            animationSpeed={6}
            showBorder={false}
            style={{
              fontSize: "4rem",
              fontWeight: "700",
              fontFamily: "Montserrat",
              fontStyle: "italic",
              marginBottom: "2rem",
            }}
          >
            Lenormand Reading
          </GradientText>
          <Typography sx={{ fontSize: "1rem", color: "#ccc", marginTop: 1 }}>
            Enter your question first, then select 3 cards for your reading
          </Typography>
        </Box>

        {/* Question Input */}
        <Box
          sx={{
            maxWidth: 800,
            mx: "auto",
            mb: 6,
            p: 3,
            bgcolor: "#2a2a2a",
            borderRadius: "12px",
            border: "1px solid #E0F778",
          }}
        >
          <Typography sx={{ mb: 2, fontWeight: 600 }}>
            Your Question:
          </Typography>
          <input
            type="text"
            placeholder="e.g., What does my love life look like?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #E0F778",
              backgroundColor: "#1f1e1e",
              color: "#E0F778",
              fontSize: "1rem",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </Box>

        {/* Card Grid */}
        {shuffledCards.length > 0 && (
          <>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                sx={{
                  color: prompt.trim() ? "#E0F778" : "#888",
                  fontWeight: 600,
                }}
              >
                {prompt.trim()
                  ? "Select 3 cards"
                  : "Please enter your question first"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "repeat(4, 1fr)", md: "repeat(9, 1fr)" },
                gap: { xs: 1, sm: 2 },
                mb: 6,
                maxWidth: { xs: "100%", md: 1000 },
                mx: "auto",
                justifyContent: "center",
                px: { xs: 0, sm: 1 },
                opacity: prompt.trim() ? 1 : 0.5,
                pointerEvents: prompt.trim() ? "auto" : "none",
              }}
            >
              {shuffledCards.map((card) => {
                const isSelected = selectedCards.includes(card.id);
                return (
                  <Box
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    sx={{
                      position: "relative",
                      width: { xs: "80px", sm: "100px" },
                      height: { xs: "110px", sm: "140px" },
                      cursor: flipped || !prompt.trim() ? "default" : "pointer",
                      borderRadius: 2,
                      overflow: "hidden",
                      border: isSelected
                        ? "3px solid #E0F778"
                        : "1px solid #555",
                      transform:
                        isSelected && !flipped ? "scale(1.05)" : "scale(1)",
                      transition: "all 0.3s ease",
                      "&:hover":
                        !flipped && prompt.trim()
                          ? {
                              borderColor: "#E0F778",
                              boxShadow: "0 0 10px rgba(224,247,120,0.5)",
                            }
                          : {},
                    }}
                  >
                    <img
                      src={CARD_BACK}
                      alt="Card Back"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                );
              })}
            </Box>

            {/* Selected Cards */}
            {selectedCards.length > 0 && !flipped && (
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography sx={{ mb: 2, color: "#E0F778", fontWeight: 600 }}>
                  You have selected {selectedCards.length}/3 cards
                </Typography>
                {selectedCards.length === 3 && (
                  <Button
                    variant="contained"
                    onClick={handleFlip}
                    sx={{
                      bgcolor: "#E0F778",
                      color: "#000",
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      "&:hover": { bgcolor: "#D6E05D" },
                    }}
                  >
                    Flip Cards
                  </Button>
                )}
              </Box>
            )}

            {/* Flipped Cards */}
            {flipped && (
              <Box sx={{ mb: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: { xs: 1.5, sm: 2, md: 3 },
                    mb: 4,
                    flexWrap: "wrap",
                  }}
                >
                  {selectedCards.map((cardId, idx) => {
                    const card = shuffledCards.find((c) => c.id === cardId);
                    return (
                      <Box
                        key={idx}
                        sx={{
                          position: "relative",
                          width: { xs: "90px", sm: "120px", md: "300px" },
                          height: { xs: "130px", sm: "170px", md: "400px" },
                          borderRadius: 2,
                          overflow: "hidden",
                          border: "2px solid #E0F778",
                          boxShadow: "0 8px 20px rgba(224,247,120,0.3)",
                          animation: `slideUp 0.6s ease-out ${idx * 0.2}s both`,
                        }}
                      >
                        <img
                          src={card.url}
                          alt={card.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <Typography
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            bgcolor: "rgba(0,0,0,0.7)",
                            p: 1,
                            fontSize: "0.8rem",
                            textAlign: "center",
                            fontWeight: 600,
                          }}
                        >
                          {card.name}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>

                {/* Action Buttons */}
                <Box sx={{ textAlign: "center", mb: 4, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    onClick={handleReading}
                    disabled={loading}
                    sx={{
                      bgcolor: "#E0F778",
                      color: "#000",
                      fontWeight: 700,
                      px: { xs: 3, sm: 4 },
                      py: 1.5,
                      "&:hover": { bgcolor: "#D6E05D" },
                    }}
                  >
                    {loading ? "Reading..." : "Read Cards"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    sx={{
                      borderColor: "#E0F778",
                      color: "#E0F778",
                      fontWeight: 700,
                      px: { xs: 3, sm: 4 },
                      py: 1.5,
                      "&:hover": { borderColor: "#D6E05D", color: "#D6E05D" },
                    }}
                  >
                    Go Back
                  </Button>
                </Box>
              </Box>
            )}

            {/* Result */}
            {result && (
              <Box
                sx={{
                  maxWidth: { xs: "100%", sm: 600 },
                  mx: "auto",
                  p: { xs: 2, sm: 3 },
                  bgcolor: "#2a2a2a",
                  borderRadius: 2,
                  border: "1px solid #E0F778",
                  animation: "fadeIn 0.6s ease-out",
                }}
              >
                <Typography
                  sx={{
                    lineHeight: 1.8,
                    color: "#E0F778",
                    fontStyle: "italic",
                  }}
                >
                  {result}
                </Typography>
              </Box>
            )}

            {/* Loading */}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress sx={{ color: "#E0F778" }} />
              </Box>
            )}
          </>
        )}

        {/* CSS Animations */}
        <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      </Box>
      <Footer />
    </Box>
  );
}
