import { useState } from "react";

const useForm = (init = {}, onSubmit, condition) => {
  const [values, setValues] = useState(init);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e, s, fn) => {
    let { name, value } = e.target;

    if (condition) {
      const { n, v } = condition(e, s);
      name = n;
      value = v;
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
    loading,
    setLoading,
    errors,
    setErrors,
  };
};

export default useForm;
