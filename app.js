// Al Wahab Trust Transparency Portal - Application Logic

// Historical packages mapper for absolute accuracy of distributed packages
const HISTORICAL_PACKAGES = {
    "tx_17": 11,  // 11 package 📦 (17-Oct-2025)
    "tx_25": 7,   // November Package 📦 (01-Dec-2025) - Estimated from 21k cost
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
        brandSub: "Financial Transparency Ledger &bull; Aujla Khurd, Pakistan",
        heroDesc: "<strong>Empowering Our Village:</strong> Welcome to the Al Wahab Trust financial ledger. We raise donations primarily from overseas and local supporters, purchasing vital life necessities (potatoes, onions, sugar, flour, ghee, spices) in wholesale markets, packing them into individual relief bags, and distributing them to needy households in Aujla Khurd. This portal is created to ensure absolute transparency. Explore the month-by-month transactions and click the receipt buttons to view the actual bank/EasyPaisa receipts or physical paper bills.",
        langBtn: "اردو",
        viewPublic: "Public View",
        viewAdmin: "Admin View",
        lblTotalIncome: "Total Intakes (Donations)",
        lblTotalExpense: "Total Outlays (Expenses)",
        lblBalance: "Remaining Balance",
        lblPackages: "Bags Distributed",
        metaBalance: "Net cash in hand",
        metaPackages: "Food relief packages",
        lblFilterMonth: "Filter by Month",
        btnExport: "Export to Excel (CSV)",
        thDate: "Date",
        thType: "Type",
        thDesc: "Description",
        thCat: "Category",
        thAmount: "Amount (PKR)",
        thReceipt: "Receipt",
        searchPlaceholder: "Search description, items, or notes...",
        tabAll: "All Entries",
        tabIncome: "Intakes (Donations)",
        tabExpense: "Outlays (Expenses)",
        donationsReceived: "donations received",
        outlaysMade: "outlays made",
        allTime: "All Time",
        entries: "entries",
        intake: "Intake",
        outlay: "Outlay",
        viewReceipt: "View Receipt",
        noReceipt: "No Receipt",
        linkFile: "Link File"
    },
    ur: {
        brandTitle: "الوہاب ٹرسٹ",
        brandSub: "فنانشل ٹرانسپیرنسی لیجر • اوجلہ خورد، پاکستان",
        heroDesc: "<strong>ہمارے گاؤں کی بہبود:</strong> الوہاب ٹرسٹ کے مالیاتی کھاتے (لیجر) میں خوش آمدید۔ ہم بنیادی طور پر بیرون ملک اور مقامی مخیر حضرات سے عطیات جمع کرتے ہیں، ہول سیل منڈیوں سے ضروریات زندگی (آلو، پیاز، چینی، آٹا، گھی، مصالحے) خریدتے ہیں، انہیں راشن بیگز میں پیک کرتے ہیں اور اوجلہ خورد کے مستحق گھرانوں میں تقسیم کرتے ہیں۔ یہ پورٹل مکمل شفافیت کے لیے بنایا گیا ہے۔ آپ مہینہ وار لین دین کی تفصیلات دیکھ سکتے ہیں اور اصل بینک یا ایزی پیسہ کی رسیدیں اور کاغذی بل دیکھنے کے لیے بٹن پر کلک کر سکتے ہیں۔",
        langBtn: "English",
        viewPublic: "عوامی منظر (پبلک)",
        viewAdmin: "انتظامی منظر (ایڈمن)",
        lblTotalIncome: "کل عطیات (آمدن)",
        lblTotalExpense: "کل اخراجات (خرچ)",
        lblBalance: "بقیہ رقم (بیلنس)",
        lblPackages: "تقسیم شدہ راشن بیگز",
        metaBalance: "کل دستیاب رقم",
        metaPackages: "امدادی راشن بیگز",
        lblFilterMonth: "مہینے کے لحاظ سے فلٹر کریں",
        btnExport: "ایکسل شیٹ ڈاؤن لوڈ کریں",
        thDate: "تاریخ",
        thType: "قسم",
        thDesc: "تفصیل",
        thCat: "کیٹیگری",
        thAmount: "رقم (پاکستانی روپے)",
        thReceipt: "رسید",
        searchPlaceholder: "تفصیل، اشیاء یا نوٹس تلاش کریں...",
        tabAll: "تمام انٹریز",
        tabIncome: "عطیات (آمدن)",
        tabExpense: "اخراجات (خرچ)",
        donationsReceived: "عطیات موصول ہوئے",
        outlaysMade: "اخراجات کیے گئے",
        allTime: "کل مدت",
        entries: "انٹریز",
        intake: "آمدن",
        outlay: "خرچ",
        viewReceipt: "رسید دیکھیں",
        noReceipt: "رسید نہیں ہے",
        linkFile: "فائل لنک کریں"
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
    categoryChartInstance: null
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
    tableBody: document.getElementById('ledger-table-body'),
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
    formNotes: document.getElementById('form-notes')
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
    if (confirm("Are you sure you want to reset all transaction records to the default seed data? Any manually added transactions will be deleted.")) {
        localStorage.removeItem('awt_transactions');
        loadDatabase();
        initTimeline();
        state.currentMonthFilter = 'all';
        updateUI();
        alert("Database has been reset to defaults.");
    }
}

