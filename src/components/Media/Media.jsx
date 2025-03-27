import React from "react";
import "./Media.css";

const Media = () => {
  const mediaLogos = [
    { img: "/vnexpress.png", alt: "VNExpress" },
    { img: "/suckhoedoisong.png", alt: "Sức khỏe & Đời sống" },
    { img: "/1vnnet.png", alt: "Vietnamnet" },
    { img: "/vtcnewslogosvg.png", alt: "VTC News" },
    { img: "/vtv1.png", alt: "VTV1" },
    { img: "/dantrilogo.png", alt: "Dân Trí" },
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
            <div key={index} className="media-logo">
              <img src={item.img} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;
