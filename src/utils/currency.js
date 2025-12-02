export function formatVND(value) {
  if (value == null || isNaN(value)) return '';
  // Round to nearest integer VND (no decimals)
  const amount = Math.round(Number(value));
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
}

export default formatVND;
