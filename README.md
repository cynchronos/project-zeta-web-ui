# Project Zeta Frontend

Welcome to **Project Zeta**, a modern, AI-powered communication dashboard designed for seamless interaction with both human contacts and AI characters. This application features a premium dark-mode interface, real-time messaging, and immersive voice call capabilities.

![Dashboard Preview](/public/assets/images/bg%20dashboard.webp)

> [!WARNING]
> **This project is currently under active development.**
> Features may change, and you may encounter bugs. A stable release is coming soon.


## 🌟 About This App

Project Zeta is built to provide a futuristic communication experience.
-   **Unified Dashboard**: Access your chats, calls, and project analytics in one sleek interface.
-   **AI Integration**: Chat and voice call with advanced AI characters that respond in real-time.
-   **Premium UI**: Enjoy a carefully crafted dark theme with glassmorphism effects, smooth animations, and a focus on visual hierarchy.

## ✨ Key Features

-   **Modern Dashboard**: A data-rich overview with interactive widgets.
-   **Real-time Chat**:
    -   Instant messaging with contacts and AI.
    -   Rich media support (documents, photos, audio).
    -   Modern bubble design with gradient accents.
-   **Voice Calls**:
    -   Interactive character cards for initiating calls.
    -   Immersive calling interface.
-   **Responsive Design**: Fully responsive sidebar and layout for various screen sizes.
-   **Security**: Secure authentication and data handling via Supabase.

## 🛠 Tech Stack

**Core Framework**:
-   [Next.js 15](https://nextjs.org/) (App Router)
-   [React 19](https://react.dev/)

**Styling**:
-   [Tailwind CSS](https://tailwindcss.com/)
-   CSS Modules for specific animations

**State Management**:
-   [Redux Toolkit](https://redux-toolkit.js.org/) (RTK Query for API caching)

**Backend & Real-time**:
-   [Supabase](https://supabase.com/) (Auth & Database)
-   [Socket.io Client](https://socket.io/) (Real-time messaging)

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

-   **Node.js**: Version 18.17 or higher.
-   **npm**, **yarn**, **pnpm**, or **bun**.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/project-zeta-frontend.git
    cd project-zeta-frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    # Supabase Configuration
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

    # Backend Socket URL
    NEXT_PUBLIC_SOCKET_URL=http://localhost:6000
    
    # API URL (If separate from Socket)
    NEXT_PUBLIC_API_URL=http://localhost:6000/api/v1
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open the app**:
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router pages
│   ├── dashboard/        # Dashboard nested routes (calls, chats, etc.)
│   ├── (auth)/           # Authentication routes (login, register)
│   ├── globals.css       # Global styles & Tailwind directives
│   └── layout.js         # Root layout
├── components/           # Reusable UI components
│   ├── dashboard/        # Dashboard-specific components (Sidebar, etc.)
│   ├── chats/            # Chat interface components
│   └── layouts/          # Layout wrapper components
├── lib/                  # Library configurations
│   ├── redux/            # Redux setup (slices, store, api)
│   └── sockets/          # Socket.io connection logic
├── utils/                # Utility functions & helpers
└── assets/               # Static assets (images, icons)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
