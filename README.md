# Initium
/my-react-app
│── /public
│   ├── index.html
│   ├── favicon.ico
│   └── assets/  (Static images, fonts, etc.)
│
│── /src
│   │── /components
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx  (Wraps pages with Navigation & Footer)
│   │   ├── LoginButton.jsx  
│   │
│   │── /pages
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── SignIn.jsx
│   │
│   │── /styles
│   │   ├── global.css
│   │   ├── variables.css
│   │   ├── StyledComponents.js (If using styled-components)
│   │
│   │── /routes
│   │   ├── AppRouter.jsx  (Handles routing using React Router)
│   │
│   │── /context  (For global state, e.g., AuthContext)
│   │   ├── AppContext.js
│   │
│   │── App.jsx
│   │── main.jsx (or index.jsx, entry point)
│   │── vite.config.js (if using Vite) or webpack.config.js
│   │── package.json
│   │── .gitignore
│
└── README.md
