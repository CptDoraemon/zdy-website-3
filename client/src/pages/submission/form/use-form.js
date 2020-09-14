import useInput from "./use-input";
import useFileInput from "./use-file-input";
import {useContributeToDatabase} from "../../../services/use-contribute-to-database";

/**
 * @param {number} min
 * @param {number} max
 * @return {import('./use-input').Validator}
 */
const lengthValidator = (min, max) => (value) => {
  if (value.length > max) {
    return `Maximum characters allowed: ${max}`
  } else if (value.length < min) {
    return `Minimum characters required: ${min}`
  }

  return ''
};

const fileSizeMax = 5 * 1024 * 1024; //5MB

const useForm = () => {
  const name = useInput(lengthValidator(0, 100));
  const email = useInput(lengthValidator(0, 100));
  const note = useInput(lengthValidator(20, 5000));
  const file = useFileInput(fileSizeMax);

  const {
    loading,
    error,
    errorMessage,
    data,
    progress,
    submit: _submit
  } = useContributeToDatabase();

  const submit = (e) => {
    e.preventDefault();

    // return true if validation error exists, otherwise return false
    const validationStatus = [name, email, note, file].reduce((acc, cur) => {
      // reset error
      cur.resetError();

      const currentStatus = cur.validateInput();
      return acc && currentStatus;
    }, true);

    // some input are invalid
    if (!validationStatus) return;

    // proceed to submit
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('note', note.value);
    formData.append('file', file.file);
    _submit(formData);
  };

  return {
    name,
    email,
    note,
    file,
    submit,
    loading,
    errorMessage,
    successMessage: data,
    progress,
  }

};

export default useForm
