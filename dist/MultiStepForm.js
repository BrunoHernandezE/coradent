"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _formik = require("formik");
var Yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Esquemas de validación
var step1Schema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  age: Yup.number().required("La edad es obligatoria").positive().integer()
});
var step2Schema = Yup.object({
  email: Yup.string().email("Email no válido").required("El email es obligatorio"),
  phone: Yup.string().required("El teléfono es obligatorio")
});
var MultiStepForm = function MultiStepForm() {
  var _useState = (0, _react.useState)(1),
    _useState2 = _slicedToArray(_useState, 2),
    step = _useState2[0],
    setStep = _useState2[1];
  var _useState3 = (0, _react.useState)({
      name: "",
      age: "",
      email: "",
      phone: ""
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    formData = _useState4[0],
    setFormData = _useState4[1];
  var handleNext = function handleNext(values) {
    setFormData(_objectSpread(_objectSpread({}, formData), values));
    setStep(step + 1);
  };
  var handleBack = function handleBack() {
    setStep(step - 1);
  };
  var handleSubmit = function handleSubmit(values) {
    var finalData = _objectSpread(_objectSpread({}, formData), values);
    console.log("Datos finales:", finalData);
    alert("Formulario enviado exitosamente!");
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, "Formulario de Historial M\xE9dico"), step === 1 && /*#__PURE__*/_react["default"].createElement(_formik.Formik, {
    initialValues: formData,
    validationSchema: step1Schema,
    onSubmit: handleNext
  }, function (_ref) {
    var errors = _ref.errors,
      touched = _ref.touched;
    return /*#__PURE__*/_react["default"].createElement(_formik.Form, null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Nombre:"), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
      name: "name"
    }), errors.name && touched.name && /*#__PURE__*/_react["default"].createElement("div", null, errors.name)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Edad:"), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
      name: "age",
      type: "number"
    }), errors.age && touched.age && /*#__PURE__*/_react["default"].createElement("div", null, errors.age)), /*#__PURE__*/_react["default"].createElement("button", {
      type: "submit"
    }, "Siguiente"));
  }), step === 2 && /*#__PURE__*/_react["default"].createElement(_formik.Formik, {
    initialValues: formData,
    validationSchema: step2Schema,
    onSubmit: handleSubmit
  }, function (_ref2) {
    var errors = _ref2.errors,
      touched = _ref2.touched;
    return /*#__PURE__*/_react["default"].createElement(_formik.Form, null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Email:"), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
      name: "email",
      type: "email"
    }), errors.email && touched.email && /*#__PURE__*/_react["default"].createElement("div", null, errors.email)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Tel\xE9fono:"), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
      name: "phone"
    }), errors.phone && touched.phone && /*#__PURE__*/_react["default"].createElement("div", null, errors.phone)), /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      onClick: handleBack
    }, "Atr\xE1s"), /*#__PURE__*/_react["default"].createElement("button", {
      type: "submit"
    }, "Enviar"));
  }));
};
var _default = exports["default"] = MultiStepForm;