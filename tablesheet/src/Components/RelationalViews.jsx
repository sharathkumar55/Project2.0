
import * as React from 'react';
import GC from '@grapecity/spread-sheets';
import "@grapecity/spread-sheets-tablesheet";
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';
import './styles.css';

const RelationalViews = () => {
    // function getBaseApiUrl() {
    //     return 'https://www.grapecity.com/spreadjs/demos/features/table-sheet/overview/purejs'.match(/http.+spreadjs\/demos\//)[0] + 'server/api';
    //     //window.location.href.match(/http.+spreadjs\/demos\//)[0] + 'server/api';
    // }
    const initSpread=(spread) =>{
        spread.suspendPaint();
        spread.clearSheets();
        spread.options.autoFitType = GC.Spread.Sheets.AutoFitType.cellWithHeader;
        spread.bind(GC.Spread.Sheets.Events.EditStarting, function (e, args) {
            console.log('@@@@@',args.sheet.getValue(0, args.col, GC.Spread.Sheets.SheetArea.colHeader));
            if (args.sheet.getValue(0, args.col, GC.Spread.Sheets.SheetArea.colHeader) === 'Customer'){
                args.cancel = true;
            }
        });
        //init a data manager
        // var tableName = "Supplier";
        // var baseApiUrl = getBaseApiUrl();
        // var apiUrl = baseApiUrl + "/" + tableName;
         var dataManager = spread.dataManager();
        var orderTable = dataManager.addTable("orderTable", {
            remote: {
                read: {
                    url: 'https://demodata.grapecity.com/northwind/api/v1/Orders'
                }
            }
        });
       
        var customerTable = dataManager.addTable("customerTable", {
            remote: {
                read: {
                    url: 'https://demodata.grapecity.com/northwind/api/v1/Customers'
                }
            }
        });
        dataManager.addRelationship(orderTable, "CustomerId", "customer", customerTable, "orderId", "orders");

        //init a table sheet
        var sheet = spread.addSheetTab(0, "TableSheet1", GC.Spread.Sheets.SheetType.tableSheet);
        sheet.options.allowAddNew = false; //hide new row


         //bind a view to the table sheet
         var style = {
            formatter: 'Ship To: {{=CONCAT(PROPERTY(@, "shipAddress"), ", ", PROPERTY(@, "shipCity"))}}'
        };
        var selectView = customerTable.addView("customersView",
            [
                { value: 'customerId' },
                { value: 'companyName' },
                { value: 'contactName' },
                { value: 'contactTitle' },
            ]);
        //bind a view to the table sheet
        var multiSelectStyle = {
            formatter: '{{=CONCAT(PROPERTY(@, "companyName"), ", ", PROPERTY(@, "contactName"))}}', // convert the object to string
            cellButtons: [
                {
                    imageType: "ellipsis",
                    command: "openMultiColumn",
                    useButtonStyle: true,
                }
            ],
            dropDowns: [
                {
                    type: "multiColumn",
                    option: {
                        width: 400,
                        height: 400,
                        dataSource: selectView,
                        bindingInfos: [
                            { name: "customerId", size: 60 },
                            { name: "companyName", size: "*" },
                            { name: "contactName", size: "*" },
                        ]
                    }
                }
            ]
        };
        var myView = orderTable.addView("myView", [
            { value: "orderId", width: 100 }, //set column width 100px
            { value: "orderDate", width: 120, style: { formatter: "MM/dd/yyyy" }, caption: "Order Date"},
            { value: "shippedDate", width: 120, caption: "Shipped Date" },
            /**
             * customer.companyName - this is a related field from the customer table
             * update the customerId in orderTable by select from customer table.
             */
             { value: "customer", width: 350, caption: "Customers", style: multiSelectStyle},
            /**
             * [=@] this column will contain the full row as a value, the formatter formula will extract the shipping address from the full row.
             * Format functions can be used to customize column display value
             * use star-size "2*" to set column width relative to the viewport width
             */
            { value: "=[@]", caption: "Address", style: style, width:320}
        ]);
        myView.fetch().then(function () {
            sheet.setDataView(myView);
        });
        spread.resumePaint();
    }
  return (
    <div class="sample-tutorial">
    <div class="sample-spreadsheets">
        <SpreadSheets workbookInitialized={spread => initSpread(spread)} hostStyle={{width:'80vw',height:'80vh'}}>
        </SpreadSheets>
    </div>
</div>
  )
    
}

export default RelationalViews;