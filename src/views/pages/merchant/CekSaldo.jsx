import React from 'react';
import { useLocation } from 'react-router-dom';
import "../../../css/CekSaldo.css"

const CekSaldo = () => {
  const location = useLocation();
  const { memberName, balance } = location.state || {};

  return (
    <div className="balance-container">
      <div className="balance-card">
        {memberName ? (
          <>
            <h2>Informasi Saldo</h2>
            <div className="balance-info">
              <p><span>Nama Member:</span> {memberName}</p>
              <p><span>Saldo:</span> {balance} IDR</p>
            </div>
          </>
        ) : (
          <p>Data tidak ditemukan, harap kembali dan coba lagi.</p>
        )}
      </div>
    </div>
  );
};

export default CekSaldo;
