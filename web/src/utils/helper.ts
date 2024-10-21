export function toRupiah(number: number): string {
  const roundedNumber = Math.round(number / 1000) * 1000;
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundedNumber);
}