// Generate Month Timeline elements dynamically
function initTimeline() {
    const isUr = state.language === 'ur';
    const allTimeLabel = isUr ? 'کل مدت' : 'All Time';
    const entriesLabel = isUr ? 'انٹریز' : 'entries';
    
    // Collect all unique months in YYYY-MM format
    const monthsSet = new Set();
    state.transactions.forEach(tx => {
        if (tx.date) {
            monthsSet.add(tx.date.substring(0, 7)); // get YYYY-MM
        }
    });
    
    const sortedMonths = Array.from(monthsSet).sort();
    
    // Build HTML contents for timeline
    let timelineHTML = `
        <div class="timeline-item ${state.currentMonthFilter === 'all' ? 'active' : ''}" data-month="all" onclick="selectMonth('all')">
            ${allTimeLabel}
            <span>${state.transactions.length} ${entriesLabel}</span>
        </div>
    `;
    
    sortedMonths.forEach(m => {
        const dateObj = new Date(m + "-02"); // Add day to avoid timezone conversion offsets
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
    
    // Toggle active class on elements
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
        // Show passcode prompt
        elements.adminPasscodeModal.classList.add('active');
        elements.adminPasscodeInput.value = '';
        elements.adminErrorMsg.style.display = 'none';
        elements.adminPasscodeInput.focus();
    } else if (mode === 'public') {
        state.viewMode = 'public';
        document.getElementById('btn-public-view').classList.add('active');
        document.getElementById('btn-admin-view').classList.remove('active');
        elements.adminPanel.classList.remove('active');
        updateUI();
    }
}

function submitAdminUnlock() {
    const pw = elements.adminPasscodeInput.value;
    if (pw === '1234') {
        state.viewMode = 'admin';
        document.getElementById('btn-admin-view').classList.add('active');
        document.getElementById('btn-public-view').classList.remove('active');
        elements.adminPanel.classList.add('active');
        elements.adminPasscodeModal.classList.remove('active');
        updateUI();
    } else {
        elements.adminErrorMsg.style.display = 'block';
        elements.adminPasscodeInput.focus();
    }
}

// Trigger passcode submission on press of enter
elements.adminPasscodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitAdminUnlock();
    }
});

function cancelAdminUnlock() {
    elements.adminPasscodeModal.classList.remove('active');
    // keep state public
    document.getElementById('btn-public-view').classList.add('active');
    document.getElementById('btn-admin-view').classList.remove('active');
}

