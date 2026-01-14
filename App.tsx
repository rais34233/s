
import React, { useState } from 'react';
import { Analyzer } from './components/Analyzer';
import { Documentation } from './components/Documentation';
import { ViewState } from './types';
import JSZip from 'jszip';
import saveAs from 'file-saver';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('tool');
  const [isDownloading, setIsDownloading] = useState(false);

  // Contents of all files to be bundled in the ZIP
  const getProjectFiles = () => {
    return {
      'index.html': `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>محلل قوة كلمة المرور - مشروع رقم 32</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');
        body { font-family: 'Tajawal', sans-serif; }
    </style>
</head>
<body class="bg-gray-50 text-gray-900">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>`,

      'src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

      'src/types.ts': `export interface StrengthCriteria { label: string; met: boolean; regex: RegExp; }
export interface PasswordAnalysis { score: number; label: string; color: string; feedback: string[]; criteria: StrengthCriteria[]; }
export type ViewState = 'tool' | 'docs';`,

      'package.json': JSON.stringify({
        "name": "password-analyzer-p32",
        "private": true,
        "version": "1.0.0",
        "type": "module",
        "scripts": {
          "dev": "vite",
          "build": "tsc && vite build",
          "preview": "vite preview"
        },
        "dependencies": {
          "react": "^19.0.0",
          "react-dom": "^19.0.0",
          "jszip": "^3.10.1",
          "file-saver": "^2.0.5"
        },
        "devDependencies": {
          "@types/react": "^19.0.0",
          "@types/react-dom": "^19.0.0",
          "@vitejs/plugin-react": "^4.3.0",
          "autoprefixer": "^10.4.19",
          "postcss": "^8.4.38",
          "tailwindcss": "^3.4.4",
          "typescript": "^5.2.2",
          "vite": "^5.3.0"
        }
      }, null, 2),

      'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });`,

      'tsconfig.json': `{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}`,

      'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { fontFamily: { tajawal: ['Tajawal', 'sans-serif'] } } },
  plugins: [],
}`,

      'README.md': `# مشروع محلل قوة كلمة المرور (مشروع رقم 32)

## طريقة التشغيل على جهازك:
1. تأكد من تثبيت [Node.js](https://nodejs.org/).
2. قم بفك ضغط الملف.
3. افتح المجلد في Terminal.
4. قم بتنفيذ الأمر: \`npm install\`
5. قم بتشغيل المشروع بالأمر: \`npm run dev\`
6. افتح الرابط الظاهر في المتصفح.`
    };
  };

  const handleDownloadProject = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const files = getProjectFiles();
      
      // Add files to zip
      Object.entries(files).forEach(([path, content]) => {
        zip.file(path, content);
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "Password_Analyzer_Project_32.zip");
    } catch (error) {
      console.error("Error generating ZIP:", error);
      alert("حدث خطأ أثناء تجميع الملفات.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white pb-20">
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-blue-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
              <i className="fas fa-shield-halved text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              مشروع محلل قوة كلمات المرور
            </h1>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4">
            <nav className="flex bg-slate-800 rounded-full p-1 border border-blue-500/20 shadow-inner">
              <button
                onClick={() => setView('tool')}
                className={`px-4 md:px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 text-sm md:text-base ${
                  view === 'tool' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                <i className="fas fa-terminal"></i>
                <span>الأداة</span>
              </button>
              <button
                onClick={() => setView('docs')}
                className={`px-4 md:px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 text-sm md:text-base ${
                  view === 'docs' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                <i className="fas fa-file-contract"></i>
                <span>الوثيقة</span>
              </button>
            </nav>

            <button
              onClick={handleDownloadProject}
              disabled={isDownloading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50 font-bold"
            >
              <i className={`fas ${isDownloading ? 'fa-spinner fa-spin' : 'fa-file-zipper'}`}></i>
              <span>تحميل المشروع كاملاً</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {view === 'tool' ? (
          <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-center text-blue-300 text-sm">
              <i className="fas fa-circle-info ml-2"></i>
              يمكنك تجربة الأداة هنا، أو الضغط على زر "تحميل المشروع" للحصول على الأكواد وتشغيلها على جهازك.
            </div>
            <Analyzer />
          </div>
        ) : <Documentation />}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/90 border-t border-blue-500/20 py-3 text-center text-sm text-gray-400 backdrop-blur-sm">
        <p>تم تطويره وفق متطلبات المشروع رقم 32 • جميع الملفات جاهزة للتنزيل</p>
      </footer>
    </div>
  );
};

export default App;
