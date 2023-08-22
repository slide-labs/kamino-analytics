export const formatTextTransaction = (type: string) => {
  if (type === "depositAndInvest") {
    return "DEPOSIT AND INVEST";
  }

  return type;
};
