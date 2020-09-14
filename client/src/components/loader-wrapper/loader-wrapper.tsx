import React, {useEffect, useRef, useState} from "react";
import {Loading, Error, NoResultFound} from './loader-utils-pages';

interface LoaderWrapperProps {
  loading: boolean,
  error: boolean,
  errorMessage: string,
  noResultFound: boolean,
  dataLoadedComponent: (ref: React.RefObject<any>) => React.ReactElement
  height?: number
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = (
  {
    loading,
    error,
    errorMessage,
    noResultFound,
    dataLoadedComponent,
    height
  }) => {
  const ref = useRef<HTMLDivElement>(null);

  // use table height to set loader height
  const [tableHeight, setTableHeight] = useState(height || 400);

  useEffect(() => {
    if (loading) return;
    if (ref.current) {
      setTableHeight(ref.current.scrollHeight);
    }
  }, [loading]);

  if (error) {
    return <Error message={errorMessage}/>
  } else if (loading) {
    return <Loading height={tableHeight}/>
  } else if (noResultFound) {
    return <NoResultFound/>
  } else {
    return dataLoadedComponent(ref)
  }
};

export default LoaderWrapper
