export function formatCurrency(value: string | number): string {
  const signal: string = Number(value) < 0 ? "-" : "";

  value = String(value).replace(/\D/g, "");

  return signal + "R$ " + String(Number(Number(value) / 100).toFixed(2).toString().replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
};

export function formatAmount(value: string | number): number {
  if(String(value).includes(",") || String(value).includes(".")) {
    value = String(value).replace(/\,/g, "").replace(/\./g, "");
  } else {
    value = String(value).replace(/\,/g, "").replace(/\./g, "");
    value = Number(value) * 100;
  }

  return Number(Math.round(Number(value)));
};