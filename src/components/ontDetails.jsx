import React from 'react';

const ONTDetails = ({ ont }) => {
  return (
      <div className="text-gray-700">
        <p><strong>ID:</strong> {ont.ID}</p>
        <p><strong>Status:</strong> {ont.status}</p>
        <p><strong>Serial:</strong> {ont.serial}</p>
        <p><strong>Device Type:</strong> {ont.deviceType}</p>
        <p><strong>ONT Rx Power:</strong> {ont.OntRxPower}</p>
        <p><strong>Last Change:</strong> {ont.lastChange}</p>
      </div>
  );
};

export default ONTDetails;
