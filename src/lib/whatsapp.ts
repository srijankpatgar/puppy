import { siteConfig } from "@/config/site";

/**
 * Generates a direct WhatsApp click-to-chat URL with optional pre-filled message.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const baseNumber = siteConfig.contact.whatsappNumber;
  const message =
    customMessage ||
    "Hi Insta Biz Web, I'd like to discuss a project.";
  return `https://wa.me/${baseNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a pre-filled WhatsApp message for a specific puppy enquiry.
 */
export function getPuppyEnquiryUrl(puppyName: string, breed: string, slug: string): string {
  const message = `Hi TeddyPups! I'm interested in ${puppyName} (${breed}) - ${siteConfig.url}/puppies/${slug}. Is this puppy still available?`;
  return getWhatsAppUrl(message);
}
