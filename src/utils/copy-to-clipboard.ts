export const copyToClipboard = (value: string | undefined) => {
  if (!value) return;
  navigator.clipboard.writeText(value);
};
