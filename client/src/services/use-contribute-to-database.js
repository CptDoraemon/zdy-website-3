import usePost from "./helpers/use-post";
import urls from "./urls";

const useContributeToDatabase = () => {
  const {
    loading,
    error,
    errorMessage,
    data,
    progress,
    doPost,
  } = usePost();

  const submit = (formData) => {
    const options = {
      data: formData
    };

    doPost(urls.contributeToDatabase, options)
  };

  return {
    loading,
    error,
    errorMessage,
    data,
    progress,
    submit
  }
};

export {
  useContributeToDatabase
}
