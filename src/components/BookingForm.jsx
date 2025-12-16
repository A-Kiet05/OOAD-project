import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button, Box, Modal, CircularProgress } from "@mui/material";
import axios from "axios";
import { setupAxiosToken } from "../api/authApi"; // Import hàm setup token

/* =======================
   CONSTANTS & HELPERS
   ======================= */
const PURPLE = "#dad0e9";
const GREEN = "#e0f778";
const BLACK = "#000000";
const BASE_URL = "http://localhost:8081"; // URL Backend

// Helper: Format Date YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

// Helper: Lấy thứ 2 đầu tuần
const getMonday = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

// Helper: Chuẩn hóa giờ "09:00" thành "09:00:00" để so sánh với DB
const formatTimeForDb = (timeStr) => {
  if (!timeStr || !timeStr.includes(":")) return "";
  const [hh, mm] = timeStr.trim().split(":");
  return `${hh.padStart(2, "0")}:${mm.padStart(2, "0")}:00`;
};

export default function BookingForm() {
  // --- STATE ---
  const [allReaders, setAllReaders] = useState([]); // Danh sách Reader lấy từ API
  const [selectedReaderId, setSelectedReaderId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("");
  
  const [availableDbSlots, setAvailableDbSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [overlay, setOverlay] = useState({ show: false, message: "", type: "info" });
  
  // Khung giờ cố định hiển thị trên UI (đã sửa theo format 59 phút của bạn)
  const uiTimeSlots = [
    "06:00-06:59", "07:00-07:59", "08:00-08:59", "09:00-09:59",
    "10:00-10:59", "11:00-11:59", "13:00-13:59", "14:00-14:59",
    "15:00-15:59", "16:00-16:59","17:00-17:59"
  ];

  // Giới hạn lịch (2 tuần từ thứ 2)
  const today = new Date();
  const monday = getMonday(today);
  const twoWeeks = new Date(monday.getTime() + 14 * 24 * 60 * 60 * 1000);
  const minDate = formatDate(today > monday ? today : monday);
  const maxDate = formatDate(twoWeeks);

  // --- EFFECT: FETCH ALL READERS TỪ BACKEND ---
  useEffect(() => {
    const fetchReaders = async () => {
      try {
        setupAxiosToken();
        const res = await axios.get(`${BASE_URL}/readers/get-all-profiles`);
        
        if (res.data && res.data.readerProfileDTOList) {
          const mappedReaders = res.data.readerProfileDTOList.map(profile => ({
            id: profile.readerId.userID, // Lấy userID thật
            name: profile.bio || `Reader ID ${profile.readerId.userID}`, // Dùng bio làm tên hiển thị hoặc dùng ID
            specialties: profile.specialties,
          }));
          setAllReaders(mappedReaders);
          console.log("Fetched Readers:", mappedReaders);
        }
      } catch (err) {
        console.error("Failed to fetch reader profiles", err);
        setOverlay({ show: true, message: "Failed to load Readers.", type: "error" });
      }
    };
    fetchReaders();
  }, []);

  // --- EFFECT: FETCH SLOTS TỪ BACKEND (Sử dụng Reader ID thật) ---
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedReaderId || !selectedDate) {
        setAvailableDbSlots([]);
        return;
      }

      setLoading(true);
      try {
        setupAxiosToken();
        // Gọi API SlotController với selectedReaderId (là userID thật)
        const res = await axios.get(`${BASE_URL}/slots/get-by-readerId-and-status`, {
          params: {
            readerID: selectedReaderId,
            status: "AVAILABLE"
          }
        });

        if (res.data && res.data.availableSlotDTOList) {
          // Lọc Client-side: Chỉ lấy slot trùng với ngày selectedDate
          const slotsOnDate = res.data.availableSlotDTOList.filter(
            (slot) => slot.date.toString() === selectedDate
          );
          setAvailableDbSlots(slotsOnDate);
          console.log(`DB Slots for Reader ${selectedReaderId} on ${selectedDate}:`, slotsOnDate);
        }
      } catch (err) {
        console.error("Failed to fetch slots", err);
        setAvailableDbSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
    setSelectedTimeRange(""); // Reset giờ khi đổi ngày/reader
  }, [selectedReaderId, selectedDate]);


  // --- LOGIC CHECK TRẠNG THÁI SLOT TRÊN UI ---
  const getSlotStatus = useCallback((timeLabel) => {
    const startStr = timeLabel.split("-")[0].trim();
    const dbStartTime = formatTimeForDb(startStr);

    // 1. Kiểm tra quá khứ
    if (selectedDate) {
        const now = new Date();
        const slotDateTime = new Date(`${selectedDate}T${dbStartTime}`);
        if (slotDateTime < now) return "PAST";
    }

    // 2. Kiểm tra có trong DB không
    const found = availableDbSlots.find(s => s.startTime === dbStartTime);
    
    if (found) return "AVAILABLE";
    return "FULL";
  }, [selectedDate, availableDbSlots]);

  // --- HANDLE CONFIRM BOOKING ---
  const handleConfirm = async () => {
    if (!selectedReaderId || !selectedDate || !selectedTimeRange) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      setupAxiosToken();
      
      const [startRaw, endRaw] = selectedTimeRange.split("-");
      
      // Payload khớp với AppointmentRequest DTO của Java
      const payload = {
        // Chúng ta cần đảm bảo Backend tự tìm slotID dựa trên 3 trường này.
        // Nếu Backend cần slotID, cần phải sửa lại logic này.
        readerId: selectedReaderId, // Truyền Reader ID để Backend xác định đúng Slot
        bookingDate: selectedDate,
        startTime: formatTimeForDb(startRaw),
        endTime: formatTimeForDb(endRaw),
        notes: notes
      };

      // Gọi API AppointmentController
      // Giả sử API này (create-appointment) có thể tự tìm slotID dựa trên ReaderId, Date, StartTime, EndTime
      const res = await axios.post(`${BASE_URL}/appointments/create-appointment`, payload);

      if (res.data.status === 200) {
        setOverlay({ show: true, message: "Booking Successful! 🎉", type: "success" });
        // Cập nhật UI: loại bỏ slot vừa đặt (dựa trên startTime)
        setAvailableDbSlots(prev => prev.filter(s => s.startTime !== payload.startTime));
        setSelectedTimeRange("");
      }

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Booking failed!";
      setOverlay({ 
          show: true, 
          message: msg,
          type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* --- OVERLAY MODAL --- */}
      <Modal open={overlay.show} onClose={() => setOverlay({ ...overlay, show: false })}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 400, bgcolor: "white", borderRadius: 3, p: 4, textAlign: "center", outline: "none"
        }}>
          <h2 style={{ color: overlay.type === "success" ? "green" : "red" }}>
            {overlay.type === "success" ? "Success" : "Notice"}
          </h2>
          <p style={{ margin: "20px 0" }}>{overlay.message}</p>
          <Button variant="contained" onClick={() => setOverlay({ ...overlay, show: false })}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* --- MAIN FORM --- */}
      <Box sx={{
        width: "70%", maxWidth: 1000, m: "0 auto", bgcolor: PURPLE,
        p: 4, borderRadius: 3, fontFamily: "Montserrat, sans-serif", color: BLACK
      }}>
        <h1 style={{ fontWeight: 700, marginBottom: 24 }}>BOOK READING</h1>

        {/* 1. READERS */}
        <h3 style={{ marginBottom: 8 }}>CHOOSE A READER</h3>
        {allReaders.length === 0 && !loading && <p>No Readers available or failed to load.</p>}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 4 }}>
          {allReaders.map((r) => (
            <Box
              key={r.id}
              onClick={() => setSelectedReaderId(r.id)}
              sx={{
                p: 2, borderRadius: 1.5,
                bgcolor: selectedReaderId === r.id ? GREEN : "#c8c1d6",
                fontWeight: 600, cursor: "pointer", textTransform: "uppercase",
                border: selectedReaderId === r.id ? "2px solid #000" : "none"
              }}
            >
              {r.name}
              <span style={{ fontSize: '0.8em', opacity: 0.7, marginLeft: '10px' }}>
                  ({r.specialties || 'No specialties listed'})
              </span>
            </Box>
          ))}
        </Box>

        {/* 2. DATE */}
        <h3>CHOOSE A DATE</h3>
        <TextField
          type="date" fullWidth value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          inputProps={{ min: minDate, max: maxDate }}
          sx={{ bgcolor: "#e5dcf2", borderRadius: 1, mb: 4 }}
        />

        {/* 3. TIME SLOT */}
        <h3>CHOOSE A TIME SLOT</h3>
        {loading && <p style={{fontSize: 12}}>Loading availability...</p>}
        <TextField
          select fullWidth SelectProps={{ native: true }}
          disabled={!selectedDate || !selectedReaderId || loading}
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          sx={{ bgcolor: "#e5dcf2", borderRadius: 1, mb: 4 }}
        >
          <option value="">Select a time slot</option>
          {uiTimeSlots.map((label) => {
            const status = getSlotStatus(label);
            const isDisabled = status !== "AVAILABLE";
            
            return (
              <option key={label} value={label} disabled={isDisabled}>
                {label} {status === "PAST" ? "(Past)" : status === "FULL" ? "(Full/Unavailable)" : ""}
              </option>
            );
          })}
        </TextField>

        {/* 4. NOTES */}
        <h3>NOTES</h3>
        <TextField 
          fullWidth placeholder="Any specific request?" 
          value={notes} onChange={(e) => setNotes(e.target.value)}
          sx={{ bgcolor: "#e5dcf2", borderRadius: 1, mb: 4 }} 
        />

        {/* 5. SUBMIT */}
        <Button 
          variant="contained" fullWidth onClick={handleConfirm} disabled={loading || !selectedTimeRange}
          sx={{ bgcolor: GREEN, color: BLACK, p: 2, fontWeight: "bold" }}
        >
          {loading ? <CircularProgress size={24} color="inherit"/> : "CONFIRM BOOKING"}
        </Button>
      </Box>
    </>
  );
}