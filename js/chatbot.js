/**
 * TKIS AI Chatbot - Smart School Assistant
 * Works offline with built-in knowledge base
 * Optional: Connect to Google Gemini API for advanced AI (free tier: 1500 req/day)
 */

class TKISChatbot {
    constructor() {
        this.container = null;
        this.window = null;
        this.messages = null;
        this.input = null;
        this.sendBtn = null;
        this.isOpen = false;
        this.conversationHistory = [];
        this.geminiApiKey = localStorage.getItem('tkis_gemini_key') || '';
        this.useGemini = false; // Set to true and add API key for AI responses
        
        this.knowledgeBase = [
            {
                keywords: ['admission', 'admit', 'enroll', 'join', 'apply', 'form', 'register'],
                response: `🎓 <b>Admissions at TKIS</b><br><br>
                Admissions are open for Academic Year 2026-27!<br><br>
                <b>Process:</b><br>
                1. Fill the online enquiry form<br>
                2. Visit campus for document verification<br>
                3. Entrance assessment (if applicable)<br>
                4. Fee payment & confirmation<br><br>
                <b>Required Documents:</b><br>
                • Birth Certificate<br>
                • Aadhaar Card<br>
                • Previous School Marksheets<br>
                • Transfer Certificate<br>
                • Passport Size Photos (4)<br><br>
                📞 Call us: <b>+91 93301 10019</b>`
            },
            {
                keywords: ['fee', 'fees', 'cost', 'price', 'payment', 'money', 'expensive', 'cheap'],
                response: `💰 <b>Fee Structure</b><br><br>
                Our fee structure is competitive and transparent:<br><br>
                <b>Admission Fee:</b> One-time (varies by class)<br>
                <b>Annual Fee:</b> ₹45,000 - ₹85,000 (depending on grade)<br>
                <b>Transport:</b> Optional, based on distance<br>
                <b>Uniform & Books:</b> Actual cost basis<br><br>
                🏦 <b>Online Fee Payment:</b> Available through our secure portal<br><br>
                📞 For detailed fee structure, call: <b>+91 93301 10019</b>`
            },
            {
                keywords: ['curriculum', 'cbse', 'board', 'syllabus', 'education', 'teach', 'study'],
                response: `📚 <b>CBSE Curriculum at TKIS</b><br><br>
                We follow the <b>Central Board of Secondary Education (CBSE)</b> curriculum - India's largest educational board.<br><br>
                <b>Key Highlights:</b><br>
                • STEM-based integrated learning<br>
                • NCERT-aligned textbooks<br>
                • Continuous Comprehensive Evaluation (CCE)<br>
                • Focus on conceptual understanding<br>
                • Preparation for JEE, NEET & other competitive exams<br><br>
                <b>Additional Programs:</b><br>
                • Robotics & AI Lab<br>
                • Foreign Languages (French, German)<br>
                • Public Speaking & Debate<br>
                • Olympiad Training`
            },
            {
                keywords: ['location', 'address', 'where', 'place', ' situated', 'reach', 'howrah', 'liluah'],
                response: `📍 <b>Our Location</b><br><br>
                <b>The Kolkata International School</b><br>
                Liluah, Howrah,<br>
                West Bengal - 711204<br><br>
                🚆 <b>Nearest Railway Station:</b> Liluah Railway Station (2 km)<br>
                🚌 <b>Bus Routes:</b> 2, 12, 56, 79<br><br>
                📞 <b>Contact:</b> +91 93301 10019<br>
                ✉️ <b>Email:</b> info@tkis.edu.in<br><br>
                🗺️ <a href="https://maps.google.com" target="_blank">View on Google Maps</a>`
            },
            {
                keywords: ['contact', 'phone', 'email', 'call', 'number', 'reach you'],
                response: `📞 <b>Contact Us</b><br><br>
                <b>Phone:</b> +91 93301 10019<br>
                <b>Email:</b> info@tkis.edu.in<br>
                <b>Office Hours:</b> Mon-Sat, 8:00 AM - 4:00 PM<br><br>
                <b>Social Media:</b><br>
                • Facebook: /thekolkatainternationalschool<br>
                • Instagram: @thekolkatainternational_school<br>
                • LinkedIn: The Kolkata International School<br>
                • YouTube: @TheKolkataInternationalschool<br><br>
                💬 <b>WhatsApp:</b> <a href="https://wa.me/919330110019" target="_blank">Click to Chat</a>`
            },
            {
                keywords: ['facility', 'infrastructure', 'lab', 'library', 'sports', 'classroom', 'building', 'campus'],
                response: `🏫 <b>World-Class Infrastructure</b><br><br>
                • 🏢 International Standard Buildings<br>
                • 💻 Digital Smart Classrooms (Projector + Interactive Board)<br>
                • 🔬 Well-Equipped Science Labs (Physics, Chemistry, Biology)<br>
                • 🤖 Robotics Lab & AI Center<br>
                • 📚 Modern Library with 10,000+ books<br>
                • 🏟️ Sports Arena (Cricket, Football, Basketball)<br>
                • 🏊 Kids Swimming Pool<br>
                • 🎭 Auditorium & Activity Hall<br>
                • 🌳 Lush Green Campus<br>
                • 🚌 GPS-enabled Transport Fleet<br>
                • 🍱 Hygienic Cafeteria`
            },
            {
                keywords: ['sports', 'game', 'cricket', 'football', 'basketball', 'swimming', 'athletic', 'physical'],
                response: `🏆 <b>Sports at TKIS</b><br><br>
                We believe in "Healthy Mind in Healthy Body"<br><br>
                <b>Facilities:</b><br>
                • Cricket Ground with practice nets<br>
                • Football Field<br>
                • Basketball Court<br>
                • Badminton Courts<br>
                • Kids Swimming Pool<br>
                • Indoor Games Room<br><br>
                <b>Training:</b><br>
                Professional coaches for each sport.<br>
                Annual Sports Day & Inter-House Competitions.<br><br>
                🏅 Many students have won district & state level championships!`
            },
            {
                keywords: ['teacher', 'staff', 'faculty', 'principal', 'educator', 'qualified'],
                response: `👨‍🏫 <b>Our Esteemed Faculty</b><br><br>
                • 150+ Highly Qualified Teachers<br>
                • Average Experience: 12+ years<br>
                • Regular CBSE Training Workshops<br>
                • Child Psychology Certified Counselors<br>
                • Dedicated Special Educators<br>
                • Foreign Language Experts<br><br>
                <b>Teacher-Student Ratio:</b> 1:25<br><br>
                Our teachers don't just teach - they mentor, inspire, and shape futures!`
            },
            {
                keywords: ['result', 'percentage', 'board exam', '10th', '12th', 'marks', 'topper', 'performance'],
                response: `🌟 <b>Outstanding Academic Results</b><br><br>
                <b>Class XII 2026:</b><br>
                • School Average: 92.4%<br>
                • 15 Students scored 95%+<br>
                • 100% Pass Rate (5th consecutive year)<br><br>
                <b>Class X 2026:</b><br>
                • School Average: 94.1%<br>
                • 28 Students scored 95%+<br>
                • 3 Students scored perfect 100 in Mathematics<br><br>
                🏆 <b>Our Toppers:</b><br>
                • Shreya Kumari (XII) - 98.2%<br>
                • Saswat Samal (X) - 99.0%<br><br>
                Many students have secured admissions in IITs, NITs, AIIMS & top universities abroad!`
            },
            {
                keywords: ['transport', 'bus', 'pickup', 'drop', 'van', 'vehicle', 'commute'],
                response: `🚌 <b>School Transport</b><br><br>
                GPS-enabled AC buses covering all major areas of Howrah & Kolkata.<br><br>
                <b>Safety Features:</b><br>
                • GPS Tracking (Parents can track live)<br>
                • CCTV inside buses<br>
                • Lady Attendant on every bus<br>
                • Speed Governor installed<br>
                • First Aid Kit available<br>
                • Fire Extinguisher equipped<br><br>
                <b>Routes:</b> Liluah, Belur, Bally, Howrah Station, Shibpur, Santragachi, and more.<br><br>
                📞 Transport Helpline: <b>+91 93301 10020</b>`
            },
            {
                keywords: ['hostel', 'boarding', 'stay', 'residential', 'dormitory', 'live'],
                response: `🏠 <b>Hostel Facility</b><br><br>
                TKIS provides comfortable boarding facilities for outstation students.<br><br>
                <b>Features:</b><br>
                • Separate wings for Boys & Girls<br>
                • AC & Non-AC rooms available<br>
                • Nutritious meals (4 times a day)<br>
                • 24/7 Security & CCTV<br>
                • Study hours with faculty supervision<br>
                • Medical room with nurse<br>
                • Weekend recreational activities<br><br>
                📞 Hostel Warden: <b>+91 93301 10021</b>`
            },
            {
                keywords: ['robotics', 'ai', 'artificial intelligence', 'coding', 'programming', 'computer', 'tech', 'technology'],
                response: `🤖 <b>Robotics & AI at TKIS</b><br><br>
                We prepare students for the future with cutting-edge technology education!<br><br>
                <b>Programs:</b><br>
                • LEGO Robotics (Grades 3-5)<br>
                • Arduino & Raspberry Pi (Grades 6-8)<br>
                • AI & Machine Learning Basics (Grades 9-12)<br>
                • Python, C++, Java Programming<br>
                • 3D Printing & Design<br>
                • Drone Technology Workshops<br><br>
                🏆 Our students have won multiple awards in national robotics competitions!`
            },
            {
                keywords: ['event', 'function', 'celebration', 'annual day', 'fest', 'cultural', 'program'],
                response: `🎉 <b>Events & Celebrations</b><br><br>
                <b>Annual Events:</b><br>
                • Annual Day & Prize Distribution<br>
                • Sports Day<br>
                • Science Exhibition<br>
                • Art & Craft Exhibition<br>
                • Inter-School Competitions<br><br>
                <b>Cultural Celebrations:</b><br>
                • Independence Day<br>
                • Republic Day<br>
                • Saraswati Puja<br>
                • Rabindra Jayanti<br>
                • Christmas Celebration<br>
                • Teachers' Day<br><br>
                🎭 Regular workshops by renowned artists & performers!`
            },
            {
                keywords: ['house', 'ignis', 'terra', 'astral', 'aqua', 'competition', 'house system'],
                response: `🏠 <b>School House System</b><br><br>
                Students are divided into 4 Houses to foster healthy competition:<br><br>
                🔥 <b>Ignis House</b> - "Ignite the Spirit, Lead with Passion"<br>
                🌍 <b>Terra House</b> - "Rooted in Tradition, Reaching Beyond Limits"<br>
                ⭐ <b>Astral House</b> - "Rising with Purpose, Shining with Pride"<br>
                💧 <b>Aqua House</b> - "Flow with Grace, Adapt with Power"<br><br>
                Houses compete in Sports, Academics, Cultural Events & Discipline throughout the year!`
            },
            {
                keywords: ['timing', 'time', 'hour', 'open', 'close', 'schedule', 'working'],
                response: `⏰ <b>School Timings</b><br><br>
                <b>Monday to Saturday:</b><br>
                • Nursery to UKG: 8:30 AM - 12:30 PM<br>
                • Class I to V: 8:00 AM - 2:00 PM<br>
                • Class VI to VIII: 8:00 AM - 2:30 PM<br>
                • Class IX to XII: 8:00 AM - 3:00 PM<br><br>
                <b>Sunday:</b> Holiday<br><br>
                <b>Office Hours:</b> 8:00 AM - 4:00 PM (Mon-Sat)<br><br>
                🏫 <b>Assembly:</b> 8:00 AM daily`
            },
            {
                keywords: ['uniform', 'dress', 'code', 'wear'],
                response: `👔 <b>School Uniform</b><br><br>
                <b>Boys:</b><br>
                • White Shirt with School Logo<br>
                • Navy Blue Trousers<br>
                • Navy Blue Blazer (Winter)<br>
                • Black Shoes & Navy Blue Socks<br><br>
                <b>Girls:</b><br>
                • White Shirt with School Logo<br>
                • Navy Blue Skirt/Trousers<br>
                • Navy Blue Blazer (Winter)<br>
                • Black Shoes & Navy Blue Socks<br><br>
                <b>Sports Day:</b> House T-Shirt & White Track Pants<br><br>
                Uniforms are available at the school store.`
            },
            {
                keywords: ['covid', 'corona', 'safety', 'health', 'medical', 'hygiene', 'sanitization'],
                response: `😷 <b>Health & Safety Measures</b><br><br>
                • Regular sanitization of campus<br>
                • Thermal screening at entrance<br>
                • Isolation room for unwell students<br>
                • Tie-up with nearby multi-specialty hospital<br>
                • First Aid trained staff<br>
                • Regular health check-up camps<br>
                • Nutritious & hygienic cafeteria food<br>
                • Purified drinking water (RO system)`
            },
            {
                keywords: ['parent', 'pta', 'meeting', 'guardian', 'mother', 'father', 'feedback'],
                response: `👨‍👩‍👧 <b>Parent Engagement</b><br><br>
                • Monthly PTM (Parent-Teacher Meeting)<br>
                • Online Portal for progress tracking<br>
                • WhatsApp updates for important notices<br>
                • Annual Parent Orientation Program<br>
                • Open House Days<br>
                • Parent Volunteer Opportunities<br>
                • Regular feedback surveys<br><br>
                📱 <b>TKIS Parent App:</b> Download from Play Store/App Store`
            },
            {
                keywords: ['scholarship', 'discount', 'financial aid', 'poor', 'merit', 'fee waiver'],
                response: `🎓 <b>Scholarships & Financial Aid</b><br><br>
                <b>Merit Scholarships:</b><br>
                • 100% fee waiver for district toppers<br>
                • 50% fee waiver for 95%+ in entrance<br>
                • 25% fee waiver for 90%+ in entrance<br><br>
                <b>Need-Based Aid:</b><br>
                Available for deserving students. Contact our admission office with income proof.<br><br>
                <b>Sibling Discount:</b> 10% for second child, 15% for third child<br><br>
                📞 Scholarship Helpline: <b>+91 93301 10019</b>`
            },
            {
                keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening'],
                response: `👋 Hello! Welcome to <b>The Kolkata International School</b>!<br><br>
                I'm your AI assistant. I can help you with:<br>
                • Admissions & Fees<br>
                • Curriculum & Facilities<br>
                • Contact Information<br>
                • Transport & Hostel<br>
                • Events & Results<br><br>
                What would you like to know? 😊`
            },
            {
                keywords: ['thank', 'thanks', 'dhanyabad', 'shukriya'],
                response: `🙏 You're most welcome!<br><br>
                It's our pleasure to assist you. If you have any more questions, feel free to ask!<br><br>
                📞 You can also call us at <b>+91 93301 10019</b> for immediate assistance.<br><br>
                Have a great day! 😊`
            },
            {
                keywords: ['bye', 'goodbye', 'see you', 'take care'],
                response: `👋 Goodbye! Thank you for connecting with TKIS.<br><br>
                We look forward to welcoming you to our campus soon!<br><br>
                🌐 Visit: <b>www.tkis.edu.in</b><br>
                📞 Call: <b>+91 93301 10019</b><br><br>
                Have a wonderful day! 🌟`
            }
        ];
        
        this.defaultResponses = [
            "I'm not sure I understood that correctly. Could you rephrase? You can ask me about admissions, fees, curriculum, facilities, or contact details.",
            "That's an interesting question! I can help with admissions, fees, curriculum, transport, and more. What specifically would you like to know?",
            "I don't have information on that yet. For detailed queries, please call us at <b>+91 93301 10019</b> or email <b>info@tkis.edu.in</b>."
        ];
        
        this.suggestions = [
            'Admission Process',
            'Fee Structure',
            'School Facilities',
            'Contact Details',
            'School Timings',
            'Transport Facility'
        ];
    }
    
