export function getInitials(name: string) {
  const words = name.trim().split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
  return initials;
}
