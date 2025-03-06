import { useState, useMemo } from 'react';
import { Plus, Minus } from 'lucide-react';
import { AppUserEstateValueAsset, AppUserEstateValueLiability, AssetTypeEnum, LiabilityTypeEnum, AppUserEstateValueResponse } from './types';
import { AssetForm } from './components/AssetForm';
import { LiabilityForm } from './components/LiabilityForm';
import { EstateValueSummary } from './components/EstateValueSummary';

const defaultAsset: AppUserEstateValueAsset = {
  Alias: '',
  Value: 0,
  AssetType: AssetTypeEnum.BankAccount,
  HeldInTrust: false,
  AllocatedToNest: false,
  NestHasBeneficiaries: false,
  SpouseAllocatedShare: 0,
  CharityAllocatedShare: 0,
  ResidenceNilRateBandApplicable: false,
};

const defaultLiability: AppUserEstateValueLiability = {
  Alias: '',
  Value: 0,
  LiabilityType: LiabilityTypeEnum.CreditCard,
};

function App() {
  const [assets, setAssets] = useState<AppUserEstateValueAsset[]>([]);
  const [liabilities, setLiabilities] = useState<AppUserEstateValueLiability[]>([]);

  const estateValueResponse = useMemo(() => {
    return new AppUserEstateValueResponse(assets, liabilities);
  }, [assets, liabilities]);

  const handleAddAsset = () => {
    setAssets([...assets, { ...defaultAsset }]);
  };

  const handleUpdateAsset = (index: number, updatedAsset: AppUserEstateValueAsset) => {
    const newAssets = [...assets];
    newAssets[index] = updatedAsset;
    setAssets(newAssets);
  };

  const handleDeleteAsset = (index: number) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  const handleAddLiability = () => {
    setLiabilities([...liabilities, { ...defaultLiability }]);
  };

  const handleUpdateLiability = (index: number, updatedLiability: AppUserEstateValueLiability) => {
    const newLiabilities = [...liabilities];
    newLiabilities[index] = updatedLiability;
    setLiabilities(newLiabilities);
  };

  const handleDeleteLiability = (index: number) => {
    setLiabilities(liabilities.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Estate Value & Inheritance Tax Calculator</h1>

        {assets.length > 0 && (
          <div className="mb-8">
            <EstateValueSummary response={estateValueResponse} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Assets</h2>
              <button
                onClick={handleAddAsset}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Asset
              </button>
            </div>

            {assets.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">No assets added yet. Click the "Add Asset" button to get started.</p>
              </div>
            ) : (
              assets.map((asset, index) => (
                <AssetForm
                  key={index}
                  asset={asset}
                  onUpdate={(updatedAsset) => handleUpdateAsset(index, updatedAsset)}
                  onDelete={() => handleDeleteAsset(index)}
                />
              ))
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Liabilities</h2>
              <button
                onClick={handleAddLiability}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <Minus className="w-5 h-5 mr-2" />
                Add Liability
              </button>
            </div>

            {liabilities.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">No liabilities added yet. Click the "Add Liability" button to get started.</p>
              </div>
            ) : (
              liabilities.map((liability, index) => (
                <LiabilityForm
                  key={index}
                  liability={liability}
                  onUpdate={(updatedLiability) => handleUpdateLiability(index, updatedLiability)}
                  onDelete={() => handleDeleteLiability(index)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;