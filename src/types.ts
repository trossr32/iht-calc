export enum AssetTypeEnum {
  BankAccount = 1,
  LifeInsurance = 2,
  StockShares = 3,
  Crypto = 4,
  Business = 5,
  ExpectedInheritance = 6,
  PremiumBond = 7,
  Pension = 8,
  Property = 9,
  Other = 10,
  Isa = 11
}

export enum LiabilityTypeEnum {
  CreditCard,
  Hmrc,
  Loan,
  Mortgage,
  Overdraft
}

// Mapping for human-readable descriptions
export const AssetTypeDescriptions: Record<AssetTypeEnum, string> = {
  [AssetTypeEnum.BankAccount]: 'bank account',
  [AssetTypeEnum.Business]: 'business',
  [AssetTypeEnum.Crypto]: 'crypto',
  [AssetTypeEnum.ExpectedInheritance]: 'expected inheritance',
  [AssetTypeEnum.LifeInsurance]: 'life insurance',
  [AssetTypeEnum.Other]: 'other',
  [AssetTypeEnum.Pension]: 'pension',
  [AssetTypeEnum.PremiumBond]: 'premium bond',
  [AssetTypeEnum.Property]: 'property',
  [AssetTypeEnum.StockShares]: 'stock shares',
  [AssetTypeEnum.Isa]: 'isa'
};

export const LiabilityTypeDescriptions: Record<LiabilityTypeEnum, string> = {
  [LiabilityTypeEnum.CreditCard]: 'credit card',
  [LiabilityTypeEnum.Hmrc]: 'HMRC',
  [LiabilityTypeEnum.Loan]: 'loan',
  [LiabilityTypeEnum.Mortgage]: 'mortgage',
  [LiabilityTypeEnum.Overdraft]: 'overdraft'
};

export interface AppUserEstateValueAsset {
  Alias: string;
  Value: number;
  AssetType: AssetTypeEnum;
  HeldInTrust: boolean;
  AllocatedToNest: boolean;
  NestHasBeneficiaries: boolean;
  SpouseAllocatedShare: number;
  CharityAllocatedShare: number;
  ResidenceNilRateBandApplicable: boolean;
}

export interface AppUserEstateValueLiability {
  Alias: string;
  Value: number;
  LiabilityType: LiabilityTypeEnum;
}

export class AppUserEstateValueResponse {
  static readonly BaseNilRateBandAllowance = 325000;
  static readonly BaseResidenceNilRateBandAllowance = 175000;
  static readonly NilRateBandTaperThreshold = 2000000;

  constructor(
    public assets: AppUserEstateValueAsset[] = [],
    public liabilities: AppUserEstateValueLiability[] = [],
    public totalGiftsMadeInLast7Years: number = 0,
    public exemptionTypeAgricultural: boolean = false,
    public exemptionTypeBusiness: boolean = false
  ) {}

  get nilRateBandAllowance(): number {
    if (this.totalAssetsExclHeldInTrusts <= AppUserEstateValueResponse.NilRateBandTaperThreshold)
      return AppUserEstateValueResponse.BaseNilRateBandAllowance;

    const excess = this.totalAssetsExclHeldInTrusts - AppUserEstateValueResponse.NilRateBandTaperThreshold;
    const reduction = excess / 2;

    if (reduction >= AppUserEstateValueResponse.BaseNilRateBandAllowance)
      return 0;

    const adjustedNilRateBand = AppUserEstateValueResponse.BaseNilRateBandAllowance - reduction;

    return adjustedNilRateBand > 0 ? adjustedNilRateBand : 0;
  }

  get residenceNilRateBandAllowance(): number {
    return this.exemptionTypeRNRB
      ? AppUserEstateValueResponse.BaseResidenceNilRateBandAllowance
      : 0;
  }

  get totalAssetsInclHeldInTrusts(): number {
    return this.assets.length > 0
      ? this.assets.reduce((sum, a) => sum + a.Value, 0)
      : 0;
  }

  get totalAssetsExclHeldInTrusts(): number {
    return this.assets.length > 0
      ? this.assets
          .filter(a => !a.HeldInTrust)
          .reduce((sum, a) => sum + a.Value, 0)
      : 0;
  }