// Helper to check if notes label needs updating
function toggleFormNotesLabel() {
    const type = document.getElementById('form-type').value;
    if (type === 'income') {
        elements.formNotesLabel.innerText = "Donor Name";
        elements.formNotes.placeholder = "e.g., Yasir or Saad";
    } else {
        elements.formNotesLabel.innerText = "Expense Description / Notes";
        elements.formNotes.placeholder = "e.g., Vegetable Purchase (32kg Tomatoes...)";
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
    // Style balance red if negative
    if (balance < 0) {
        elements.balanceVal.style.color = 'var(--danger-color)';
    } else {
        elements.balanceVal.style.color = 'var(--text-main)';
    }
    
    elements.packagesVal.innerText = packagesDistributed.toLocaleString();
    
    // 2. Render Ledger Table
    renderLedgerTable(filteredTxs);
    
    // 3. Render Visual Charts
    renderCashflowChart();
    renderCategoryChart();
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

// Re-render data in ledger table based on filters
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

function renderLedgerTable(filteredTxs) {
    // Sort transactions reverse chronologically (newest first)
    const sortedTxs = [...filteredTxs].sort((a, b) => b.date.localeCompare(a.date));
    const isUr = state.language === 'ur';
    const t = TRANSLATIONS[state.language];
    
    let html = '';
    
    if (sortedTxs.length === 0) {
        html = `
            <tr>
                <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">
                    <i class="fa-solid fa-folder-open fa-2xl" style="display:block; margin-bottom:15px; opacity:0.4;"></i>
                    ${isUr ? 'کوئی اندراج نہیں ملا۔' : 'No entries found matching your criteria.'}
                </td>
            </tr>
        `;
    } else {
        sortedTxs.forEach(tx => {
            const dateStr = formatDate(tx.date);
            const badgeClass = tx.type === 'income' ? 'income' : 'expense';
            const badgeIcon = tx.type === 'income' ? 'plus' : 'minus';
            const badgeText = tx.type === 'income' ? t.intake : t.outlay;
            
            // Mask/Anonymize donor names in public view
            let notesDisplay = (state.viewMode === 'public' && tx.type === 'income') ? tx.maskedNotes : tx.notes;
            if (isUr && state.viewMode === 'public' && tx.type === 'income') {
                notesDisplay = translateDescription(notesDisplay, true);
            }
            
            const categoryDisplay = isUr ? (CATEGORY_TRANSLATIONS[tx.category] || tx.category) : tx.category;
            
            const amountClass = tx.type === 'income' ? 'income' : 'expense';
            const amountPrefix = tx.type === 'income' ? '+' : '-';
            const amountText = Math.round(tx.amount).toLocaleString('en-US');
            
            // Receipt Button configuration
            let receiptHTML = '';
            if (state.viewMode === 'public' && tx.type === 'income') {
                receiptHTML = `
                    <span style="color:var(--text-muted); font-size:13px; font-weight:500; display:inline-flex; align-items:center; gap:5px;">
                        <i class="fa-solid fa-user-shield"></i> ${isUr ? 'شناخت پوشیدہ' : 'Donor Hidden'}
                    </span>
                `;
            } else if (tx.receipt) {
                receiptHTML = `
                    <button class="receipt-trigger-btn" onclick="openReceiptModal('${tx.id}')">
                        <i class="fa-solid fa-file-invoice-dollar"></i> ${t.viewReceipt}
                    </button>
                `;
            } else {
                if (state.viewMode === 'admin') {
                    receiptHTML = `
                        <button class="receipt-trigger-btn" onclick="attachReceiptPrompt('${tx.id}')" style="background:var(--accent-light); border-color:var(--accent-color); color:#8d5e2d;">
                            <i class="fa-solid fa-paperclip"></i> ${t.linkFile}
                        </button>
                    `;
                } else {
                    receiptHTML = `
                        <button class="receipt-trigger-btn no-receipt" disabled>
                            <i class="fa-solid fa-ban"></i> ${t.noReceipt}
                        </button>
                    `;
                }
            }
            
            html += `
                <tr id="row-${tx.id}">
                    <td style="font-weight: 500;">${dateStr}</td>
                    <td>
                        <span class="badge ${badgeClass}">
                            <i class="fa-solid fa-${badgeIcon}"></i> ${badgeText}
                        </span>
                    </td>
                    <td style="max-width: 320px; font-size:14px; word-break: break-word;">${notesDisplay}</td>
                    <td><span class="cat-tag">${categoryDisplay}</span></td>
                    <td class="amount-text ${amountClass}" style="text-align: right;">${amountPrefix} Rs. ${amountText}</td>
                    <td>${receiptHTML}</td>
                </tr>
            `;
        });
    }
    
    elements.tableBody.innerHTML = html;
    
    // Format ledger title translation
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
    
    // Toggle class on body
    if (state.language === 'ur') {
        document.body.classList.add('lang-ur');
    } else {
        document.body.classList.remove('lang-ur');
    }
    
    // Update DOM static labels
    const t = TRANSLATIONS[state.language];
    document.getElementById('brand-main-title').innerText = t.brandTitle;
    document.getElementById('brand-sub-title').innerHTML = t.brandSub;
    document.getElementById('hero-desc-text').innerHTML = t.heroDesc;
    document.getElementById('lang-btn-text').innerText = t.langBtn;
    document.getElementById('view-public-text').innerText = t.viewPublic;
    document.getElementById('view-admin-text').innerText = t.viewAdmin;
    document.getElementById('label-total-income').innerText = t.lblTotalIncome;
    document.getElementById('label-total-expense').innerText = t.lblTotalExpense;
    document.getElementById('label-balance').innerText = t.lblBalance;
    document.getElementById('label-balance-meta').innerText = t.metaBalance;
    document.getElementById('label-packages').innerText = t.lblPackages;
    document.getElementById('label-packages-meta').innerText = t.metaPackages;
    document.getElementById('label-filter-month').innerText = t.lblFilterMonth;
    document.getElementById('btn-export-text').innerText = t.btnExport;
    
    document.getElementById('th-date').innerText = t.thDate;
    document.getElementById('th-type').innerText = t.thType;
    document.getElementById('th-desc').innerText = t.thDesc;
    document.getElementById('th-cat').innerText = t.thCat;
    document.getElementById('th-amount').innerText = t.thAmount;
    document.getElementById('th-receipt').innerText = t.thReceipt;
    
    document.getElementById('search-bar').placeholder = t.searchPlaceholder;
    
    document.getElementById('tab-all').innerText = t.tabAll;
    document.getElementById('tab-income').innerText = t.tabIncome;
    document.getElementById('tab-expense').innerText = t.tabExpense;
    
    // Re-initialize month filter elements to update entries texts (e.g. 'entries' word in timeline)
    initTimeline();
    
    // Re-render dashboard totals and entries list
    updateUI();
}

// Filter ledger search triggers
function handleFilterChange() {
    state.searchQuery = elements.searchBar.value;
    updateUI();
}

function setLedgerFilter(typeStr) {
    state.currentTypeFilter = typeStr;
    
    // Toggle active state on tabs
    const tabs = ['all', 'income', 'expense'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (t === typeStr) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    updateUI();
}

// Receipt Modal Controls
function openReceiptModal(txId) {
    const tx = state.transactions.find(t => t.id === txId);
    if (!tx) return;
    
    elements.receiptTitle.innerText = `${tx.type === 'income' ? 'Intake' : 'Outlay'} Entry Details`;
    
    let modalHTML = '';
    
    // Check if receipt exists
    if (tx.receipt) {
        let imgSrc = '';
        if (tx.receipt.startsWith('data:')) {
            imgSrc = tx.receipt; // Newly uploaded base64 data
        } else {
            imgSrc = "data/" + tx.receipt; // Seed JPEG local file reference
        }
        
        modalHTML = `
            <img src="${imgSrc}" class="modal-receipt-img" alt="Receipt Image">
            <div style="margin-top:10px;">
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
                        <span style="font-size:10px; color:#718096;">${notesLabel}:</span>
                        <p style="font-weight:bold; margin-top:3px; font-size:12px; line-height:1.4;">${maskedNotes}</p>
                    </div>
                    <div class="digital-item-row" style="margin-top:10px;">
                        <span>CATEGORY:</span>
                        <span>${tx.category.toUpperCase()}</span>
                    </div>
                </div>
                <div class="digital-total">
                    TOTAL AMOUNT: Rs. ${amountNum}
                </div>
                <div style="margin-top:30px; text-align:center; border-top:1px dashed #cbd5e0; padding-top:15px; font-size:10px; color:#718096; line-height:1.4;">
                    <i class="fa-solid fa-circle-check" style="color:#2ec4b6;"></i> Digitally Verified & Reconciled with Ledger. 
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
                <span>Notes / Notes</span>
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
}

function closeReceiptModal(e) {
    elements.receiptModal.classList.remove('active');
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
    
    // Mask notes logic
    // Mask helper
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
        
        // Re-render UI
        updateUI();
        
        // Reset form
        elements.addTxForm.reset();
        elements.formDate.value = new Date().toISOString().split('T')[0];
        toggleFormNotesLabel();
        
        alert("Transaction entry successfully added to the database!");
    };
    
    // If a file is uploaded, convert to base64
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
    
    // Destory existing instance
    if (state.cashflowChartInstance) {
        state.cashflowChartInstance.destroy();
    }
    
    // Find all months in database dynamically to represent full data
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
    
    // Format X labels (e.g. "Mar 2026")
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
                    label: 'Intakes (Donations)',
                    data: incomeData,
                    backgroundColor: 'rgba(46, 196, 182, 0.85)',
                    borderColor: 'var(--success-color)',
                    borderWidth: 1.5,
                    borderRadius: 4
                },
                {
                    label: 'Outlays (Expenses)',
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
                        font: { family: 'Outfit', size: 12 }
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
    
    // Destroy existing instance
    if (state.categoryChartInstance) {
        state.categoryChartInstance.destroy();
    }
    
    const filteredTxs = getFilteredTransactions();
    
    // Group expense by category
    const catMap = {};
    filteredTxs.forEach(tx => {
        if (tx.type === 'expense') {
            catMap[tx.category] = (catMap[tx.category] || 0) + tx.amount;
        }
    });
    
    const labels = Object.keys(catMap);
    const data = Object.values(catMap);
    
    // If no expenses, show empty chart state
    if (labels.length === 0) {
        labels.push("No Expenses");
        data.push(1);
    }
    
    const ctx = canvas.getContext('2d');
    state.categoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
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
                        font: { family: 'Outfit', size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.label === "No Expenses") return "No outlays recorded in this scope.";
                            const val = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = ((val / total) * 100).toFixed(1);
                            return `${context.label}: Rs. ${val.toLocaleString('en-US')} (${pct}%)`;
                        }
                    }
                }
            },
            cutout: '65%'
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
                // Perform quick structure validation
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
    
    // Sort transactions chronologically for standard ledger auditing
    const sortedTxs = [...state.transactions].sort((a, b) => a.date.localeCompare(b.date));
    
    let csvRows = [headers.join(",")];
    
    let runningBalance = 0;
    
    sortedTxs.forEach(tx => {
        const cashIn = tx.type === 'income' ? Math.round(tx.amount) : 0;
        const cashOut = tx.type === 'expense' ? Math.round(tx.amount) : 0;
        runningBalance += (cashIn - cashOut);
        
        // Sanitize notes text (remove quotes, commas) to prevent breaking CSV formatting
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
