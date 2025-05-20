
export const API_URL = "http://localhost:8083/api/login";
export const authService = {
    login: async (email, password) => {
      try {
        console.log("🔵 Gửi request đến:", API_URL, "với data:", { email, password });

        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        console.log("Login API response:", data);
  
        return data;
      } catch (error) {
        console.error("Login error:", error);
        return { errCode: -1, message: "Server error" };
      }
    },
  };