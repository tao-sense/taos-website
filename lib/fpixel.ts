export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

declare global {
  interface Window {
    fbq: (
      type: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

function fbq(
  type: string,
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq(type, eventName, params);
}

export function pageview() {
  fbq("track", "PageView");
}

export function trackWorkshopEnquiry(workshopId?: string) {
  fbq("track", "Lead", {
    content_name: "Workshop Enquiry",
    content_category: "Workshop",
    ...(workshopId ? { content_ids: [workshopId] } : {}),
  });
}

export function trackContact() {
  fbq("track", "Contact");
}

export function trackSubscribe() {
  fbq("track", "Subscribe");
}

export function trackViewContent(contentName: string, category?: string) {
  fbq("track", "ViewContent", {
    content_name: contentName,
    ...(category ? { content_category: category } : {}),
  });
}
