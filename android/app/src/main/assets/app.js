// Al Wahab Trust Transparency Portal - Application Logic (Mobile SPA Edition)

// Historical packages mapper for absolute accuracy of distributed packages
const HISTORICAL_PACKAGES = {
    "tx_17": 11,  // 11 package 📦 (17-Oct-2025)
    "tx_25": 7,   // November Package 📦 (01-Dec-2025)
    "tx_43": 12,  // 12 Ramzan Package 📦 (17-Feb-2026)
    "tx_47": 10,  // 10 New Packages 📦 (23-Feb-2026)
    "tx_51": 2,   // 2 package 📦 (Kot khizri + Natt kallan) (02-Mar-2026)
    "tx_66": 22,  // 22 Packages (16-Mar-2026)
    "tx_78": 5,   // 5 Packages Remaining (17-Mar-2026)
    "tx_104": 30, // 30 Bags for Saman (14-Apr-2026)
    "tx_106": 30, // 30 Bags ka saman (20-Apr-2026)
    "tx_120": 30, // 30 Bags ka saman (26-May-2026)
    "tx_121": 2,  // 2 Bags (Wazirabad and Natt Kallan) (26-May-2026)
    "tx_132": 29  // 29 Packages saman (17-Jun-2026)
};

// Translation Dictionary
const TRANSLATIONS = {
    en: {
        brandTitle: "Al Wahab Trust",
        brandSub: "Aujla Khurd",
        langBtn: "اردو",
        viewPublic: "Public",
        viewAdmin: "Admin",
        lblTotalIncome: "Total Intakes",
        lblTotalExpense: "Total Outlays",
        lblBalance: "Remaining Balance",
        lblPackages: "Bags Distributed",
        metaBalance: "Net cash in hand",
        metaPackages: "Food relief packages",
        lblFilterMonth: "Filter by Month",
        btnExport: "Export to CSV (Excel)",
        thDate: "Date",
        thType: "Type",
        thDesc: "Description",
        thCat: "Category",
        thAmount: "Amount (PKR)",
        thReceipt: "Receipt",
        searchPlaceholder: "Search description, items, or notes...",
        tabAll: "All",
        tabIncome: "Intakes",
        tabExpense: "Outlays",
        donationsReceived: "donations received",
        outlaysMade: "outlays made",
        allTime: "All Time",
        entries: "entries",
        intake: "Intake",
        outlay: "Outlay",
        viewReceipt: "View Receipt",
        noReceipt: "No Receipt",
        linkFile: "Link File",
        // Admin & Settings Screen Translations
        titleCharts: "Analytics",
        titleStats: "Key Metrics",
        titleAdmin: "Admin Controls",
        titleSettings: "Settings",
        lblAddEntryTitle: "Add Transaction Entry",
        lblAddDate: "Transaction Date",
        lblAddType: "Type",
        lblAddNotesIncome: "Donor Name",
        lblAddNotesExpense: "Expense Description / Notes",
        lblAddAmount: "Amount (PKR)",
        lblAddCategory: "Category",
        lblAddReceipt: "Attach Receipt Image",
        lblSaveEntryBtn: "Save Transaction Entry",
        lblDatabaseToolsTitle: "Database Operations",
        lblExportJson: "Export JSON Backup",
        lblImportJson: "Import JSON Backup",
        lblExportCsv: "Export to CSV (Excel)",
        lblSettingViewmode: "View Mode",
        lblSettingViewmodeDesc: "Access unmasked audit records",
        lblSettingLang: "Language / زبان",
        lblSettingReset: "Reset Database",
        lblSettingResetDesc: "Wipe changes and restore seed data",
        lblResetBtn: "Reset Data",
        // Edit modal translations
        editModalTitle: "Edit Entry",
        lblEditDate: "Transaction Date",
        lblEditType: "Type",
        lblEditNotesIncome: "Donor Name",
        lblEditNotesExpense: "Expense Description / Notes",
        lblEditAmount: "Amount (PKR)",
        lblEditCategory: "Category",
        lblEditReceiptTitle: "Receipt Attachment",
        lblHasReceipt: "Has attached receipt",
        lblChangeReceiptBtn: "Change",
        lblRemoveReceiptBtn: "Remove",
        lblUploadReceiptHelp: "Select an image file to upload receipt.",
        lblDeleteBtn: "Delete",
        lblCancelBtn: "Cancel",
        lblSaveChangesBtn: "Save Changes",
        // PIN pad
        pinTitle: "Admin Authentication",
        pinSubtitle: "Please enter PIN to unlock admin tools",
        pinCancelBtn: "Cancel",
        // Navigation labels
        navLedger: "Ledger",
        navCharts: "Charts",
        navStats: "Stats",
        navAdmin: "Admin",
        navSettings: "Settings",
        chartCashflowTitle: "Month-over-Month Cash Flows",
        chartCategoryTitle: "Expense Breakdown"
    },
    ur: {
        brandTitle: "الوہاب ٹرسٹ",
        brandSub: "اوجلہ خورد",
        langBtn: "English",
        viewPublic: "پبلک",
        viewAdmin: "ایڈمن",
        lblTotalIncome: "کل آمدن (عطیات)",
        lblTotalExpense: "کل اخراجات",
        lblBalance: "بقیہ رقم (بیلنس)",
        lblPackages: "تقسیم شدہ بیگز",
        metaBalance: "کل دستیاب نقد رقم",
        metaPackages: "امدادی راشن بیگز",
        lblFilterMonth: "مہینے کے لحاظ سے فلٹر",
        btnExport: "ایکسل شیٹ ڈاؤن لوڈ کریں",
        thDate: "تاریخ",
        thType: "قسم",
        thDesc: "تفصیل",
        thCat: "کیٹیگری",
        thAmount: "رقم (پاکستانی روپے)",
        thReceipt: "رسید",
        searchPlaceholder: "تفصیل، اشیاء یا نوٹس تلاش کریں...",
        tabAll: "تمام انٹریز",
        tabIncome: "عطیات",
        tabExpense: "اخراجات",
        donationsReceived: "عطیات موصول ہوئے",
        outlaysMade: "اخراجات کیے گئے",
        allTime: "کل مدت",
        entries: "انٹریز",
        intake: "عطیہ",
        outlay: "خرچ",
        viewReceipt: "رسید دیکھیں",
        noReceipt: "رسید نہیں ہے",
        linkFile: "فائل منسلک کریں",
        // Admin & Settings Screen Translations
        titleCharts: "چارٹس",
        titleStats: "اعداد و شمار",
        titleAdmin: "انتظامی کنٹرول",
        titleSettings: "ترتیبات",
        lblAddEntryTitle: "نئی انٹری شامل کریں",
        lblAddDate: "انٹری کی تاریخ",
        lblAddType: "قسم",
        lblAddNotesIncome: "عطیہ دہندہ کا نام",
        lblAddNotesExpense: "اخراجات کی تفصیل / نوٹس",
        lblAddAmount: "رقم (پاکستانی روپے)",
        lblAddCategory: "کیٹیگری",
        lblAddReceipt: "رسید منسلک کریں",
        lblSaveEntryBtn: "انٹری محفوظ کریں",
        lblDatabaseToolsTitle: "ڈیٹا بیس کے امور",
        lblExportJson: "JSON بیک اپ نکالیں",
        lblImportJson: "JSON بیک اپ لوڈ کریں",
        lblExportCsv: "ایکسل شیٹ ڈاؤن لوڈ کریں",
        lblSettingViewmode: "صارف کا منظر",
        lblSettingViewmodeDesc: "ایڈمن ریکارڈز تک رسائی حاصل کریں",
        lblSettingLang: "زبان / Language",
        lblSettingReset: "ڈیٹا بیس ری سیٹ کریں",
        lblSettingResetDesc: "تمام تبدیلیاں مٹا کر ابتدائی ڈیٹا بحال کریں",
        lblResetBtn: "ری سیٹ کریں",
        // Edit modal translations
        editModalTitle: "انٹری میں ترمیم کریں",
        lblEditDate: "انٹری کی تاریخ",
        lblEditType: "قسم",
        lblEditNotesIncome: "عطیہ دہندہ کا نام",
        lblEditNotesExpense: "اخراجات کی تفصیل / نوٹس",
        lblEditAmount: "رقم (پاکستانی روپے)",
        lblEditCategory: "کیٹیگری",
        lblEditReceiptTitle: "رسید منسلک کریں",
        lblHasReceipt: "رسید منسلک ہے",
        lblChangeReceiptBtn: "تبدیل کریں",
        lblRemoveReceiptBtn: "حذف کریں",
        lblUploadReceiptHelp: "رسید تبدیل کرنے کے لیے تصویر منتخب کریں۔",
        lblDeleteBtn: "حذف کریں",
        lblCancelBtn: "منسوخ کریں",
        lblSaveChangesBtn: "محفوظ کریں",
        // PIN pad
        pinTitle: "ایڈمن کی تصدیق",
        pinSubtitle: "ایڈمن ٹولز کو غیر مقفل کرنے کے لیے پن درج کریں",
        pinCancelBtn: "منسوخ کریں",
        // Navigation labels
        navLedger: "کھاتہ",
        navCharts: "چارٹس",
        navStats: "اعداد و شمار",
        navAdmin: "ایڈمن",
        navSettings: "ترتیبات",
        chartCashflowTitle: "ماہانہ آمدن اور اخراجات",
        chartCategoryTitle: "اخراجات کی تفصیل"
    }
};

