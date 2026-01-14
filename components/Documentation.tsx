
import React from 'react';

const DocSection: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="mb-12 bg-slate-800/40 p-8 rounded-3xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-blue-600/20 flex items-center justify-center rounded-2xl border border-blue-500/20">
        <i className={`fas ${icon} text-xl text-blue-400`}></i>
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    <div className="text-gray-300 leading-loose text-lg space-y-4">
      {children}
    </div>
  </section>
);

export const Documentation: React.FC = () => {
  return (
    <div className="animate-fadeIn animate-slideUp">
      
      <DocSection title="مقدمة" icon="fa-info-circle">
        <p>
          في عصرنا الرقمي الحالي، أصبحت كلمة المرور هي خط الدفاع الأول والأساسي لحماية بياناتنا الشخصية والحساسة على الإنترنت. مع تزايد وتيرة الهجمات السيبرانية مثل هجمات "القوة الغاشمة" (Brute Force) وتخمين كلمات المرور، أصبح من الضروري وجود أدوات ذكية تساعد المستخدمين على تقييم مدى أمان مفاتيحهم الرقمية.
        </p>
        <p>
          هذا المشروع يندرج تحت تصنيف الأدوات الأمنية التعليمية، حيث يهدف إلى سد الفجوة بين تعقيد الخوارزميات الأمنية وسهولة استخدام الواجهات البرمجية للمستخدم العادي.
        </p>
      </DocSection>

      <DocSection title="وصف المشروع" icon="fa-project-diagram">
        <p>
          المشروع هو عبارة عن "محلل قوة كلمة المرور" (Password Strength Analyzer) يعتمد بشكل أساسي على محرك التعبيرات النمطية (Regular Expressions - Regex). تقوم الأداة بفحص المدخلات في الوقت الفعلي ومطابقتها مع قوالب أمنية محددة.
        </p>
        <ul className="list-disc list-inside mr-4 space-y-2 text-blue-300">
          <li>يعالج مشكلة كلمات المرور الضعيفة والتقليدية.</li>
          <li>يستخدم خوارزمية تنقيط (Scoring Algorithm) بناءً على نجاح مطابقة الـ Regex.</li>
          <li>يوفر واجهة بصرية تفاعلية توضح نقاط القوة والضعف فورياً.</li>
        </ul>
      </DocSection>

      <DocSection title="الأهداف" icon="fa-bullseye">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-blue-500/10">
            <h4 className="font-bold text-blue-400 mb-2">توعية المستخدم</h4>
            <p className="text-sm">تثقيف المستخدمين حول العناصر التي تجعل كلمة المرور عصية على الاختراق.</p>
          </div>
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-blue-500/10">
            <h4 className="font-bold text-blue-400 mb-2">تطبيق تقنيات Regex</h4>
            <p className="text-sm">إثبات فعالية التعبيرات النمطية في معالجة النصوص والتحقق من البيانات أمنياً.</p>
          </div>
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-blue-500/10">
            <h4 className="font-bold text-blue-400 mb-2">تحسين الأمن الوقائي</h4>
            <p className="text-sm">منع المستخدم من استخدام كلمات مرور قد يتم كسرها في ثوانٍ معدودة.</p>
          </div>
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-blue-500/10">
            <h4 className="font-bold text-blue-400 mb-2">الاستجابة الفورية</h4>
            <p className="text-sm">بناء واجهة سريعة الاستجابة تقدم تغذية راجعة دون الحاجة لانتظار معالجة الخادم.</p>
          </div>
        </div>
      </DocSection>

      <DocSection title="خطوات التنفيذ" icon="fa-list-check">
        <ol className="list-decimal list-inside space-y-4 mr-4">
          <li>
            <span className="font-bold text-white">تحديد المعايير الأمنية:</span> وضع القواعد الأساسية (طول الكلمة، تنوع المحارف).
          </li>
          <li>
            <span className="font-bold text-white">تصميم أنماط Regex:</span> كتابة تعبيرات نمطية دقيقة لكل معيار (مثلاً: <code className="bg-slate-900 px-2 rounded text-emerald-400">/[A-Z]/</code> للأحرف الكبيرة).
          </li>
          <li>
            <span className="font-bold text-white">بناء المنطق البرمجي:</span> تطوير الدالة التي تربط نجاح الـ Regex بنظام النقاط التراكمي.
          </li>
          <li>
            <span className="font-bold text-white">تصميم الواجهة (UI/UX):</span> استخدام Tailwind CSS لبناء واجهة عصرية تتفاعل مع النتائج بتغيير الألوان والرسوم البيانية.
          </li>
          <li>
            <span className="font-bold text-white">الاختبار والتحقق:</span> تجربة كلمات مرور شائعة للتأكد من دقة تصنيف الأداة.
          </li>
        </ol>
      </DocSection>

      <DocSection title="النتائج والاستنتاجات" icon="fa-chart-line">
        <p>
          أظهرت مخرجات المشروع قدرة عالية لمحرك Regex على تحليل النصوص المعقدة بسرعة فائقة. تمكنا من بناء أداة تصنف كلمات المرور إلى 5 مستويات دقيقة (بدون إدخال، ضعيفة، متوسطة، قوية، ممتازة).
        </p>
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl mt-4">
          <h4 className="font-bold text-emerald-400 mb-2 italic text-center">الاستنتاج العام</h4>
          <p className="text-center text-gray-200">
            "الأمان الرقمي يبدأ من وعي المستخدم، والأدوات البرمجية البسيطة والفعالة مثل محلل كلمات المرور هي الخطوة الأولى نحو بناء ثقافة أمنية متينة تحمي الأفراد والمؤسسات."
          </p>
        </div>
      </DocSection>

    </div>
  );
};
