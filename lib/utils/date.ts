type CurrentDateTypes = "year" | "month" | "day";

export function CurrentDate(option: CurrentDateTypes) {
  const parts = new Date().toISOString().split("T")[0].split("-");

  if (option === "year") return parts[0];
  if (option === "month") return parts[1];
  if (option === "day") return parts[2];

  return parts.join("-");
}
