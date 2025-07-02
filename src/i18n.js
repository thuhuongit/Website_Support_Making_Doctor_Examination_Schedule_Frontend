import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("language") || "vi";

const resources = {
  en: {
    translation: {
      "Chuyên khoa": "Specialties",
      "Tìm bác sĩ theo chuyên khoa": "Find doctors by specialty",
      "Cơ sở y tế": "Medical facilities",
      "Chọn bệnh viện phòng khám": "Choose a hospital or clinic",
      "Bác sĩ": "Doctor",
      "Chọn bác sĩ giỏi": "Choose a good doctor",
      "Gói khám": "Examination package",
      "Khám sức khỏe tổng quát": "General health check",
      "Hỗ trợ": "Support",
      "NỀN TẢNG Y TẾ": "HEALTHCARE PLATFORM",
      "CHĂM SÓC SỨC KHỎE TOÀN DIỆN": "COMPREHENSIVE HEALTH CARE",
      "Tìm lý do khám": "searchPlaceholder",
      "Khám chuyên khoa":  "Specialty",
      "Khám từ xa":"Telemedicine",
      "Khám tổng quát": "GeneralExam",
      "Sức khỏe tinh thần": "MentalHealth",
      "Xét nghiệm y học": "MedicalTest",
      "Khám nha khoa":  "DentalExam",
      "Chuyên khoa phổ biến": "PopularSpecialties", 
      "Sản Phụ khoa": "Obstetrics", 
      "Siêu âm thai":  "Ultrasound" ,
      "Nhi khoa":  "Pediatrics",
      "Da liễu":  "Dermatology",


     
    }
  },
  vi: {
    translation: {
      "Chuyên khoa": "Chuyên khoa",
      "Tìm bác sĩ theo chuyên khoa": "Tìm bác sĩ theo chuyên khoa",
      "Cơ sở y tế": "Cơ sở y tế",
      "Chọn bệnh viện phòng khám": "Chọn bệnh viện phòng khám",
      "Bác sĩ": "Bác sĩ",
      "Chọn bác sĩ giỏi": "Chọn bác sĩ giỏi",
      "Gói khám": "Gói khám",
      "Khám sức khỏe tổng quát": "Khám sức khỏe tổng quát",
      "Hỗ trợ": "Hỗ trợ",
      "NỀN TẢNG Y TẾ": "NỀN TẢNG Y TẾ",
      "CHĂM SÓC SỨC KHỎE TOÀN DIỆN": "CHĂM SÓC SỨC KHỎE TOÀN DIỆN",
      "Tìm lý do khám": "Tìm lý do khám",
      "Khám chuyên khoa": "Khám chuyên khoa",
      "Khám từ xa": "Khám từ xa",
      "Khám tổng quát": "Khám tổng quát",
      "Xét nghiệm y học": "Xét nghiệm y học",
      "Sức khỏa tinh thần": "Sức khỏe tinh thần",
      "Khám nha khoa": "Khám nha khoa",
      "Chuyên khoa phổ biến": "Chuyên khoa phổ biến",
      "Sản phụ khoa": "Sản phụ khoa",
      "Siêu âm thai": "Siêu âm thai",
      "Nhi khoa": "Nhi khoa",
      "Da liễu": "Da liễu"
      
    }
  }
};



i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, 
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
