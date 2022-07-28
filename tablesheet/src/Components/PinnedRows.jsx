
import * as React from 'react';
import GC from '@grapecity/spread-sheets';
import "@grapecity/spread-sheets-tablesheet";
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';
import './styles.css';

const PinnedRows = () => {
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
        var myTable = dataManager.addTable("myTable", {
            remote: {
                read: {
                    url: 'https://demodata.grapecity.com/northwind/api/v1/Suppliers'
                }
            }
        });
        var headerStyle = {
            font: "italic 10pt Calibri"
        };
        var headerStyle2 = {
            font: "12pt Calibri",
            backColor : "#F7A711",
            foreColor:"white",
            hAlign:"left",
            borderTop: {
                color: "black",
                style: "thick"
            },
            borderLeft: {
                color: "black",
                style: "thick"
            },
            borderRight: {
                color: "black",
                style: "thick"
            },
        };

        var headerStyle3 = {
            font: "bold 14pt Calibri",
            backColor : "#F7A711",
            borderTop: {
                color: "blue",
                style: "thick"
            },
            borderLeft: {
                color: "blue",
                style: "thin"
            },
            borderRight: {
                color: "blue",
                style: "thin"
            },
            color:'red',
        };
        var numericStyle = {};
        numericStyle.formatter = "$ 0.00";
        var formulaRule = {
            ruleType: "formulaRule",
            formula: "@=USA",
            style: {
                font:"bold 12pt Calibri",
                backColor: "#F7D3BA",
                foreColor :"#F09478"
            }
        };
        var countryValidator = {
            type: "formula",
            formula: '@=USA',
            inputTitle: 'Data validation:',
            inputMessage: 'Enter a Country',
            highlightStyle: {
                type: 'icon',
                color: "#F09478",
                position: 'outsideRight',
            }
        };
        //init a table sheet
        var sheet = spread.addSheetTab(0, "TableSheet1", GC.Spread.Sheets.SheetType.tableSheet);
        sheet.options.allowAddNew = false; //hide new row

        //bind a view to the table sheet
        myTable.fetch().then(function () {
           // var style = { formatter: 'MM/dd/yyyy' };
            var view = myTable.addView("myView", [
                { value: "supplierId", width: 80 },
                { value: "companyName", width: 200, caption :"Company Name",headerStyle: headerStyle },
                { value: "contactTitle", width: 150, caption :"Contact" ,headerStyle: headerStyle2},
                { value: "address", width: 200 },
                { value: "city", width: 150, caption :"City",headerStyle: headerStyle3 },
                { value: "postalCode", width: 100, caption :"postalCode" },
                { value: "country", width: 100, caption :"country" ,conditionalFormats: [formulaRule], validator: countryValidator, style: numericStyle }
            ]);
            sheet.setDataView(view);
            sheet.togglePinnedRows([1, 3, 6]);
            sheet.togglePinnedColumns([1]);
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

export default PinnedRows