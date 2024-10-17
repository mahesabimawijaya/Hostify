export function toRupiah(number: number): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(number);
}
