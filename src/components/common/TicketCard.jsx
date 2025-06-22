// src/components/common/TicketCard.jsx
import React, { useEffect, useState } from 'react';

import CONSTANT from '../../utils/constant';
import '../../styles/common/TicketCard.css';

const TicketCard = () => {
    const [currentQrIndex, setCurrentQrIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentQrIndex((prevIndex) => (prevIndex + 1) % CONSTANT.qrImages.length);
      }, 4995);
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
            <span className="footerLabel">{CONSTANT.ticket.content.label}</span>
            <span className="footerValue">{CONSTANT.ticket.content.value}</span>
          </div>
          <button className="infoButton">{CONSTANT.ticket.content.button}</button>
        </div>
      </div>

      <div className="ticketFooter">
        <div className="footerColumn">
            <div className="footerItem">
              <span className="footerLabel">{CONSTANT.ticket.fotter.fee.label}</span>
              <span className="footerValue">{CONSTANT.ticket.fotter.fee.value}</span>
            </div>
            <div className="footerItem">
              <span className="footerLabel">{CONSTANT.ticket.fotter.section.label}</span>
              <span className="footerValue">{CONSTANT.ticket.fotter.section.value}</span>
            </div>
            <div className="footerItem">
              <span className="footerLabel">{CONSTANT.ticket.fotter.opening.label}</span>
              <span className="footerValue">{CONSTANT.ticket.fotter.opening.value}</span>
            </div>
        </div>
        <div className="footerColumn">
            <div className="footerItem">
              <span className="footerLabel">{CONSTANT.ticket.fotter.row.label}</span>
              <span className="footerValue">{CONSTANT.ticket.fotter.row.value}</span>
            </div>
            <div className="footerItem">
              <span className="footerLabel">{CONSTANT.ticket.fotter.start.label}</span>
              <span className="footerValue">{CONSTANT.ticket.fotter.start.value}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
