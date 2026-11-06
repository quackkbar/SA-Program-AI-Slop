/**
 * Exact Mock Data from SA (5).pdf Pages 187 - 193
 * Used for 1:1 Pixel-Perfect UI Matching and seamless offline demo
 */

export interface ReportOrder {
  Sales_Order_ID: string;
  Company_Name: string;
  Customer_Name: string;
  Order_Date: string;
  Order_Status: string;
}

export const MOCK_ORDERS: ReportOrder[] = [
  {
    Sales_Order_ID: 'SO0A15',
    Company_Name: 'โรงพยาบาลเอกชล',
    Customer_Name: 'ส้มหวาน เปรี้ยวจี๊ด',
    Order_Date: '04/07/2568',
    Order_Status: 'Quotation_Not_Started',
  },
  {
    Sales_Order_ID: 'SO0A16',
    Company_Name: 'บางแสนแก๊สจำกัด',
    Customer_Name: 'มะนาว ชื่นใจ',
    Order_Date: '20/05/2568',
    Order_Status: 'Quotation_Pending',
  },
  {
    Sales_Order_ID: 'SO0A17',
    Company_Name: 'มนตรีการช่าง',
    Customer_Name: 'ส้มโอ ชิ้นใหญ่',
    Order_Date: '19/02/2568',
    Order_Status: 'Quotation_Completed',
  },
];

export interface ReportQuotation {
  Quotation_ID: string;
  Company_Name: string;
  Quotation_Date: string;
  Quotation_Status: string;
}

export const MOCK_QUOTATIONS: ReportQuotation[] = [
  {
    Quotation_ID: 'QU463P',
    Company_Name: 'บางแสนแก๊ส จำกัด',
    Quotation_Date: '15/04/2568',
    Quotation_Status: 'Under Revision',
  },
  {
    Quotation_ID: 'QU010B',
    Company_Name: 'มนตรีการช่าง',
    Quotation_Date: '07/03/2568',
    Quotation_Status: 'Under Revision',
  },
  {
    Quotation_ID: 'QU001A',
    Company_Name: 'โรงพยาบาลเอกชล',
    Quotation_Date: '04/02/2568',
    Quotation_Status: 'Under Revision',
  },
  {
    Quotation_ID: 'QU876H',
    Company_Name: 'โรงแรมบาบาราย',
    Quotation_Date: '04/02/2568',
    Quotation_Status: 'Pending',
  },
  {
    Quotation_ID: 'QU256B',
    Company_Name: 'โรงพยาบาลเอกชล',
    Quotation_Date: '01/01/2568',
    Quotation_Status: 'Completed',
  },
  {
    Quotation_ID: 'QU106J',
    Company_Name: 'สิรินยาชาบู',
    Quotation_Date: '17/08/2567',
    Quotation_Status: 'Rejected',
  },
];

export interface ReportPrintJob {
  Print_Job_ID: string;
  Product_Name: string;
  Print_Type: string;
  Prototype_Status: string;
  Date: string;
}

export const MOCK_PRINT_JOBS: ReportPrintJob[] = [
  {
    Print_Job_ID: 'PJ085K1',
    Product_Name: 'บิลใบเสร็จราคาแก๊ส',
    Print_Type: 'บิลใบเสร็จ',
    Prototype_Status: 'Not Started',
    Date: '15/04/2568',
  },
  {
    Print_Job_ID: 'PJ8965D',
    Product_Name: 'ซองสีน้ำตาลขยายข้าง รพ.เอกชล',
    Print_Type: 'ซองเอกสาร',
    Prototype_Status: 'Pending',
    Date: '15/04/2568',
  },
  {
    Print_Job_ID: 'PJ0001B',
    Product_Name: 'บัตรนัดผู้ป่วยสีฟ้า',
    Print_Type: 'บัตร',
    Prototype_Status: 'In Progress',
    Date: '04/02/2568',
  },
  {
    Print_Job_ID: 'PJ9651A',
    Product_Name: 'ใบรายงานการรักษาผู้ป่วยนอก',
    Print_Type: 'รายงาน',
    Prototype_Status: 'Under Revision',
    Date: '04/02/2568',
  },
  {
    Print_Job_ID: 'PJ9651A',
    Product_Name: 'ป้ายหน้าห้องสีขาว',
    Print_Type: 'ป้าย',
    Prototype_Status: 'Completed',
    Date: '04/02/2568',
  },
];

