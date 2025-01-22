export const useValidation = validateFn => {
  const validate = (values, setErrors) => {
    const errors = validateFn(values);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return { validate };
};
