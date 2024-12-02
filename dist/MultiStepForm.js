"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _formik = require("formik");
var Yup = _interopRequireWildcard(require("yup"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Esquemas de validación
const step1Schema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  age: Yup.number().required("La edad es obligatoria").positive().integer()
});
const step2Schema = Yup.object({
  email: Yup.string().email("Email no válido").required("El email es obligatorio"),
  phone: Yup.string().required("El teléfono es obligatorio")
});
const MultiStepForm = () => {
  const [step, setStep] = (0, _react.useState)(1);
  const [formData, setFormData] = (0, _react.useState)({
    name: "",
    age: "",
    email: "",
    phone: ""
  });
  const handleNext = values => {
    setFormData(_objectSpread(_objectSpread({}, formData), values));
    setStep(step + 1);
  };
  const handleBack = () => {
    setStep(step - 1);
  };
  const handleSubmit = values => {
    const finalData = _objectSpread(_objectSpread({}, formData), values);
    console.log("Datos finales:", finalData);
    alert("Formulario enviado exitosamente!");
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: "Formulario de Historial M\xE9dico"
    }), step === 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_formik.Formik, {
      initialValues: formData,
      validationSchema: step1Schema,
      onSubmit: handleNext,
      children: ({
        errors,
        touched
      }) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_formik.Form, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            children: "Nombre:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_formik.Field, {
            name: "name"
          }), errors.name && touched.name && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: errors.name
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            children: "Edad:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_formik.Field, {
            name: "age",
            type: "number"
          }), errors.age && touched.age && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: errors.age
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "submit",
          children: "Siguiente"
        })]
      })
    }), step === 2 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_formik.Formik, {
      initialValues: formData,
      validationSchema: step2Schema,
      onSubmit: handleSubmit,
      children: ({
        errors,
        touched
      }) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_formik.Form, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            children: "Email:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_formik.Field, {
            name: "email",
            type: "email"
          }), errors.email && touched.email && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: errors.email
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            children: "Tel\xE9fono:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_formik.Field, {
            name: "phone"
          }), errors.phone && touched.phone && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: errors.phone
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          onClick: handleBack,
          children: "Atr\xE1s"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "submit",
          children: "Enviar"
        })]
      })
    })]
  });
};
var _default = exports.default = MultiStepForm;