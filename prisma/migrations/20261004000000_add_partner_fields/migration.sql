-- Add partner fields to workshop_enquiries
-- Populated only when two people register together as a couple.
-- All columns are nullable; solo registrations leave them NULL.

ALTER TABLE "workshop_enquiries"
  ADD COLUMN "partner_name"         TEXT,
  ADD COLUMN "partner_age"          INTEGER,
  ADD COLUMN "partner_height_cm"    INTEGER,
  ADD COLUMN "partner_weight_kg"    INTEGER,
  ADD COLUMN "partner_health_notes" TEXT;
