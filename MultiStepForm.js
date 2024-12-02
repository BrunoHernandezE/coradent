"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _formik = require("formik");
var Yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    step = _useState2[0],
    setStep = _useState2[1];
  var _useState3 = (0, _react.useState)({
      name: "",
      age: "",
      email: "",
      phone: ""
    }),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
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
