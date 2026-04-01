<div align="center">
  <img src="public/assets/logos/logo1.png" alt="My Resume Logo" width="120" />  
  <h1>My Resume</h1>
  
  <p>
    An open-source, local-first AI resume maker built for people who want a faster way to create ATS-ready resumes without giving up control of their data.
  </p>

  <div>
    <a href="https://www.linkedin.com/in/akashpattanayak2006/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
    <a href="https://www.pattanayak.qzz.io/"><img src="https://img.shields.io/badge/Website-10B981?style=for-the-badge&logo=vercel&logoColor=white" alt="Website" /></a>
    <a href="https://www.instagram.com/akashpattanayak_/"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
    <a href="mailto:akashpattanayak89@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  </div>
</div>

<br />

## Why My Resume

Most resume builders push users into signups, paid exports, or generic templates. 

**My Resume** takes a radically different approach:

- **100% Free** to build and export your resume.
- **No Signups** or credit cards required.
- **Local-First Privacy:** All your resume data stays right on your device using IndexedDB.
- **Bring Your Own AI:** Plug in your own API key to refine bullet points and tailor outputs for ATS systems.
- **Beautiful Templates:** Choose from 8 polished templates pre-designed for clarity and modern hiring standards.

---

## ⚡ What You Can Do

- **Local-first Workflow:** Build and manage resume content completely offline.
- **AI-Assisted Rewriting:** Refine bullet points directly within the editor using your own AI provider.
- **ATS Tailoring:** Analyze job descriptions and tailor your resume to pass ATS screening.
- **Template Library:** Switch instantly between Classic, Modern, Minimal, Executive, Technical, Sidebar Color, With Photo, and Creative styles.
- **Live Preview:** See changes instantly before exporting to PDF.
- **Quick Import:** Parse existing CV content to speed up your initial profile creation.

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 24
- npm

### Optional Environment Variables

AI features use a **bring-your-own API key** flow. To enable local AI key encryption and verification in development, create a .env.local file at the root:

`ash
ENCRYPTION_KEY=replace-with-a-strong-64-character-hex-secret
ENCRYPTION_SALT=replace-with-a-unique-32-character-hex-salt
`

These values are required to safely encrypt/decrypt user-provided AI keys within the local database.

---

## 🛠 Tech Stack

- **Next.js 16** (App Router)
- **React 19** 
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (Animations & Interactions)
- **Dexie & IndexedDB** (Local-first storage)
- **Vercel AI SDK** (Direct AI integrations)
- **Shadcn UI & Magic UI** (Component primitives)

---

## 👨‍💻 Created By

**My Resume** is proudly built by **Akash Pattanayak**.

If this project helps you securely build you dream resume, considering starring the repository! 🌟

### Get in Touch
- 🌐 **Portfolio**: [pattanayak.qzz.io](https://www.pattanayak.qzz.io/)
- 💼 **LinkedIn**: [akashpattanayak2006](https://www.linkedin.com/in/akashpattanayak2006/)
- 📸 **Instagram**: [@akashpattanayak_](https://www.instagram.com/akashpattanayak_/)
- 📧 **Email**: [akashpattanayak89@gmail.com](mailto:akashpattanayak89@gmail.com)

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
