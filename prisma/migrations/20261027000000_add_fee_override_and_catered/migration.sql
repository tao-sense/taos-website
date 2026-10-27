-- Agreed fee override + catered flag on workshop_enquiries.
-- Additive only: two nullable columns and one defaulted column.
-- Existing rows: no fee override (advertised pricing unchanged), catered = true.
ALTER TABLE "workshop_enquiries"
  ADD COLUMN "fee_override_pp"     INTEGER,
  ADD COLUMN "fee_override_reason" TEXT,
  ADD COLUMN "catered"             BOOLEAN NOT NULL DEFAULT true;
