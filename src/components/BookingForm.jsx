// BookingForm.jsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Modal } from "@mui/material";
import slotData from "../api/slots.json";

/* =======================
   CONSTANTS & HELPERS
   ======================= */
const PURPLE = "#dad0e9";
const GREEN = "#e0f778";
const BLACK = "#000000";

const getMonday = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

const formatDate = (date) => date.toISOString().split("T")[0];

/**
 * Normalize time string to "HH:MM" with 2-digit hour/min.
 * Accepts inputs like: "11:00", "11:00 ", " 11:00", "11:00-12:00"
 */
const normalizeTime = (raw) => {
  if (!raw) return "";
  const s = raw.split("-")[0]; // keep start if range
  return s.trim().padStart(5, "0"); // ensures format like "09:00" (padStart won't change correct forms)
};

/* =======================
   COMPONENT
   ======================= */
export default function BookingForm() {
  // UI / selection states
  const [selectedReader, setSelectedReader] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(""); // now stores startTime "HH:MM"

  // daySlots loaded from JSON for the chosen date
  const [daySlots, setDaySlots] = useState([]);

  // overlay modal state
  const [overlay, setOverlay] = useState({
    show: false,
    requested: "",
    nearest: null,
  });

  const readers = ["Peppa Pig", "Shaun The Sheep", "Big Bad Wolf"];

  // NOTE: slots here are *labels* for display. We'll use startTime as option value.
  const slots = [
    "06:00-07:00",
    "07:00-08:00",
    "08:00-09:00",
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
  ];

  const today = new Date();
  const monday = getMonday(today);
  const twoWeeks = new Date(monday.getTime() + 14 * 24 * 60 * 60 * 1000);

  const minDate = formatDate(today > monday ? today : monday);
  const maxDate = formatDate(twoWeeks);

  // Load daySlots whenever date changes
  useEffect(() => {
    if (!selectedDate) {
      setDaySlots([]);
      return;
    }
    const data = slotData[selectedDate] || [];
    setDaySlots(data);

    // reset selectedTime whenever date changes
    setSelectedTime("");

    console.debug("Loaded daySlots for", selectedDate, data);
  }, [selectedDate]);

  // Check if a slot is past (only relevant when selectedDate === today)
  const isPastSlot = (startTime) => {
    if (!selectedDate) return false;
    const now = new Date();
    const sel = new Date(selectedDate);
    if (sel.toDateString() !== now.toDateString()) return false;

    // parse hour/min
    const [hh, mm] = startTime.split(":").map((x) => Number(x));
    sel.setHours(hh, mm, 0, 0);
    return sel < now;
  };

  // Check if slot in daySlots is full (not available)
  const isFullSlot = (startTime) => {
    const norm = normalizeTime(startTime);
    // daySlots entries are objects like {time: "11:00", available: false}
    const db = daySlots.find((s) => normalizeTime(s.time) === norm);
    return db ? !db.available : false;
  };

  // Check whether selectedTime is already booked
  const checkSlot = () => {
    const norm = normalizeTime(selectedTime);
    const todaySlots = slotData[selectedDate] || [];
    const found = todaySlots.find((s) => normalizeTime(s.time) === norm);
    console.debug("checkSlot", { selectedDate, selectedTime: norm, found });
    return found && !found.available;
  };

  // Find the nearest available slot AFTER the requested one
  const findNearestAvailable = () => {
    const norm = normalizeTime(selectedTime);
    const list = (slotData[selectedDate] || []).map((s) => ({
      time: normalizeTime(s.time),
      available: s.available,
    }));
    // sort list by time just in case JSON order differs
    list.sort((a, b) => (a.time > b.time ? 1 : a.time < b.time ? -1 : 0));

    const idx = list.findIndex((s) => s.time === norm);
    // if not found in list, try to find first available after norm
    const startIdx = idx >= 0 ? idx + 1 : 0;
    for (let i = startIdx; i < list.length; i++) {
      if (list[i].available) return list[i];
    }
    return null;
  };

  // Handle confirm booking click
  const handleConfirm = () => {
    // validation
    if (!selectedReader || !selectedDate || !selectedTime) {
      alert("Please complete all fields.");
      return;
    }

    if (checkSlot()) {
      const nearest = findNearestAvailable();
      setOverlay({
        show: true,
        requested: normalizeTime(selectedTime),
        nearest,
      });
      return;
    }

    // success path (here you would call API to save booking)
    alert("BOOKING SUCCESS 🎉");
  };

  return (
    <>
      {/* =========================
          OVERLAY MODAL
         ========================= */}
      <Modal open={overlay.show} onClose={() => setOverlay({ ...overlay, show: false })}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 520,
            bgcolor: "white",
            borderRadius: 3,
            p: 3.5,
            boxShadow: 24,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {/* Icon */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#FFEFB0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                mr: 1,
              }}
            >
              !
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box component="p" sx={{ fontSize: 16, lineHeight: 1.5, mb: 1 }}>
              We’re sorry, the slot <strong>{overlay.requested}</strong> on{" "}
              <strong>{selectedDate ? new Date(selectedDate).toDateString() : ""}</strong> has already been taken.
            </Box>

            <Box component="h3" sx={{ fontWeight: 700, mb: 2 }}>
              We found the nearest available slot for you:
            </Box>

            {overlay.nearest ? (
              <Box
                sx={{
                  bgcolor: "#e4cff9",
                  borderRadius: 2,
                  p: 2,
                  textAlign: "center",
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                {overlay.nearest.time} -{" "}
                {String(Number(overlay.nearest.time.split(":")[0]) + 1).padStart(2, "0")}
                :00, {selectedDate ? new Date(selectedDate).toDateString() : ""}
              </Box>
            ) : (
              <Box component="p" sx={{ mb: 2 }}>
                No available slots.
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setOverlay({ ...overlay, show: false })}
                sx={{ borderRadius: 2, color: "#7a4fb8", borderColor: "#b27ce0" }}
              >
                No, let me choose
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  if (overlay.nearest) {
                    // set selectedTime to nearest start time (normalized)
                    setSelectedTime(overlay.nearest.time);
                  }
                  setOverlay({ ...overlay, show: false });
                }}
                sx={{ borderRadius: 2, bgcolor: "#C88AF5", "&:hover": { bgcolor: "#B575E8" } }}
              >
                Book this slot
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* =========================
          MAIN FORM
         ========================= */}
      <Box
        sx={{
          width: "70%",
          maxWidth: 1000,
          m: "0 auto",
          bgcolor: PURPLE,
          p: 4,
          borderRadius: 3,
          fontFamily: "Montserrat, sans-serif",
          color: BLACK,
        }}
      >
        <h1 style={{ fontWeight: 700, marginBottom: 24 }}>BOOK READING</h1>

        {/* Readers */}
        <h3 style={{ marginBottom: 8 }}>CHOOSE A READER</h3>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 4 }}>
          {readers.map((r) => (
            <Box
              key={r}
              onClick={() => setSelectedReader(r)}
              sx={{
                p: 2,
                borderRadius: 1.5,
                bgcolor: selectedReader === r ? GREEN : "#c8c1d6",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "uppercase",
                "&:hover": { opacity: 0.95 },
              }}
            >
              {r}
            </Box>
          ))}
        </Box>

        {/* Date */}
        <h3>CHOOSE A DATE</h3>
        <TextField
          type="date"
          fullWidth
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          inputProps={{ min: minDate, max: maxDate }}
          sx={{ bgcolor: "#e5dcf2", borderRadius: 1, mb: 4 }}
        />

        {/* Time slot - NOTE: option value is startTime normalized */}
        <h3>CHOOSE A TIME SLOT</h3>
        <TextField
          select
          fullWidth
          SelectProps={{ native: true }}
          disabled={!selectedDate}
          value={selectedTime}
          onChange={(e) => setSelectedTime(normalizeTime(e.target.value))}
          sx={{ bgcolor: "#e5dcf2", borderRadius: 1, mb: 4 }}
        >
          <option value="">Select a time slot</option>

          {slots.map((label) => {
            const start = normalizeTime(label); // e.g. "11:00"
            const displayLabel = label.replace("-", " - "); // pretty display
            const disabled = isPastSlot(start) || isFullSlot(start);
            return (
              <option key={start} value={start} disabled={disabled}>
                {displayLabel}
                {isPastSlot(start) ? " (past)" : isFullSlot(start) ? " (full)" : ""}
              </option>
            );
          })}
        </TextField>

        {/* NAME */}
        <h3>NAME</h3>
        <TextField fullWidth placeholder="Your name" sx={{ bgcolor: "#e5dcf2", borderRadius: 1, mb: 3 }} />

        {/* EMAIL */}
        <h3>EMAIL</h3>
        <TextField fullWidth placeholder="Your email" sx={{ bgcolor: "#e5dcf2", borderRadius: 1, mb: 4 }} />

        {/* CONFIRM BUTTON */}
        <Button variant="contained" fullWidth onClick={handleConfirm} sx={{ bgcolor: GREEN, color: BLACK, p: 2 }}>
          CONFIRM BOOKING
        </Button>
        <p style={{ textAlign: "center", marginTop: 12, fontSize: 12 }}>
          Don't worry, we won't spam you!
        </p>
      </Box>
    </>
  );
}
