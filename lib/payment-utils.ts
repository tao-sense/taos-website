export type DerivedPaymentStatus =
  | "unpaid"
  | "deposit_paid"
  | "paid_in_full"
  | "refunded"
  | "cancelled";

export function derivePaymentStatus(
  manualStatus: string | null | undefined,
  totalPaidPence: number,
  totalDuePence: number,
  depositDuePence: number,
): DerivedPaymentStatus {
  if (manualStatus === "refunded") return "refunded";
  if (manualStatus === "cancelled") return "cancelled";
  if (totalDuePence > 0 && totalPaidPence >= totalDuePence) return "paid_in_full";
  if (depositDuePence > 0 && totalPaidPence >= depositDuePence) return "deposit_paid";
  return "unpaid";
}

export const PAYMENT_STATUS_LABELS: Record<DerivedPaymentStatus, string> = {
  unpaid:       "Unpaid",
  deposit_paid: "Deposit paid",
  paid_in_full: "Paid in full",
  refunded:     "Refunded",
  cancelled:    "Cancelled",
};

export const PAYMENT_STATUS_COLOURS: Record<DerivedPaymentStatus, string> = {
  unpaid:       "bg-red-100 text-red-800",
  deposit_paid: "bg-yellow-100 text-yellow-800",
  paid_in_full: "bg-green-100 text-green-800",
  refunded:     "bg-purple-100 text-purple-800",
  cancelled:    "bg-gray-200 text-gray-600",
};

export function pence2gbp(pence: number): string {
  return `£${(pence / 100).toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
