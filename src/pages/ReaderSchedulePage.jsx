import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import {
  getSlotsByReaderAndStatus,
  createSlotApi,
  deleteSlotApi,
} from "../api/slotApi";
import NavBar from "../components/NavBar";

/* =======================
   CONSTANTS
   ======================= */
const HOURS = Array.from({ length: 10 }, (_, i) => i + 8); // 08:00 → 17:00

const formatDate = (date) => date.toISOString().split("T")[0];

// backend trả HH:mm:ss → convert về HH:mm
const normalizeTime = (time) => time?.slice(0, 5);

/* =======================
   COMPONENT
   ======================= */
const ReaderSchedule = () => {
  const { user } = useAuth();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState({});
  const [availableSlots, setAvailableSlots] = useState({});
  const [bookedSlots, setBookedSlots] = useState({});
  const [notify, setNotify] = useState({
      open: false,
      message: "",
      severity: "success", // success | error | warning | info
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);

    const openDeleteDialog = (slot) => {
      setSlotToDelete(slot);
      setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
      setSlotToDelete(null);
      setDeleteDialogOpen(false);
    };


  /* =======================
     AUTH CHECK
     ======================= */
  if (!user || user.role !== "READER") {
    return (
      <Typography sx={{ mt: 4 }} align="center" color="error">
        You are not authorized to access this page
      </Typography>
    );
  }

  /* =======================
     LOAD SLOTS (JWT BASED)
     ======================= */
  useEffect(() => {
    const loadSlots = async () => {
      try {
        const [availableRes, bookedRes] = await Promise.all([
          getSlotsByReaderAndStatus("AVAILABLE"),
          getSlotsByReaderAndStatus("BOOKED"),
        ]);

        const availableMap = {};
        availableRes.data.availableSlotDTOList?.forEach((slot) => {
          const key = `${slot.date}|${normalizeTime(slot.startTime)}`;
          availableMap[key] = slot;
        });

        const bookedMap = {};
        bookedRes.data.availableSlotDTOList?.forEach((slot) => {
          const key = `${slot.date}|${normalizeTime(slot.startTime)}`;
          bookedMap[key] = slot;
        });

        setAvailableSlots(availableMap);
        setBookedSlots(bookedMap);
      } catch (err) {
        console.error("❌ Load slots failed:", err);
      }
    };

    loadSlots();
  }, [currentDate]);

  /* =======================
     SLOT STATUS
     ======================= */
  const getSlotStatus = (dateStr, hour) => {
    const time = `${String(hour).padStart(2, "0")}:00`;
    const key = `${dateStr}|${time}`;


    if (bookedSlots[key]) return "booked";
    if (availableSlots[key]) return "selected";
    if (selectedSlots[key]) return "selected";
    return "available";
  };

  /* =======================
     SLOT CLICK
     ======================= */
      const handleSlotClick = (dateStr, hour) => {
      const time = `${String(hour).padStart(2, "0")}:00`;
      const key = `${dateStr}|${time}`;

      // ❌ Slot đã BOOKED → không cho làm gì
      if (bookedSlots[key]) return;

      // 🗑 Slot đã tồn tại (AVAILABLE) → delete
      // 🗑 AVAILABLE → mở dialog delete
      if (availableSlots[key]) {
        openDeleteDialog(availableSlots[key]);
        return;
      }

      // ➕ Slot mới (chưa lưu)
      setSelectedSlots((prev) => {
        const copy = { ...prev };
        if (copy[key]) delete copy[key];
        else copy[key] = true;
        return copy;
      });
    };

  /* =======================
     SAVE SCHEDULE
     ======================= */
  const handleSaveSchedule = async () => {
    try {
      const requests = Object.keys(selectedSlots).map((key) => {
        const [date, startTime] = key.split("|");

        const hour = parseInt(startTime.split(":")[0], 10);

        

        return createSlotApi({
          date,
          startTime : `${String(hour).padStart(2, "0")}:00:00`,
          endTime : `${String(hour ).padStart(2, "0")}:59:00`,
          
        });
      });

      await Promise.all(requests);

      setSelectedSlots({});
      setNotify({
        open: true,
        message: "Schedule saved successfully!",
        severity: "success",
      });

      // reload
      setCurrentDate(new Date());
    } catch (err) {
      console.error("❌ Save schedule failed");
      
      setNotify({
        open: true,
        message:
          err.response?.data?.message ||
          "Failed to save schedule. Please try again.",
        severity: "error",
      });
    }
  };

  /*====================
     DELETE SLOT

     ===============*/
     const handleDeleteSlot = async (slotID) => {
      try {
        await deleteSlotApi(slotID);
        setDeleteDialogOpen(false);
        setSlotToDelete(null);

        setNotify({
          open: true,
          message: "Slot deleted successfully",
          severity: "success",
        });

        // reload lại lịch
        setCurrentDate(new Date());
      } catch (err) {
        console.error("❌ Delete slot failed", err);

        setNotify({
          open: true,
          message:
            err.response?.data?.message ||
            "Failed to delete slot",
          severity: "error",
        });
      }
    };


  /* =======================
     DATE RANGE (7 DAYS)
     ======================= */
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  /* =======================
     RENDER
     ======================= */
  return (
    <Box>
      <NavBar></NavBar>
    <Box sx={{ p: 4 }}>
      
      <Typography variant="h4" mb={3}>
        Reader Schedule
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "100px repeat(7, 1fr)",
          gap: 1,
        }}
      >
        <Box />

        {dates.map((date) => (
          <Typography key={date.toString()} align="center" fontWeight="bold">
            {formatDate(date)}
          </Typography>
        ))}

        {HOURS.map((hour) => (
          <React.Fragment key={hour}>
            <Typography align="center">{hour}:00</Typography>

            {dates.map((date) => {
              const dateStr = formatDate(date);
              const status = getSlotStatus(dateStr, hour);

              return (
                <Box
                  key={`${dateStr}-${hour}`}
  onClick={() => handleSlotClick(dateStr, hour)}
  sx={{
    position: "relative",
    height: 40,
    borderRadius: 1,
    bgcolor:
      status === "booked"
        ? "#e57373"
        : status === "selected"
        ? "#aed581"
        : "#eeeeee",
    cursor: status === "booked" ? "not-allowed" : "pointer",

    "&:hover .slot-action": {
      opacity: status === "selected" ? 1 : 0,
    },
  }}
>
  {/* 🔒 BOOKED */}
  {status === "booked" && (
    <LockIcon
      fontSize="small"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#fff",
      }}
    />
  )}

  {/* 🗑 DELETE ICON */}
  {status === "selected" && availableSlots[`${dateStr}|${String(hour).padStart(2, "0")}:00`] && (
    <IconButton
      className="slot-action"
      size="small"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0,
        color: "#2e7d32",
        backgroundColor: "rgba(255,255,255,0.7)",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.9)",
        },
      }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  )}
               </Box>
              );
            })}
          </React.Fragment>
        ))}
      </Box>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSchedule}
          disabled={Object.keys(selectedSlots).length === 0}
        >
          Save Schedule
        </Button>
      </Box>
     <Snackbar
      open={notify.open}
      autoHideDuration={4000}
      onClose={() => setNotify({ ...notify, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={() => setNotify({ ...notify, open: false })}
        severity={notify.severity}
        sx={{ width: "100%" }}
      >
        {notify.message}
      </Alert>
    </Snackbar>
      <Dialog
            open={deleteDialogOpen && Boolean(slotToDelete)}
            onClose={() => setDeleteDialogOpen(false)}
      >
      {slotToDelete && (
        <>
          <DialogTitle>Delete slot</DialogTitle>

          <DialogContent>
            <Typography>
              Delete slot on {slotToDelete.date} at {slotToDelete.startTime}?
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>

            <Button
              color="error"
              variant="contained"
              onClick={() => handleDeleteSlot(slotToDelete.slotID)}
            >
              Delete
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>


    </Box>
    </Box>
  );
};

export default ReaderSchedule;
