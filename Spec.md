

# Product Requirements Document (PRD)
**Project Name:** KoboSense
**Version:** 1.0 (MVP)
**Status:** Draft
**Target Market:** Nigeria / Pan-Africa

---

## 1. Executive Summary
**KoboSense** is a privacy-first personal finance management (PFM) application designed to give users clarity on their financial health without requiring sensitive banking login credentials. By utilizing PDF/CSV statement uploads, the app analyzes spending patterns, categorizes transactions using local context, and provides actionable insights to improve financial well-being.

### Core Value Proposition
*   **Privacy First:** No bank API integration required. "We analyze, we don’t touch."
*   **Hyper-Local:** Categorization engine trained on African vendors (e.g., Bolt, Jumia, Shoprite, OPay transfers, Local Eateries).
*   **Actionable:** Moves beyond tracking to providing a "Financial Health Score" and specific improvement advice.

---

## 2. Target Audience (User Personas)
1.  **The Young Professional (23-35):** Earns a salary, uses multiple fintech apps (PiggyVest, Cowrywise, GTBank), feels money is "disappearing" but doesn't know where.
2.  **The Gig Worker/Freelancer:** Irregular income, needs to separate business expenses from personal life.
3.  **The Skeptic:** Wary of linking bank accounts to apps due to fraud fears; prefers a file-upload method.

---

## 3. Design & Interface Principles
*   **Vibe:** Calm, Trustworthy, Intelligent, Respectful.
*   **Visual Language:**
    *   **Palette:** Deep Forest Green (Growth), Navy Blue (Trust), Soft Cream/Off-White (Backgrounds). Avoid "danger red" unless critical; use "alert orange" instead.
    *   **Typography:** Large, legible sans-serif (e.g., SF Pro or Inter). High contrast for readability.
    *   **Layout:** Generous whitespace. Card-based UI. No clutter.
*   **Interaction:** Smooth transitions (Skeleton loaders during parsing). Haptic feedback on success states.

### 3.1 Web & PWA Considerations
*   **Responsive Design:** Must behave like a native app on mobile browsers.
*   **Offline Capability:** Use TWA/PWA standards to allow users to view past reports without internet.
*   **Client-Side Privacy:** Emphasize that files are processed in-browser where possible (using WASM/JS libraries) to reinforce the privacy promise.

---

## 4. Functional Requirements & User Flow

### Phase 1: Onboarding & Trust Building

#### **Screen 1: Welcome**
*   **UI Elements:** Minimalist hero image (abstract chart or calm illustration).
*   **Copy:**
    *   Headline: "Understand your money. Clearly."
    *   Subtext: "Upload your bank statement. Get real insights in minutes."
    *   CTA Button: "Get Started" (Full width, bottom).
*   **Requirement:** App loads instantly. No login required immediately (Guest mode initially, account creation deferred until value is shown, or standard email sign-up if data persistence is needed immediately).

#### **Screen 2: Privacy & Trust (Critical)**
*   **Goal:** Overcome the "Nigerian Trust Deficit."
*   **UI Elements:** Shield icon animation.
*   **Copy:**
    *   "We do not move money. We only analyze."
    *   "Bank-grade encryption standard (AES-256)."
    *   "No bank passwords required."
*   **Action:** "Accept & Continue."

#### **Screen 3: Bank Context Selection**
*   **UI Elements:** Grid of logos (GTBank, Zenith, Access, UBA, Kuda, OPay, Moniepoint).
*   **Functionality:**
    *   User selects primary bank.
    *   *Logic:* This selection loads the specific parsing template (Regex) for that bank's specific PDF layout.
    *   Multi-select allowed.

---

### Phase 2: Ingestion & Intelligence

#### **Screen 4: Statement Upload**
*   **UI Elements:**
    *   Large "Drag & Drop" zone or "Tap to Upload" button.
    *   Helper text: "Supports PDF or CSV (Max 5MB)."
    *   Link: "How to download your statement?" (Tooltip tutorial).
*   **Edge Cases:** File password protection. (If PDF is password locked, prompt user for password locally to unlock before sending/parsing).

#### **Screen 5: The "Magic" (Parsing Progress)**
*   **UI Elements:**
    *   Lottie animation (Scanning document).
    *   Dynamic Text: "Reading transaction dates..." -> "Categorizing vendors..." -> "Calculating health score..."
*   **Backend Logic:**
    *   **OCR/Parsing:** Extract Date, Description, Amount, Debit/Credit.
    *   **Sanitization:** Remove "TRF", "NEFT", "USSD" noise from descriptions.
    *   **Categorization:** Match keywords against local database (e.g., "EKO DISCO" = Utilities, "TOTAL FILLING" = Transport).

---

### Phase 3: Review & Verification

#### **Screen 6: Review Transactions**
*   **UI Elements:**
    *   List view.
    *   Left side: Vendor Icon (auto-generated).
    *   Right side: Amount (Red for debit, Green for credit).
    *   Tag pill: Current Category.
*   **Interaction:**
    *   User sees a transaction labeled "Unknown."
    *   User taps and reassigns to "Food."
    *   *Machine Learning:* App asks "Apply this rule to all future transactions from this vendor?"

---

### Phase 4: The Dashboard (Core Experience)

#### **Screen 7: Overview Dashboard**
*   **Header:** "Month of [Month Name]" dropdown.
*   **Cards:**
    1.  **Net Position:** Income vs. Spend (Bar comparison).
    2.  **Savings Rate:** (Income - Spend) / Income %.
    3.  **Financial Health Score:** 0-100 score (Gauge visual).
