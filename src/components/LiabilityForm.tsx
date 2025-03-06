import React from 'react';
import { AppUserEstateValueLiability, LiabilityTypeDescriptions } from '../types';

interface LiabilityFormProps {
  liability: AppUserEstateValueLiability;
  onUpdate: (liability: AppUserEstateValueLiability) => void;
  onDelete: () => void;
}

export function LiabilityForm({ liability, onUpdate, onDelete }: LiabilityFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseFloat(value) : value;

    onUpdate({
      ...liability,
      [name]: newValue
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4 border-l-4 border-red-500 dark:border-red-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alias</label>
          <input
            type="text"
            name="Alias"
            value={liability.Alias}
            onChange={handleChange}
            className="mt-1 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            placeholder="Enter alias"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Value (£)</label>
          <input
            type="number"
            name="Value"
            value={liability.Value}
            onChange={handleChange}
            className="mt-1 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            step="0.01"
            min="0"
            required
            title="Enter value"
            placeholder="Enter value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Liability Type</label>
          <select
            name="LiabilityType"
            value={liability.LiabilityType}
            onChange={handleChange}
            className="mt-1 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            title="Select liability type"
          >
            {Object.entries(LiabilityTypeDescriptions).map(([value, description]) => (
              <option key={value} value={value}>
                {description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onDelete}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        Delete Liability
      </button>
    </div>
  );
}