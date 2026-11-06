/**
 * Date Utility Functions for Document and Report Formatting
 * Requirement:
 * - รูปแบบวันที่ในเอกสารเป็น วว/ดด/ปปปป (เป็นวันที่เลขตัวเดียวไม่ต้องใส่ 0 นำหน้า)
 */

export function formatDocumentDate(dateStr?: string | null): string {
  if (!dateStr || dateStr === '-') return '-';
  const trimmed = String(dateStr).trim();
  if (!trimmed || trimmed === '-') return '-';

  if (trimmed.includes('/') || trimmed.includes('-')) {
    const separator = trimmed.includes('/') ? '/' : '-';
    const parts = trimmed.split(separator);

    // Case 1: YYYY-MM-DD or YYYY/MM/DD
    if (parts.length === 3 && parts[0].length === 4) {
      const year = parts[0];
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(month)) {
        return `${day}/${month}/${year}`;
      }
    }

    // Case 2: DD/MM/YYYY or D/M/YYYY or DD-MM-YYYY
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      let year = parts[2];
      if (year.length === 2) {
        year = `25${year}`;
      }
      if (!isNaN(day) && !isNaN(month)) {
        return `${day}/${month}/${year}`;
      }
    }
  }

  // Fallback to Date object if parseable
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    const day = parsed.getDate();
    const month = parsed.getMonth() + 1;
    const year = parsed.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return trimmed;
}

export function getMonthFromDate(dateStr?: string | null): number | null {
  if (!dateStr || dateStr === '-') return null;
  const trimmed = String(dateStr).trim();
  if (!trimmed || trimmed === '-') return null;

  if (trimmed.includes('/') || trimmed.includes('-')) {
    const separator = trimmed.includes('/') ? '/' : '-';
    const parts = trimmed.split(separator);

    // YYYY-MM-DD
    if (parts.length === 3 && parts[0].length === 4) {
      const m = parseInt(parts[1], 10);
      return !isNaN(m) && m >= 1 && m <= 12 ? m : null;
    }

    // DD/MM/YYYY
    if (parts.length === 3) {
      const m = parseInt(parts[1], 10);
      return !isNaN(m) && m >= 1 && m <= 12 ? m : null;
    }
  }

  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) {
    return d.getMonth() + 1;
  }

  return null;
}
