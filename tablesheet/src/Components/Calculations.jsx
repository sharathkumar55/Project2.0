
import * as React from 'react';
import GC from '@grapecity/spread-sheets';
import "@grapecity/spread-sheets-tablesheet";
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';
import './styles.css';

const Calculations = () => {
    // function getBaseApiUrl() {
    //     return 'https://www.grapecity.com/spreadjs/demos/features/table-sheet/overview/purejs'.match(/http.+spreadjs\/demos\//)[0] + 'server/api';
    //     //window.location.href.match(/http.+spreadjs\/demos\//)[0] + 'server/api';
    // }
    const initSpread=(spread) =>{
        spread.suspendPaint();
        spread.clearSheets();
        spread.options.autoFitType = GC.Spread.Sheets.AutoFitType.cellWithHeader;

        //init a data manager
        // var tableName = "Supplier";
        // var baseApiUrl = getBaseApiUrl();
        // var apiUrl = baseApiUrl + "/" + tableName;
         var dataManager = spread.dataManager();
        var productTable = dataManager.addTable("productTable", {
            remote: {
                read: {
                    url: 'https://demodata.grapecity.com/northwind/api/v1/Products'
                }
            }
        });
       
        var sheet = spread.addSheetTab(0, "TableSheet1", GC.Spread.Sheets.SheetType.tableSheet);
        sheet.options.allowAddNew = false; //hide new row
        sheet.setDefaultRowHeight(40, GC.Spread.Sheets.SheetArea.colHeader);

        //bind a view to the table sheet
        var myView = productTable.addView("myView", [
            { value: "productId", caption: "ID", width: 50  },
            { value: "productName", caption: "Name", width: 170 },
            { value: "unitPrice", caption: "Unit Price", style: {formatter: "$#,##0.00"}, width: 120 },  
            { value: "unitsInStock", caption: "Units In Stock", width: 120 },
            { value: "=[@unitsInStock] + [@unitsOnOrder]", caption: "Total Units", width: 120 },
            { value: "=[@unitPrice] * ([@unitsInStock] + [@unitsOnOrder])", caption: "Stock Value", style: {formatter: "$#,##0.00"}, width: 120 },
            { value: "=SUM([#1:@[unitPrice]]*([#1:@[unitsInStock]]+[#1:@[unitsOnOrder]])", caption: "Running SUM", style: {formatter: "$#,##0.00"}, width: 150 },
            { value: "=([@unitPrice] * ([@unitsInStock] + [@unitsOnOrder]))/SUM([unitPrice] * ([unitsInStock] + [unitsOnOrder]))", 
              caption: "Stock Value Ratio", style: {formatter: "0.00%"}, width: 160 }
        ]);
        myView.fetch().then(function () {
            sheet.setDataView(myView);
        });

        spread.resumePaint();
    }
  return (
    <div class="sample-tutorial">
    <div class="sample-spreadsheets">
        <SpreadSheets workbookInitialized={spread => initSpread(spread)} hostStyle={{width:'100vw',height:'100vh'}}>
        </SpreadSheets>
    </div>
</div>
  )
    
}

export default Calculations