import React from "react";
import "./Media.css";

const Media = () => {
  const mediaLogos = [
    { img: "/vnexpress.png", alt: "VNExpress",  link: "https://vnexpress.net/bookingcare-ra-mat-tro-ly-ai-4798819.html" },
    { img: "/suckhoedoisong.png", alt: "Sức khỏe & Đời sống", link: "https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm" },
    { img: "/1vnnet.png", alt: "Vietnamnet", link:"https://vietnamnet.vn/nen-tang-dat-lich-kham-online-bookingcare-muon-tang-truong-nguoi-dung-gap-5-lan-nam-2017-i370270.html" },
    { img: "/vtcnewslogosvg.png", alt: "VTC News", link: "https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html" },
    { img: "/vtv1.png", alt: "VTV1", link: "https://video.vnexpress.net/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html" },
    { img: "/dantrilogo.png", alt: "Dân Trí", link: "https://dantri.com.vn/nhan-tai-dat-viet/san-pham-nen-tang-dat-kham-booking-care-201908201625624751.htm" },
  ];

  return (
    <div className="media-section">
      <h2>Truyền thông nói về BookingCare</h2>
      <div className="media-content">
        <div className="media-video">
        <iframe width="460" height="315"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
        </iframe>

        </div>
        <div className="media-logos">
          {mediaLogos.map((item, index) => (
            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
              <div className="media-logo">
                <img src={item.img} alt={item.alt} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;
