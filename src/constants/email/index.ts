export const dexEmail = "invest@dex223.io";
export const mediaEmail = "media@dex223.io";

function getEmailLink(email: string) {
  return `mailto:${email}`;
}
export const dexEmailLink = getEmailLink(dexEmail);
export const mediaEmailLink = getEmailLink(mediaEmail);

