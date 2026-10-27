// Pricing config keyed by Workshop.id.
// Imported by the public retreat page AND the admin payment panel — single source of truth.
// Add a new entry here when a new retreat is created.

export interface WorkshopPricing {
  singleFullPence: number;
  sharedFullPence: number;
  earlyBirdDiscountPence: number;
  earlyBirdDeadline: Date;   // registrations on or before this date qualify for EB pricing
  depositPence: number;      // deposit per person
  balanceDueDaysBefore: number; // days before workshop start the balance is due
  startDate: Date;           // workshop start (for balance-due calculation)
}

// Powys, 11–14 Feb 2027 — Tantra Massage Seminar
const POWYS_2027_ID = "cmudsv18m0000id04441fotyp";

export const WORKSHOP_PRICING: Record<string, WorkshopPricing> = {
  [POWYS_2027_ID]: {
    singleFullPence:       92000,  // £920
    sharedFullPence:       72000,  // £720
    earlyBirdDiscountPence: 5000,  // £50
    earlyBirdDeadline:     new Date("2026-10-31T23:59:59Z"),
    depositPence:          20000,  // £200
    balanceDueDaysBefore:  42,     // six weeks → 31 Dec 2026
    startDate:             new Date("2027-02-11"),
  },
};

// Running costs per workshop, used for the admin profit summary.
export interface WorkshopCosts {
  venueHirePence: number;          // fixed, total
  cateringPerPersonPence: number;  // per catered participant
  advertisingTravelPence: number;  // fixed, total
}

export const WORKSHOP_COSTS: Record<string, WorkshopCosts> = {
  [POWYS_2027_ID]: {
    venueHirePence:         390000,  // £3,900 — includes the £1,170 venue deposit
    cateringPerPersonPence:  13500,  // £135 per catered participant
    advertisingTravelPence:  25000,  // £250
  },
};

// Helpers -------------------------------------------------------------------

export function getWorkshopCosts(workshopId: string): WorkshopCosts | null {
  return WORKSHOP_COSTS[workshopId] ?? null;
}

export function getWorkshopPricing(workshopId: string): WorkshopPricing | null {
  return WORKSHOP_PRICING[workshopId] ?? null;
}

export function isEarlyBirdEligible(
  workshopId: string,
  registeredAt: Date | null | undefined
): boolean {
  const cfg = getWorkshopPricing(workshopId);
  if (!cfg || !registeredAt) return false;
  return new Date(registeredAt) <= cfg.earlyBirdDeadline;
}

export function pricePerPersonPence(
  workshopId: string,
  roomType: "single" | "shared",
  earlyBird: boolean
): number {
  const cfg = getWorkshopPricing(workshopId);
  if (!cfg) return 0;
  const full = roomType === "single" ? cfg.singleFullPence : cfg.sharedFullPence;
  return earlyBird ? full - cfg.earlyBirdDiscountPence : full;
}

export function balanceDueDate(cfg: WorkshopPricing): Date {
  const d = new Date(cfg.startDate);
  d.setDate(d.getDate() - cfg.balanceDueDaysBefore);
  return d;
}
