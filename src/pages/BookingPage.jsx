import NavBar from "../components/NavBar.jsx";
import HeroSectionBooking from "../components/HeroSectionBooking.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Footer from "../components/Footer.jsx";
import BookingForm from "../components/BookingForm.jsx";

export default function BookingPage() {
  return (
    <div>
      <NavBar />
      <HeroSectionBooking />
      <section
        style={{ padding: "40px 16px", background: "#fff" }}
        aria-label="readers"
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          {[
            {
              name: "Peppa Pig",
              quote:
                "“I’m Peppa Pig, this is my little brother, George *oinks*”",
              price: "100k VND/hour",
              img: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764768247/peppa_ywb0wg.png",
              reverse: false,
            },
            {
              name: "Big Bad Wolf",
              quote:
                "“Little pigs, little pigs, let me in!“",
              price: "200k VND/hour",
              img: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764768253/bbwolf_q4ta0k.png",
              reverse: true,
            },
            {
              name: "Shaun The Sheep",
              quote: "“baaaaaahhhhh.”",
              price: "150k VND/hour",
              img: "https://res.cloudinary.com/drmcnkjkn/image/upload/v1764768259/shaunsheep_ncnfcc.png",
              reverse: false,
            },
          ].map((reader, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 768 ? "column" : (reader.reverse ? "row-reverse" : "row"),
                gap: 0,
                alignItems: "stretch",
                width: "100%",
              }}
            >
              {/* Image block */}
              <div
                style={{
                  flex: window.innerWidth < 768 ? "1 1 100%" : "1 1 50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: window.innerWidth < 768 ? "16px 0" : "0",
                }}
              >
                <div style={{ width: window.innerWidth < 768 ? "60%" : "75%" }}>
                  <img
                    src={reader.img}
                    alt={reader.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              {/* Text block */}
              <div
                style={{
                  flex: window.innerWidth < 768 ? "1 1 100%" : "1 1 50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: window.innerWidth < 768 ? "16px" : "20px",
                }}
              >
                <div style={{ maxWidth: "90%" }}>
                  <h3 style={{ margin: 0, fontSize: window.innerWidth < 768 ? "20px" : "28px" }}>{reader.name}</h3>
                  <p style={{ margin: "8px 0", color: "#666", fontSize: window.innerWidth < 768 ? "14px" : "18px" }}>
                    {reader.quote}
                  </p>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: window.innerWidth < 768 ? "16px" : "20px", paddingTop: 20, textAlign: 'center' }}>
                    {reader.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Box sx={{marginY: '20px'}}>
        <BookingForm></BookingForm>
      </Box>
      <Footer />
    </div>
  );
}
