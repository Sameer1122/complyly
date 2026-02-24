# Complyly — Housing Tenancy Document Flow

**Author:** Emmanuel Akpakwu
**Purpose:** Exact UX duplication specification
**Target:** Duplicate [complyly-seven.vercel.app/login](https://complyly-seven.vercel.app/login) into [www.complyly.co.uk](https://www.complyly.co.uk)

---

## 1. Authentication Flow

### Step 1 — Email Entry

User enters email address.

**UI Label:**
- Input: "Email address"
- Button: "Send login code"

---

### Step 2 — OTP Verification

User enters login code.

**UI Label:**
- Button: "Verify & sign in"

**Result:**
- Authenticated session created.
- Redirect to main dashboard or upload page.

---

## 2. Upload Flow

### Step 3 — Click Upload

User clicks:
- "Upload"

---

### Step 4 — Select Document Category

**Dropdown:**
- "Document category"

**User selects:**
- "Housing / Tenancy"

---

### Step 5 — Select File

User chooses document file (PDF/DOCX).

---

### Step 6 — Start Analysis

User clicks:
- "Start Analysis"

**System Actions:**
- Upload file to storage.
- Create report record.
- Set status = `PROCESSING`.
- Begin AI analysis pipeline.

---

## 3. Processing Stage

**UI shows:**
- Processing state indicator.
- Branding header: "Complyly — Understand Where You Stand"

**When complete:**
- `status = PREVIEW_READY`
- Redirect to preview screen.

---

## 4. Locked Preview Screen

**Page Header:**
"Complyly — Understand Where You Stand"

**Display:**
- Summary overview
- Risk score
- Limited preview sections

**Blur or restrict:**
- Full clause breakdown
- Full recommendations
- Detailed red flags

**Primary CTA:**
- Button: "Unlock Full Report — £4.99"

---

## 5. Payment Flow (Stripe)

### Step 7 — Unlock

User clicks:
- "Unlock Full Report — £4.99"

**System:**
- Creates Stripe Checkout session.
- Mode: one-time payment.
- Amount: £4.99.
- Metadata includes:
  - `reportId`
  - `userId`

Redirect to Stripe Checkout.

---

### Step 8 — Payment Completion

On successful payment:
- Stripe webhook receives: `checkout.session.completed`

**Backend updates:**

```
report.isUnlocked = true
report.status = UNLOCKED
report.pricePaid = 4.99
```

User redirected back to report page.

---

## 6. Full Report Access

**Now display:**
- Full clause analysis
- Risk assessment
- Recommendations
- Action checklist

**Buttons enabled:**
- "Download Report"
- "Download PDF"

---

## 7. PDF Download Flow

User clicks:
- "Download Report"
- "Download PDF"

**System:**
- Generates PDF version of full report.
- Returns downloadable file.

**Access rule:**
If `report.isUnlocked !== true` → return `403`.

---

## 8. Dashboard

User clicks:
- "Dashboard"

**Display:**
- List of uploaded reports
- Category
- Date
- Risk score
- Unlock status
- View / Download buttons

**Reports are filtered by:**

```
report.userId = session.userId
```

---

## 9. Required State Machine

**Report lifecycle:**

```
UPLOADED
→ PROCESSING
→ PREVIEW_READY
→ PAYMENT_PENDING
→ UNLOCKED
→ PDF_READY
```

Unlock must only occur after verified Stripe webhook.

---

## 10. Required Backend Endpoints

```
POST /api/auth/send-code
POST /api/auth/verify-code
POST /api/report/create
POST /api/report/analyse
GET  /api/report/:id
POST /api/stripe/create-checkout-session
POST /api/stripe/webhook
GET  /api/dashboard/reports
GET  /api/report/:id/pdf
```

---

## 11. Stripe Requirements

**Product:**
- "Complyly Report Unlock"

**Price:**
- £4.99
- Mode: `payment` (not subscription)

**Webhook Events:**
- `checkout.session.completed`

Unlock must **NOT** rely on success URL.

---

## 12. Non-Negotiable Rules

- User must be authenticated before upload.
- Report ownership tied to `userId`.
- Unlock only via verified webhook.
- Locked preview must show value but restrict full access.
- PDF only accessible when `report.isUnlocked = true`.

---

## Implementation Requirements

### Tech Stack
- **Framework:** Next.js (App Router)
- **Deployment:** Vercel
- **Payments:** Stripe

### Expected Next.js Structure

```
app/upload
app/preview/[id]
app/report/[id]
app/dashboard
app/api/stripe/create-checkout-session
app/api/stripe/webhook
app/api/report/* (create/analyse/get/pdf)
```

### UX Flow (must match exactly)

Login (email code) → Upload → Select Category (Housing/Tenancy) → Start Analysis → Processing → Locked Preview → "Unlock Full Report — £4.99" → Full Report → Download PDF → Dashboard.

### Non-Negotiable Technical Requirements

1. **Unlock only via Stripe webhook** (`checkout.session.completed`) with signature verification.
   - Do not unlock using the success URL redirect.
2. **One-time payment only** (£4.99) using Checkout mode `payment`.
3. **Route guards / entitlement checks**
   - Full report + PDF endpoints must require `report.isUnlocked === true` and ownership (`report.userId === session.userId`).
4. **Report lifecycle state machine**
   - `UPLOADED → PROCESSING → PREVIEW_READY → PAYMENT_PENDING → UNLOCKED → PDF_READY`
5. **Idempotency**
   - Webhook handler must be idempotent (safe if Stripe retries).
6. **Secrets in env only**
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (and storage keys if applicable).

### Deliverables

- Repo / branch with code
- Environment variable list
- Webhook endpoint URL + event list configured in Stripe
- Test proof (Stripe test payment → webhook received → report unlocked → PDF downloadable)
- Notes on where analysis pipeline and PDF generation run

> If anything conflicts with Vercel limits (file size, function runtime, etc.), flag it immediately and propose the correct approach (Blob/R2 + background processing).