    init() {
        this.container = document.getElementById('chatbot-widget');
        if (!this.container) return;
        
        // Build chatbot HTML
        this.container.innerHTML = `
            <div class="chatbot-container">
                <button class="chatbot-toggle" id="chatbotToggle" aria-label="Open chat">
                    <i class="fas fa-comment-dots"></i>
                    <span class="chatbot-badge">AI</span>
                </button>
                <div class="chatbot-window" id="chatbotWindow">
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <div class="chatbot-avatar"><i class="fas fa-robot"></i></div>
                            <div>
                                <h6>TKIS Assistant</h6>
                                <span>Online - Ask me anything</span>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbotClose" aria-label="Close chat">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="chatbot-messages" id="chatbotMessages"></div>
                    <div class="chatbot-input-area">
                        <input type="text" class="chatbot-input" id="chatbotInput" 
                            placeholder="Type your question..." autocomplete="off">
                        <button class="chatbot-send" id="chatbotSend" aria-label="Send message">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.window = document.getElementById('chatbotWindow');
        this.messages = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('chatbotSend');
        
        // Event listeners
        document.getElementById('chatbotToggle').addEventListener('click', () => this.toggle());
        document.getElementById('chatbotClose').addEventListener('click', () => this.toggle());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Welcome message
        setTimeout(() => {
            if (!this.isOpen) {
                this.showNotification();
            }
        }, 3000);
    }
    
    toggle() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('open', this.isOpen);
        
        if (this.isOpen && this.messages.children.length === 0) {
            this.addBotMessage(`👋 Hi there! Welcome to <b>The Kolkata International School</b>!<br><br>
                I'm your AI assistant. Ask me about admissions, fees, curriculum, facilities, or anything else!`);
            this.showSuggestions();
        }
        