const CATEGORY_TRANSLATIONS = {
    "Donation": "عطیہ",
    "Groceries": "اشیاء خوردونوش",
    "Packaging": "پیکجنگ سامان",
    "Logistics": "ٹرانسپورٹ",
    "Eidi / Eid Support": "عیدی سپورٹ",
    "Medical": "طبی امداد",
    "Equipment / Tools": "اوزار و سامان",
    "Other": "دیگر اخراجات"
};

// Application State
let state = {
    transactions: [],
    availableReceipts: [],
    currentMonthFilter: 'all',
    currentTypeFilter: 'all',
    searchQuery: '',
    viewMode: 'public', // 'public' or 'admin'
    language: 'en',     // 'en' or 'ur'
    cashflowChartInstance: null,
    categoryChartInstance: null,
    enteredPin: '',
    targetScreen: null,
    currentActiveScreen: 'ledger'
};

// Document Elements
const elements = {
    incomeVal: document.getElementById('card-total-income'),
    incomeCount: document.getElementById('card-income-count'),
    expenseVal: document.getElementById('card-total-expense'),
    expenseCount: document.getElementById('card-expense-count'),
    balanceVal: document.getElementById('card-balance'),
    packagesVal: document.getElementById('card-packages'),
    timelineScroll: document.getElementById('month-timeline'),
    searchBar: document.getElementById('search-bar'),
    adminPanel: document.getElementById('admin-panel'),
    receiptModal: document.getElementById('receipt-modal'),
    receiptTitle: document.getElementById('modal-receipt-title'),
    receiptBody: document.getElementById('modal-receipt-body'),
    adminPasscodeModal: document.getElementById('admin-passcode-modal'),
    adminPasscodeInput: document.getElementById('admin-passcode-input'),
    adminErrorMsg: document.getElementById('admin-error-msg'),
    addTxForm: document.getElementById('add-transaction-form'),
    formDate: document.getElementById('form-date'),
    formNotesLabel: document.getElementById('form-notes-label'),
    formNotes: document.getElementById('form-notes'),
    
    // Edit Modal Elements
    editTxModal: document.getElementById('edit-tx-modal'),
    editFormId: document.getElementById('edit-form-id'),
    editFormDate: document.getElementById('edit-form-date'),
    editFormType: document.getElementById('edit-form-type'),
    editFormNotesLabel: document.getElementById('edit-form-notes-label'),
    editFormNotes: document.getElementById('edit-form-notes'),
    editFormAmount: document.getElementById('edit-form-amount'),
    editFormCategory: document.getElementById('edit-form-category'),
    editReceiptPreviewContainer: document.getElementById('edit-receipt-preview-container'),
    editReceiptThumbnail: document.getElementById('edit-receipt-thumbnail'),
    editReceiptUploadContainer: document.getElementById('edit-receipt-upload-container'),
    editReceiptUpload: document.getElementById('edit-receipt-upload')
};

// Initialize Application on load
window.addEventListener('DOMContentLoaded', () => {
    loadDatabase();
    initTimeline();
    updateUI();
    
    // Set default date on form to today
    if (elements.formDate) {
        elements.formDate.value = new Date().toISOString().split('T')[0];
    }

    // Set initial screen state in history
    history.replaceState({screen: 'ledger'}, '');
});

// Back Button Navigation handler
window.addEventListener('popstate', (e) => {
    // Dismiss any active modals/overlays
    if (elements.receiptModal) elements.receiptModal.classList.remove('active');
    if (elements.editTxModal) elements.editTxModal.classList.remove('active');
    if (elements.adminPasscodeModal) elements.adminPasscodeModal.classList.remove('active');
    
    // Switch to target screen if popped state represents a screen
    if (e.state && e.state.screen) {
        switchScreen(e.state.screen, false);
    }
});

// Load database from LocalStorage or seed data
function loadDatabase() {
    const stored = localStorage.getItem('awt_transactions');
    if (stored) {
        try {
            state.transactions = JSON.parse(stored);
        } catch (e) {
            console.error("Error parsing stored transactions, falling back to seed", e);
            state.transactions = [...INITIAL_TRANSACTIONS];
        }
    } else {
        state.transactions = [...INITIAL_TRANSACTIONS];
        saveDatabase();
    }
    state.availableReceipts = [...AVAILABLE_RECEIPTS];
}

