import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let badgeClass = '';
  let textColor = '';

  switch (status) {
    case 'APPROVED':
      badgeClass = 'bg-primary text-white';
      textColor = 'text-white';
      break;
    case 'CANCELED':
      badgeClass = 'bg-red-200 text-white';
      textColor = 'text-red-800';
      break;
    default:
      badgeClass = 'bg-gray-200 text-gray-800';
      textColor = 'text-gray-800';
  }

  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-5 rounded-full ${badgeClass}`}
    >
      <span className={textColor}>{status}</span>
    </span>
  );
};

export default StatusBadge;
