import React, { useState } from 'react'
import GC from '@grapecity/spread-sheets';
import "@grapecity/spread-sheets-tablesheet";
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';
import './styles.css';
const Grouping = () => {
    const [spreads,setSpreads] = useState();
    const initSpread=(spread) =>{
        setSpreads(spread);
        spread.suspendPaint();
        spread.clearSheets();
        spread.options.autoFitType = GC.Spread.Sheets.AutoFitType.cellWithHeader;

        //init a data manager
        // var tableName = "Order";
        // var baseApiUrl = getBaseApiUrl();
        // var apiUrl = baseApiUrl + "/" + tableName;
        var dataManager = spread.dataManager();
        var myTable = dataManager.addTable("myTable", {
            remote: {
                read: {
                    url: 'https://demodata.grapecity.com/northwind/api/v1/Orders'
                }
            }
        });

        //init a table sheet
        var sheet = spread.addSheetTab(0, "TableSheet", GC.Spread.Sheets.SheetType.tableSheet);
        sheet.options.allowAddNew = true; //hide new row

           //bind a view to the table sheet
           myTable.fetch().then(function () {
            var style = { formatter: 'MM/dd/yyyy' };
            var view = myTable.addView("myView", [
                { value: "Id", width: 80 },
                { value: "customerId", width: 120 },
                { value: "shipName", width: 100 },
                { value: "employeeId", width: 120 },
                { value: "orderDate", width: 100, style: style },
                { value: "requiredDate", width: 120, style: style },
                { value: "shippedDate", width: 120, style: style },
                { value: "shipVia", width: 80 },
                { value: "freight", width: 80 },
                { value: "shipAddress", width: 120 },
                { value: "shipCity", width: 100 },
                { value: "shipRegion", width: 100 },
                { value: "shipPostalCode", width: 140 },
                { value: "shipState", width: 120 }
            ]);
            spread.suspendPaint();
            sheet.setDataView(view);
            sheet.groupBy([
                {
                    caption: "shipName", field: "shipName", width: 120, style: { backColor: "#D0CECE" }
                       
                }
            ]);
            spread.resumePaint();
        });

        spread.resumePaint();
    }
    // const groupCallback=()=> {
    //     let sheet = spreads.getActiveSheetTab();
    //     console.log("###",sheet)
        
    // }
    // const removeGroupCallback=()=> {
    //     let sheet = spreads.getActiveSheetTab();
    //     sheet.removeGroupBy();
    // }
  return (
    <div class="sample-tutorial">
    <div class="sample-spreadsheets">
        <SpreadSheets workbookInitialized={spread => initSpread(spread)} hostStyle={{width:'80vw',height:'80vh'}}>
        </SpreadSheets>
    </div>
    {/* <div class="options-container">
<div class="option-row">
    <label>Use the below buttons to group or ungroup.</label>
</div>
<div class="option-row">
        <input type="button" value="Group" id="groupButton" onClick={() => groupCallback()}/>
        <input type="button" value="Remove Group" id="removeGroupButton" onClick={() => removeGroupCallback()}/>
    </div>
    </div> */}
</div>
);
}

export default Grouping