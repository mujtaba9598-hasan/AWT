# Project Architecture & Technical Documentation
**Al Wahab Trust - Financial Transparency Portal & Android App**

This document provides a comprehensive A-to-Z overview of the project structure, design rules, privacy controls, and files to make it easy for any developer or agent to understand, run, and extend the system.

---

## 1. Project Overview & Architecture
The system consists of two parts:
1. **Core Web Application:** A client-side Single Page Application (SPA) built using HTML5, CSS3 (Vanilla), and Vanilla JavaScript.
2. **Android Application Wrapper:** A native Android shell built with Kotlin and Jetpack Compose that hosts a full-screen, offline-capable `WebView` rendering the local web assets.

### Key Architectural Concepts:
- **Offline Persistence:** The application does not require a database server. It stores the transactional database in the browser's `localStorage` (which translates to the WebView's private storage on the mobile device).
- **Seed Data Fallback:** If `localStorage` is empty, the application seeds itself using the pre-compiled transactions in `data.js`.
- **Responsive Layout:** The design is fully mobile-first, replacing standard web page layouts (like data tables) with swipe-friendly card lists, floating tabs, and slide-up bottom sheets.
- **RTL & Bilingual Translation:** The app translates dynamically on-the-fly between English (LTR) and Urdu (RTL) Noto Nastaliq script.

---

## 2. Directory Structure & File Registry

### Root Workspace Files (Web Assets)
All paths are relative to the root directory `c:\Users\Mujtaba Hasan\Downloads\AWT\`:

- **[index.html](file:///c:/Users/Mujtaba%20Hasan/Downloads/AWT/index.html)**
  - *Description:* Entry point containing the single-page layout structure. Contains screen containers divided into navigation tabs (Ledger, Analytics, Stats, Settings) and templates for slide-up bottom sheets, modal receipts, and the full-screen admin PIN pad.
- **[style.css](file:///c:/Users/Mujtaba%20Hasan/Downloads/AWT/style.css)**
  - *Description:* Theme styles containing custom HSL color variables (Emerald, Mint, Coral, Bronze), fluid layout rules, responsive media queries, active bottom nav styling, transaction cards design, slide-up animations, and RTL overrides for Urdu.
- **[app.js](file:///c:/Users/Mujtaba%20Hasan/Downloads/AWT/app.js)**
  - *Description:* Core application logic. Manages SPA screen routing, state objects, search filters, card rendering templates, Chart.js integrations, backup JSON/CSV exporters/importers, and modal/bottom-sheet triggers.
- **[data.js](file:///c:/Users/Mujtaba%20Hasan/Downloads/AWT/data.js)**
  - *Description:* Recompiled database file. Declares the `INITIAL_TRANSACTIONS` seed array (137 historical entries) and the `AVAILABLE_RECEIPTS` registry.
- **[data/](file:///c:/Users/Mujtaba%20Hasan/Downloads/AWT/data/)**
  - *Description:* Directory containing the physical scanned receipt images (`.jpeg` or `.jpg`).
- **[data_extracted.json](file:///c:/Users/Mujtaba%20Hasan/Downloads/AWT/data_extracted.json)**
  - *Description:* Intermediate parsed JSON dump of the trust's original Excel spreadsheet.

### Android Project Files
All paths are relative to the Android directory `c:\Users\Mujtaba Hasan\Downloads\AWT\android\`:

- **[AndroidManifest.xml](file:///c:/Users/Mujtaba%20Hasan/Downloads/AWT/android/app/src/main/AndroidManifest.xml)**
  - *Description:* Android app manifest. Modified to declare `android.permission.INTERNET` to allow external font loading and script dependencies.
- **[MainActivity.kt](file:///c:/Users/Mujtaba%20Hasan/Downloads/AWT/android/app/src/main/java/com/example/alwahabtrust/MainActivity.kt)**
  - *Description:* Primary launcher activity. Uses Jetpack Compose's `AndroidView` to instantiate a fullscreen `WebView`. Enables JavaScript, local file access, DOM storage, and intercepts system back button presses to navigate web history internally instead of exiting the app.
- **[assets/](file:///c:/Users/Mujtaba%20Hasan/Downloads/AWT/android/app/src/main/assets/)**
  - *Description:* Location where the web assets (`index.html`, `style.css`, `app.js`, `data.js`, and `data/` receipt images folder) are bundled inside the APK.

---

## 3. Privacy & Visibility Rules (Requested Specifications)

To respect donor anonymity and ensure secure accounting, the application implements strict data visibility rules:

### A. Intake (Donations) Visibility
- **Public View:**
  - Donor names are **masked** programmatically. Instead of displaying the private donor name, the description column shows `"Donation Received (Collected by [Representative Name])"`.
  - **Receipt Anonymization:** Intake receipt buttons show a shield lock icon and display the label `"Donor Hidden"`. Users cannot click or open bank transfer screenshots that may contain names or bank account numbers.
- **Admin View:**
  - Revealing the admin view unmasks all donor names, showing the exact original notes for auditing.
  - Receipt images are fully accessible and clickable.

### B. Outlay (Expenses) Visibility
- **Public & Admin Views:**
  - Descriptions of expenditures (e.g. buying potatoes, onions, packing materials, mandi transport) are **fully visible** to everyone.
  - Receipt buttons are clickable for public users, allowing them to inspect handwritten grocery invoices and physical bills to ensure trust funds are spent transparently.

---

## 4. Admin Management Panel & Workflows

Admin view is toggled via the settings screen. Accessing it triggers a custom **full-screen numeric PIN pad** overlay.

### A. Access Control
- Entering PIN **`1234`** unlocks the admin view.
- Once unlocked:
  - Dashed admin panel controls are shown.
  - Original donor names are unmasked in the list.
  - All receipt buttons (both intakes and outlays) are unlocked.

### B. Transaction Manager (Add Entry)
- Admins can add transactions using a form with fields for: Date, Type (Intake/Outlay), Notes/Description, Amount (PKR), Category, and Receipt Attachment.
- If a receipt image is uploaded, it is converted into a **Base64 string** via `FileReader` and saved in `localStorage` inside the transaction object, making the app 100% self-contained.

### C. Edit Entry Workflow
- Every transaction card in Admin View features a small pencil edit button (`fa-pen-to-square`).
- Clicking the pencil icon opens the **Edit Entry Modal** populated with current transaction details.
- **Features in Edit Modal:**
  - Edit text, date, amount, category, and type.
  - **Change Receipt:** Upload a new image file to replace the existing receipt.
  - **Remove Receipt:** Remove the receipt attachment entirely, turning it into a receiptless entry.
  - **Delete Entry:** Permanently deletes the record from the database (requires confirmation).
- Saving updates re-calculates the privacy mask, updates `localStorage`, and refreshes the dashboard UI.

---

## 5. Technical Stack Details & Integration

- **Chart.js:** Configured via CDN. Generates the Cashflow bar chart and the Category doughnut chart. The script automatically recalculates totals when a transaction is edited, deleted, or added.
- **Urdu Translation:** Managed using the `TRANSLATIONS` dictionary inside `app.js`. Translates all headers, labels, category tags, and card components.
- **RTL Styles:** When the Urdu switch is toggled, `body.lang-ur` changes the direction layout to `rtl`, swaps font families to `Noto Nastaliq Urdu`, and aligns numbers to left-to-right reading structures.