export interface ReportProductionStatus {
  Print_Job_ID: string;
  Sales_Order_ID: string;
  Product_Name: string;
  Job_Status: string;
}

export const MOCK_PRODUCTION_STATUS: ReportProductionStatus[] = [
  {
    Print_Job_ID: 'PJ001A',
    Sales_Order_ID: 'SO001A',
    Product_Name: 'ซองสีน้ำตาลขยายข้าง รพ.เอกชล',
    Job_Status: 'Completed',
  },
  {
    Print_Job_ID: 'PJ001A',
    Sales_Order_ID: 'SO001A',
    Product_Name: 'ซองสีน้ำตาลขยายข้าง รพ.เอกชล',
    Job_Status: 'QC Pending',
  },
  {
    Print_Job_ID: 'PJ001A',
    Sales_Order_ID: 'SO001A',
    Product_Name: 'ซองสีน้ำตาลขยายข้าง รพ.เอกชล',
    Job_Status: 'In Production',
  },
  {
    Print_Job_ID: 'PJ001A',
    Sales_Order_ID: 'SO001A',
    Product_Name: 'ซองสีน้ำตาลขยายข้าง รพ.เอกชล',
    Job_Status: 'In Production',
  },
  {
    Print_Job_ID: 'PJ001A',
    Sales_Order_ID: 'SO001A',
    Product_Name: 'ซองสีน้ำตาลขยายข้าง รพ.เอกชล',
    Job_Status: 'In Design',
  },
];

export interface ReportCompletedItem {
  Print_Job_ID: string;
  Sales_Order_ID: string;
  Product_Name: string;
  Quantity: number;
  Unit: string;
}

export const MOCK_COMPLETED_ITEMS: ReportCompletedItem[] = [
  {
    Print_Job_ID: 'PJ001A',
    Sales_Order_ID: 'SO001A',
    Product_Name: 'บิลใบเสร็จราคาแก๊ส',
    Quantity: 10,
    Unit: 'เล่ม',
  },
  {
    Print_Job_ID: 'PJ010B',
    Sales_Order_ID: 'SO010B',
    Product_Name: 'ซองสีน้ำตาลขยายข้าง รพ.เอกชล',
    Quantity: 300,
    Unit: 'ซอง',
  },
  {
    Print_Job_ID: 'PJ015B',
    Sales_Order_ID: 'SO015B',
    Product_Name: 'บัตรนัดผู้ป่วยสีฟ้า',
    Quantity: 250,
    Unit: 'ใบ',
  },
  {
    Print_Job_ID: 'PJ002C',
    Sales_Order_ID: 'SO002C',
    Product_Name: 'ใบรายงานการรักษาผู้ป่วยนอก',
    Quantity: 500,
    Unit: 'ใบ',
  },
  {
    Print_Job_ID: 'PJ022D',
    Sales_Order_ID: 'SO022D',
    Product_Name: 'บัตรนัดผู้ป่วยสีขาว',
    Quantity: 250,
    Unit: 'ใบ',
  },
];

export interface ReportQcItem {
  Print_Job_ID: string;
  Sales_Order_ID: string;
  Product_Name: string;
  Quantity: number;
  Unit: string;
  Passed_QC: number;
}

