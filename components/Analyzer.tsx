
import React, { useState, useEffect } from 'react';
import { PasswordAnalysis, StrengthCriteria } from '../types';

export const Analyzer: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState<PasswordAnalysis>({
    score: 0,
    label: 'بدون إدخال',
    color: 'bg-gray-400',
    feedback: [],
    criteria: []
  });

  const analyzePassword = (pwd: string) => {
    const criteria: StrengthCriteria[] = [
      { label: '8 أحرف على الأقل', met: pwd.length >= 8, regex: /.{8,}/ },
      { label: 'أحرف كبيرة (A-Z)', met: /[A-Z]/.test(pwd), regex: /[A-Z]/ },
      { label: 'أحرف صغيرة (a-z)', met: /[a-z]/.test(pwd), regex: /[a-z]/ },
      { label: 'أرقام (0-9)', met: /[0-9]/.test(pwd), regex: /[0-9]/ },
      { label: 'رموز خاصة (@#$...)', met: /[^A-Za-z0-9]/.test(pwd), regex: /[^A-Za-z0-9]/ },
      { label: 'طول متميز (12+)', met: pwd.length >= 12, regex: /.{12,}/ }
    ];

    const metCount = criteria.filter(c => c.met).length;
    let label = 'ضعيفة جداً';
    let color = 'bg-red-500';
    let feedback: string[] = [];

    if (metCount === 0) {
      label = 'بدون إدخال';
      color = 'bg-gray-400';
    } else if (metCount <= 2) {
      label = 'ضعيفة';
      color = 'bg-orange-500';
      feedback.push('كلمة المرور هذه سهلة التخمين.');
    } else if (metCount <= 4) {
      label = 'متوسطة';
      color = 'bg-yellow-500';
      feedback.push('تحتاج لمزيد من التنوع في الرموز.');
    } else if (metCount === 5) {
      label = 'قوية';
      color = 'bg-blue-500';
      feedback.push('كلمة مرور جيدة جداً.');
    } else {
      label = 'ممتازة';
      color = 'bg-emerald-500';
      feedback.push('أمان عالي جداً ضد الهجمات.');
    }

    setAnalysis({ score: metCount, label, color, feedback, criteria });
  };

  useEffect(() => {
    analyzePassword(password);
  }, [password]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-slate-800/50 p-8 rounded-3xl border border-blue-500/20 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <i className="fas fa-magnifying-glass text-blue-400"></i>
          اختبر قوة كلمة المرور الخاصة بك
        </h2>

        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="ltr"
            className="w-full bg-slate-900 border-2 border-slate-700 rounded-2xl px-6 py-4 text-xl tracking-widest focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-600"
            placeholder="أدخل كلمة المرور هنا..."
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition-colors"
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>

        {/* Strength Meter */}
        <div className="space-y-2 mb-8">
          <div className="flex justify-between items-center px-1">
            <span className="text-sm text-gray-400">مستوى الأمان: <span className="text-white font-bold">{analysis.label}</span></span>
            <span className="text-sm text-gray-400">{Math.round((analysis.score / 6) * 100)}%</span>
          </div>
          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700">
            <div 
              className={`h-full transition-all duration-500 ease-out ${analysis.color}`}
              style={{ width: `${(analysis.score / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Criteria Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.criteria.map((item, idx) => (
            <div 
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                item.met 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-slate-900/50 border-slate-700/50 text-gray-500'
              }`}
            >
              <i className={`fas ${item.met ? 'fa-check-circle' : 'fa-circle-xmark'}`}></i>
              <span className="text-sm font-medium">{item.label}</span>
              {item.met && (
                <div className="mr-auto text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/20 opacity-60">
                  Regex Matched
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {password.length > 0 && (
        <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl">
          <h3 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
            <i className="fas fa-lightbulb"></i>
            نصيحة أمنية
          </h3>
          <p className="text-gray-300 leading-relaxed italic">
            {analysis.feedback[0] || 'استمر في تعقيد كلمة المرور لضمان أقصى حماية.'}
          </p>
        </div>
      )}
    </div>
  );
};
