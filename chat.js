document.addEventListener("DOMContentLoaded", () => {
    const chatBtn = document.getElementById("chat-btn");
    const chatWindow = document.getElementById("chat-window");
    const closeChat = document.getElementById("close-chat");
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    if (!chatBtn || !chatWindow || !closeChat || !chatBody || !chatInput || !sendBtn) {
        return;
    }

    const ZALO_OA_URL = "https://zalo.me/hellodoctors";
    const QUIZ_URL = "https://hellodoctors.vn/trac-nghiem";

    const getLang = () => {
        if (typeof currentLang !== "undefined") return currentLang;
        return localStorage.getItem("lang") || "vi";
    };

    const getZaloHref = () => {
        try {
            const savedGclid = localStorage.getItem("mkt_gclid");
            if (savedGclid) {
                const u = new URL(ZALO_OA_URL);
                u.searchParams.set("src", "gclid_" + savedGclid);
                return u.toString();
            }
        } catch (e) {
            // Ignore URL errors
        }
        return ZALO_OA_URL;
    };

    const ensureLiveCtaBar = () => {
        if (chatWindow.querySelector(".chat-live-cta-bar")) return;
        const bar = document.createElement("div");
        bar.className = "chat-live-cta-bar";
        const isVi = getLang() !== "en";

        const label = document.createElement("span");
        label.style.color = "#166534";
        label.style.fontWeight = "600";
        label.textContent = isVi
            ? "Bản web chỉ minh họa luồng:"
            : "Web widget is flow demo:";

        const link = document.createElement("a");
        link.href = getZaloHref();
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = isVi ? "Trải nghiệm AI Thật trên Zalo" : "Try Live AI on Zalo";

        bar.appendChild(label);
        bar.appendChild(link);

        const footer = chatWindow.querySelector(".chat-footer");
        if (footer) {
            chatWindow.insertBefore(bar, footer);
        } else {
            chatWindow.appendChild(bar);
        }
    };

    const initChatContent = () => {
        const isVi = getLang() !== "en";

        const notice = document.createElement("div");
        notice.className = "chat-demo-notice";
        notice.textContent = isVi
            ? "Lưu ý minh bạch: Đây là khung Demo minh họa kịch bản trên trang thông tin. Để trò chuyện trực tiếp với Trợ lý AI Sức khỏe Tinh thần 5 lớp thực tế 24/7, vui lòng mở Zalo OA Hello Doctor."
            : "Transparency notice: This web widget demonstrates sample triage flows only. To chat directly with our live 5-layer Mental Health AI Assistant 24/7, please open Hello Doctor Zalo OA.";
        chatBody.appendChild(notice);

        const welcome = isVi
            ? "Xin chào! Tôi có thể minh họa luồng sàng lọc Sức khỏe Tinh thần (PHQ-9, GAD-7, ISI), phát hiện kiệt sức nghề nghiệp hoặc cảnh báo khủng hoảng. Bạn có thể chọn nhanh một tình huống mẫu bên dưới:"
            : "Hello! I can demonstrate our Mental Health screening flow (PHQ-9, GAD-7, ISI), burnout support, or crisis safety alerts. Try a sample scenario below:";
        addMessage("bot", welcome);

        const chipsWrap = document.createElement("div");
        chipsWrap.className = "chat-demo-chips";

        const samples = isVi
            ? [
                  "Mất ngủ, lo âu kéo dài",
                  "Áp lực công việc, kiệt sức (Burnout)",
                  "Căng thẳng, bế tắc (Cảnh báo khẩn cấp)"
              ]
            : [
                  "Insomnia & prolonged anxiety",
                  "Work stress & burnout",
                  "Severe crisis / self-harm alert"
              ];

        samples.forEach((sampleText) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "chat-demo-chip";
            btn.textContent = sampleText;
            btn.addEventListener("click", () => {
                chatInput.value = sampleText;
                sendMessage();
            });
            chipsWrap.appendChild(btn);
        });

        chatBody.appendChild(chipsWrap);
        ensureLiveCtaBar();
    };

    chatBtn.addEventListener("click", () => {
        chatWindow.classList.toggle("hidden");
        if (!chatWindow.classList.contains("hidden")) {
            chatInput.focus();
            if (chatBody.children.length === 0) {
                initChatContent();
            }
        }
    });

    closeChat.addEventListener("click", () => {
        chatWindow.classList.add("hidden");
    });

    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage("user", text);
        chatInput.value = "";

        const typingId = addTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator(typingId);
            const result = getDemoFlowResponse(text);
            addMessage("bot", result.text, result.links);
        }, 700 + Math.random() * 400);
    };

    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function addMessage(sender, text, links = []) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-bubble ${sender}`;
        msgDiv.textContent = text;

        if (Array.isArray(links) && links.length > 0) {
            const actionsDiv = document.createElement("div");
            actionsDiv.style.marginTop = "10px";
            actionsDiv.style.display = "flex";
            actionsDiv.style.flexWrap = "wrap";
            actionsDiv.style.gap = "6px";

            links.forEach((item) => {
                const a = document.createElement("a");
                a.href = item.url;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.textContent = item.label;
                a.style.display = "inline-block";
                a.style.padding = "5px 10px";
                a.style.borderRadius = "14px";
                a.style.fontSize = "12px";
                a.style.fontWeight = "600";
                a.style.textDecoration = "none";
                a.style.background = item.primary ? "#0068FF" : "#E0F2FE";
                a.style.color = item.primary ? "#FFFFFF" : "#0369A1";
                actionsDiv.appendChild(a);
            });
            msgDiv.appendChild(actionsDiv);
        }

        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addTypingIndicator() {
        const id = "typing-" + Date.now();
        const msgDiv = document.createElement("div");
        msgDiv.className = "chat-bubble bot ai-generating";
        msgDiv.id = id;
        const isVi = getLang() !== "en";
        msgDiv.innerHTML = `<i class="ph ph-sparkle"></i> ` + (isVi ? "Đang mô phỏng luồng AI..." : "Simulating AI triage flow...");
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function getDemoFlowResponse(userInput) {
        const input = userInput.toLowerCase();
        const isVi = getLang() !== "en";
        const zaloHref = getZaloHref();

        // 1. Emergency / Self-harm red flag demo
        if (
            input.includes("tự hại") ||
            input.includes("tự tử") ||
            input.includes("chết") ||
            input.includes("bế tắc") ||
            input.includes("khẩn cấp") ||
            input.includes("self-harm") ||
            input.includes("suicide") ||
            input.includes("crisis")
        ) {
            return {
                text: isVi
                    ? "[Minh họa Lớp 1 — Cảnh báo Khẩn cấp EMERGENCY]: Khi nhận diện tín hiệu nguy cơ tự hại/khủng hoảng, hệ thống lập tức ngắt kịch bản thông thường, không gợi ý bán hàng và hiển thị kênh cứu hộ ngay: Gọi khẩn cấp 115 hoặc Tổng đài Y tế 1900 1246 để kết nối nhân sự chuyên môn hỗ trợ ngay."
                    : "[Layer 1 Demo — EMERGENCY Alert]: Upon detecting self-harm/crisis risk, the system immediately halts standard flows and surfaces urgent support: Call Emergency 115 or Medical Hotline 1900 1246 immediately.",
                links: [
                    { label: isVi ? "Gọi 1900 1246" : "Call 1900 1246", url: "tel:19001246", primary: true },
                    { label: isVi ? "Mở Zalo OA (AI thật)" : "Open Zalo OA (Live AI)", url: zaloHref, primary: false }
                ]
            };
        }

        // 2. Work stress / Burnout / Occupational mental health demo
        if (
            input.includes("burnout") ||
            input.includes("kiệt sức") ||
            input.includes("áp lực") ||
            input.includes("công việc") ||
            input.includes("nghề nghiệp") ||
            input.includes("stress")
        ) {
            return {
                text: isVi
                    ? "[Minh họa Phân hệ Sức khỏe Tinh thần Nơi làm việc]: AI ghi nhận mức độ căng thẳng nghề nghiệp, gợi ý đánh giá nhanh bằng thang đo PSS-10 / DASS-21 ẩn danh và hướng dẫn bài tập thư giãn nhận thức (CBT) 5–10 phút mỗi ngày. Trải nghiệm đầy đủ trên Zalo OA thật."
                    : "[Workplace Mental Health Demo]: The AI tracks occupational stress indicators, offers anonymous PSS-10 / DASS-21 screening, and guides brief CBT relaxation exercises. Experience the live 5-layer assistant on Zalo OA.",
                links: [
                    { label: isVi ? "Chat AI thật trên Zalo OA" : "Chat Live AI on Zalo OA", url: zaloHref, primary: true },
                    { label: isVi ? "Làm Test PSS-10 / DASS-21" : "Take PSS-10 / DASS-21", url: QUIZ_URL, primary: false }
                ]
            };
        }

        // 3. Mental Health / PHQ-9 / GAD-7 / Insomnia demo
        if (
            input.includes("mất ngủ") ||
            input.includes("lo âu") ||
            input.includes("trầm cảm") ||
            input.includes("buồn") ||
            input.includes("phq") ||
            input.includes("gad") ||
            input.includes("insomnia") ||
            input.includes("anxiety")
        ) {
            return {
                text: isVi
                    ? "[Minh họa Phân hệ Sàng lọc Tâm lý]: AI ghi nhận triệu chứng lo âu/giấc ngủ, tuyệt đối không tự ý chẩn đoán hay kê đơn, mà mời bạn thực hiện thang đo chuẩn hóa (PHQ-9, GAD-7, ISI) trên WebForm bảo mật và kết nối Zalo OA để hệ thống AI 5 lớp thực tế đồng hành hoặc đặt lịch bác sĩ chuyên khoa."
                    : "[Mental Health Screening Demo]: Instead of diagnosing or prescribing, the AI records symptom context, invites you to complete validated clinical scales (PHQ-9, GAD-7, ISI) securely, and connects to our live 5-layer AI on Zalo OA.",
                links: [
                    { label: isVi ? "Trải nghiệm AI Thật (Zalo OA)" : "Try Live AI (Zalo OA)", url: zaloHref, primary: true },
                    { label: isVi ? "Làm Test PHQ-9 / GAD-7" : "Take PHQ-9 / GAD-7", url: QUIZ_URL, primary: false }
                ]
            };
        }

        // Default demo guidance
        return {
            text: isVi
                ? "Đây là khung Demo minh họa trên trang thông tin. Để tương tác trực tiếp với Trợ lý AI Sức khỏe Tinh thần 5 lớp thực tế (sàng lọc trầm cảm, lo âu, mất ngủ, stress nghề nghiệp và làm thang đo PHQ-9/GAD-7), mời bạn mở Zalo OA chính thức hoặc trang Trắc nghiệm Y khoa bên dưới."
                : "This widget is an interactive flow demo. To converse directly with our live 5-layer Mental Health AI Assistant (screening for depression, anxiety, insomnia, burnout, and PHQ-9/GAD-7 scales), please open our official Zalo OA or Clinical Screening portal below.",
            links: [
                { label: isVi ? "Mở Zalo OA (AI Thật 24/7)" : "Open Zalo OA (Live AI 24/7)", url: zaloHref, primary: true },
                { label: isVi ? "Làm Test Sàng lọc" : "Clinical Screening", url: QUIZ_URL, primary: false }
            ]
        };
    }
});
