-- Add payment-tracking columns to workshop_enquiries.
-- All new columns nullable; existing rows unaffected.
ALTER TABLE "workshop_enquiries"
  ADD COLUMN "room_type"           TEXT,
  ADD COLUMN "people_count"        INTEGER,
  ADD COLUMN "agreed_price_pp"     INTEGER,
  ADD COLUMN "early_bird_override" BOOLEAN,
  ADD COLUMN "payment_status"      TEXT,
  ADD COLUMN "accepted_at"         TIMESTAMPTZ;

-- New table for individual payment records (deposits, balances, adjustments).
CREATE TABLE "booking_payments" (
  "id"           UUID        NOT NULL DEFAULT gen_random_uuid(),
  "enquiry_id"   UUID        NOT NULL,
  "amount_pence" INTEGER     NOT NULL,
  "paid_on"      DATE        NOT NULL,
  "note"         TEXT,
  "created_at"   TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT "booking_payments_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "booking_payments_enquiry_id_fkey"
    FOREIGN KEY ("enquiry_id") REFERENCES "workshop_enquiries"("id")
    ON DELETE CASCADE
);

CREATE INDEX "booking_payments_enquiry_id_idx" ON "booking_payments"("enquiry_id");
