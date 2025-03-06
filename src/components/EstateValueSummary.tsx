import { AppUserEstateValueResponse } from '../types';

interface EstateValueSummaryProps {
  response: AppUserEstateValueResponse;
}

export function EstateValueSummary({ response }: EstateValueSummaryProps) {
  const formatCurrency = (value: number) => `£${value.toLocaleString()}`;
  const formatPercentage = (value: number) => `${value}%`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {/* <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Estate Value & Inheritance Tax Summary</h2> */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Asset Values</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Total Assets (incl. trusts)</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.totalAssetsInclHeldInTrusts)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Total Assets (excl. trusts)</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.totalAssetsExclHeldInTrusts)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Life Insurance Value</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.lifeInsuranceValue)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">ISA Value</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.isaValue)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Total Liabilities</dt>
              <dd className="font-medium text-red-600 dark:text-red-400">{formatCurrency(response.totalLiabilities)}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Estate Worth</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Legacy Worth</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.legacyWorth)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Net Worth</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.netWorth)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Estate Value (Trusts Planning)</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.estateValueForTrustsPlanning)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Gross Estate Value</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.grossEstateValue)}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Allowances & Exemptions</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Nil Rate Band Allowance</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.nilRateBandAllowance)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Residence Nil Rate Band</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.residenceNilRateBandAllowance)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Spousal Value (excl. trusts)</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.totalSpousalValueExclHeldInTrusts)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Charitable Value (excl. trusts)</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.totalCharitableValueExclHeldInTrusts)}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Tax Information</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Inheritance Tax Rate</dt>
              <dd className="font-medium dark:text-gray-100">{formatPercentage(response.inheritanceTaxRate)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Inheritance Tax Payable</dt>
              <dd className="font-medium text-red-600 dark:text-red-400">{formatCurrency(response.inheritanceTaxPayable)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">Unallocated Assets Value</dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.unAllocatedAssetsValue)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Status Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${response.exemptionTypeSpousal ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} mr-2`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Spousal Exemption</span>
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${response.exemptionTypeCharity ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} mr-2`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Charity Exemption</span>
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${response.exemptionTypeRNRB ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} mr-2`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">RNRB Exemption</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${response.exemptionTypeAgricultural ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} mr-2`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Agricultural Exemption</span>
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${response.exemptionTypeBusiness ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} mr-2`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Business Exemption</span>
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${response.unAllocatedAssets ? 'bg-red-500' : 'bg-green-500'} mr-2`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">All Assets Allocated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}