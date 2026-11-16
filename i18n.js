let currentLang = localStorage.getItem("lang") || "vi";
let dictionary = null;

async function ensureDictionary() {
    if (dictionary) return dictionary;
    const res = await fetch("i18n-dict.json");
    if (!res.ok) throw new Error("Failed to load i18n-dict.json");
    dictionary = await res.json();
    return dictionary;
}

async function applyLanguage(lang) {
    const dict = await ensureDictionary();
    if (!dict[lang]) return;

    document.documentElement.lang = lang;
    if (dict[lang]["title"]) {
        document.title = dict[lang]["title"];
    }

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[lang][key]) {
            el.innerHTML = dict[lang][key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dict[lang][key]) {
            el.placeholder = dict[lang][key];
        }
    });

    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
        langBtn.textContent = lang === "en" ? "EN | VI" : "VI | EN";
    }

    localStorage.setItem("lang", lang);
    currentLang = lang;
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.documentElement.dataset.ssr !== currentLang) {
        applyLanguage(currentLang).catch(err => console.error("i18n error:", err));
    }

    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
        langBtn.textContent = currentLang === "en" ? "EN | VI" : "VI | EN";
        langBtn.addEventListener("click", () => {
            const newLang = currentLang === "en" ? "vi" : "en";
            applyLanguage(newLang).catch(err => console.error("i18n switch error:", err));
        });
    }

    // --- GCLID Tracking Logic ---
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const gclid = urlParams.get("gclid");
        if (gclid) {
            localStorage.setItem("mkt_gclid", gclid);
        }

        const savedGclid = localStorage.getItem("mkt_gclid");
        if (savedGclid) {
            document.querySelectorAll('a[href*="zalo.me"]').forEach(link => {
                try {
                    const url = new URL(link.href);
                    url.searchParams.set("src", "gclid_" + savedGclid);
                    link.href = url.toString();
                } catch (e) {
                    // Ignore invalid URLs
                }
            });
        }
    } catch (err) {
        console.error("Error in GCLID tracking:", err);
    }
});
