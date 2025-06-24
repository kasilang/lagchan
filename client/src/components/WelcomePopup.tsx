import { useState, useEffect } from "react";

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="popup-overlay" onClick={closePopup}></div>
      <div className="welcome-popup">
        <div className="popup-close" onClick={closePopup}>&times;</div>
        <div className="popup-header">Welcome to lagchan!</div>
        <div style={{ fontSize: '9pt', lineHeight: '1.4' }}>
          <p><strong>Hi, I'm Ka Silang.</strong> Sole proprietor, site admin, webdev, at designated theorist-in-residence.</p>
          <p>Mahal ko ang dialectical materialism at pusa. Yung literal at yung metaphorical.</p>
          <p>Enjoy mo to habang libre pa. Pag nainis ako, magiging .onion na lang to.</p>
          <hr style={{ border: '1px solid var(--border)' }} />
          <p style={{ fontSize: '8pt' }}><em>Click anywhere outside this box to close.</em></p>
        </div>
      </div>
    </>
  );
}
