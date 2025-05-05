export const API_URL = "http://localhost:8082/api";

export const userService = {
    getAllUsers: async (inputId) => {
        try {
            console.log("🔵 Gửi request đến:", `${API_URL}/get-all-users?id=${inputId}`);

            const response = await fetch(`${API_URL}/get-all-users?id=${inputId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("📌 Users API response:", data);  

            return data;
        } catch (error) {
            console.error("❌ Fetch users error:", error);
            return { errCode: 1, message: "Không thể lấy danh sách người dùng" };
        }
    },

    createUser: async (userData) => {
        try {
            console.log("🔵 Gửi request tạo user:", userData);
            const response = await fetch(`${API_URL}/create-new-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log("📌 Create User API response:", data);  

            return data;
        } catch (error) {
            console.error("❌ Create user error:", error);
            return { errCode: 1, message: "Không thể tạo người dùng" };
        }
    },

    deleteUser: async (userId) => {
        try {
            console.log(`🗑️ Gửi request xóa user ID: ${userId}`);
            const response = await fetch(`${API_URL}/delete-user`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userId }) // ✅ Gửi userId trong body
            });
    
            const data = await response.json();
            console.log("📌 Delete User API response:", data);
    
            return data;
        } catch (error) {
            console.error("❌ Delete user error:", error);
            return { errCode: 1, message: "Không thể xóa người dùng" };
        }
    },



    updateUser: async (userData) => {  
        try {
            console.log(`✏️ Gửi request cập nhật user ID: ${userData.id}`, userData);
            const response = await fetch(`${API_URL}/edit-user`, { 
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)  // ✅ Gửi toàn bộ dữ liệu
            });
    
            const data = await response.json();
            console.log("📌 Update User API response:", data);
    
            return data;
        } catch (error) {
            console.error("❌ Update user error:", error);
            return { errCode: 1, message: "Không thể cập nhật người dùng" };
        }
    }
    
    
    
    
}