import React from 'react';
import { Tooltip } from 'react-tooltip';
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
              <dt className="text-gray-600 dark:text-gray-300">
                <span data-tooltip-id="ttTotalAssetsInclTrusts" data-tooltip-content="The total value of all assets, including those held in trusts." className="cursor-help">
                Total Assets (incl. trusts)
                </span>
                <Tooltip id="ttTotalAssetsInclTrusts" place="top" />
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.totalAssetsInclHeldInTrusts)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span data-tooltip-id="ttTotalAssetsExclTrusts" data-tooltip-content="The total value of all assets, excluding those held in trusts." className="cursor-help">
                Total Assets (excl. trusts)
                </span>
                <Tooltip id="ttTotalAssetsExclTrusts" place="top" />
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.totalAssetsExclHeldInTrusts)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span data-tooltip-id="ttli" data-tooltip-content="The total value of all assets of type `life insurance`" className="cursor-help">
                  Life Insurance Value
                </span>
                <Tooltip id="ttli" place="top" />
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.lifeInsuranceValue)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span data-tooltip-id="ttisa" data-tooltip-content="The total value of all assets of type `ISA`" className="cursor-help">
                ISA Value
                </span>
                <Tooltip id="ttisa" place="top" />
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.isaValue)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span data-tooltip-id="ttlia" data-tooltip-content="The total value of all liabilities" className="cursor-help">
                Total Liabilities
                </span>
                <Tooltip id="ttlia" place="top" />
              </dt>
              <dd className="font-medium text-red-600 dark:text-red-400">{formatCurrency(response.totalLiabilities)}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Estate Worth</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttLegacyWorth">
                Legacy Worth
                </span>
                <Tooltip anchorSelect=".ttLegacyWorth" place="top">
                The total value of all assets including those held in trust<br />- Minus total liabilities
                </Tooltip>
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.legacyWorth)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttNetWorth">
                Net Worth
                </span>
                <Tooltip anchorSelect=".ttNetWorth" place="top">
                The total value of all assets including those held in trust<br />- Minus total liabilities<br />- Minus life insurance value
                </Tooltip>
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.netWorth)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttEstateValue">
                Estate Value (Trusts Planning)
                </span>
                <Tooltip anchorSelect=".ttEstateValue" place="top">
                The total value of all assets excluding those held in trust<br />- Minus total liabilities<br />- Minus life insurance value<br />- Minus ISA value
                </Tooltip>
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.estateValueForTrustsPlanning)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttGrossEstateValue">
                Gross Estate Value
                </span>
                <Tooltip anchorSelect=".ttGrossEstateValue" place="top">
                The total value of all assets excluding those held in trust<br />- Minus total liabilities
                </Tooltip>
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.grossEstateValue)}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Allowances & Exemptions</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttNRBAllowance">
                Nil Rate Band Allowance
                </span>
                <Tooltip anchorSelect=".ttNRBAllowance" place="top">
                  if (<i>Gross Estate Value</i> &lt;= £2,000,000) <br />
                  then NRB = <span className="text-orange-400">£325,000</span><br /><br />
                  Calculate <i>excess</i> and <i>reduction</i>:<br />
                  <i>excess</i> = <i>Gross Estate Value</i> - £2,000,000<br />
                  <i>reduction</i> = <i>excess</i> / 2<br /><br />
                  if (<i>reduction</i> &gt;= £325,000)<br />
                  then NRB = <span className="text-orange-400">£0</span><br /><br />
                  otherwise NRB = <span className="text-orange-400">£325,000 - <i>reduction</i></span>
                </Tooltip>
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.nilRateBandAllowance)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttRNRB">
                Residence Nil Rate Band Allowance
                </span>
                <Tooltip anchorSelect=".ttRNRB" place="top">
                £175,000 if there is a property asset with type 'main residence' that is inherited by a child or grandchild.<br />
                Use the `Residence Nil Rate Band Applicable` checkbox to indicate if this should apply to a given asset.
                </Tooltip>
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.residenceNilRateBandAllowance)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttSpousalValue">
                Spousal Value (excl. trusts)
                </span>
                <Tooltip anchorSelect=".ttSpousalValue" place="top">
                The sum value of all assets excluding those held in trust, divided by the spouses percentage share for each asset.
                </Tooltip>
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.totalSpousalValueExclHeldInTrusts)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttCharitableValue">
                Charitable Value (excl. trusts)
                </span>
                <Tooltip anchorSelect=".ttCharitableValue" place="top">
                The sum value of all assets excluding those held in trust, divided by the charities percentage share for each asset.
                </Tooltip>
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatCurrency(response.totalCharitableValueExclHeldInTrusts)}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Tax Information</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttIHT">
                Inheritance Tax Rate
                </span>
                <Tooltip anchorSelect=".ttIHT" place="top">
                If &gt;= 10% of all assets excluding those held in trust are allocated to charity then <span className="text-orange-400">36%</span>, otherwise <span className="text-orange-400">40%.</span>
                </Tooltip>
              </dt>
              <dd className="font-medium dark:text-gray-100">{formatPercentage(response.inheritanceTaxRate)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttIHTPayable">
                Inheritance Tax Payable
                </span>
                <Tooltip anchorSelect=".ttIHTPayable" place="top">
                Taxable Estate = <i>Gross Estate Value</i> - <i>Spousal Value</i> - <i>Charitable Value</i> - <i>Nil Rate Band Allowance</i> - <i>Residence Nil Rate Band Allowance</i> <br /><br />
                <span className="text-orange-400">Tax Payable = (<i>Taxable Estate</i> / 100) * <i>Inheritance Tax Rate</i></span>
                </Tooltip>
              </dt>
              <dd className="font-medium text-red-600 dark:text-red-400">{formatCurrency(response.inheritanceTaxPayable)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttUnallocatedAssets">
                Unallocated Assets Value
                </span>
                <Tooltip anchorSelect=".ttUnallocatedAssets" place="top">
                Unallocated assets are those that are not `Allocated to Nest` and where `Nest Has Beneficiaries` is false.
                </Tooltip>
              </dt>
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
              <span className="text-sm text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttSpousalExemption">
                Spousal Exemption
                </span>
                <Tooltip anchorSelect=".ttSpousalExemption" place="top">
                True if any assets have a spouse allocated share.
                </Tooltip>
              </span>
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${response.exemptionTypeCharity ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} mr-2`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                <span className="cursor-help ttCharityExemption">
                Charity Exemption
                </span>
                <Tooltip anchorSelect=".ttCharityExemption" place="top">
                True if any assets have a charity allocated share.
                </Tooltip>
              </span>
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${response.isMoreThan10PercentAllocatedToCharities ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} mr-2`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">&gt;= 10% assets excl. held in trust allocated to charity</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${response.exemptionTypeRNRB ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} mr-2`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">RNRB Exemption</span>
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