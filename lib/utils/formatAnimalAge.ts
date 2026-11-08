type Locale = string;

export function formatAnimalAge(
  baseAgeInMonths: number,
  createdAt: string,
  locale: Locale = "en",
): string {
  if (baseAgeInMonths == null || isNaN(baseAgeInMonths) || !createdAt) {
    return "";
  }

  const createdDate = new Date(createdAt);
  const now = new Date();
  const yearsDiff = now.getFullYear() - createdDate.getFullYear();
  const monthsDiff = now.getMonth() - createdDate.getMonth();
  const monthsPassed = yearsDiff * 12 + monthsDiff;
  const currentTotalMonths = Math.max(0, baseAgeInMonths + monthsPassed);
  const years = Math.floor(currentTotalMonths / 12);
  const months = currentTotalMonths % 12;

  if (locale === "pt") {
    if (years === 0) {
      return `${months} ${months === 1 ? "mês" : "meses"} de idade`;
    }

    if (months === 0) {
      return `${years} ${years === 1 ? "ano" : "anos"} de idade`;
    }

    return `${years} ${years === 1 ? "ano" : "anos"} e ${months} ${
      months === 1 ? "mês" : "meses"
    } de idade`;
  }

  if (years === 0) {
    return `${months} ${months === 1 ? "month" : "months"} old`;
  }

  if (months === 0) {
    return `${years} ${years === 1 ? "year" : "years"} old`;
  }

  return `${years} ${years === 1 ? "year" : "years"} and ${months} ${
    months === 1 ? "month" : "months"
  } old`;
}
