import React from 'react';

export default function Footer() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '18px', backgroundColor: 'white' }}>
      <div style={{ borderRight: '2px solid #ffffff' }}>
        <a href='https://www.highradius.com/privacy-policy/' style={{ marginRight: '8px', color: '#1C5CC4' }}>
          Privacy Policy
        </a>
      </div>
      <span style={{ marginLeft: '12px', color: '#000000' }}>
      | © 2023 HighRadius Corporation. Made by Pratham.
      </span>
    </div>
  );
}
