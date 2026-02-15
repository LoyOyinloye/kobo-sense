// ============================================
// KoboSense — CSV Parser
// ============================================

/**
 * Parse a CSV string into structured transactions.
 * Handles various Nigerian bank CSV formats.
 */
export function parseCSV(csvText) {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) {
        throw new Error("We couldn't read that file. It seems empty.");
    }

    const delimiter = detectDelimiter(lines[0]);
    const rows = lines.map(line => parseCSVLine(line, delimiter));

    const headerRow = rows[0].map(h => h.toLowerCase().trim());
    const mapping = detectColumnMapping(headerRow);

    if (!mapping) {
        throw new Error("We couldn't recognize the columns in this file. Make sure it has Date, Description, and Amount columns.");
    }

    const transactions = [];

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length < 3) continue;

        try {
            const txn = extractTransaction(row, mapping);
            if (txn && txn.amount > 0) {
                txn.id = `txn-${i}`;
                transactions.push(txn);
            }
        } catch (e) {
            // Skip malformed rows silently
            continue;
        }
    }

    if (transactions.length === 0) {
        throw new Error("We found the file, but couldn't extract any transactions. Try a different format.");
    }

    // Sort by date descending
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    return transactions;
}

function detectDelimiter(headerLine) {
    const delimiters = [',', '\t', ';', '|'];
    let bestDelimiter = ',';
    let maxCount = 0;

    for (const d of delimiters) {
        const count = (headerLine.match(new RegExp(escapeRegex(d), 'g')) || []).length;
        if (count > maxCount) {
            maxCount = count;
            bestDelimiter = d;
        }
    }

    return bestDelimiter;
}

function parseCSVLine(line, delimiter) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === delimiter && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

function detectColumnMapping(headers) {
    const mapping = {};

    for (let i = 0; i < headers.length; i++) {
        const h = headers[i];

        if (/date|trans.*date|posting.*date|value.*date/i.test(h)) {
            mapping.date = i;
        } else if (/desc|narration|particular|detail|remark|reference/i.test(h)) {
            if (mapping.description === undefined) mapping.description = i;
        } else if (/^debit$|debit.*amount|dr/i.test(h)) {
            mapping.debit = i;
        } else if (/^credit$|credit.*amount|cr/i.test(h)) {
            mapping.credit = i;
        } else if (/^amount$/i.test(h) && mapping.debit === undefined) {
            mapping.amount = i;
        } else if (/type|dr.cr|transaction.*type/i.test(h)) {
            mapping.type = i;
        }
    }

    // Need at minimum: date, description, and some amount
    if (mapping.date === undefined || mapping.description === undefined) {
        return null;
    }
    if (mapping.debit === undefined && mapping.credit === undefined && mapping.amount === undefined) {
        return null;
    }

    return mapping;
}

function extractTransaction(row, mapping) {
    const rawDate = row[mapping.date] || '';
    const rawDesc = row[mapping.description] || '';

    const date = parseDate(rawDate);
    if (!date) return null;

    const description = sanitiseDescription(rawDesc);
    if (!description) return null;

    let amount = 0;
    let type = 'debit';

    if (mapping.debit !== undefined && mapping.credit !== undefined) {
        const debitVal = parseAmount(row[mapping.debit]);
        const creditVal = parseAmount(row[mapping.credit]);

        if (creditVal > 0) {
            amount = creditVal;
            type = 'credit';
        } else {
            amount = debitVal;
            type = 'debit';
        }
    } else if (mapping.amount !== undefined) {
        amount = parseAmount(row[mapping.amount]);

        if (mapping.type !== undefined) {
            const t = (row[mapping.type] || '').toLowerCase().trim();
            type = /cr|credit|c/i.test(t) ? 'credit' : 'debit';
        } else {
            type = amount < 0 ? 'debit' : 'credit';
            amount = Math.abs(amount);
        }
    }

    return { date, description, amount, type, originalDesc: rawDesc.trim() };
}

function parseDate(str) {
    if (!str || str.trim() === '') return null;

    str = str.trim().replace(/['"]/g, '');

    const formats = [
        /^(\d{4})-(\d{1,2})-(\d{1,2})/,      // 2025-10-01
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})/,      // 01/10/2025 or 1/10/2025
        /^(\d{1,2})-(\d{1,2})-(\d{4})/,        // 01-10-2025
        /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/,     // 01/10/25
    ];

    // Try ISO format first
    const d = new Date(str);
    if (!isNaN(d.getTime()) && d.getFullYear() > 2000) {
        return d.toISOString().split('T')[0];
    }

    // DD/MM/YYYY (common in Nigeria)
    const ddmmyyyy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (ddmmyyyy) {
        const [, day, month, year] = ddmmyyyy;
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }
    }

    return null;
}

function parseAmount(str) {
    if (!str || str.trim() === '' || str.trim() === '-') return 0;
    const cleaned = str.replace(/[₦,\s"'NGN]/g, '').trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
}

/**
 * Clean up transaction descriptions by removing banking noise
 */
function sanitiseDescription(desc) {
    if (!desc) return '';

    // Remove common banking prefixes/noise  
    let clean = desc
        .replace(/^(TRF|NEFT|NIP|USSD|MC|POS|ATM|WEB|MOB|FT)\s*[-\/:]?\s*/gi, '')
        .replace(/\b(TRF|NEFT|NIP|USSD)\b/gi, '')
        .replace(/\bF[IT]\d+\b/gi, '')
        .replace(/\b\d{10,}\b/g, '')         // Remove long account numbers
        .replace(/\b[A-Z]{2,3}\d{6,}\b/g, '') // Remove reference codes
        .replace(/\s{2,}/g, ' ')
        .trim();

    // Title case if all uppercase
    if (clean === clean.toUpperCase() && clean.length > 3) {
        clean = clean.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    }

    return clean || desc.trim();
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
