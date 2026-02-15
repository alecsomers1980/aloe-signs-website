/**
 * Format a number as South African Rand currency
 * Uses consistent formatting to avoid hydration errors
 */
export function formatPrice(amount: number): string {
    // Use en-ZA locale for consistent South African formatting
    return amount.toLocaleString('en-ZA', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

/**
 * Format a number with spaces as thousands separator (South African style)
 * This is a simpler alternative that avoids locale issues
 */
export function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