export const MOCK_QC_ITEMS: ReportQcItem[] = [
  {
    Print_Job_ID: 'PJ001A',
    Sales_Order_ID: 'SO001A',
    Product_Name: 'บิลใบเสร็จราคาแก๊ส',
    Quantity: 50,
    Unit: 'เล่ม',
    Passed_QC: 0,
  },
  {
    Print_Job_ID: 'PJ010B',
    Sales_Order_ID: 'SO010B',
    Product_Name: 'ซองสีน้ำตาลขยายข้าง รพ.เอกชล',
    Quantity: 300,
    Unit: 'ซอง',
    Passed_QC: 0,
  },
  {
    Print_Job_ID: 'PJ015B',
    Sales_Order_ID: 'SO001A',
    Product_Name: 'บัตรนัดผู้ป่วยสีฟ้า',
    Quantity: 250,
    Unit: 'ใบ',
    Passed_QC: 0,
  },
  {
    Print_Job_ID: 'PJ002C',
    Sales_Order_ID: 'SO001A',
    Product_Name: 'ใบรายงานการรักษาผู้ป่วยนอก',
    Quantity: 500,
    Unit: 'ใบ',
    Passed_QC: 0,
  },
  {
    Print_Job_ID: 'PJ022D',
    Sales_Order_ID: 'SO001A',
    Product_Name: 'บัตรนัดผู้ป่วยสีขาว',
    Quantity: 250,
    Unit: 'ใบ',
    Passed_QC: 0,
  },
];

export interface ReportDelivery {
  Delivery_ID: string;
  Sales_Order_ID: string;
  Customer_Name: string;
  Company_Name: string;
  Delivery_Status: string;
}

export const MOCK_DELIVERIES: ReportDelivery[] = [
  {
    Delivery_ID: 'DV001A',
    Sales_Order_ID: 'SO001A',
    Customer_Name: 'นาย วันชัย xxxxxxx',
    Company_Name: 'โรงพยาบาลเอกชล',
    Delivery_Status: 'Delivered',
  },
  {
    Delivery_ID: 'DV001A',
    Sales_Order_ID: 'SO001A',
    Customer_Name: 'นาย วันชัย xxxxxxx',
    Company_Name: 'โรงพยาบาลเอกชล',
    Delivery_Status: 'Shipping',
  },
  {
    Delivery_ID: 'DV001A',
    Sales_Order_ID: 'SO001A',
    Customer_Name: 'นาย วันชัย xxxxxxx',
    Company_Name: 'โรงพยาบาลเอกชล',
    Delivery_Status: 'Shipping',
  },
  {
    Delivery_ID: 'DV001A',
    Sales_Order_ID: 'SO001A',
    Customer_Name: 'นาย วันชัย xxxxxxx',
    Company_Name: 'โรงพยาบาลเอกชล',
    Delivery_Status: 'Preparing',
  },
  {
    Delivery_ID: 'DV001A',
    Sales_Order_ID: 'SO001A',
    Customer_Name: 'นาย วันชัย xxxxxxx',
    Company_Name: 'โรงพยาบาลเอกชล',
    Delivery_Status: 'Producing',
  },
];

export interface ReportReceipt {
  Receipt_ID: string;
  Sales_Order_ID: string;
  Company_Name: string;
  Receipt_Date: string;
  Payment_Receiver: string;
}

export const MOCK_RECEIPTS: ReportReceipt[] = [
  {
    Receipt_ID: 'R0A11',
    Sales_Order_ID: 'SO0A11',
    Company_Name: 'โรงพยาบาลเอกชล',
    Receipt_Date: '11/09/68',
    Payment_Receiver: 'วันชัย แซ่ตั้ง',
  },
  {
    Receipt_ID: 'R0B97',
    Sales_Order_ID: 'SO0B97',
    Company_Name: 'เจ๊นุ้ยตามสั่ง',
    Receipt_Date: '-',
    Payment_Receiver: '-',
  },
  {
    Receipt_ID: 'R0D67',
    Sales_Order_ID: 'SO0D67',
    Company_Name: 'รับยิ่งรับทราบ',
    Receipt_Date: '12/12/68',
    Payment_Receiver: 'วันชัย แซ่ตั้ง',
  },
];