*   **UX Note:** Numbers should use localized formatting (e.g., ₦150,000.00).

#### **Screen 8 & 9: Spending Breakdown & Details**
*   **Visual:** Donut chart.
    *   *Interaction:* Tapping a slice isolates that category.
*   **Category Logic:**
    *   Essentials (Rent, Food, Transport).
    *   Lifestyle (Data, Entertainment, Eating Out).
    *   Financials (Loan repayments, Bank charges).
*   **Insight Note:** Dynamic text below chart: "Transport costs increased 28% compared to last month."

---

### Phase 5: Behavioral Analysis

#### **Screen 10: Savings Overview**
*   **Logic:** Identify transfers to known savings apps (PiggyVest, Cowrywise) or generic internal transfers and classify as savings, not spending.
*   **Visual:** "You saved ₦50,000 this month."
*   **Comparison:** "That is top 10% for your income bracket" (if data available) or "Recommended: 20%".

#### **Screen 11: Financial Health Score Detail**
*   **Gamification:**
    *   Score: 72/100 (Healthy).
    *   **What helped:** "High savings rate", "Low debt repayments."
    *   **What hurt:** "High eating out expense."

---

### Phase 6: Actionable Insights

#### **Screen 12: Insights Feed**
*   **Format:** Scrollable cards (Instagram story style or vertical feed).
*   **Recommendation Engine Logic:**
    *   *Rule:* If 'Data/Airtime' > 5% of income -> Suggest: "Your data spend is high. Have you considered a monthly WiFi plan?"
    *   *Rule:* If 'Bank Charges' > ₦2,000 -> Suggest: "You paid high fees this month. Try limiting withdrawals."
    *   *Rule:* If 'Rent' > 30% of income -> Warning: "Rent is putting pressure on your budget."

---

### Phase 7: Export

#### **Screen 13: Report Export**
*   **Function:** Generates a branded, high-resolution PDF.
*   **Use Case:** User applies for a visa or loan and needs a summarized "Proof of funds" or "Financial discipline" document (unofficial but useful).
*   **Share:** Native iOS/Android share sheet (WhatsApp, Email).

---

## 5. Technical Requirements

### 5.1 Technology Stack
*   **Frontend (Web/PWA):** Vite (React or Vanilla JS) - For a responsive, installable web application.
*   **Backend:** Python (FastAPI or Django) - For heavy OCR tasks if needed, but primary parsing preferred client-side.
*   **Database:** PostgreSQL (Transactional) / IndexedDB (Local).
*   **Security:**
    *   Data is processed in memory (RAM) where possible.
    *   If stored, data is encrypted at rest.
    *   Option to "Wipe Data" instantly from app settings.

### 5.2 Parsing Engine Capabilities
*   Must handle **Password Protected PDFs** (Prompt user for password).
*   Must handle **Scanned Images** (OCR integration via Tesseract or AWS Textract if budget allows, though text-based PDF parsing is cheaper/faster).
*   **Currency Support:** Primary NGN, Secondary USD/GBP (for domiciliary accounts).

### 5.3 Data Models (Core)

#### Transaction Schema
```json
{
  "id": "uuid-v4",
  "date": "2023-10-27T14:30:00Z",
  "amount": 5000.00,
  "currency": "NGN",
  "description": "UBER TRIP LAGOS NG",
  "clean_merchant": "Uber",
  "category": "Transport",
  "type": "debit"
}
```

#### Category Rules Schema
```json
{
  "id": "cat_transport",
  "name": "Transport",
  "keywords": ["uber", "bolt", "total", "shell", "oando"],
  "is_essential": true
}
```

### 5.4 API Interface (Draft)

#### `POST /api/v1/parse/statement`
- **Purpose:** Upload PDF for server-side parsing (fallback).
- **Body:** `multipart/form-data` (`file`).
- **Response:** `{ "status": "success", "transactions": [...] }`

#### `GET /api/v1/analytics/health`
- **Purpose:** Get calculated health score components.
- **Response:** `{ "score": 78, "insights": [...] }`

---

## 6. Success Metrics (KPIs)

| Metric | Definition | Goal (MVP) |
| :--- | :--- | :--- |
| **Parsing Success Rate** | % of uploaded PDFs successfully converted to structured data | > 90% |
| **Categorization Accuracy** | % of transactions not manually edited by user | > 80% |
| **Time to Insight** | Time from "Upload Click" to "Dashboard View" | < 15 Seconds |
| **Share Rate** | % of users who export/share a report | 15% |
| **Retention** | % of users returning next month to upload a new statement | 40% |

---

## 7. Roadmap to "Robust"

*   **MVP (Now):** PDF Upload, Parsing, Basic Categorization, Health Score.
*   **V1.5:** Manual Transaction Entry (for cash spends).
*   **V2.0:** Budgeting (Set limits per category).
*   **V3.0:** "Black Tax" Calculator & Inflation Adjuster (Real value of money).

---

## 8. Copywriting Tone Guide (Examples)

*   **Avoid:** "Error 404", "Invalid File", "You spent too much."
*   **Use:** "We couldn't read that file. Try a clear PDF.", "This file type isn't supported yet.", "Dining out took up a large slice of the pie this month."

---

## 9. Privacy Policy Summary (For User reassurance)
> "Your bank statement is yours. We process it to show you the picture, then we lock the door. We do not sell your transaction data to advertisers."