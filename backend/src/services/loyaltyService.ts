/**
 * Loyalty Points Rules:
 * 1 Yatra Point = NPR 0.10
 * Earning: 10% of final paid booking amount
 * Redemption: Points * 0.10
 */

export const calculatePointsEarned = (paidAmount: number): number => {
  // Earn 10% of the paid amount
  // Example: NPR 1000 -> 100 points
  return Math.floor(paidAmount * 0.1);
};

export const calculateRedemptionValue = (points: number): number => {
  // 1 point = NPR 0.10
  // Example: 100 points -> NPR 10
  return points * 0.1;
};

export const calculatePointsNeededForDiscount = (discountNpr: number): number => {
  // NPR 10 -> 100 points
  return discountNpr / 0.1;
};