// Save database to LocalStorage
function saveDatabase() {
    localStorage.setItem('awt_transactions', JSON.stringify(state.transactions));
}

// Reset data to seed defaults
function resetToDefaultData() {
    const isUr = state.language === 'ur';
    const confirmMsg = isUr
        ? "کیا آپ واقعی ڈیٹا بیس ری سیٹ کرنا چاہتے ہیں؟ آپ کے تمام نئے اندراجات مٹ جائیں گے۔"
        : "Are you sure you want to reset all transaction records to default seed data? This will clear all modifications.";
    
    if (confirm(confirmMsg)) {
        localStorage.removeItem('awt_transactions');
        loadDatabase();
        initTimeline();
        state.currentMonthFilter = 'all';
        updateUI();
        alert(isUr ? "ڈیٹا بیس کامیابی سے بحال کر دیا گیا ہے!" : "Database has been reset to defaults.");
    }
}

// SPA Screen Navigation Logic
function switchScreen(screenId, pushHistory = true) {
    // If target is admin tools and viewMode is public, intercept with passcode screen
    if (screenId === 'admin' && state.viewMode !== 'admin') {
        state.targetScreen = 'admin';
        openAdminPasscodeModal();
        return;
    }
    
    state.currentActiveScreen = screenId;

    // Toggle active screen visibility
    const screens = document.querySelectorAll('.app-screen');
    screens.forEach(s => s.classList.remove('active'));
    
    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Toggle active navigation tab state
    const navItems = document.querySelectorAll('#bottom-nav-bar .nav-item');
    navItems.forEach(n => n.classList.remove('active'));
    
    const targetNav = document.getElementById(`nav-${screenId}`);
    if (targetNav) {
        targetNav.classList.add('active');
    }
    
    // Re-render components if charts screen to avoid canvas sizing bugs
    if (screenId === 'charts') {
        renderCashflowChart();
        renderCategoryChart();
    }

    if (pushHistory) {
        history.pushState({screen: screenId}, '');
    }
}

// Generate Month Timeline elements dynamically
function initTimeline() {
    const isUr = state.language === 'ur';
    const allTimeLabel = isUr ? 'کل مدت' : 'All Time';
    const entriesLabel = isUr ? 'انٹریز' : 'entries';
    
    const monthsSet = new Set();
    state.transactions.forEach(tx => {
        if (tx.date) {
            monthsSet.add(tx.date.substring(0, 7)); // get YYYY-MM
        }
    });
    
    const sortedMonths = Array.from(monthsSet).sort();
    
    let timelineHTML = `
        <div class="timeline-item ${state.currentMonthFilter === 'all' ? 'active' : ''}" data-month="all" onclick="selectMonth('all')">
            ${allTimeLabel}
            <span>${state.transactions.length} ${entriesLabel}</span>
        </div>
    `;
    
    sortedMonths.forEach(m => {
        const dateObj = new Date(m + "-02"); 
        const monthLabel = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const count = state.transactions.filter(tx => tx.date.startsWith(m)).length;
        
        timelineHTML += `
            <div class="timeline-item ${state.currentMonthFilter === m ? 'active' : ''}" data-month="${m}" onclick="selectMonth('${m}')">
                ${monthLabel}
                <span>${count} ${entriesLabel}</span>
            </div>
        `;
    });
    
    elements.timelineScroll.innerHTML = timelineHTML;
}

