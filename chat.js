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
                 addMessage("bot", "Xin chào! Tôi là Trợ lý AI chuyên về Sức khoẻ tinh thần của Hello Doctor. Bạn đang cảm thấy thế nào, có gặp căng thẳng hay áp lực gì muốn chia sẻ không?");
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
        if (input.includes("căng thẳng") || input.includes("buồn") || input.includes("stress") || input.includes("mệt mỏi") || input.includes("áp lực") || input.includes("lo âu")) {
            conversationStep = 1;
            return "Tôi rất tiếc khi nghe bạn đang trải qua cảm giác này. Những cảm xúc này xuất hiện từ bao giờ? Nó có ảnh hưởng nhiều đến giấc ngủ hay sinh hoạt hàng ngày của bạn không?";
        }
        if (conversationStep === 1) {
            conversationStep = 2;
            return "Cảm ơn bạn đã dũng cảm chia sẻ. Sức khoẻ tinh thần rất quan trọng và bạn không đơn độc. Hệ thống đã tạo hồ sơ tham vấn (EMR) an toàn. Một chuyên gia tâm lý sẽ sớm liên hệ qua Zalo để hỗ trợ bạn sâu hơn nhé.";
        }
        return "Tôi luôn ở đây để lắng nghe không phán xét. Bạn có thể chia sẻ thêm về những suy nghĩ đang diễn ra trong đầu bạn lúc này không?";
    }
});
