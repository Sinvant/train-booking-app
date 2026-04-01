import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function ErrorMessage({ message, onClose }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-4">
      <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
      <div className="flex-grow">
        <p className="text-red-800 font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-600 hover:text-red-800 flex-shrink-0"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
