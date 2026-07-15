# 🎓 The Kolkata International School (TKIS) Website

A modern, responsive, and interactive school website built with pure HTML5, CSS3, and JavaScript. Features a modular architecture, real-time form validation, and an AI-powered chatbot assistant.

![TKIS Website](https://img.shields.io/badge/Built%20With-HTML%20%7C%20CSS%20%7C%20JS-blue)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

### 🎨 Design & UI
- **Modern Glassmorphism Design** with gradient accents
- **Fully Responsive** - Mobile, Tablet, Desktop
- **Smooth Animations** via AOS (Animate On Scroll)
- **Hero Image Slider** with Swiper.js
- **Custom Scrollbar** and Preloader

### 🏗️ Modular Architecture
- **14 Separate Section Files** loaded dynamically into one main page
- Clean separation of concerns: HTML, CSS, JS
- Easy to maintain and update individual sections

### ✅ Form Validation
- **Real-time validation** with visual feedback
- Name, Phone, Email, Location, and Class validation
- Shake animation on invalid submit
- Success modal with confirmation

### 🤖 AI Chatbot (Unlimited & Free)
- **Offline-capable** smart FAQ bot with 20+ knowledge topics
- Natural language keyword matching
- Typing animations and suggestion chips
- Conversation context memory
- **Optional Gemini AI Integration** (free tier: 1,500 requests/day)

---

## 📁 Project Structure

```
tkis-website/
├── index.html              # Main entry point
├── css/
│   └── style.css           # All styles (970 lines)
├── js/
│   ├── main.js             # Core functionality (Swiper, AOS, counters)
│   ├── sections.js         # Dynamic section loader
│   ├── validator.js        # Form validation engine
│   ├── chatbot.js          # AI chatbot with knowledge base
│   └── sw.js               # Service worker for offline support
├── sections/               # Modular HTML sections
│   ├── topbar.html
│   ├── hero.html
│   ├── about.html
│   ├── grades.html
│   ├── features.html
│   ├── unique.html
│   ├── houses.html
│   ├── achievers.html
│   ├── academics.html
│   ├── gallery.html
│   ├── blog.html
│   ├── partners.html
│   ├── footer.html
│   └── chatbot.html
└── README.md
```

---

## 🚀 How to Run Locally

### Option 1: Direct Open (Limited)
Simply open `index.html` in a browser. Note: Section loading via `fetch()` requires a local server for full functionality.

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using PHP
php -S localhost:8000

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```
Then visit: `http://localhost:8000`

---

## 📤 Push to GitHub

Since I cannot access your GitHub account directly, follow these simple steps:

### Step 1: Create a Repository on GitHub
1. Go to [github.com](https://github.com) and log in
2. Click **New Repository** (green button)
3. Name it: `tkis-website`
4. Choose **Public** or **Private**
5. **Do NOT** initialize with README (we already have one)
6. Click **Create repository**

### Step 2: Push the Code
Open terminal in the `tkis-website` folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: TKIS modular website with AI chatbot"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/tkis-website.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages (Free Hosting)
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site will be live at: `https://YOUR_USERNAME.github.io/tkis-website/`

---

## 🤖 AI Chatbot Setup

### Default Mode (No Setup Required)
The chatbot works immediately with a built-in knowledge base covering:
- Admissions & Fees
- Curriculum & Facilities
- Contact & Location
- Transport & Hostel
- Events & Results
- And 15+ more topics

### Advanced Mode: Google Gemini AI (Optional)
To enable true AI responses beyond the FAQ:

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Open browser console on your website
3. Run:
```javascript
localStorage.setItem('tkis_gemini_key', 'YOUR_API_KEY_HERE');
```
4. The chatbot will now use Gemini 2.0 Flash for advanced queries

**Free Tier Limits:** 1,500 requests/day (more than enough for a school website)

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| HTML5 | Semantic structure |
| CSS3 | Custom styling, variables, animations |
| Bootstrap 5.3 | Responsive grid & components |
| Swiper.js | Hero slider & achievers carousel |
| AOS | Scroll animations |
| Font Awesome 6 | Icons |
| Google Fonts | Typography (Poppins, Playfair Display) |

---

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 576px | Single column, stacked nav |
| Tablet | 576px - 991px | 2 columns, hamburger menu |
| Desktop | > 991px | Full layout, horizontal nav |

---

## 📝 Customization Guide

### Change School Name/Colors
Edit `css/style.css`:
```css
:root {
    --primary: #1a5f7a;      /* Main brand color */
    --secondary: #c84b31;    /* Accent color */
    --accent: #f9a825;       /* CTA/button color */
}
```

### Add New Chatbot Responses
Edit `js/chatbot.js` and add to `knowledgeBase`:
```javascript
{
    keywords: ['new topic', 'related word'],
    response: `Your HTML response here`
}
```

### Update Contact Information
Edit `sections/footer.html` and `js/chatbot.js` (search and replace phone/email)

---

## 🔒 License

This project is open source and available under the [MIT License](LICENSE).

---

## 💬 Support

For questions or issues:
- 📧 Email: info@tkis.edu.in
- 📞 Phone: +91 93301 10019
- 💬 Use the AI chatbot on the website!

---

<p align="center">Built with ❤️ for The Kolkata International School</p>