// Change month filter in state and update view
function selectMonth(monthStr) {
    state.currentMonthFilter = monthStr;
    
    const items = elements.timelineScroll.querySelectorAll('.timeline-item');
    items.forEach(item => {
        if (item.getAttribute('data-month') === monthStr) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    updateUI();
}

// View Mode controls
function switchViewMode(mode) {
    if (mode === 'admin' && state.viewMode !== 'admin') {
        state.targetScreen = 'settings';
        openAdminPasscodeModal();
    } else if (mode === 'public') {
        state.viewMode = 'public';
        
        // Sync setting active state
        document.getElementById('btn-public-view').classList.add('active');
        document.getElementById('btn-admin-view').classList.remove('active');
        
        // Redirect out of admin tools if currently active
        if (state.currentActiveScreen === 'admin') {
            switchScreen('ledger');
        }
        
        updateUI();
    }
}

// GRID PIN PAD OVERLAY LOGIC
function openAdminPasscodeModal() {
    state.enteredPin = '';
    updatePinDots();
    
    if (elements.adminPasscodeModal) {
        elements.adminPasscodeModal.classList.add('active');
        history.pushState({modal: 'pinpad'}, '');
    }
    if (elements.adminErrorMsg) {
        elements.adminErrorMsg.style.display = 'none';
    }
}

function pressPinNumber(num) {
    if (state.enteredPin.length >= 4) return;
    state.enteredPin += num;
    updatePinDots();
    
    if (state.enteredPin.length === 4) {
        setTimeout(submitAdminUnlock, 200);
    }
}

function backspacePin() {
    if (state.enteredPin.length === 0) return;
    state.enteredPin = state.enteredPin.slice(0, -1);
    updatePinDots();
}

function clearPin() {
    state.enteredPin = '';
    updatePinDots();
}

function updatePinDots() {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach((dot, idx) => {
        if (idx < state.enteredPin.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function submitAdminUnlock() {
    if (state.enteredPin === '1234') {
        state.viewMode = 'admin';
        
        // Update View Mode switcher active states in settings screen
        document.getElementById('btn-admin-view').classList.add('active');
        document.getElementById('btn-public-view').classList.remove('active');
        
        // Close overlay and pop history state
        if (history.state && history.state.modal === 'pinpad') {
            history.back();
        } else {
            elements.adminPasscodeModal.classList.remove('active');
        }
        
        // Switch to target screen
        const target = state.targetScreen || 'admin';
        state.targetScreen = null;
        switchScreen(target);
        
        updateUI();
    } else {
        if (elements.adminErrorMsg) {
            elements.adminErrorMsg.style.display = 'block';
        }
        
        // Trigger shake effect on dots row
        const container = document.getElementById('pin-dots-container');
        if (container) {
            container.style.animation = 'none';
            container.offsetHeight; /* trigger reflow */
            container.style.animation = 'pinErrorShake 0.35s ease';
        }
        
        // Reset code with delay
        setTimeout(() => {
            state.enteredPin = '';
            updatePinDots();
        }, 500);
    }
}

function cancelAdminUnlock() {
    if (history.state && history.state.modal === 'pinpad') {
        history.back();
    } else {
        if (elements.adminPasscodeModal) {
            elements.adminPasscodeModal.classList.remove('active');
        }
    }
    
    // Restore View Mode buttons matching the actual state
    if (state.viewMode === 'admin') {
        document.getElementById('btn-admin-view').classList.add('active');
        document.getElementById('btn-public-view').classList.remove('active');
    } else {
        document.getElementById('btn-public-view').classList.add('active');
        document.getElementById('btn-admin-view').classList.remove('active');
    }
    state.targetScreen = null;
}

// Helper to check if notes label needs updating
function toggleFormNotesLabel() {
    const isUr = state.language === 'ur';
    const type = document.getElementById('form-type').value;
    const t = TRANSLATIONS[state.language];
    
    if (type === 'income') {
        elements.formNotesLabel.innerText = t.lblAddNotesIncome;
        elements.formNotes.placeholder = isUr ? "مثلاً: یاسر یا سعد" : "e.g., Yasir or Saad";
    } else {
        elements.formNotesLabel.innerText = t.lblAddNotesExpense;
        elements.formNotes.placeholder = isUr ? "مثلاً: سبزیوں کی خریداری" : "e.g., Vegetable Purchase (32kg Potatoes...)";
    }
}

function updateUI() {
    const filteredTxs = getFilteredTransactions();
    const isUr = state.language === 'ur';
    
    // 1. Calculate and update summary stats
    let totalIncome = 0;
    let incomeCount = 0;
    let totalExpense = 0;
    let expenseCount = 0;
    let packagesDistributed = 0;
    
    filteredTxs.forEach(tx => {
        if (tx.type === 'income') {
            totalIncome += tx.amount;
            incomeCount++;
        } else {
            totalExpense += tx.amount;
            expenseCount++;
            
            // Check packages distributed
            if (HISTORICAL_PACKAGES[tx.id]) {
                packagesDistributed += HISTORICAL_PACKAGES[tx.id];
            } else {
                // Parse package count from description (new transactions)
                const descLower = tx.notes.toLowerCase();
                const match = descLower.match(/(\d+)\s*(?:package|bag|relief bag|saman)/);
                if (match) {
                    packagesDistributed += parseInt(match[1]);
                }
            }
        }
    });
    
    const balance = totalIncome - totalExpense;
    
    elements.incomeVal.innerText = formatCurrency(totalIncome);
    elements.incomeCount.innerText = isUr ? `${incomeCount} عطیات موصول ہوئے` : `${incomeCount} donations received`;
    
    elements.expenseVal.innerText = formatCurrency(totalExpense);
    elements.expenseCount.innerText = isUr ? `${expenseCount} اخراجات کیے گئے` : `${expenseCount} outlays made`;
    
    elements.balanceVal.innerText = formatCurrency(balance);
    if (balance < 0) {
        elements.balanceVal.style.color = 'var(--danger-color)';
    } else {
        elements.balanceVal.style.color = 'var(--text-main)';
    }
    
    elements.packagesVal.innerText = packagesDistributed.toLocaleString();
    
    // 2. Render Cards list
    renderLedgerTable(filteredTxs);
    
    // 3. Render Visual Charts if active
    if (state.currentActiveScreen === 'charts') {
        renderCashflowChart();
        renderCategoryChart();
    }
}

// Format number to local PKR currency layout
function formatCurrency(val) {
    return "Rs. " + Math.round(val).toLocaleString('en-US');
}

// Format Date string from YYYY-MM-DD to DD-MMM-YYYY
function formatDate(dateStr) {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr + "T00:00:00");
    return dateObj.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Filter dataset based on current month selection, search bar query, type tabs
function getFilteredTransactions() {
    return state.transactions.filter(tx => {
        // Date Month check
        if (state.currentMonthFilter !== 'all') {
            if (!tx.date.startsWith(state.currentMonthFilter)) {
                return false;
            }
        }
        
        // Type filter check
        if (state.currentTypeFilter !== 'all') {
            if (tx.type !== state.currentTypeFilter) {
                return false;
            }
        }
        
        // Search text match
        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase();
            const notesText = (tx.notes || '').toLowerCase();
            const maskedText = (tx.maskedNotes || '').toLowerCase();
            const catText = (tx.category || '').toLowerCase();
            const dateText = (tx.originalDate || '').toLowerCase();
            
            const isMatch = notesText.includes(query) || 
                            maskedText.includes(query) || 
                            catText.includes(query) || 
                            dateText.includes(query) ||
                            tx.amount.toString().includes(query);
            
            if (!isMatch) return false;
        }
        
        return true;
    });
}

// Helper to translate masked notes on the fly into Urdu Nastaliq
function translateDescription(desc, isUr) {
    if (!isUr) return desc;
    let urDesc = desc;
    urDesc = urDesc.replace("Sugar Donation Received", "چینی کا عطیہ موصول ہوا");
    urDesc = urDesc.replace("Fitrana Donation Received", "فطرانہ موصول ہوا");
    urDesc = urDesc.replace("Donation Received", "عطیہ موصول ہوا");
    urDesc = urDesc.replace("Collected by ", "جمع کنندہ: ");
    urDesc = urDesc.replace("Anonymous", "گمنام");
    return urDesc;
}

// Render dynamic card items for ledger screen
function renderLedgerTable(filteredTxs) {
    const sortedTxs = [...filteredTxs].sort((a, b) => b.date.localeCompare(a.date));
    const isUr = state.language === 'ur';
    const t = TRANSLATIONS[state.language];
    
    let html = '';
    
    if (sortedTxs.length === 0) {
        html = `
            <div style="text-align: center; color: var(--text-muted); padding: 40px 20px; width: 100%;">
                <i class="fa-solid fa-folder-open fa-2xl" style="display:block; margin-bottom:15px; opacity:0.4;"></i>
                ${isUr ? 'کوئی اندراج نہیں ملا۔' : 'No entries found matching your criteria.'}
            </div>
        `;
    } else {
        sortedTxs.forEach(tx => {
            const dateStr = formatDate(tx.date);
            const cardClass = tx.type === 'income' ? 'income' : 'expense';
            const amountClass = tx.type === 'income' ? 'income' : 'expense';
            const amountPrefix = tx.type === 'income' ? '+' : '-';
            const amountText = Math.round(tx.amount).toLocaleString('en-US');
            
            let notesDisplay = (state.viewMode === 'public' && tx.type === 'income') ? tx.maskedNotes : tx.notes;
            if (isUr && state.viewMode === 'public' && tx.type === 'income') {
                notesDisplay = translateDescription(notesDisplay, true);
            }
            
            const categoryDisplay = isUr ? (CATEGORY_TRANSLATIONS[tx.category] || tx.category) : tx.category;
            
            // Receipt Action configuration
            let actionHTML = '';
            if (state.viewMode === 'public' && tx.type === 'income') {
                actionHTML = `
                    <span style="color:var(--text-muted); font-size:11px; font-weight:600; display:inline-flex; align-items:center; gap:4px; padding: 4px 0;">
                        <i class="fa-solid fa-user-shield"></i> ${isUr ? 'پوشیدہ' : 'Hidden'}
                    </span>
                `;
            } else if (tx.receipt) {
                actionHTML = `
                    <button class="receipt-trigger-btn" onclick="openReceiptModal('${tx.id}')">
                        <i class="fa-solid fa-file-invoice-dollar"></i> ${t.viewReceipt}
                    </button>
                `;
            } else {
                if (state.viewMode === 'admin') {
                    actionHTML = `
                        <button class="receipt-trigger-btn" onclick="attachReceiptPrompt('${tx.id}')" style="background:var(--accent-light); border-color:var(--accent-color); color:#8d5e2d;">
                            <i class="fa-solid fa-paperclip"></i> ${t.linkFile}
                        </button>
                    `;
                } else {
                    actionHTML = `
                        <button class="receipt-trigger-btn no-receipt" disabled>
                            <i class="fa-solid fa-ban"></i> ${t.noReceipt}
                        </button>
                    `;
                }
            }
            
            // Edit trigger configuration
            let editHTML = '';
            if (state.viewMode === 'admin') {
                editHTML = `
                    <button class="edit-entry-btn" onclick="openEditTxModal('${tx.id}')" title="${isUr ? 'انٹری میں ترمیم کریں' : 'Edit Entry'}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                `;
            }
            
            html += `
                <div class="tx-card ${cardClass}" id="card-${tx.id}">
                    <div class="tx-card-main">
                        <div class="tx-card-meta">
                            <span class="tx-card-date">${dateStr}</span>
                            <span class="cat-tag">${categoryDisplay}</span>
                        </div>
                        <div class="tx-card-notes">${notesDisplay}</div>
                    </div>
                    <div class="tx-card-right">
                        <div class="tx-card-amount ${amountClass}">${amountPrefix} Rs. ${amountText}</div>
                        <div class="tx-card-actions">
                            ${actionHTML}
                            ${editHTML}
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    const container = document.getElementById('ledger-card-list');
    if (container) {
        container.innerHTML = html;
    }
    
    let titleText = '';
    if (isUr) {
        titleText = `${state.currentTypeFilter === 'all' ? 'تمام مالیاتی' : state.currentTypeFilter === 'income' ? 'عطیات (آمدن)' : 'اخراجات (خرچ)'} کی انٹریز (${sortedTxs.length})`;
    } else {
        titleText = `${state.currentTypeFilter === 'all' ? 'All Financial' : state.currentTypeFilter === 'income' ? 'Donation Intake' : 'Expense Outlay'} Entries (${sortedTxs.length})`;
    }
    document.getElementById('ledger-table-title').innerText = titleText;
}

// Translate language toggle function
function toggleLanguage() {
    state.language = state.language === 'en' ? 'ur' : 'en';
    
    if (state.language === 'ur') {
        document.body.classList.add('lang-ur');
    } else {
        document.body.classList.remove('lang-ur');
    }
    
    const t = TRANSLATIONS[state.language];
    
    // Update Brand headers
    document.getElementById('brand-main-title').innerText = t.brandTitle;
    document.getElementById('brand-sub-title').innerText = t.brandSub;
    document.getElementById('lang-btn-text').innerText = t.langBtn;
    
    // View mode switches
    document.getElementById('view-public-text').innerText = t.viewPublic;
    document.getElementById('view-admin-text').innerText = t.viewAdmin;
    
    // Main Stats Labels
    document.getElementById('label-total-income').innerText = t.lblTotalIncome;
    document.getElementById('label-total-expense').innerText = t.lblTotalExpense;
    document.getElementById('label-balance').innerText = t.lblBalance;
    document.getElementById('label-balance-meta').innerText = t.metaBalance;
    document.getElementById('label-packages').innerText = t.lblPackages;
    document.getElementById('label-packages-meta').innerText = t.metaPackages;
    
    // Filters and search placeholder
    document.getElementById('label-filter-month').innerText = t.lblFilterMonth;
    document.getElementById('search-bar').placeholder = t.searchPlaceholder;
    
    document.getElementById('tab-all').innerText = t.tabAll;
    document.getElementById('tab-income').innerText = t.tabIncome;
    document.getElementById('tab-expense').innerText = t.tabExpense;
    
    // Screens titles
    document.getElementById('title-charts-screen').innerText = t.titleCharts;
    document.getElementById('title-stats-screen').innerText = t.titleStats;
    document.getElementById('title-admin-screen').innerText = t.titleAdmin;
    document.getElementById('title-settings-screen').innerText = t.titleSettings;
    
    // Charts descriptions
    document.getElementById('chart-cashflow-title').innerText = t.chartCashflowTitle;
    document.getElementById('chart-category-title').innerText = t.chartCategoryTitle;
    
    // Settings toggles translation
    document.getElementById('lbl-setting-viewmode').innerText = t.lblSettingViewmode;
    document.getElementById('lbl-setting-viewmode-desc').innerText = t.lblSettingViewmodeDesc;
    document.getElementById('lbl-setting-lang').innerText = t.lblSettingLang;
    document.getElementById('lbl-lang-toggle-text').innerText = t.langBtn;
    document.getElementById('lbl-setting-reset').innerText = t.lblSettingReset;
    document.getElementById('lbl-setting-reset-desc').innerText = t.lblSettingResetDesc;
    document.getElementById('lbl-reset-btn').innerText = t.lblResetBtn;
    document.getElementById('footer-credit-text').innerHTML = t.brandTitle + " &bull; " + t.brandSub;

    // Admin screen fields translation
    document.getElementById('lbl-add-entry-title').innerText = t.lblAddEntryTitle;
    document.getElementById('lbl-add-date').innerText = t.lblAddDate;
    document.getElementById('lbl-add-type').innerText = t.lblAddType;
    document.getElementById('lbl-add-amount').innerText = t.lblAddAmount;
    document.getElementById('lbl-add-category').innerText = t.lblAddCategory;
    document.getElementById('lbl-add-receipt').innerText = t.lblAddReceipt;
    document.getElementById('lbl-save-entry-btn').innerText = t.lblSaveEntryBtn;
    
    document.getElementById('lbl-database-tools-title').innerText = t.lblDatabaseToolsTitle;
    document.getElementById('lbl-export-json').innerText = t.lblExportJson;
    document.getElementById('lbl-import-json').innerText = t.lblImportJson;
    document.getElementById('lbl-export-csv').innerText = t.lblExportCsv;
    
    // Pin pad screen translation
    document.getElementById('pin-title').innerText = t.pinTitle;
    document.getElementById('pin-subtitle').innerText = t.pinSubtitle;
    document.getElementById('pin-cancel-btn').innerText = t.pinCancelBtn;

    // Navigation Labels translation
    document.getElementById('nav-label-ledger').innerText = t.navLedger;
    document.getElementById('nav-label-charts').innerText = t.navCharts;
    document.getElementById('nav-label-stats').innerText = t.navStats;
    document.getElementById('nav-label-admin').innerText = t.navAdmin;
    document.getElementById('nav-label-settings').innerText = t.navSettings;

    // Translate Edit Modal elements if active
    document.getElementById('edit-modal-title').innerText = t.editModalTitle;
    document.getElementById('lbl-edit-date').innerText = t.lblEditDate;
    document.getElementById('lbl-edit-type').innerText = t.lblEditType;
    
    const editType = document.getElementById('edit-form-type').value;
    document.getElementById('edit-form-notes-label').innerText = editType === 'income' ? t.lblEditNotesIncome : t.lblEditNotesExpense;
    
    document.getElementById('lbl-edit-amount').innerText = t.lblEditAmount;
    document.getElementById('lbl-edit-category').innerText = t.lblEditCategory;
    document.getElementById('lbl-edit-receipt-title').innerText = t.lblEditReceiptTitle;
    document.getElementById('lbl-has-receipt').innerText = t.lblHasReceipt;
    document.getElementById('lbl-change-receipt-btn').innerText = t.lblChangeReceiptBtn;
    document.getElementById('lbl-remove-receipt-btn').innerText = t.lblRemoveReceiptBtn;
    document.getElementById('lbl-upload-receipt-help').innerText = t.lblUploadReceiptHelp;
    document.getElementById('lbl-delete-btn').innerText = t.lblDeleteBtn;
    document.getElementById('lbl-cancel-btn').innerText = t.lblCancelBtn;
    document.getElementById('lbl-save-changes-btn').innerText = t.lblSaveChangesBtn;
    
    // Refresh timeline month descriptors
    initTimeline();
    
    // Re-render UI
    updateUI();
}

// Filter ledger search triggers
function handleFilterChange() {
    state.searchQuery = elements.searchBar.value;
    updateUI();
}

function setLedgerFilter(typeStr) {
    state.currentTypeFilter = typeStr;
    
    const tabs = ['all', 'income', 'expense'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (btn) {
            if (t === typeStr) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });
    
    updateUI();
}

// Receipt Modal Controls (Slide-Up Bottom Sheet layout)
function openReceiptModal(txId) {
    const tx = state.transactions.find(t => t.id === txId);
    if (!tx) return;
    
    elements.receiptTitle.innerText = `${tx.type === 'income' ? 'Intake' : 'Outlay'} Entry Details`;
    
    let modalHTML = '';
    
    if (tx.receipt) {
        let imgSrc = '';
        if (tx.receipt.startsWith('data:')) {
            imgSrc = tx.receipt; // Newly uploaded base64 data
        } else {
            imgSrc = "data/" + tx.receipt; // Seed JPEG local file reference
        }
        
        modalHTML = `
            <img src="${imgSrc}" class="modal-receipt-img" alt="Receipt Image">
            <div style="margin-top:12px;">
                <a href="${imgSrc}" target="_blank" class="btn-secondary" style="display:inline-flex;">
                    <i class="fa-solid fa-maximize"></i> Open in New Tab
                </a>
            </div>
        `;
    } else {
        // Fallback: Beautifully formatted digital receipt mockup
        const dateStr = formatDate(tx.date);
        const amountNum = Math.round(tx.amount).toLocaleString('en-US');
        const notesLabel = tx.type === 'income' ? 'DONOR' : 'EXPENSE DETAILS';
        const maskedNotes = (state.viewMode === 'public' && tx.type === 'income') ? tx.maskedNotes : tx.notes;
        
        modalHTML = `
            <div class="digital-receipt-mockup">
                <div class="digital-header">
                    <h3>AL WAHAB TRUST</h3>
                    <p>Financial Transparency Certificate</p>
                    <p style="font-size:10px; margin-top:5px;">ID: ${tx.id.toUpperCase()}</p>
                </div>
                <div class="digital-items">
                    <div class="digital-item-row">
                        <span>DATE:</span>
                        <span>${dateStr}</span>
                    </div>
                    <div class="digital-item-row">
                        <span>TYPE:</span>
                        <span style="font-weight:bold; color:${tx.type === 'income' ? '#14a38e' : '#e63946'}">
                            ${tx.type === 'income' ? 'INTAKE (DONATION)' : 'OUTLAY (EXPENSE)'}
                        </span>
                    </div>
                    <div class="digital-item-row" style="margin-top:10px; flex-direction:column; align-items:flex-start;">
                        <span style="font-size:9px; color:#718096;">${notesLabel}:</span>
                        <p style="font-weight:bold; margin-top:3px; font-size:11px; line-height:1.4;">${maskedNotes}</p>
                    </div>
                    <div class="digital-item-row" style="margin-top:10px;">
                        <span>CATEGORY:</span>
                        <span>${tx.category.toUpperCase()}</span>
                    </div>
                </div>
                <div class="digital-total">
                    TOTAL AMOUNT: Rs. ${amountNum}
                </div>
                <div style="margin-top:24px; text-align:center; border-top:1px dashed #cbd5e0; padding-top:10px; font-size:9px; color:#718096; line-height:1.4;">
                    <i class="fa-solid fa-circle-check" style="color:#2ec4b6;"></i> Digitally Verified & Reconciled. 
                    <br>Physical receipt was not uploaded.
                </div>
            </div>
        `;
    }
    
    // Append meta table rows below receipt
    const displayNotes = (state.viewMode === 'public' && tx.type === 'income') ? tx.maskedNotes : tx.notes;
    modalHTML += `
        <div class="modal-details">
            <div class="modal-detail-row">
                <span>Transaction ID</span>
                <span>${tx.id}</span>
            </div>
            <div class="modal-detail-row">
                <span>Date</span>
                <span>${formatDate(tx.date)}</span>
            </div>
            <div class="modal-detail-row">
                <span>Type</span>
                <span>${tx.type === 'income' ? 'Donation Intake' : 'Expense Outlay'}</span>
            </div>
            <div class="modal-detail-row">
                <span>Notes</span>
                <span>${displayNotes}</span>
            </div>
            <div class="modal-detail-row">
                <span>Category</span>
                <span>${tx.category}</span>
            </div>
            <div class="modal-detail-row">
                <span>Total Amount</span>
                <span style="color:${tx.type === 'income' ? '#14a38e' : '#e63946'}">Rs. ${Math.round(tx.amount).toLocaleString('en-US')}</span>
            </div>
        </div>
    `;
    
    elements.receiptBody.innerHTML = modalHTML;
    elements.receiptModal.classList.add('active');
    history.pushState({modal: 'receipt'}, '');
}

function closeReceiptModal(e) {
    if (e) e.stopPropagation();
    if (elements.receiptModal.classList.contains('active')) {
        elements.receiptModal.classList.remove('active');
        if (history.state && history.state.modal === 'receipt') {
            history.back();
        }
    }
}

// Admin attachment feature
function attachReceiptPrompt(txId) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(evt) {
            const base64 = evt.target.result;
            const tx = state.transactions.find(t => t.id === txId);
            if (tx) {
                tx.receipt = base64;
                saveDatabase();
                updateUI();
                alert("Receipt file successfully linked to this record!");
            }
        };
        reader.readAsDataURL(file);
    };
    fileInput.click();
}

// Add New Transaction Entry Submission handler
function handleAddTransaction(e) {
    e.preventDefault();
    
    const dateVal = document.getElementById('form-date').value;
    const typeVal = document.getElementById('form-type').value;
    const notesVal = document.getElementById('form-notes').value;
    const amountVal = parseFloat(document.getElementById('form-amount').value);
    const categoryVal = document.getElementById('form-category').value;
    const receiptFile = document.getElementById('form-receipt').files[0];
    
    if (!dateVal || isNaN(amountVal) || amountVal <= 0) {
        alert("Please provide a valid date and numeric amount.");
        return;
    }
    
    const newTxId = "tx_" + Date.now();
    
    let maskedVal = notesVal;
    if (typeVal === 'income') {
        const parts = notesVal.split(' ');
        if (parts.length === 1) {
            maskedVal = parts[0].length > 2 ? `${parts[0].substring(0, 2)}*** Donation` : 'Anonymous Donation';
        } else {
            maskedVal = `${parts[0]} ${parts[parts.length - 1][0]}.*** Donation`;
        }
    }
    
    const saveTransaction = (receiptBase64 = null) => {
        const newTx = {
            id: newTxId,
            date: dateVal,
            originalDate: formatDateISOToOriginal(dateVal),
            notes: notesVal,
            maskedNotes: maskedVal,
            type: typeVal,
            category: categoryVal,
            amount: amountVal,
            receipt: receiptBase64
        };
        
        state.transactions.push(newTx);
        saveDatabase();
        
        // Re-initialize timeline to include new months if necessary
        initTimeline();
        
        // Switch screen to Ledger and render
        switchScreen('ledger');
        
        // Reset form
        elements.addTxForm.reset();
        elements.formDate.value = new Date().toISOString().split('T')[0];
        toggleFormNotesLabel();
        
        alert("Transaction entry successfully added to the database!");
    };
    
    if (receiptFile) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            saveTransaction(evt.target.result);
        };
        reader.readAsDataURL(receiptFile);
    } else {
        saveTransaction(null);
    }
}

// Helper: Convert YYYY-MM-DD back to DD-MMM-YYYY for compatibility
function formatDateISOToOriginal(isoDate) {
    if (!isoDate) return '';
    const dateObj = new Date(isoDate + "T00:00:00");
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = dateObj.toLocaleString('en-US', { month: 'short' });
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
}

// Render Month-over-Month cash flow chart using Chart.js
function renderCashflowChart() {
    const canvas = document.getElementById('cashflowChart');
    if (!canvas) return;
    
    if (state.cashflowChartInstance) {
        state.cashflowChartInstance.destroy();
    }
    
    const monthsMap = {}; // format: YYYY-MM -> {income, expense}
    
    state.transactions.forEach(tx => {
        const m = tx.date.substring(0, 7);
        if (!monthsMap[m]) {
            monthsMap[m] = { income: 0, expense: 0 };
        }
        if (tx.type === 'income') {
            monthsMap[m].income += tx.amount;
        } else {
            monthsMap[m].expense += tx.amount;
        }
    });
    
    const sortedMonths = Object.keys(monthsMap).sort();
    
    const labels = sortedMonths.map(m => {
        const dateObj = new Date(m + "-02");
        return dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    });
    
    const incomeData = sortedMonths.map(m => monthsMap[m].income);
    const expenseData = sortedMonths.map(m => monthsMap[m].expense);
    
    const ctx = canvas.getContext('2d');
    state.cashflowChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: state.language === 'ur' ? 'عطیات (آمدن)' : 'Intakes (Donations)',
                    data: incomeData,
                    backgroundColor: 'rgba(46, 196, 182, 0.85)',
                    borderColor: 'var(--success-color)',
                    borderWidth: 1.5,
                    borderRadius: 4
                },
                {
                    label: state.language === 'ur' ? 'اخراجات (خرچ)' : 'Outlays (Expenses)',
                    data: expenseData,
                    backgroundColor: 'rgba(230, 57, 70, 0.85)',
                    borderColor: 'var(--danger-color)',
                    borderWidth: 1.5,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { family: 'Outfit', size: 11 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: Rs. ${context.raw.toLocaleString('en-US')}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    ticks: {
                        callback: function(value) {
                            return 'Rs.' + (value >= 1000 ? (value / 1000) + 'k' : value);
                        }
                    }
                }
            }
        }
    });
}

// Render Outlay category pie chart using Chart.js
function renderCategoryChart() {
    const canvas = document.getElementById('categoryChart');
    if (!canvas) return;
    
    if (state.categoryChartInstance) {
        state.categoryChartInstance.destroy();
    }
    
    const filteredTxs = getFilteredTransactions();
    
    const catMap = {};
    filteredTxs.forEach(tx => {
        if (tx.type === 'expense') {
            catMap[tx.category] = (catMap[tx.category] || 0) + tx.amount;
        }
    });
    
    const labels = Object.keys(catMap);
    const data = Object.values(catMap);
    
    if (labels.length === 0) {
        labels.push(state.language === 'ur' ? "اخراجات نہیں ہیں" : "No Expenses");
        data.push(1);
    }
    
    const translatedLabels = labels.map(label => {
        if (state.language === 'ur') {
            return CATEGORY_TRANSLATIONS[label] || label;
        }
        return label;
    });
    
    const ctx = canvas.getContext('2d');
    state.categoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: translatedLabels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#2ec4b6', // Groceries (mint)
                    '#ff9f1c', // Packaging (orange)
                    '#3a86c8', // Logistics (blue)
                    '#d4a373', // Eidi (gold)
                    '#e63946', // Medical (red)
                    '#9b5de5', // Equipment (purple)
                    '#8d99ae'  // Other (grey)
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: { family: 'Outfit', size: 11 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.label === "No Expenses" || context.label === "اخراجات نہیں ہیں") {
                                return state.language === 'ur' ? "کوئی خرچ ریکارڈ نہیں کیا گیا۔" : "No outlays recorded in this scope.";
                            }
                            const val = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = ((val / total) * 100).toFixed(1);
                            return `${context.label}: Rs. ${val.toLocaleString('en-US')} (${pct}%)`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// Backup Utilities: Export ledger data as JSON Backup
function exportDataJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.transactions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `al_wahab_trust_ledger_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

// Backup Utilities: Import ledger data from JSON Backup
function importDataJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const imported = JSON.parse(evt.target.result);
            if (Array.isArray(imported)) {
                const isValid = imported.every(tx => tx.id && tx.date && tx.notes && tx.amount);
                if (isValid) {
                    state.transactions = imported;
                    saveDatabase();
                    initTimeline();
                    updateUI();
                    alert("Database backup restored successfully!");
                } else {
                    alert("Import failed: JSON file contains invalid transaction records.");
                }
            } else {
                alert("Import failed: Backup file must contain a JSON array of records.");
            }
        } catch (err) {
            alert("Import failed: File is not a valid JSON structure.");
        }
    };
    reader.readAsText(file);
}

// Backup Utilities: Export ledger data as Excel compatible CSV
function exportDataCSV() {
    const headers = ["ID", "Date", "Type", "Notes", "Category", "Cash In (Intake)", "Cash Out (Outlay)", "Balance"];
    
    const sortedTxs = [...state.transactions].sort((a, b) => a.date.localeCompare(b.date));
    
    let csvRows = [headers.join(",")];
    
    let runningBalance = 0;
    
    sortedTxs.forEach(tx => {
        const cashIn = tx.type === 'income' ? Math.round(tx.amount) : 0;
        const cashOut = tx.type === 'expense' ? Math.round(tx.amount) : 0;
        runningBalance += (cashIn - cashOut);
        
        const sanitizedNotes = `"${(state.viewMode === 'public' && tx.type === 'income' ? tx.maskedNotes : tx.notes).replace(/"/g, '""')}"`;
        
        const row = [
            tx.id,
            tx.date,
            tx.type.toUpperCase(),
            sanitizedNotes,
            tx.category,
            cashIn,
            cashOut,
            runningBalance
        ];
        csvRows.push(row.join(","));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join("\n"));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", csvContent);
    downloadAnchor.setAttribute("download", `al_wahab_trust_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

// ==========================================
// Admin Edit Transaction modal controls (Slide-Up Bottom Sheet layout)
// ==========================================

state.tempEditReceipt = null;

function openEditTxModal(txId) {
    const tx = state.transactions.find(t => t.id === txId);
    if (!tx) return;
    
    elements.editFormId.value = tx.id;
    elements.editFormDate.value = tx.date;
    elements.editFormType.value = tx.type;
    elements.editFormNotes.value = tx.notes || '';
    elements.editFormAmount.value = tx.amount;
    elements.editFormCategory.value = tx.category;
    
    state.tempEditReceipt = tx.receipt;
    
    toggleEditFormNotesLabel();
    updateEditFormReceiptPreview();
    
    if (elements.editTxModal) {
        elements.editTxModal.classList.add('active');
        history.pushState({modal: 'edit'}, '');
    }
}

function closeEditTxModal(e) {
    if (e) e.stopPropagation();
    if (elements.editTxModal.classList.contains('active')) {
        elements.editTxModal.classList.remove('active');
        state.tempEditReceipt = null;
        if (history.state && history.state.modal === 'edit') {
            history.back();
        }
    }
}

function toggleEditFormNotesLabel() {
    const isUr = state.language === 'ur';
    const type = elements.editFormType.value;
    const t = TRANSLATIONS[state.language];
    
    if (type === 'income') {
        elements.editFormNotesLabel.innerText = t.lblEditNotesIncome;
        elements.editFormNotes.placeholder = isUr ? "مثلاً: یاسر یا سعد" : "e.g., Yasir or Saad";
    } else {
        elements.editFormNotesLabel.innerText = t.lblEditNotesExpense;
        elements.editFormNotes.placeholder = isUr ? "مثلاً: سبزیوں کی خریداری" : "e.g., Vegetable Purchase (32kg Potatoes...)";
    }
}

function updateEditFormReceiptPreview() {
    if (state.tempEditReceipt) {
        let imgSrc = '';
        if (state.tempEditReceipt.startsWith('data:')) {
            imgSrc = state.tempEditReceipt;
        } else {
            imgSrc = "data/" + state.tempEditReceipt;
        }
        
        elements.editReceiptThumbnail.src = imgSrc;
        elements.editReceiptPreviewContainer.style.display = 'flex';
        elements.editReceiptUploadContainer.style.display = 'none';
        elements.editReceiptUpload.value = '';
    } else {
        elements.editReceiptThumbnail.src = '';
        elements.editReceiptPreviewContainer.style.display = 'none';
        elements.editReceiptUploadContainer.style.display = 'block';
        elements.editReceiptUpload.value = '';
    }
}

function handleEditReceiptUploadChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(evt) {
        state.tempEditReceipt = evt.target.result;
        updateEditFormReceiptPreview();
    };
    reader.readAsDataURL(file);
}

function removeEditFormReceipt() {
    state.tempEditReceipt = null;
    updateEditFormReceiptPreview();
}

function handleEditTransactionSubmit(e) {
    e.preventDefault();
    
    const txId = elements.editFormId.value;
    const dateVal = elements.editFormDate.value;
    const typeVal = elements.editFormType.value;
    const notesVal = elements.editFormNotes.value;
    const amountVal = parseFloat(elements.editFormAmount.value);
    const categoryVal = elements.editFormCategory.value;
    
    if (!dateVal || isNaN(amountVal) || amountVal <= 0) {
        alert("Please provide a valid date and numeric amount.");
        return;
    }
    
    const tx = state.transactions.find(t => t.id === txId);
    if (!tx) {
        alert("Transaction not found in database.");
        return;
    }
    
    let maskedVal = notesVal;
    if (typeVal === 'income') {
        const parts = notesVal.split(' ');
        if (parts.length === 1) {
            maskedVal = parts[0].length > 2 ? `${parts[0].substring(0, 2)}*** Donation` : 'Anonymous Donation';
        } else {
            maskedVal = `${parts[0]} ${parts[parts.length - 1][0]}.*** Donation`;
        }
    }
    
    tx.date = dateVal;
    tx.originalDate = formatDateISOToOriginal(dateVal);
    tx.notes = notesVal;
    tx.maskedNotes = maskedVal;
    tx.type = typeVal;
    tx.category = categoryVal;
    tx.amount = amountVal;
    tx.receipt = state.tempEditReceipt;
    
    saveDatabase();
    initTimeline();
    updateUI();
    
    closeEditTxModal();
    
    const isUr = state.language === 'ur';
    alert(isUr ? "اندراج کو کامیابی سے اپ ڈیٹ کر دیا گیا ہے!" : "Transaction record has been successfully updated!");
}

function handleDeleteTransaction() {
    const isUr = state.language === 'ur';
    const confirmMsg = isUr 
        ? "کیا آپ واقعی اس انٹری کو مستقل طور پر حذف کرنا چاہتے ہیں؟" 
        : "Are you sure you want to delete this transaction entry permanently?";
        
    if (!confirm(confirmMsg)) return;
    
    const txId = elements.editFormId.value;
    const index = state.transactions.findIndex(t => t.id === txId);
    if (index === -1) {
        alert("Transaction not found.");
        return;
    }
    
    state.transactions.splice(index, 1);
    
    saveDatabase();
    initTimeline();
    updateUI();
    
    closeEditTxModal();
    
    alert(isUr ? "اندراج کامیابی سے حذف کر دیا گیا ہے!" : "Transaction entry has been successfully deleted!");
}
