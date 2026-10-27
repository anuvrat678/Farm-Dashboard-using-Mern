import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const API_URL = "http://localhost:3000";
const FarmerContext = createContext(null);

async function apiRequest(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Cannot connect to the API. Start the Express server first.");
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.error || result.message || `Request failed (${response.status})`
    );
  }

  return result;
}

export function FarmerProvider({ children }) {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const refreshFarmers = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);

    try {
      const data = await apiRequest("/farmers");

      if (!Array.isArray(data)) {
        throw new Error("The API did not return a farmer list.");
      }

      setFarmers(data);
      setLoadError("");
      return data;
    } catch (error) {
      setLoadError(error.message);
      throw error;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFarmers(true).catch(() => {});
  }, [refreshFarmers]);

  async function addFarmer(farmer) {
    const result = await apiRequest("/farmers", {
      method: "POST",
      body: JSON.stringify(farmer),
    });

    await refreshFarmers();
    return result;
  }

  async function addCrop(farmerId, crop) {
    const result = await apiRequest(`/farmers/${farmerId}/crops`, {
      method: "POST",
      body: JSON.stringify(crop),
    });

    await refreshFarmers();
    return result;
  }

  return (
    <FarmerContext.Provider
      value={{
        farmers,
        loading,
        loadError,
        refreshFarmers,
        addFarmer,
        addCrop,
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
}

export function useFarmer() {
  const context = useContext(FarmerContext);

  if (!context) {
    throw new Error("useFarmer must be used inside FarmerProvider.");
  }

  return context;
}
