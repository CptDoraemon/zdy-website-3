import React, {useEffect} from "react";
import {tableHeaderKeys, tableHeaderValues} from "../../components/filter-table/search-table/search-table";

const useHydrateTable = (tableData: any, iframeRef: React.RefObject<HTMLIFrameElement>, isIframeLoaded: boolean) => {
  useEffect(() => {
    if (!tableData || !isIframeLoaded) {
      return
    }
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentDocument) {
      return
    }

    console.log(tableData);

    const iframeDocument = iframe.contentDocument;
    // const header = ['Gene Symbol', '药品名', '药品类型', '病症', 'FDA Source'];
    // const keys = ['Gene_symbol', 'Drug_name', 'Drug_type', 'disease', 'FDA Source'];
    const table = iframeDocument.getElementById('table');
    if (!table) {
      return
    }

    insertTableHeader();
    // @ts-ignore
    tableData.forEach(row => {
      insertTableRow(row)
    });

    function insertTableHeader() {
      const row = iframeDocument.createElement('tr');
      tableHeaderValues.forEach(name => {
        const cell = iframeDocument.createElement('th');
        cell.innerText = name;
        row.appendChild(cell);
      });
      table!.appendChild(row);
    }

    function insertTableRow(data: string[]) {
      const row = iframeDocument.createElement('tr');
      tableHeaderKeys.forEach(key => {
        const cell = iframeDocument.createElement('td');
        // @ts-ignore
        cell.innerText = data[key];
        row.appendChild(cell);
      });
      table!.appendChild(row);
    }

  }, [tableData, isIframeLoaded, iframeRef]);
};

export default useHydrateTable
