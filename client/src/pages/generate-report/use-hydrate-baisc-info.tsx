import React, {useEffect} from "react";

const useHydrateBasicInfo = (
  basicInfoData: {[key: string]: string},
  basicInfoDisplayNames: {[key: string]: string},
  iframeRef: React.RefObject<HTMLIFrameElement>,
  isIframeLoaded: boolean
) => {
  useEffect(() => {
    if (!basicInfoData || !basicInfoDisplayNames || !isIframeLoaded) {
      return
    }
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentDocument) {
      return
    }

    const iframeDocument = iframe.contentDocument;
    const keys = Object.keys(basicInfoData);
    const infoSection = iframeDocument.getElementById('info-section');
    if (!infoSection) {
      return
    }

    keys.forEach(key => {
      insertItem(basicInfoDisplayNames[key], basicInfoData[key])
    });

    function insertItem(displayName: string, value: string) {
      const item = iframeDocument.createElement('div');
      const label = iframeDocument.createElement('span');
      const text = iframeDocument.createElement('span');
      item.className = 'info-item';
      label.className = 'bold info-item-label';
      label.innerText = `${displayName}：`;
      text.innerText = value;
      item.appendChild(label);
      item.appendChild(text);
      infoSection?.appendChild(item);
    }

  }, [isIframeLoaded, iframeRef, basicInfoData, basicInfoDisplayNames]);
};

export default useHydrateBasicInfo
