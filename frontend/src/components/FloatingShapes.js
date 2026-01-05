import React from 'react';

function FloatingShapes() {
  return (
    <div className="floating-shapes">
      <div className="shape" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
      <div className="shape" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' }}></div>
      <div className="shape" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%' }}></div>
    </div>
  );
}

export default FloatingShapes;