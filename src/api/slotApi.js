import axios from "axios";

const BASE_URL = "http://localhost:8081/slots";

/**
 * =========================
 * AXIOS INSTANCE
 * =========================
 */
const slotApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * =========================
 * 🔐 AUTO ATTACH JWT TOKEN
 * =========================
 */
slotApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); 
    // ⚠️ phải đúng key bạn lưu khi login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * =========================
 * CREATE SLOT (READER)
 * =========================
 * ❌ KHÔNG gửi readerID
 * Backend dùng userService.getLogin()
 */
export const createSlotApi = async ({ date, startTime, endTime }) => {
  return slotApi.post("/create-slot", {
    date,       // yyyy-MM-dd
    startTime,  // HH:mm:ss hoặc HH:mm
    endTime,    // HH:mm:ss hoặc HH:mm
  });
};

/**
 * =========================
 * GET SLOT BY READER + STATUS
 * =========================
 */
export const getSlotsByReaderAndStatus = async (status) => {
  return slotApi.get("/get-slot-by-reader", {
    params: { status },
  });
};


/**
 * =========================
 * GET ALL SLOTS
 * =========================
 */
export const getAllSlotsApi = async () => {
  return slotApi.get("/all");
};

/**
 * =========================
 * GET SLOT BY STATUS
 * =========================
 */
export const getSlotsByStatusApi = async (status) => {
  return slotApi.get("/get-by-status", {
    params: { status },
  });
};

/**
 * =========================
 * GET SLOT BY ID
 * =========================
 */
export const getSlotByIdApi = async (slotID) => {
  return slotApi.get(`/get-by-id/${slotID}`);
};

/**
 * =========================
 * UPDATE SLOT (READER)
 * =========================
 */
export const updateSlotApi = async (
  slotID,
  { status, date, startTime, endTime }
) => {
  return slotApi.put(
    `/update-slot/${slotID}`,
    null,
    {
      params: {
        status,
        date,
        startTime,
        endTime,
      },
    }
  );
};

/**
 * =========================
 * DELETE SLOT (READER)
 * =========================
 */
export const deleteSlotApi = async (slotID) => {
  return slotApi.delete(`/delete-slot/${slotID}`);
};

export default slotApi;
