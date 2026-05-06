# شركة الاهرام الحديثة - الموقع الإلكتروني

**رابط المعاينة المباشر:** [اضغط هنا للمشاهدة](https://kareemjaber109-gif.github.io/elahram_el7adesa/)

## ملفات المشروع | Project Files

```
ahram-html/
├── index.html   ← الصفحة الرئيسية (الموقع كله في ملف واحد)
├── style.css    ← كل التصميم والألوان
├── script.js    ← كل المنطق والتنقل بين الصفحات
├── logo.png     ← ضع شعارك هنا
└── README.md    ← هذا الملف
```

## كيفية التشغيل | How to Run

### الطريقة الأسهل: افتح index.html مباشرة
```
انقر مرتين على ملف index.html
```

### أو استخدم VS Code Live Server:
```
1. افتح المجلد في VS Code
2. انقر بزر الفأرة الأيمن على index.html
3. اختر "Open with Live Server"
```

## إضافة الشعار | Adding Your Logo

ضع ملف الشعار في نفس مجلد index.html باسم:
```
logo.png
```

إذا لم يكن الشعار موجوداً، سيظهر رمز الهرم تلقائياً.

## تغيير الألوان | Changing Colors

افتح `style.css` وغيّر المتغيرات في الأعلى:
```css
:root {
  --gold:       #D4A017;  /* اللون الذهبي الرئيسي */
  --gold-light: #F5C842;  /* الذهبي الفاتح */
  --gold-dark:  #A07810;  /* الذهبي الغامق */
  --bg:         #111111;  /* لون الخلفية */
}
```

## تغيير أسماء المنتجات | Changing Product Names

افتح `script.js` وابحث عن:
```javascript
const DATA = {
  drainageNames:    generateItems('اسم',    200),  // أسماء الصرف
  drainageProducts: generateItems('normal', 200),  // منتجات الصرف
  ...
}
```

يمكنك تغيير `'اسم'` أو `'normal'` إلى أي نص تريده،
أو استبدال `generateItems(...)` بمصفوفة يدوية:
```javascript
drainageNames: ['اسم البند الأول', 'اسم البند الثاني', ...]
```

## هيكل الصفحات | Page Structure

```
الرئيسية (home)
├── ادوات سباكة (plumbing)
│   ├── صرف (drainage) → 200 اسم قابل للنقر
│   │   └── منتجات الاسم (drainage-products) → 200 منتج
│   ├── تغذية (feeding) → 200 منتج
│   └── اكسسوارات (accessories) → 200 منتج
├── ادوات كهرباء (electrical)
│   ├── تأسيس (el-foundation) → 200 منتج
│   └── تشطيب (el-finishing) → 200 منتج
└── ادوات معمار (construction) → 200 منتج
```