        if (this.isOpen) {
            this.input.focus();
        }
    }
    
    showNotification() {
        const toggle = document.getElementById('chatbotToggle');
        toggle.style.animation = 'pulse 1s ease 3';
    }
    
    addBotMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'chatbot-message bot';
        msg.innerHTML = text + `<div class="chatbot-time">${this.getTime()}</div>`;
        this.messages.appendChild(msg);
        this.scrollToBottom();
    }
    
    addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'chatbot-message user';
        msg.innerHTML = this.escapeHtml(text) + `<div class="chatbot-time">${this.getTime()}</div>`;
        this.messages.appendChild(msg);
        this.scrollToBottom();
    }
    
    showTyping() {
        const typing = document.createElement('div');
        typing.className = 'chatbot-message bot typing';
        typing.id = 'typingIndicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        this.messages.appendChild(typing);
        this.scrollToBottom();
    }
    
    hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }
    
    showSuggestions() {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'chatbot-suggestions';
        suggestionsDiv.id = 'chatSuggestions';
        
        this.suggestions.forEach(suggestion => {
            const btn = document.createElement('span');
            btn.className = 'chatbot-suggestion';
            btn.textContent = suggestion;
            btn.addEventListener('click', () => {
                this.input.value = suggestion;
                this.sendMessage();
            });
            suggestionsDiv.appendChild(btn);
        });
        
        this.messages.appendChild(suggestionsDiv);
        this.scrollToBottom();
    }
    
    removeSuggestions() {
        const suggestions = document.getElementById('chatSuggestions');
        if (suggestions) suggestions.remove();
    }
    
    async sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;
        
        this.removeSuggestions();
        this.addUserMessage(text);
        this.input.value = '';
        this.sendBtn.disabled = true;
        
        this.showTyping();
        
        // Small delay for natural feel
        await this.delay(800 + Math.random() * 700);
        
        this.hideTyping();
        
        // Try Gemini API first if enabled
        if (this.useGemini && this.geminiApiKey) {
            try {
                const response = await this.callGemini(text);
                this.addBotMessage(response);
                this.showSuggestions();
                this.sendBtn.disabled = false;
                return;
            } catch (e) {
                console.log('Gemini failed, falling back to local');
            }
        }
        
        // Local knowledge base matching
        const response = this.findResponse(text);
        this.addBotMessage(response);
        this.showSuggestions();
        this.sendBtn.disabled = false;
    }
    
    findResponse(input) {
        const lowerInput = input.toLowerCase();
        
        // Score each knowledge entry
        let bestMatch = null;
        let bestScore = 0;
        
        for (const entry of this.knowledgeBase) {
            let score = 0;
            for (const keyword of entry.keywords) {
                if (lowerInput.includes(keyword.toLowerCase())) {
                    score += keyword.length; // Longer matches = higher score
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }
        
        if (bestMatch && bestScore > 2) {
            return bestMatch.response;
        }
        
        // Check for partial word matches
        const words = lowerInput.split(/\s+/);
        for (const entry of this.knowledgeBase) {
            let matchCount = 0;
            for (const keyword of entry.keywords) {
                const kwWords = keyword.toLowerCase().split(/\s+/);
                for (const kwWord of kwWords) {
                    if (kwWord.length > 3 && words.some(w => w.includes(kwWord) || kwWord.includes(w))) {
                        matchCount++;
                    }
                }
            }
            if (matchCount >= 2) {
                return entry.response;
            }
        }
        
        // Default response
        return this.defaultResponses[Math.floor(Math.random() * this.defaultResponses.length)];
    }
    
    async callGemini(text) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.geminiApiKey}`;
        
        const body = {
            contents: [{
                parts: [{
                    text: `You are a helpful assistant for The Kolkata International School (TKIS), a CBSE school in Liluah, Howrah. Answer briefly and helpfully. Question: ${text}`
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 300
            }
        };
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) throw new Error('Gemini API error');
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text.replace(/\n/g, '<br>');
    }
    
    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    getTime() {
        return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize chatbot when sections are loaded
document.addEventListener('sectionsLoaded', () => {
    const chatbot = new TKISChatbot();
    chatbot.init();
});
