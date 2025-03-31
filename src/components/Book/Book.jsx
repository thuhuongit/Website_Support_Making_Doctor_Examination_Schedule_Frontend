import React, { useState } from "react";
import "./Book.css";
import { X } from "lucide-react"; // Icon đóng


const specialties = [
  {
    id: 1,
    name: "Khám Nội - Hồi sức thần kinh, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/xet-nghiem.jpg",
  },
  {
    id: 2,
    name: "Khám Chi trên và Y học thể thao, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y-duoc.jpg",
  },
  {
    id: 3,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 4,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 5,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 6,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 7,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 8,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 9,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 10,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 11,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 12,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 13,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 14,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 15,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },
  {
    id: 16,
    name: "Khám Chi dưới, Bệnh viện Hữu Nghị Việt Đức",
    address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    image: "/y.png",
  },

];

const Book = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    const filteredSpecialties = specialties.filter((specialty) =>
      specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="book-container">
        <div className="book-header">
          <h2>Chọn chuyên khoa</h2>
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <X className="close-icon" onClick={onClose} />
        </div>
  
        {/* Không bọc danh sách bằng div */}
        {filteredSpecialties.map((specialty) => (
          <div key={specialty.id} className="book-item">
            <img src={specialty.image} alt={specialty.name} />
            <div className="book-info">
              <h3>{specialty.name}</h3>
              <p>📍 {specialty.address}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

export default Book;
