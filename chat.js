document.addEventListener("DOMContentLoaded", () => {
    const chatBtn = document.getElementById("chat-btn");
    const chatWindow = document.getElementById("chat-window");
    const closeChat = document.getElementById("close-chat");
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    // Toggle chat window
    chatBtn.addEventListener("click", () => {
        chatWindow.classList.toggle("hidden");
        if (!chatWindow.classList.contains("hidden")) {
            chatInput.focus();
            if(chatBody.children.length === 0) {
                 addMessage("bot", "Xin chào! Tôi là Trợ lý AI của Hello Doctor. Bạn đang gặp vấn đề gì về sức khoẻ cần tôi tư vấn hôm nay?");
            }
        }
    });

    closeChat.addEventListener("click", () => {
        chatWindow.classList.add("hidden");
    });

    // Handle sending message
    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;
        
        addMessage("user", text);
        chatInput.value = "";
        
        // Show typing indicator
        const typingId = addTypingIndicator();
        
        // Simulate AI thinking and response
        setTimeout(() => {
            removeTypingIndicator(typingId);
            const response = getMockResponse(text);
            addMessage("bot", response);
        }, 1500 + Math.random() * 1000);
    };

    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function addMessage(sender, text) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-bubble ${sender}`;
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addTypingIndicator() {
        const id = "typing-" + Date.now();
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-bubble bot ai-generating`;
        msgDiv.id = id;
        msgDiv.innerHTML = `<i class="ph ph-sparkle"></i> AI đang phân tích...`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    // Mock responses for demo purposes
    let conversationStep = 0;
    function getMockResponse(userInput) {
        const input = userInput.toLowerCase();
        if (input.includes("đau") || input.includes("sốt") || input.includes("mệt")) {
            conversationStep = 1;
            return "Cảm ơn bạn đã thông tin. Triệu chứng này của bạn đã bắt đầu từ khi nào? Có kèm theo các dấu hiệu bất thường khác không?";
        }
        if (conversationStep === 1) {
            conversationStep = 2;
            return "Tôi đã ghi nhận thông tin và phân tích dữ liệu lâm sàng ban đầu. Hệ thống đã tạo bệnh án nháp EMR và chuyển cho Bác sĩ chuyên khoa. Bác sĩ sẽ liên hệ với bạn trong ít phút nữa qua Zalo nhé!";
        }
        return "Tôi hiểu. Bạn có thể cung cấp thêm chi tiết về tình trạng này không để tôi có dữ liệu phân tích và lên hồ sơ khám bệnh tốt nhất?";
    }
});
