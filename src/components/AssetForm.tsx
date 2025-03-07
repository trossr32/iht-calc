import React from 'react';
import { AppUserEstateValueAsset, AssetTypeDescriptions, AssetTypeEnum } from '../types';

interface AssetFormProps {
  asset: AppUserEstateValueAsset;
  onUpdate: (asset: AppUserEstateValueAsset) => void;
  onDelete: () => void;
}

export function AssetForm({ asset, onUpdate, onDelete }: AssetFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: unknown;

    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      newValue = parseFloat(value);
    } else if (name === 'AssetType') {
      newValue = parseInt(value, 10) as AssetTypeEnum;
    } else {
      newValue = value;
    }

    onUpdate({
      ...asset,
      [name]: newValue
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alias</label>
          <input
            type="text"
            name="Alias"
            value={asset.Alias}
            onChange={handleChange}
            className="mt-1 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            required
            title="Alias"
            placeholder="Enter alias"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Value (£)</label>
          <input
            type="number"
            name="Value"
            value={asset.Value}
            onChange={handleChange}
            className="mt-1 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            step="0.01"
            min="0"
            required
            title="Value"
            placeholder="Enter value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Asset Type</label>
          <select
            name="AssetType"
            value={asset.AssetType}
            onChange={handleChange}
            className="mt-1 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            aria-label="Asset Type"
          >
            {Object.entries(AssetTypeDescriptions).map(([value, description]) => (
              <option key={value} value={value}>
                {description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Spouse Allocated Share (%)</label>
          <input
            type="number"
            name="SpouseAllocatedShare"
            value={asset.SpouseAllocatedShare}
            onChange={handleChange}
            className="mt-1 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            min="0"
            step="0.01"
            title="Spouse Allocated Share"
            placeholder="Enter spouse allocated share"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Charity Allocated Share (%)</label>
          <input
            type="number"
            name="CharityAllocatedShare"
            value={asset.CharityAllocatedShare}
            onChange={handleChange}
            className="mt-1 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            min="0"
            step="0.01"
            title="Charity Allocated Share"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="HeldInTrust"
              checked={asset.HeldInTrust}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              title="Held in Trust"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Held in Trust</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="AllocatedToNest"
              checked={asset.AllocatedToNest}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              title="Allocated to Nest"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Allocated to Nest</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="NestHasBeneficiaries"
              checked={asset.NestHasBeneficiaries}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              title="Nest Has Beneficiaries"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Nest Has Beneficiaries</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="ResidenceNilRateBandApplicable"
              checked={asset.ResidenceNilRateBandApplicable}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              title="Residence Nil Rate Band Applicable"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Residence Nil Rate Band Applicable</label>
          </div>
        </div>
      </div>

      <button
        onClick={onDelete}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        Delete Asset
      </button>
    </div>
  );
}