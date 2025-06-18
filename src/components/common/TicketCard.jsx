// src/components/common/TicketCard.jsx
import React, { useEffect, useState } from 'react';

import CONSTANT from '../../utils/constant';
import '../../styles/common/TicketCard.css';

const TicketCard = () => {
    const [currentQrIndex, setCurrentQrIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentQrIndex((prevIndex) => (prevIndex + 1) % CONSTANT.qrImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

  return (
    <div className="ticketCard">
      <div className="ticketHeader">
        <img
          src="https://www.nexticket.com.pe/cdn/shop/files/PORTADA-1080x1080.png?v=1746552033&width=3024"
          alt="Bad Bunny Ticket Banner"
          className="ticketBanner"
        />
      </div>

      <div className="progressBarContainer">
        <div className="progressBar"></div>
      </div>

      <div className="ticketContent">
        <div className="qrSection">
          <img
            src={CONSTANT.qrImages[currentQrIndex]}
            alt="QR Code"
            className="qrImage"
          />
        </div>

        <div className="ticketDetails">
          <div className="footerItem">
              <span className="footerLabel">Sector</span>
              <span className="footerValue">Oriente</span>
            </div>
          <button className="infoButton">Más info</button>
        </div>
      </div>

      <div className="ticketFooter">
        <div className="footerColumn">
            <div className="footerItem">
              <span className="footerLabel">Tarifa</span>
              <span className="footerValue">Normal</span>
            </div>
            <div className="footerItem">
              <span className="footerLabel">Sección</span>
              <span className="footerValue">Oriente</span>
            </div>
            <div className="footerItem">
              <span className="footerLabel">Apertura</span>
              <span className="footerValue">21:00</span>
            </div>
        </div>
        <div className="footerColumn">
            <div className="footerItem">
              <span className="footerLabel">Fila</span>
              <span className="footerValue">Sin numerar</span>
            </div>
            <div className="footerItem">
              <span className="footerLabel">Inicio</span>
              <span className="footerValue">21:00</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
