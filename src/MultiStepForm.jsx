import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Esquemas de validación
const step1Schema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    age: Yup.number().required("La edad es obligatoria").positive().integer(),
});

const step2Schema = Yup.object({
    email: Yup.string().email("Email no válido").required("El email es obligatorio"),
    phone: Yup.string().required("El teléfono es obligatorio"),
});

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        email: "",
        phone: "",
    });

    const handleNext = (values) => {
        setFormData({ ...formData, ...values });
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = (values) => {
        const finalData = { ...formData, ...values };
        console.log("Datos finales:", finalData);
        alert("Formulario enviado exitosamente!");
    };

    return (
        <div>
            <h1>Formulario de Historial Médico</h1>
            {step === 1 && (
                <Formik
                    initialValues={formData}
                    validationSchema={step1Schema}
                    onSubmit={handleNext}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div>
                                <label>Nombre:</label>
                                <Field name="name" />
                                {errors.name && touched.name && <div>{errors.name}</div>}
                            </div>
                            <div>
                                <label>Edad:</label>
                                <Field name="age" type="number" />
                                {errors.age && touched.age && <div>{errors.age}</div>}
                            </div>
                            <button type="submit">Siguiente</button>
                        </Form>
                    )}
                </Formik>
            )}

            {step === 2 && (
                <Formik
                    initialValues={formData}
                    validationSchema={step2Schema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div>
                                <label>Email:</label>
                                <Field name="email" type="email" />
                                {errors.email && touched.email && <div>{errors.email}</div>}
                            </div>
                            <div>
                                <label>Teléfono:</label>
                                <Field name="phone" />
                                {errors.phone && touched.phone && <div>{errors.phone}</div>}
                            </div>
                            <button type="button" onClick={handleBack}>
                                Atrás
                            </button>
                            <button type="submit">Enviar</button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default MultiStepForm;