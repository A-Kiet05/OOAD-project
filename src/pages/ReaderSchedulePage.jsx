import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReaderNavBar from "../components/ReaderNavBar.jsx";
import Footer from "../components/Footer.jsx";
import slotData from "../api/slots.json";


const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Mock booking data structure: { "2025-12-03": { "Peppa Pig": { "09:00": { booked: true, clientName: "...", clientEmail: "..." } } } }
const MOCK_BOOKINGS = {
  "2025-12-03": {
    "Peppa Pig": {
      "09:00": { booked: true, clientName: "John Doe", clientEmail: "john@example.com", clientPhone: "0123456789" },
      "11:00": { booked: true, clientName: "Jane Smith", clientEmail: "jane@example.com", clientPhone: "0987654321" },
    },
    "Big Bad Wolf": {
      "10:00": { booked: true, clientName: "Bob Johnson", clientEmail: "bob@example.com", clientPhone: "0111111111" },
    },
  },
  "2025-12-04": {
    "Shaun The Sheep": {
      "14:00": { booked: true, clientName: "Alice Brown", clientEmail: "alice@example.com", clientPhone: "0222222222" },
    },
  },
};

export default function ReaderSchedulePage() {
  // Get Monday of the current week
  const getMonday = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split("T")[0];

  // Calculate min/max dates for 2-week booking window
  const today = new Date();
  const monday = getMonday(today);
  const twoWeeks = new Date(monday.getTime() + 14 * 24 * 60 * 60 * 1000);
  const minDate = formatDate(today > monday ? today : monday);
  const maxDate = formatDate(twoWeeks);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [hoveredSlot, setHoveredSlot] = useState(null);

  // Generate week dates whenever currentDate changes
  useEffect(() => {
    const monday = getMonday(currentDate);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    setWeekDates(dates);
  }, [currentDate]);

  // Handle previous week (with 2-week limit)
  const handlePrevWeek = () => {
    const newDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const newMonday = getMonday(newDate);
    if (formatDate(newMonday) >= minDate) {
      setCurrentDate(newDate);
    }
  };

  // Handle next week (with 2-week limit)
  const handleNextWeek = () => {
    const newDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const newMonday = getMonday(newDate);
    // Get the last day of the 2-week window
    const lastDayOfWindow = new Date(twoWeeks);
    if (formatDate(newMonday) <= formatDate(lastDayOfWindow)) {
      setCurrentDate(newDate);
    }
  };

  // Handle slot click (reader selects a time to work)
  const handleSlotClick = (dateStr, hour) => {
    const time = `${String(hour).padStart(2, "0")}:00`;
    const key = `${dateStr}-${time}`;

    setSelectedSlots((prev) => {
      const updated = { ...prev };
      if (updated[key]) {
        delete updated[key];
      } else {
        updated[key] = true;
      }
      return updated;
    });
  };

  // Get slot status: "booked" (red), "selected" (green), or "available" (white)
  const getSlotStatus = (dateStr, hour) => {
    const time = `${String(hour).padStart(2, "0")}:00`;
    const key = `${dateStr}-${time}`;

    // Check if it's in selected slots
    if (selectedSlots[key]) {
      return "selected";
    }

    // Check if it's booked
    const booking = MOCK_BOOKINGS[dateStr]?.["Peppa Pig"]?.[time];
    if (booking?.booked) {
      return "booked";
    }

    return "available";
  };

  // Get booking info if slot is booked
  const getBookingInfo = (dateStr, hour) => {
    const time = `${String(hour).padStart(2, "0")}:00`;
    return MOCK_BOOKINGS[dateStr]?.["Peppa Pig"]?.[time];
  };

  // Get slot background color
  const getSlotColor = (status) => {
    switch (status) {
      case "booked":
        return "#EF5350"; // Red
      case "selected":
        return "#E0F778"; // Green (accent)
      default:
        return "#FFFFFF"; // White
    }
  };

  // Get slot border style
  const getSlotBorder = (status) => {
    if (status === "selected") {
      return "2px solid #E0F778";
    }
    if (status === "booked") {
      return "1px solid #D32F2F";
    }
    return "1px solid #E0E0E0";
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#fff" }}>
      <ReaderNavBar />

      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3, md: 4 },
          maxWidth: 1400,
          mx: "auto",
          width: "100%",
        }}
      >
        {/* Header */}
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 700,
            mb: 1,
            color: "#000",
          }}
        >
          Your Schedule
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" },
            color: "#666",
            mb: 3,
          }}
        >
          Select your working hours for the week
        </Typography>

        {/* Week navigation */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
            gap: 2,
          }}
        >
          <Button
            onClick={handlePrevWeek}
            startIcon={<ArrowBackIcon />}
            disabled={weekDates.length > 0 && formatDate(weekDates[0]) <= minDate}
            sx={{
              color: "#000",
              borderColor: "#000",
              border: "1px solid #000",
              "&:hover": { bgcolor: "rgba(224, 247, 120, 0.1)" },
              "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
            }}
          >
            Previous Week
          </Button>

          <Typography sx={{ fontSize: "1.1rem", fontWeight: 600, color: "#000" }}>
            {weekDates.length > 0 && `${formatDate(weekDates[0])} - ${formatDate(weekDates[6])}`}
          </Typography>

          <Button
            onClick={handleNextWeek}
            endIcon={<ArrowForwardIcon />}
            disabled={weekDates.length > 0 && formatDate(weekDates[0]) >= formatDate(new Date(twoWeeks.getTime() - 7 * 24 * 60 * 60 * 1000))}
            sx={{
              color: "#000",
              borderColor: "#000",
              border: "1px solid #000",
              "&:hover": { bgcolor: "rgba(224, 247, 120, 0.1)" },
              "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
            }}
          >
            Next Week
          </Button>
        </Box>

        {/* Legend */}
        <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 24, height: 24, bgcolor: "#FFFFFF", border: "1px solid #E0E0E0" }} />
            <Typography sx={{ fontSize: "0.9rem" }}>Available</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 24, height: 24, bgcolor: "#E0F778", border: "2px solid #E0F778" }} />
            <Typography sx={{ fontSize: "0.9rem" }}>Selected</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 24, height: 24, bgcolor: "#EF5350", border: "1px solid #D32F2F" }} />
            <Typography sx={{ fontSize: "0.9rem" }}>Booked</Typography>
          </Box>
        </Box>

        {/* Schedule table */}
        <Box
          sx={{
            overflowX: "auto",
            border: "1px solid #E0E0E0",
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `60px repeat(7, minmax(120px, 1fr))`,
              gap: 0,
              minWidth: "100%",
              bgcolor: "#f5f5f5",
            }}
          >
            {/* Empty corner cell */}
            <Box sx={{ p: 1.5, fontWeight: 700, fontSize: "0.9rem", display: "flex", alignItems: "flex-end" }}>
              Time
            </Box>

            {/* Day headers */}
            {weekDates.map((date, idx) => (
              <Box
                key={idx}
                sx={{
                  p: 1.5,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textAlign: "center",
                  borderRight: "1px solid #E0E0E0",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 700 }}>{DAYS[idx]}</Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                  {formatDate(date)}
                </Typography>
              </Box>
            ))}

            {/* Time slots */}
            {HOURS.map((hour) => (
              <Box key={`row-${hour}`} sx={{ display: "contents" }}>
                {/* Hour label */}
                <Box
                  sx={{
                    p: 1.5,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textAlign: "center",
                    borderRight: "1px solid #E0E0E0",
                    borderBottom: "1px solid #E0E0E0",
                    bgcolor: "#f5f5f5",
                  }}
                >
                  {String(hour).padStart(2, "0")}:00
                </Box>

                {/* Slot cells */}
                {weekDates.map((date, dateIdx) => {
                  const dateStr = formatDate(date);
                  const status = getSlotStatus(dateStr, hour);
                  const bookingInfo = getBookingInfo(dateStr, hour);
                  const slotColor = getSlotColor(status);
                  const slotBorder = getSlotBorder(status);

                  const slotElement = (
                    <Box
                      key={`slot-${dateIdx}-${hour}`}
                      onClick={() => status !== "booked" && handleSlotClick(dateStr, hour)}
                      sx={{
                        p: 1,
                        bgcolor: slotColor,
                        border: slotBorder,
                        borderRight: dateIdx < 6 ? "1px solid #E0E0E0" : "1px solid #E0E0E0",
                        borderBottom: "1px solid #E0E0E0",
                        cursor: status === "booked" ? "not-allowed" : "pointer",
                        transition: "all 200ms ease",
                        opacity: status === "booked" ? 0.7 : 1,
                        "&:hover": {
                          boxShadow: status === "booked" ? "none" : "0 2px 8px rgba(0,0,0,0.1)",
                          transform: status === "booked" ? "none" : "translateY(-2px)",
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: 60,
                        fontSize: "0.75rem",
                        fontWeight: 500,
                      }}
                      onMouseEnter={() => bookingInfo && setHoveredSlot(`${dateStr}-${String(hour).padStart(2, "0")}:00`)}
                      onMouseLeave={() => setHoveredSlot(null)}
                    >
                      {status === "booked" && (
                        <Typography sx={{ fontSize: "0.7rem", color: "#fff", fontWeight: 700 }}>
                          BOOKED
                        </Typography>
                      )}
                    </Box>
                  );

                  // Wrap in tooltip if booked
                  if (bookingInfo) {
                    return (
                      <Tooltip
                        key={`tooltip-${dateIdx}-${hour}`}
                        title={
                          <Box sx={{ p: 1 }}>
                            <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>
                              {bookingInfo.clientName}
                            </Typography>
                            <Typography sx={{ fontSize: "0.75rem" }}>{bookingInfo.clientEmail}</Typography>
                            <Typography sx={{ fontSize: "0.75rem" }}>{bookingInfo.clientPhone}</Typography>
                          </Box>
                        }
                        arrow
                        placement="top"
                      >
                        {slotElement}
                      </Tooltip>
                    );
                  }

                  return slotElement;
                })}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Summary section */}
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 2 }}>
            Selected Hours: {Object.keys(selectedSlots).length} slot(s)
          </Typography>

          {Object.keys(selectedSlots).length > 0 && (
            <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 1, mb: 3 }}>
              {Object.keys(selectedSlots)
                .sort()
                .map((key) => (
                  <Typography key={key} sx={{ fontSize: "0.9rem", mb: 0.5 }}>
                    • {key.split("-").slice(0, 3).join("-")} at {key.split("-")[3]}
                  </Typography>
                ))}
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#E0F778",
                color: "#000",
                fontWeight: 700,
                "&:hover": { bgcolor: "#d4e860" },
              }}
              disabled={Object.keys(selectedSlots).length === 0}
            >
              Save Schedule
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#000",
                color: "#000",
                fontWeight: 700,
                "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
              }}
              onClick={() => setSelectedSlots({})}
            >
              Clear All
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
