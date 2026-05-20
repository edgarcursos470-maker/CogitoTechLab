# Project V - Institutional Anti-Discrimination System

![Project V Banner](https://via.placeholder.com/1200x300/000000/b91c1c?text=Project+V+-+Ideas+Are+Bulletproof)

**Project V** is a zero-cost, serverless internal Software as a Service (SaaS) developed for the Federal Institute of Brasília (IFB). It provides a secure, anonymized, and highly accessible reporting platform for students to report incidents of discrimination (Racism, Ableism, and LGBTQ+phobia).

## 🎯 Architecture & Vision

The system bypasses traditional app store fees and external server costs by utilizing the institution's existing Google Workspace infrastructure. It acts as a "Privacy Barrier" between the victim's report and the administrative response.

* **Frontend (Student Interface):** A Mobile-First Web App built with HTML, CSS, and JavaScript. [cite_start]It is served directly from the cloud via Google Apps Script using the `doGet()` method[cite: 1]. [cite_start]The UI features a dark, empowering aesthetic with CSS variables (`--bg: #000000`, `--accent: #b91c1c`)[cite: 30], designed to encourage action rather than passive bureaucracy.
* [cite_start]**Backend (Routing Engine):** A modularized Google Apps Script attached to a secure Google Sheet, intercepting incoming data through an `onFormSubmitTrigger`[cite: 2].
* **Database & Analytics:** Google Sheets acts as an anonymized data lake, feeding a visual "Exclusion Heatmap" (Mapa Quente da Exclusão) to guide pedagogical interventions.

## 🛡️ The Privacy Barrier & Data Sanitization

[cite_start]To ensure student safety and comply with data protection principles, the backend engine intercepts the raw payload[cite: 2, 3]. [cite_start]While the secure database retains identifiable logs for strict auditing, the `buildEmailBody` function dynamically generates an anonymized operational profile[cite: 20]. 

[cite_start]The system maps the specific micro-location [cite: 22][cite_start], staff presence [cite: 23][cite_start], bystander behavior [cite: 24][cite_start], and the accused's institutional role[cite: 25]. [cite_start]The incident description is passed forward strictly as an anonymized narrative [cite: 26][cite_start], ensuring the generated institutional alert protects the complainant's identity[cite: 27].

## ⚖️ Administrative Governance & Smart Routing

Project V is designed with built-in legal and administrative intelligence. [cite_start]The engine categorizes the incident and dynamically routes the alert to the appropriate institutional core (NEABI for Racism, NAPNE for Ableism, NUGEDIS for LGBTQ+phobia) based on the specific campus[cite: 16, 17, 18].

**The Ouvidoria Trigger (Compliance):**
[cite_start]All standard incidents receive a default CC to the Provost's Office of Extension (PREX) at `prex@ifb.edu.br`[cite: 6, 12]. However, the backend evaluates the institutional role of the accused. [cite_start]If the accused is classified as a "professor" or "funcionário" (administrative staff), the engine automatically escalates the alert by including the official Ombudsman (`ouvidoria@ifb.edu.br`) in the CC loop[cite: 7, 10, 11].

## 🚀 How to Deploy

1. Clone this repository to your local machine.
2. Create a new Google Apps Script project tied to a Google Sheet.
3. Push the `backend_routing.js` and `index.html` files to your Apps Script environment (using [clasp](https://github.com/google/clasp) is recommended for terminal-focused workflows).
4. [cite_start]Deploy the script as a Web App to activate the frontend UI[cite: 1].
5. [cite_start]Set up an `onFormSubmit` trigger pointing to `onFormSubmitTrigger(e)` to activate the backend routing[cite: 2].

---
*Developed with focus on social impact, data privacy, and institutional transparency.*