  get totalLiabilities(): number {
    return this.liabilities.length > 0
      ? this.liabilities.reduce((sum, l) => sum + l.Value, 0)
      : 0;
  }

  get lifeInsuranceValue(): number {
    return this.assets.length > 0
      ? this.assets
          .filter(a => a.AssetType === AssetTypeEnum.LifeInsurance)
          .reduce((sum, a) => sum + a.Value, 0)
      : 0;
  }

  get isaValue(): number {
    return this.assets.length > 0
      ? this.assets
          .filter(a => a.AssetType === AssetTypeEnum.Isa)
          .reduce((sum, a) => sum + a.Value, 0)
      : 0;
  }

  get legacyWorth(): number {
    return this.totalAssetsInclHeldInTrusts - this.totalLiabilities;
  }

  get netWorth(): number {
    return this.totalAssetsInclHeldInTrusts - this.totalLiabilities - this.lifeInsuranceValue;
  }

  get estateValueForTrustsPlanning(): number {
    return this.assets.length > 0
      ? this.assets
          .filter(a => !a.HeldInTrust && a.AssetType !== AssetTypeEnum.LifeInsurance && a.AssetType !== AssetTypeEnum.Isa)
          .reduce((sum, a) => sum + a.Value, 0) - this.totalLiabilities
      : 0;
  }

  get grossEstateValue(): number {
    return this.totalAssetsExclHeldInTrusts - this.totalLiabilities;
  }

  get totalCharitableValueExclHeldInTrusts(): number {
    return this.assets
      .filter(x => !x.HeldInTrust && x.CharityAllocatedShare !== 0)
      .reduce((sum, asset) => sum + ((asset.Value / 100) * asset.CharityAllocatedShare), 0);
  }

  get isMoreThan10PercentAllocatedToCharities(): boolean {
    return this.totalCharitableValueExclHeldInTrusts >= this.grossEstateValue * 0.1;
  }

  get inheritanceTaxRate(): number {
    return this.isMoreThan10PercentAllocatedToCharities ? 36 : 40;
  }

  get unAllocatedAssets(): boolean {
    return this.assets.some(x => !x.AllocatedToNest || !x.NestHasBeneficiaries);
  }

  get unAllocatedAssetsValue(): number {
    return this.unAllocatedAssets
      ? this.assets
          .filter(x => !x.AllocatedToNest || !x.NestHasBeneficiaries)
          .reduce((sum, x) => sum + x.Value, 0)
      : 0;
  }

  get totalSpousalValueExclHeldInTrusts(): number {
    return this.assets
      .filter(a => !a.HeldInTrust && a.SpouseAllocatedShare !== 0)
      .reduce((sum, asset) => sum + ((asset.Value / 100) * asset.SpouseAllocatedShare), 0);
  }

  get exemptionTypeSpousal(): boolean {
    return this.totalSpousalValueExclHeldInTrusts > 0;
  }

  get exemptionTypeCharity(): boolean {
    return this.totalCharitableValueExclHeldInTrusts > 0;
  }

  get exemptionTypeRNRB(): boolean {
    return this.assets
      .filter(x => !x.HeldInTrust)
      .some(x => x.ResidenceNilRateBandApplicable);
  }

  get inheritanceTaxPayable(): number {
    const totalAssetsLessSpousalConsideration = this.totalAssetsExclHeldInTrusts - this.totalSpousalValueExclHeldInTrusts;
    const totalAssetsLessSpousalAndCharityConsiderations = totalAssetsLessSpousalConsideration - this.totalCharitableValueExclHeldInTrusts;
    const nilRateBandAllowance = this.nilRateBandAllowance + this.residenceNilRateBandAllowance;

    if (totalAssetsLessSpousalAndCharityConsiderations < nilRateBandAllowance)
      return 0;

    const taxableEstate = totalAssetsLessSpousalAndCharityConsiderations - nilRateBandAllowance;

    return (taxableEstate / 100) * this.inheritanceTaxRate;
  }
}