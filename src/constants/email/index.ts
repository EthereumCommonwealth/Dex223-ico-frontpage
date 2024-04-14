export const dexEmail = "purchase@dex223.io";
export const mediaEmail = "media@dex223.io";
export const privacyEmail = "privacy@dex223.io";
export const legalEmail = "legal@dex223.io";

function getEmailLink(email: string) {
  return `mailto:${email}`;
}
export const dexEmailLink = getEmailLink(dexEmail);
export const mediaEmailLink = getEmailLink(mediaEmail);
export const privacyEmailLink = getEmailLink(privacyEmail);
export const legalEmailLink = getEmailLink(legalEmail);

