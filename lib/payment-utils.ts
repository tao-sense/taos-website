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
  // A £0 total (e.g. an agreed work-exchange fee) has nothing left to pay
  if (totalDuePence >= 0 && totalPaidPence >= totalDuePence) return "paid_in_full";
  if (depositDuePence > 0 && totalPaidPence >= depositDuePence) return "deposit_paid";
  return "unpaid";
}

export interface BookingTotals {
  pricePp: number;        // effective price per person (agreed fee, else advertised)
  totalDue: number;
  depositDue: number;
  totalPaid: number;
  outstanding: number;    // may be negative if overpaid
  status: DerivedPaymentStatus;
}

// Single place for the money maths used by the detail panel, the list and the summary.
// An agreed fee (fee_override_pp) replaces the advertised price outright — the early
// bird is already reflected in agreed_price_pp and is not applied on top of it.
// Returns null until the booking has been set up (no advertised price locked yet).
export function bookingTotals(b: {
  agreedPricePp: number | null;
  feeOverridePp: number | null;
  peopleCount: number | null;
  depositPerPersonPence: number;
  paymentsPence: number[];
  manualStatus: string | null;
}): BookingTotals | null {
  if (b.agreedPricePp == null) return null;
  const people = b.peopleCount ?? 1;
  const pricePp = b.feeOverridePp ?? b.agreedPricePp;
  const totalDue = pricePp * people;
  // £200 per person, unless the whole booking costs less than that
  const depositDue = Math.min(b.depositPerPersonPence * people, totalDue);
  const totalPaid = b.paymentsPence.reduce((t, p) => t + p, 0);
  return {
    pricePp,
    totalDue,
    depositDue,
    totalPaid,
    outstanding: totalDue - totalPaid,
    status: derivePaymentStatus(b.manualStatus, totalPaid, totalDue, depositDue),
  };
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
