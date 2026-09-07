/* @ds-bundle: {"format":3,"namespace":"GustavoAlbinoDesignSystem_68545b","components":[{"name":"Kicker","sourcePath":"components/brand/Kicker.jsx"},{"name":"Seal","sourcePath":"components/brand/Seal.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"Tag","sourcePath":"components/data-display/Tag.jsx"},{"name":"Callout","sourcePath":"components/feedback/Callout.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/Kicker.jsx":"d75687471ea9","components/brand/Seal.jsx":"5407f1e34fb1","components/buttons/Button.jsx":"bbda513ce015","components/buttons/IconButton.jsx":"aafa37ae11ed","components/data-display/Avatar.jsx":"489d3f98123d","components/data-display/Badge.jsx":"32037fd17418","components/data-display/Card.jsx":"8b0025e08af5","components/data-display/Tag.jsx":"ec44469034d4","components/feedback/Callout.jsx":"c6a5d50f34dd","components/forms/Checkbox.jsx":"a65937732c31","components/forms/Input.jsx":"30b2b3e720ed","components/forms/Select.jsx":"f11428d84441","components/forms/Switch.jsx":"9079f1e03b19","components/forms/Textarea.jsx":"166c5df0208a","components/navigation/Tabs.jsx":"a6d04bd35728","ui_kits/portfolio/app.jsx":"d117f03d3712","ui_kits/portfolio/data.js":"a4890edc9b92","ui_kits/portfolio/parts.jsx":"ffe6e094bde7","ui_kits/portfolio/screens.jsx":"c524f1ccc698"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GustavoAlbinoDesignSystem_68545b = window.GustavoAlbinoDesignSystem_68545b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Kicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  vermilion: 'var(--vermilion)',
  cerulean: 'var(--cerulean)',
  violet: 'var(--violet)',
  gold: 'var(--gold)',
  ink: 'var(--ink)',
  paper: 'var(--paper-300)'
};

/** Gustavo Albino — Kicker (mono uppercase eyebrow with a leading rule) */
function Kicker({
  children,
  tone = 'vermilion',
  bare = false,
  className = '',
  style,
  ...rest
}) {
  const cls = ['ga-kicker', bare ? 'ga-kicker--bare' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: {
      color: TONES[tone] || tone,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Kicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Kicker.jsx", error: String((e && e.message) || e) }); }

// components/brand/Seal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Gustavo Albino — Seal
 * The circular brand emblem. Provide `src` pointing at your copied logo
 * asset (e.g. assets/logo-seal-black.png or logo-seal-white.png).
 * `spin` slowly rotates it (decorative, respects reduced motion via CSS).
 */
function Seal({
  src,
  size = 96,
  alt = 'Gustavo Albino',
  spin = false,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: alt,
    width: size,
    height: size,
    className: className,
    style: {
      display: 'block',
      width: size,
      height: size,
      animation: spin ? 'ga-seal-spin 18s linear infinite' : undefined,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Seal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Seal.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Gustavo Albino — Button
 * Comic "sticker" button: heavy ink outline + hard offset shadow that
 * lifts on hover and presses into the shadow on click.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  className = '',
  ...rest
}) {
  const Tag = as;
  const cls = ['ga-btn', `ga-btn--${variant}`, size !== 'md' ? `ga-btn--${size}` : '', block ? 'ga-btn--block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "ga-btn__icon",
    "aria-hidden": "true"
  }, iconLeft) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "ga-btn__icon",
    "aria-hidden": "true"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Gustavo Albino — IconButton
 * Square (or round) icon-only action. Pass a single icon node as children.
 */
function IconButton({
  children,
  round = false,
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) {
  const cls = ['ga-iconbtn', round ? 'ga-iconbtn--round' : '', size === 'sm' ? 'ga-iconbtn--sm' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": ariaLabel
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-flex'
    }
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gustavo Albino — Avatar (image or initials, outlined) */
function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  square = false,
  className = '',
  ...rest
}) {
  const cls = ['ga-avatar', size !== 'md' ? `ga-avatar--${size}` : '', square ? 'ga-avatar--square' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt
  }) : /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, initials));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gustavo Albino — Badge (mono, uppercase status/label chip with ink outline) */
function Badge({
  children,
  variant = 'gold',
  dot = false,
  className = '',
  ...rest
}) {
  const cls = ['ga-badge', variant !== 'gold' ? `ga-badge--${variant}` : '', dot ? 'ga-badge--dot' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Gustavo Albino — Card / Panel
 * The comic panel: ink outline + hard offset shadow. Use `media` for a
 * top image (auto outlined-bottom), `lift` to make it hover-interactive.
 */
function Card({
  children,
  media,
  mediaAlt = '',
  lift = false,
  bold = false,
  flat = false,
  className = '',
  ...rest
}) {
  const cls = ['ga-card', lift ? 'ga-card--lift' : '', bold ? 'ga-card--bold' : '', flat ? 'ga-card--flat' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), media ? typeof media === 'string' ? /*#__PURE__*/React.createElement("img", {
    className: "ga-card__media",
    src: media,
    alt: mediaAlt
  }) : /*#__PURE__*/React.createElement("div", {
    className: "ga-card__media"
  }, media) : null, /*#__PURE__*/React.createElement("div", {
    className: "ga-card__body"
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gustavo Albino — Tag / Chip (pill, optional removable or selectable) */
function Tag({
  children,
  active = false,
  onRemove,
  onClick,
  className = '',
  ...rest
}) {
  const clickable = !!onClick;
  const cls = ['ga-tag', active ? 'ga-tag--active' : '', clickable ? 'ga-tag--clickable' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    onClick: onClick
  }, rest), children, onRemove ? /*#__PURE__*/React.createElement("span", {
    className: "ga-tag__x",
    role: "button",
    "aria-label": "Remover",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, "\xD7") : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gustavo Albino — Callout (inline alert / note with a colored side bar) */
function Callout({
  children,
  title,
  variant = 'info',
  icon,
  className = '',
  ...rest
}) {
  const cls = ['ga-callout', `ga-callout--${variant}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "note"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ga-callout__bar",
    "aria-hidden": "true"
  }), icon ? /*#__PURE__*/React.createElement("span", {
    className: "ga-callout__icon",
    "aria-hidden": "true"
  }, icon) : null, /*#__PURE__*/React.createElement("div", null, title ? /*#__PURE__*/React.createElement("p", {
    className: "ga-callout__title"
  }, title) : null, /*#__PURE__*/React.createElement("p", {
    className: "ga-callout__text"
  }, children)));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Callout.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gustavo Albino — Checkbox (square) and Radio (round, set type="radio") */
function Checkbox({
  label,
  type = 'checkbox',
  className = '',
  ...rest
}) {
  const isRadio = type === 'radio';
  return /*#__PURE__*/React.createElement("label", {
    className: ['ga-check', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: ['ga-check__box', isRadio ? 'ga-check__box--radio' : ''].filter(Boolean).join(' ')
  }, isRadio ? /*#__PURE__*/React.createElement("span", {
    className: "ga-check__mark"
  }) : /*#__PURE__*/React.createElement("svg", {
    className: "ga-check__mark",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gustavo Albino — Input (text field with optional label & help) */
function Input({
  label,
  help,
  error = false,
  id,
  className = '',
  ...rest
}) {
  const fieldId = id || (label ? 'inp-' + label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const input = /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: ['ga-input', error ? 'ga-input--error' : '', className].filter(Boolean).join(' '),
    "aria-invalid": error || undefined
  }, rest));
  if (!label && !help) return input;
  return /*#__PURE__*/React.createElement("div", {
    className: "ga-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ga-label",
    htmlFor: fieldId
  }, label) : null, input, help ? /*#__PURE__*/React.createElement("span", {
    className: ['ga-help', error ? 'ga-help--error' : ''].filter(Boolean).join(' ')
  }, help) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gustavo Albino — Select (native dropdown, styled with comic outline) */
function Select({
  label,
  help,
  error = false,
  id,
  children,
  className = '',
  ...rest
}) {
  const fieldId = id || (label ? 'sel-' + label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const sel = /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: ['ga-select', className].filter(Boolean).join(' ')
  }, rest), children);
  if (!label && !help) return sel;
  return /*#__PURE__*/React.createElement("div", {
    className: "ga-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ga-label",
    htmlFor: fieldId
  }, label) : null, sel, help ? /*#__PURE__*/React.createElement("span", {
    className: ['ga-help', error ? 'ga-help--error' : ''].filter(Boolean).join(' ')
  }, help) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gustavo Albino — Switch (toggle) */
function Switch({
  label,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['ga-switch', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ga-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ga-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gustavo Albino — Textarea */
function Textarea({
  label,
  help,
  error = false,
  id,
  className = '',
  ...rest
}) {
  const fieldId = id || (label ? 'ta-' + label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const ta = /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    className: ['ga-textarea', error ? 'ga-textarea--error' : '', className].filter(Boolean).join(' '),
    "aria-invalid": error || undefined
  }, rest));
  if (!label && !help) return ta;
  return /*#__PURE__*/React.createElement("div", {
    className: "ga-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ga-label",
    htmlFor: fieldId
  }, label) : null, ta, help ? /*#__PURE__*/React.createElement("span", {
    className: ['ga-help', error ? 'ga-help--error' : ''].filter(Boolean).join(' ')
  }, help) : null);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gustavo Albino — Tabs (segmented, controlled or uncontrolled) */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  className = '',
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (tabs[0] && tabs[0].id));
  const active = value !== undefined ? value : internal;
  const select = id => {
    if (value === undefined) setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['ga-tabs', className].filter(Boolean).join(' '),
    role: "tablist"
  }, rest), tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    role: "tab",
    "aria-selected": active === t.id,
    className: ['ga-tab', active === t.id ? 'ga-tab--active' : ''].filter(Boolean).join(' '),
    onClick: () => select(t.id)
  }, t.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/app.jsx
try { (() => {
/* Gustavo Albino — portfolio UI kit · app shell + router */
const {
  GA_Nav,
  GA_Footer,
  GA_Home,
  GA_Work,
  GA_ProjectDetail,
  GA_About,
  GA_Contact
} = window;
function App() {
  const [route, setRoute] = React.useState('home'); // home | work | about | contact | project
  const [projectId, setProjectId] = React.useState(null);
  const go = r => {
    setRoute(r);
    setProjectId(null);
    window.scrollTo(0, 0);
  };
  const open = id => {
    setProjectId(id);
    setRoute('project');
    window.scrollTo(0, 0);
  };
  let screen;
  if (route === 'home') screen = /*#__PURE__*/React.createElement(GA_Home, {
    go: go,
    open: open
  });else if (route === 'work') screen = /*#__PURE__*/React.createElement(GA_Work, {
    open: open
  });else if (route === 'project') screen = /*#__PURE__*/React.createElement(GA_ProjectDetail, {
    id: projectId,
    open: open,
    go: go
  });else if (route === 'about') screen = /*#__PURE__*/React.createElement(GA_About, {
    go: go
  });else if (route === 'contact') screen = /*#__PURE__*/React.createElement(GA_Contact, null);
  const navRoute = route === 'project' ? 'work' : route;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--paper-300)'
    }
  }, /*#__PURE__*/React.createElement(GA_Nav, {
    route: navRoute,
    go: go
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, screen), /*#__PURE__*/React.createElement(GA_Footer, {
    go: go
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/data.js
try { (() => {
// Gustavo Albino — portfolio sample data (window global for the UI kit)
window.GA_PROJECTS = [{
  id: 'thor',
  title: 'Trovão',
  client: 'Editora Asgard',
  category: 'brand',
  categoryLabel: 'Branding',
  year: '2024',
  color: 'var(--cerulean)',
  monoLight: true,
  featured: true,
  blurb: 'Sistema de identidade para uma graphic novel nórdica — letreiramento, paleta e capas em estilo Silver Age.',
  tags: ['Identidade', 'Lettering', 'Editorial'],
  role: 'Direção de arte · Ilustração',
  deliverables: ['Logotipo', '12 capas', 'Guia de estilo', 'Tipografia']
}, {
  id: 'daredevil',
  title: 'Sem Medo',
  client: 'Estúdio Cozinha',
  category: 'poster',
  categoryLabel: 'Pôster',
  year: '2024',
  color: 'var(--vermilion)',
  monoLight: true,
  featured: true,
  blurb: 'Série de cartazes pulp com retícula pesada e tinta chapada, impressos em serigrafia de duas cores.',
  tags: ['Pôster', 'Serigrafia', 'Ilustração'],
  role: 'Ilustração · Impressão',
  deliverables: ['3 cartazes', 'Arte para serigrafia', 'Mockups']
}, {
  id: 'doom',
  title: 'Fatalis',
  client: 'Latveria Records',
  category: 'brand',
  categoryLabel: 'Branding',
  year: '2023',
  color: 'var(--violet)',
  monoLight: true,
  featured: true,
  blurb: 'Identidade sonora e visual para um selo de heavy metal — selo, capas e merch com armadura de herói.',
  tags: ['Identidade', 'Capa', 'Merch'],
  role: 'Direção de arte',
  deliverables: ['Selo', 'Capas de álbum', 'Camisetas', 'Adesivos']
}, {
  id: 'peppers',
  title: 'Asterisco',
  client: 'Banda Pimenta',
  category: 'brand',
  categoryLabel: 'Branding',
  year: '2023',
  color: 'var(--gold)',
  monoLight: false,
  featured: false,
  blurb: 'Logotipo-símbolo radial para uma banda de funk-rock, pensado para escalar de adesivo a outdoor.',
  tags: ['Logotipo', 'Símbolo'],
  role: 'Logotipo',
  deliverables: ['Símbolo', 'Aplicações', 'Manual curto']
}, {
  id: 'editorial',
  title: 'Quadro a Quadro',
  client: 'Revista Painel',
  category: 'editorial',
  categoryLabel: 'Editorial',
  year: '2022',
  color: 'var(--cerulean)',
  monoLight: true,
  featured: false,
  blurb: 'Projeto gráfico de uma revista sobre quadrinhos brasileiros, com grelha modular e aberturas ilustradas.',
  tags: ['Editorial', 'Grelha', 'Ilustração'],
  role: 'Projeto gráfico',
  deliverables: ['Grelha', '6 aberturas', 'Capa']
}, {
  id: 'arcade',
  title: 'Fliperama',
  client: 'Bar Continue',
  category: 'illu',
  categoryLabel: 'Ilustração',
  year: '2022',
  color: 'var(--vermilion)',
  monoLight: true,
  featured: false,
  blurb: 'Mural e cardápio ilustrado para um bar de fliperama, misturando pixel art e traço de gibi.',
  tags: ['Ilustração', 'Mural', 'Cardápio'],
  role: 'Ilustração',
  deliverables: ['Mural', 'Cardápio', 'Sinalização']
}];
window.GA_FILTERS = [{
  id: 'all',
  label: 'Tudo'
}, {
  id: 'brand',
  label: 'Branding'
}, {
  id: 'poster',
  label: 'Pôster'
}, {
  id: 'editorial',
  label: 'Editorial'
}, {
  id: 'illu',
  label: 'Ilustração'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/data.js", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/parts.jsx
try { (() => {
/* Gustavo Albino — portfolio UI kit · shared parts */
(() => {
  const {
    Badge,
    Tag,
    Button,
    IconButton,
    Avatar,
    Card,
    Kicker,
    Seal
  } = window.GustavoAlbinoDesignSystem_68545b;

  /* Comic-cover artwork block for a project (flat ink + halftone + big title) */
  function Cover({
    project,
    height = 280,
    big = false
  }) {
    const fg = project.monoLight ? 'var(--paper-100)' : 'var(--ink)';
    const mono = project.monoLight ? '../../assets/monogram-white.png' : '../../assets/monogram-black.png';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height,
        background: project.color,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: big ? '28px' : '20px',
        boxSizing: 'border-box'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ga-halftone-lg",
      style: {
        position: 'absolute',
        inset: 0,
        opacity: 0.5,
        mixBlendMode: 'multiply'
      }
    }), /*#__PURE__*/React.createElement("img", {
      src: mono,
      alt: "",
      style: {
        position: 'absolute',
        right: -24,
        bottom: -24,
        width: big ? 220 : 150,
        opacity: 0.16,
        pointerEvents: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ga-badge",
      style: {
        background: fg,
        color: project.color,
        borderColor: fg
      }
    }, project.categoryLabel), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 12,
        color: fg,
        letterSpacing: '.1em'
      }
    }, project.year)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: '.16em',
        textTransform: 'uppercase',
        color: fg,
        opacity: 0.85
      }
    }, project.client), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '-.02em',
        lineHeight: 0.92,
        color: fg,
        fontSize: big ? 'clamp(48px, 7vw, 86px)' : 38,
        marginTop: 4
      }
    }, project.title)));
  }
  function ProjectCard({
    project,
    onOpen
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ga-card ga-card--lift",
      style: {
        cursor: 'pointer'
      },
      onClick: () => onOpen(project.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "ga-card__media",
      style: {
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(Cover, {
      project: project,
      height: 220
    })), /*#__PURE__*/React.createElement("div", {
      className: "ga-card__body"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 22,
        margin: 0,
        color: 'var(--ink)'
      }
    }, project.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, project.role)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        lineHeight: 1.55,
        color: 'var(--text-body)',
        margin: '8px 0 14px'
      }
    }, project.blurb), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
      }
    }, project.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t,
      className: "ga-tag",
      style: {
        fontSize: 12,
        padding: '2px 10px'
      }
    }, t)))));
  }
  function Nav({
    route,
    go
  }) {
    const links = [['work', 'Trabalhos'], ['about', 'Sobre'], ['contact', 'Contato']];
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'var(--paper-300)',
        borderBottom: '2px solid var(--ink)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1180,
        margin: '0 auto',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => go('home'),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(Seal, {
      src: "../../assets/logo-seal-black.png",
      size: 42
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '-.01em',
        fontSize: 18,
        color: 'var(--ink)',
        lineHeight: 1
      }
    }, "Gustavo", /*#__PURE__*/React.createElement("br", null), "Albino")), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, links.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => go(id),
      className: "ga-tab",
      style: {
        background: route === id ? 'var(--ink)' : 'transparent',
        color: route === id ? 'var(--paper-300)' : 'var(--ink)'
      }
    }, label)), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      onClick: () => go('contact'),
      style: {
        marginLeft: 8
      }
    }, "Vamos conversar"))));
  }
  function Marquee({
    items,
    bg = 'var(--ink)',
    fg = 'var(--paper-300)'
  }) {
    const row = items.concat(items);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: bg,
        borderTop: '2px solid var(--ink)',
        borderBottom: '2px solid var(--ink)',
        overflow: 'hidden',
        padding: '12px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        gap: 28,
        whiteSpace: 'nowrap',
        animation: 'ga-marquee 22s linear infinite'
      }
    }, row.map((it, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '.02em',
        fontSize: 20,
        color: fg,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 28
      }
    }, it, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--gold)'
      }
    }, "\u2726")))));
  }
  function Footer({
    go
  }) {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: 'var(--ink)',
        color: 'var(--paper-300)',
        borderTop: '2px solid var(--ink)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1180,
        margin: '0 auto',
        padding: '48px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 32,
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 360
      }
    }, /*#__PURE__*/React.createElement(Seal, {
      src: "../../assets/logo-seal-white.png",
      size: 64
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        lineHeight: 1.6,
        color: 'var(--paper-400)',
        marginTop: 16
      }
    }, "Designer e ilustrador. Identidade visual, cartazes e editorial com alma de gibi.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 56
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: 12
      }
    }, "Navegar"), [['work', 'Trabalhos'], ['about', 'Sobre'], ['contact', 'Contato']].map(([id, l]) => /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => go(id),
      style: {
        display: 'block',
        background: 'none',
        border: 'none',
        color: 'var(--paper-300)',
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        padding: '4px 0',
        cursor: 'pointer'
      }
    }, l))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: 12
      }
    }, "Redes"), ['Instagram', 'Behance', 'Dribbble', 'LinkedIn'].map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#",
      onClick: e => e.preventDefault(),
      style: {
        display: 'block',
        color: 'var(--paper-300)',
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        padding: '4px 0',
        textDecoration: 'none'
      }
    }, l))))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid var(--ink-600)',
        padding: '16px 24px',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--ink-400)'
      }
    }, "\xA9 2024 Gustavo Albino \xB7 Feito com tinta chapada"));
  }
  Object.assign(window, {
    GA_Cover: Cover,
    GA_ProjectCard: ProjectCard,
    GA_Nav: Nav,
    GA_Marquee: Marquee,
    GA_Footer: Footer
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/screens.jsx
try { (() => {
/* Gustavo Albino — portfolio UI kit · screens */
(() => {
  const {
    Badge,
    Tag,
    Button,
    IconButton,
    Avatar,
    Card,
    Kicker,
    Seal,
    Tabs,
    Input,
    Textarea,
    Select,
    Callout
  } = window.GustavoAlbinoDesignSystem_68545b;
  const {
    GA_Cover,
    GA_ProjectCard,
    GA_Marquee
  } = window;
  const WRAP = {
    maxWidth: 1180,
    margin: '0 auto',
    padding: '0 24px'
  };

  /* ───────────────── HOME ───────────────── */
  function Home({
    go,
    open
  }) {
    const featured = window.GA_PROJECTS.filter(p => p.featured);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      style: {
        ...WRAP,
        paddingTop: 64,
        paddingBottom: 56,
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: 40,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, {
      tone: "vermilion"
    }, "Designer & Ilustrador \xB7 Brasil"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '-.02em',
        lineHeight: 0.9,
        fontSize: 'clamp(52px, 8vw, 104px)',
        margin: '16px 0 0',
        color: 'var(--ink)'
      }
    }, "Tinta", /*#__PURE__*/React.createElement("br", null), "chapada,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--vermilion)'
      }
    }, "ideias"), " grandes."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 19,
        lineHeight: 1.55,
        color: 'var(--text-body)',
        maxWidth: '46ch',
        margin: '24px 0 28px'
      }
    }, "Crio identidades, cartazes e projetos editoriais com alma de gibi \u2014 contorno forte, cor saturada e muita ret\xEDcula."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      onClick: () => go('work')
    }, "Ver trabalhos"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "lg",
      onClick: () => go('about')
    }, "Sobre mim"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ga-panel",
      style: {
        background: 'var(--gold)',
        padding: 28,
        boxShadow: 'var(--shadow-pop-lg)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ga-halftone",
      style: {
        position: 'absolute'
      }
    }), /*#__PURE__*/React.createElement(Seal, {
      src: "../../assets/logo-seal-black.png",
      size: 220,
      spin: true
    })))), /*#__PURE__*/React.createElement(GA_Marquee, {
      items: ['Branding', 'Pôsteres', 'Ilustração', 'Editorial', 'Lettering', 'Serigrafia']
    }), /*#__PURE__*/React.createElement("section", {
      style: {
        ...WRAP,
        paddingTop: 56,
        paddingBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, {
      tone: "cerulean"
    }, "Selecionados"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'clamp(32px,4vw,46px)',
        textTransform: 'uppercase',
        letterSpacing: '-.02em',
        margin: '10px 0 0',
        color: 'var(--ink)'
      }
    }, "Trabalhos em destaque")), /*#__PURE__*/React.createElement(Button, {
      variant: "ink",
      size: "sm",
      onClick: () => go('work')
    }, "Ver tudo \u2192")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24
      }
    }, featured.map(p => /*#__PURE__*/React.createElement(GA_ProjectCard, {
      key: p.id,
      project: p,
      onOpen: open
    })))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...WRAP,
        paddingTop: 48,
        paddingBottom: 64
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 24
      }
    }, [['01', 'Identidade visual', 'Logotipos, sistemas e manuais que aguentam o mundo real.', 'var(--vermilion)'], ['02', 'Cartaz & ilustração', 'Peças pulp em serigrafia, com retícula e tinta de duas cores.', 'var(--cerulean)'], ['03', 'Editorial', 'Revistas, capas e grelhas modulares com aberturas ilustradas.', 'var(--violet)']].map(([n, t, d, c]) => /*#__PURE__*/React.createElement("div", {
      key: n,
      className: "ga-card",
      style: {
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: c,
        height: 8
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 24
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 13,
        color: c,
        letterSpacing: '.1em'
      }
    }, n), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 22,
        margin: '6px 0 8px',
        color: 'var(--ink)'
      }
    }, t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        lineHeight: 1.55,
        color: 'var(--text-body)',
        margin: 0
      }
    }, d)))))));
  }

  /* ───────────────── WORK ───────────────── */
  function Work({
    open
  }) {
    const [filter, setFilter] = React.useState('all');
    const projects = filter === 'all' ? window.GA_PROJECTS : window.GA_PROJECTS.filter(p => p.category === filter);
    return /*#__PURE__*/React.createElement("section", {
      style: {
        ...WRAP,
        paddingTop: 56,
        paddingBottom: 72
      }
    }, /*#__PURE__*/React.createElement(Kicker, {
      tone: "vermilion"
    }, "Acervo \xB7 ", window.GA_PROJECTS.length, " projetos"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(40px,6vw,72px)',
        textTransform: 'uppercase',
        letterSpacing: '-.02em',
        margin: '12px 0 24px',
        color: 'var(--ink)'
      }
    }, "Trabalhos"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 28
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      tabs: window.GA_FILTERS,
      value: filter,
      onChange: setFilter
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24
      }
    }, projects.map(p => /*#__PURE__*/React.createElement(GA_ProjectCard, {
      key: p.id,
      project: p,
      onOpen: open
    }))));
  }

  /* ───────────────── PROJECT DETAIL ───────────────── */
  function ProjectDetail({
    id,
    open,
    go
  }) {
    const list = window.GA_PROJECTS;
    const idx = list.findIndex(p => p.id === id);
    const p = list[idx];
    const next = list[(idx + 1) % list.length];
    if (!p) return null;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        ...WRAP,
        paddingTop: 24
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => go('work'),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        padding: '8px 0'
      }
    }, "\u2190 Voltar aos trabalhos")), /*#__PURE__*/React.createElement("div", {
      style: {
        ...WRAP
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ga-card",
      style: {
        padding: 0,
        marginBottom: 32
      }
    }, /*#__PURE__*/React.createElement(GA_Cover, {
      project: p,
      height: 400,
      big: true
    }))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...WRAP,
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: 48,
        paddingBottom: 56
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, {
      tone: "vermilion"
    }, p.categoryLabel, " \xB7 ", p.year), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(36px,5vw,64px)',
        textTransform: 'uppercase',
        letterSpacing: '-.02em',
        margin: '12px 0 16px',
        color: 'var(--ink)'
      }
    }, p.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 18,
        lineHeight: 1.6,
        color: 'var(--text-body)',
        maxWidth: '60ch'
      }
    }, p.blurb), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        lineHeight: 1.7,
        color: 'var(--text-body)',
        maxWidth: '60ch',
        marginTop: 16
      }
    }, "O processo come\xE7ou por refer\xEAncias de quadrinhos da era de prata: ret\xEDcula vis\xEDvel, contorno preto pesado e no m\xE1ximo tr\xEAs tintas. Cada pe\xE7a foi desenhada para funcionar tanto em tela quanto em impress\xE3o de baixo custo."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        marginTop: 28
      }
    }, [p.color, 'var(--ink)'].map((c, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "ga-card ga-hatch",
      style: {
        height: 200,
        background: c,
        padding: 0
      }
    })))), /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("div", {
      className: "ga-card",
      style: {
        padding: 24,
        position: 'sticky',
        top: 88
      }
    }, [['Cliente', p.client], ['Função', p.role], ['Ano', p.year]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, k), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 16,
        color: 'var(--ink)',
        marginTop: 2
      }
    }, v))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: 8
      }
    }, "Entregas"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20
      }
    }, p.deliverables.map(d => /*#__PURE__*/React.createElement(Badge, {
      key: d,
      variant: "quiet"
    }, d))), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      block: true,
      onClick: () => go('contact')
    }, "Quero algo assim")))), /*#__PURE__*/React.createElement("div", {
      onClick: () => open(next.id),
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(GA_Cover, {
      project: next,
      height: 180
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        ...WRAP,
        marginTop: -140,
        position: 'relative',
        paddingBottom: 80
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        color: next.monoLight ? 'var(--paper-100)' : 'var(--ink)'
      }
    }, "Pr\xF3ximo projeto \u2192"))));
  }

  /* ───────────────── ABOUT ───────────────── */
  function About({
    go
  }) {
    const skills = ['Identidade visual', 'Lettering', 'Ilustração', 'Direção de arte', 'Serigrafia', 'Editorial', 'Tipografia', 'Packaging'];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        ...WRAP,
        paddingTop: 56,
        paddingBottom: 72
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        gap: 48,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ga-card",
      style: {
        padding: 0,
        position: 'sticky',
        top: 88
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--violet)',
        height: 320,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ga-halftone-lg",
      style: {
        position: 'absolute',
        inset: 0,
        opacity: 0.5,
        mixBlendMode: 'multiply'
      }
    }), /*#__PURE__*/React.createElement("img", {
      src: "../../assets/monogram-white.png",
      alt: "",
      style: {
        width: 160,
        position: 'relative'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      initials: "GA",
      size: "lg"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 20,
        color: 'var(--ink)'
      }
    }, "Gustavo Albino"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, "S\xE3o Paulo \xB7 BR"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "quiet",
      dot: true
    }, "Dispon\xEDvel para projetos")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, {
      tone: "vermilion"
    }, "Sobre"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(36px,5vw,60px)',
        textTransform: 'uppercase',
        letterSpacing: '-.02em',
        margin: '12px 0 20px',
        color: 'var(--ink)',
        textWrap: 'balance'
      }
    }, "Cresci lendo gibi e nunca parei de desenhar."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 18,
        lineHeight: 1.65,
        color: 'var(--text-body)'
      }
    }, "Sou designer e ilustrador h\xE1 mais de oito anos. Meu trabalho mistura a energia dos quadrinhos cl\xE1ssicos com o rigor do design de sistemas: cor chapada, contorno forte e uma boa ret\xEDcula resolvem quase tudo."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        lineHeight: 1.7,
        color: 'var(--text-body)',
        marginTop: 14
      }
    }, "J\xE1 assinei identidades para editoras, bandas e bares, sempre buscando pe\xE7as que funcionem do adesivo ao outdoor. Acredito em conversa honesta antes de qualquer pixel."), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 22,
        textTransform: 'uppercase',
        letterSpacing: '-.01em',
        margin: '32px 0 14px',
        color: 'var(--ink)'
      }
    }, "O que eu fa\xE7o"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10
      }
    }, skills.map(s => /*#__PURE__*/React.createElement(Tag, {
      key: s
    }, s))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 32
      }
    }, /*#__PURE__*/React.createElement(Callout, {
      variant: "info",
      title: "Como trabalho"
    }, "Projetos por escopo fechado, com etapas claras e no m\xE1ximo duas rodadas de revis\xE3o por entrega.")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 28
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      onClick: () => go('contact')
    }, "Vamos conversar")))));
  }

  /* ───────────────── CONTACT ───────────────── */
  function Contact() {
    const [sent, setSent] = React.useState(false);
    return /*#__PURE__*/React.createElement("section", {
      style: {
        ...WRAP,
        paddingTop: 56,
        paddingBottom: 80
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, {
      tone: "vermilion"
    }, "Contato"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(40px,6vw,72px)',
        textTransform: 'uppercase',
        letterSpacing: '-.02em',
        margin: '12px 0 18px',
        color: 'var(--ink)'
      }
    }, "Bora criar algo barulhento?"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 18,
        lineHeight: 1.6,
        color: 'var(--text-body)',
        maxWidth: '42ch'
      }
    }, "Conte sobre o projeto, o prazo e a verba aproximada. Respondo em at\xE9 dois dias \xFAteis."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, [['Email', 'ola@gustavoalbino.com'], ['Instagram', '@gustavo.albino'], ['Cidade', 'São Paulo · BR']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'baseline'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        width: 90
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 16,
        color: 'var(--ink)'
      }
    }, v))))), /*#__PURE__*/React.createElement("div", {
      className: "ga-card",
      style: {
        padding: 28
      }
    }, sent ? /*#__PURE__*/React.createElement(Callout, {
      variant: "success",
      title: "Mensagem enviada!"
    }, "Obrigado pelo contato \u2014 retorno em breve.") : /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        setSent(true);
      },
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Nome",
      placeholder: "Seu nome",
      required: true
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Email",
      type: "email",
      placeholder: "voce@email.com",
      required: true
    }), /*#__PURE__*/React.createElement(Select, {
      label: "Tipo de projeto",
      defaultValue: "Identidade visual"
    }, /*#__PURE__*/React.createElement("option", null, "Identidade visual"), /*#__PURE__*/React.createElement("option", null, "Cartaz / Ilustra\xE7\xE3o"), /*#__PURE__*/React.createElement("option", null, "Editorial"), /*#__PURE__*/React.createElement("option", null, "Outro")), /*#__PURE__*/React.createElement(Textarea, {
      label: "Mensagem",
      rows: 4,
      placeholder: "Conte sobre o projeto\u2026",
      required: true
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      type: "submit",
      block: true
    }, "Enviar mensagem")))));
  }
  Object.assign(window, {
    GA_Home: Home,
    GA_Work: Work,
    GA_ProjectDetail: ProjectDetail,
    GA_About: About,
    GA_Contact: Contact
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Kicker = __ds_scope.Kicker;

__ds_ns.Seal = __ds_scope.Seal;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
