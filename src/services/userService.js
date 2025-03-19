export const API_URL = "http://localhost:8081/api";

export const userService = {
        getAllUsers: async (inputId) => {
            try {
                console.log("🔵 Gửi request đến:", `${API_URL}/get-all-users?id=${inputId}`);
    
                const response = await fetch(`${API_URL}/get-all-users?id=${inputId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
    
                const data = await response.json();
                console.log("📌 Users API response:", data);  // 🛠 Kiểm tra API có phản hồi không
    
                return data;
            } catch (error) {
                console.error("❌ Fetch users error:", error);
                return [];
            }
    },
};
