/**
 * Centralized Client-Side Storage Helper using localStorage
 * Ensures all added orders, quotations, and entity records persist across
 * page navigation, browser reloads, and desktop application restarts.
 */

import {
  MOCK_ORDERS,
  MOCK_QUOTATIONS,
  MOCK_RECEIPTS,
  ReportQuotation,
  ReportReceipt,
} from './mockReportData';

export interface StorageProductItem {
  id: string;
  name: string;
  printType: string;
  quantity: string;
  unit: string;
  paperType: string;
  paperSize: string;
  paperColor: string;
  description: string;
  imageUrl?: string;
  unitPrice?: number;
}

export interface StorageOrderRecord {
  Sales_Order_ID: string;
  Company_Name: string;
  Customer_Name: string;
  Customer_Phone: string;
  Customer_Address: string;
  Order_Date: string;
  Order_Status: string;
  items: StorageProductItem[];
}

export interface StorageCustomerRecord {
  id: string;
  company: string;
  name: string;
  phone: string;
  address: string;
}

export interface StorageQuotationItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface StorageQuotationRecord {
  Quotation_ID: string;
  Sales_Order_ID?: string;
  Company_Name: string;
  Customer_Name?: string;
  Customer_Phone?: string;
  Customer_Address?: string;
  Quotation_Date: string;
  Quotation_Status: string;
  items: StorageQuotationItem[];
  Total_Amount?: number;
}

export interface StorageDailyLogRecord {
  logId: string;
  date: string;
  remainingQty: number;
  dailyQty: number;
  accumulatedQty: number;
}

export interface StorageQcRecord {
  recordId: string;
  date: string;
  passedQty: number;
  defectQty: number;
  accumulatedPassedQty?: number;
}

export interface StoragePrintJobRecord {
  Print_Job_ID: string;
  Sales_Order_ID: string;
  Product_ID: string;
  Product_Name: string;
  Print_Type: string;
  Quantity: number;
  Unit: string;
  Paper_Type: string;
  Paper_Size: string;
  Paper_Color: string;
  Description?: string;
  ImageUrl?: string;
  Prototype_Image_Url?: string;
  Delivery_ID?: string;
  Prototype_Status: string;
  Print_Job_Status?: string;
  Date: string;
  Company_Name?: string;
  Customer_Phone?: string;
  Customer_Address?: string;
  Produced_Qty?: number;
  Passed_QC?: number;
  Reorder_Qty?: number;
  Daily_Logs?: StorageDailyLogRecord[];
  QC_Records?: StorageQcRecord[];
}

export interface StorageDeliveryRecord {
  Delivery_ID: string;
  Sales_Order_ID: string;
  Customer_Name: string;
  Company_Name: string;
  Customer_Phone?: string;
  Customer_Address?: string;
  Delivery_Status: string;
  Deliverer?: string;
  Delivery_Date?: string;
}

export interface StorageReceiptItem {
  id: string;
  name: string;
  qty: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface StorageReceiptRecord {
  Receipt_ID: string;
  Sales_Order_ID: string;
  Quotation_ID?: string;
  Company_Name: string;
  Customer_Name?: string;
  Customer_Phone?: string;
  Customer_Address?: string;
  Receipt_Date: string;
  Payment_Receiver: string;
  Total_Amount?: number;
  items?: StorageReceiptItem[];
}

const DEFAULT_CUSTOMERS: StorageCustomerRecord[] = [
  {
    id: 'C0A01',
    company: 'โรงพยาบาลเอกชล',
    name: 'ส้มหวาน เปรี้ยวจี๊ด',
    phone: '038-935-1111',
    address: '55/2 ถ.สุขุมวิท ต.บ้านสวน อ.เมือง ชลบุรี',
  },
  {
    id: 'C0A02',
    company: 'บางแสนแก๊สจำกัด',
    name: 'มะนาว ชื่นใจ',
    phone: '091-111-1111',
    address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
  },
  {
    id: 'C0A03',
    company: 'มนตรีการช่าง',
    name: 'ส้มโอ ชิ้นใหญ่',
    phone: '081-444-2222',
    address: '12 หมู่ 4 ต.เสม็ด อ.เมือง ชลบุรี',
  },
  {
    id: 'C0A04',
    company: 'สิรินยาชาบู',
    name: 'ยาสิริน พอใจ',
    phone: '089-777-8888',
    address: '108/5 ถ.ข้าวหลาม ต.แสนสุข ชลบุรี',
  },
];

const DEFAULT_ORDERS: StorageOrderRecord[] = [
  {
    Sales_Order_ID: 'SO001A',
    Company_Name: 'โรงพยาบาลเอกชล',
    Customer_Name: 'ส้มจี๊ด หวานชื่น',
    Customer_Phone: '080-9999999',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
    Order_Date: '2025-07-04',
    Order_Status: 'Quotation_Completed',
    items: [
      {
        id: '302CNN001',
        name: 'ป้ายหน้าห้องสีขาว ขนาดสั้น',
        printType: 'ป้ายหน้าห้อง',
        quantity: '10',
        unit: 'ห่อ',
        paperType: 'กระดาษอาร์ตการ์ด 260 แกรม',
        paperSize: '10x25 ซม.',
        paperColor: '4 สี หน้าเดียว',
        description: 'เคลือบด้าน ติดเทปกาวสองหน้าด้านหลัง',
        unitPrice: 80,
      },
      {
        id: '302UMD001',
        name: 'ใบรายงานการรักษาผู้ป่วยนอก',
        printType: 'แบบฟอร์มโรงพยาบาล',
        quantity: '200',
        unit: 'เล่ม',
        paperType: 'กระดาษเคมี 3 ชั้น (ขาว/ชมพู/เหลือง)',
        paperSize: 'A4',
        paperColor: 'ดำ',
        description: 'เข้าเล่มปรุฉีก มีเลขรันนิ่งนัมเบอร์ 0001-5000',
        unitPrice: 40,
      },
      {
        id: '302OPD001',
        name: 'ใบรับรองแพทย์',
        printType: 'แบบฟอร์มโรงพยาบาล',
        quantity: '1000',
        unit: 'เล่ม',
        paperType: 'กระดาษปอนด์ 80 แกรม',
        paperSize: 'A4',
        paperColor: 'ฟ้า-ขาว',
        description: 'มีตราร้านและรหัสแพทย์',
        unitPrice: 120,
      },
    ],
  },
  {
    Sales_Order_ID: 'SO010B',
    Company_Name: 'เจ๊นุ๊ยตามสั่ง',
    Customer_Name: 'นุ้ย มีลาภ',
    Customer_Phone: '081-2345678',
    Customer_Address: '12/4 ตลาดหนองมน ชลบุรี',
    Order_Date: '2025-07-10',
    Order_Status: 'Quotation_Not_Started',
    items: [
      {
        id: '302GAS001',
        name: 'บิลใบเสร็จราคาแก๊ส',
        printType: 'บิลใบเสร็จ',
        quantity: '40',
        unit: 'เล่ม',
        paperType: 'กระดาษปอนด์ 80 แกรม',
        paperSize: 'A5',
        paperColor: 'ขาว-ดำ',
        description: 'หัวตารางใช้เหมือนรูปตัวอย่าง ใส่เลขประจำตัวผู้เสียภาษี',
      },
    ],
  },
  {
    Sales_Order_ID: 'SO015B',
    Company_Name: 'รับซิ่งรับทราบ',
    Customer_Name: 'กิตติพงษ์ ซิ่งไว',
    Customer_Phone: '089-8765432',
    Customer_Address: '99 หมู่ 3 บางแสน ชลบุรี',
    Order_Date: '2025-07-15',
    Order_Status: 'Quotation_Not_Started',
    items: [
      {
        id: '302ENV001',
        name: 'ซองเอกสารน้ำตาลขยายข้าง',
        printType: 'ซองจดหมาย',
        quantity: '300',
        unit: 'ซอง',
        paperType: 'กระดาษคราฟท์ 125 แกรม',
        paperSize: '9x12 นิ้ว (ขยายข้าง 2 นิ้ว)',
        paperColor: 'พิมพ์ 1 สี (น้ำตาลเข้ม)',
        description: 'สกรีนโลโก้และที่อยู่จัดส่งด้านหน้า',
      },
    ],
  },
];

const DEFAULT_QUOTATIONS: StorageQuotationRecord[] = [
  {
    Quotation_ID: 'QU463P',
    Sales_Order_ID: 'SO002B',
    Company_Name: 'บางแสนแก๊ส จำกัด',
    Customer_Name: 'มะนาว ชื่นใจ',
    Customer_Phone: '091-111-1111',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
    Quotation_Date: '2025-04-15',
    Quotation_Status: 'Under Revision',
    items: [
      { id: 'QDC0001', name: 'บิลใบเสร็จราคาแก๊ส 4 สี', quantity: 40, unit: 'เล่ม', unitPrice: 65 },
    ],
    Total_Amount: 2600,
  },
  {
    Quotation_ID: 'QU010B',
    Sales_Order_ID: 'SO003C',
    Company_Name: 'มนตรีการช่าง',
    Customer_Name: 'ส้มโอ ชิ้นใหญ่',
    Customer_Phone: '081-444-2222',
    Customer_Address: '12 หมู่ 4 ต.เสม็ด อ.เมือง ชลบุรี',
    Quotation_Date: '2025-03-07',
    Quotation_Status: 'Under Revision',
    items: [
      { id: 'QDB0001', name: 'นามบัตรพนักงานเคลือบด้าน', quantity: 500, unit: 'ใบ', unitPrice: 3.5 },
      { id: 'QDB0002', name: 'โบรชัวร์ประชาสัมพันธ์ A4', quantity: 1000, unit: 'แผ่น', unitPrice: 4.0 },
    ],
    Total_Amount: 5750,
  },
  {
    Quotation_ID: 'QU001A',
    Sales_Order_ID: 'SO001A',
    Company_Name: 'โรงพยาบาลเอกชล',
    Customer_Name: 'ส้มจี๊ด หวานชื่น',
    Customer_Phone: '080-9999999',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
    Quotation_Date: '2025-02-04',
    Quotation_Status: 'Completed',
    items: [
      { id: '302CNN001', name: 'ป้ายหน้าห้องสีขาว ขนาดสั้น', quantity: 10, unit: 'ห่อ', unitPrice: 80 },
      { id: '302UMD001', name: 'ใบรายงานการรักษาผู้ป่วยนอก', quantity: 200, unit: 'เล่ม', unitPrice: 40 },
      { id: '302OPD001', name: 'ใบรับรองแพทย์', quantity: 1000, unit: 'เล่ม', unitPrice: 120 },
    ],
    Total_Amount: 172850,
  },
  {
    Quotation_ID: 'QU876H',
    Sales_Order_ID: 'SO004D',
    Company_Name: 'โรงแรมบาบาราย',
    Customer_Name: 'สมศักดิ์ บาบาราย',
    Customer_Phone: '038-123456',
    Customer_Address: 'หาดบางแสน ชลบุรี',
    Quotation_Date: '2025-02-04',
    Quotation_Status: 'Pending',
    items: [
      { id: 'QDD0001', name: 'เมนูอาหารปกหนังเข้าเล่ม', quantity: 50, unit: 'เล่ม', unitPrice: 350 },
    ],
    Total_Amount: 17500,
  },
  {
    Quotation_ID: 'QU256B',
    Sales_Order_ID: 'SO005E',
    Company_Name: 'โรงพยาบาลเอกชล',
    Customer_Name: 'ส้มจี๊ด หวานชื่น',
    Customer_Phone: '080-9999999',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
    Quotation_Date: '2025-01-01',
    Quotation_Status: 'Completed',
    items: [
      { id: 'QDE0001', name: 'ซองใส่ฟิล์มเอกซเรย์ใหญ่', quantity: 2000, unit: 'ซอง', unitPrice: 15 },
    ],
    Total_Amount: 30000,
  },
  {
    Quotation_ID: 'QU106J',
    Sales_Order_ID: 'SO006F',
    Company_Name: 'สิรินยาชาบู',
    Customer_Name: 'ยาสิริน พอใจ',
    Customer_Phone: '089-777-8888',
    Customer_Address: '108/5 ถ.ข้าวหลาม ต.แสนสุข ชลบุรี',
    Quotation_Date: '2024-08-17',
    Quotation_Status: 'Rejected',
    items: [
      { id: 'QDF0001', name: 'แผ่นรองจานกระดาษกันน้ำ', quantity: 5000, unit: 'แผ่น', unitPrice: 1.2 },
    ],
    Total_Amount: 6000,
  },
];

const DEFAULT_PRINT_JOBS: StoragePrintJobRecord[] = [
  {
    Print_Job_ID: 'PJ085K1',
    Sales_Order_ID: 'SO002B',
    Product_ID: 'PROD-GAS-01',
    Product_Name: 'บิลใบเสร็จราคาแก๊ส',
    Print_Type: 'บิลใบเสร็จ',
    Quantity: 40,
    Unit: 'เล่ม',
    Paper_Type: 'กระดาษปอนด์ 80 แกรม',
    Paper_Size: 'A5',
    Paper_Color: 'ขาว-ดำ',
    Description: 'หัวตารางใช้เหมือนรูปตัวอย่าง ใส่เลขประจำตัวผู้เสียภาษี',
    Delivery_ID: 'DEL901A',
    Prototype_Status: 'Not Started',
    Print_Job_Status: 'In Design',
    Date: '15/04/2568',
    Company_Name: 'บางแสนแก๊ส จำกัด',
    Customer_Phone: '091-111-1111',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
  },
  {
    Print_Job_ID: 'PJ8965D',
    Sales_Order_ID: 'SO001A',
    Product_ID: '302ENV001',
    Product_Name: 'ซองสีน้ำตาลขยายข้าง รพ.เอกชล',
    Print_Type: 'ซองเอกสาร',
    Quantity: 300,
    Unit: 'ซอง',
    Paper_Type: 'กระดาษคราฟท์ 125 แกรม',
    Paper_Size: '9x12 นิ้ว',
    Paper_Color: 'พิมพ์ 1 สี (น้ำตาลเข้ม)',
    Description: 'สกรีนโลโก้และที่อยู่จัดส่งด้านหน้า',
    Delivery_ID: 'DEL902B',
    Prototype_Status: 'Pending',
    Print_Job_Status: 'In Design',
    Date: '15/04/2568',
    Company_Name: 'โรงพยาบาลเอกชล',
    Customer_Phone: '080-9999999',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
  },
  {
    Print_Job_ID: 'PJ0001B',
    Sales_Order_ID: 'SO001A',
    Product_ID: '302CNN001',
    Product_Name: 'ป้ายหน้าห้องสีขาว ขนาดสั้น',
    Print_Type: 'ป้าย',
    Quantity: 10,
    Unit: 'ห่อ',
    Paper_Type: 'กระดาษอาร์ตการ์ด 260 แกรม',
    Paper_Size: '10x25 ซม.',
    Paper_Color: '4 สี หน้าเดียว',
    Description: 'เคลือบด้าน ติดเทปกาวสองหน้าด้านหลัง',
    Delivery_ID: 'DEL903C',
    Prototype_Status: 'Completed',
    Print_Job_Status: 'Completed',
    Date: '04/02/2568',
    Company_Name: 'โรงพยาบาลเอกชล',
    Customer_Phone: '080-9999999',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
  },
  {
    Print_Job_ID: 'PJ9651A',
    Sales_Order_ID: 'SO001A',
    Product_ID: '302UMD001',
    Product_Name: 'ใบรายงานการรักษาผู้ป่วยนอก',
    Print_Type: 'รายงาน',
    Quantity: 200,
    Unit: 'เล่ม',
    Paper_Type: 'กระดาษเคมี 3 ชั้น (ขาว/ชมพู/เหลือง)',
    Paper_Size: 'A4',
    Paper_Color: 'ดำ',
    Description: 'เข้าเล่มปรุฉีก มีเลขรันนิ่งนัมเบอร์ 0001-5000',
    Delivery_ID: 'DEL904D',
    Prototype_Status: 'Completed',
    Print_Job_Status: 'Completed',
    Date: '04/02/2568',
    Company_Name: 'โรงพยาบาลเอกชล',
    Customer_Phone: '080-9999999',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
  },
  {
    Print_Job_ID: 'PJ9652A',
    Sales_Order_ID: 'SO001A',
    Product_ID: '302OPD001',
    Product_Name: 'ใบรับรองแพทย์',
    Print_Type: 'แบบฟอร์มโรงพยาบาล',
    Quantity: 1000,
    Unit: 'เล่ม',
    Paper_Type: 'กระดาษปอนด์ 80 แกรม',
    Paper_Size: 'A4',
    Paper_Color: 'ฟ้า-ขาว',
    Description: 'มีตราร้านและรหัสแพทย์',
    Delivery_ID: 'DEL905E',
    Prototype_Status: 'Completed',
    Print_Job_Status: 'Completed',
    Date: '04/02/2568',
    Company_Name: 'โรงพยาบาลเอกชล',
    Customer_Phone: '080-9999999',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
  },
];

// Keys
const STORAGE_KEYS = {
  ORDERS: 'wanchai_orders_v2',
  CUSTOMERS: 'wanchai_customers_v2',
  QUOTATIONS: 'wanchai_quotations_v2',
  PRINT_JOBS: 'wanchai_print_jobs_v2',
  DELIVERIES: 'wanchai_deliveries_v2',
  RECEIPTS: 'wanchai_receipts_v2',
};

const DEFAULT_DELIVERIES: StorageDeliveryRecord[] = [
  {
    Delivery_ID: 'DEL901A',
    Sales_Order_ID: 'SO002B',
    Customer_Name: 'มะนาว ชื่นใจ',
    Company_Name: 'บางแสนแก๊ส จำกัด',
    Customer_Phone: '091-111-1111',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
    Delivery_Status: 'Producing',
    Deliverer: '-',
    Delivery_Date: '-',
  },
  {
    Delivery_ID: 'DEL902B',
    Sales_Order_ID: 'SO001A',
    Customer_Name: 'ส้มจี๊ด หวานชื่น',
    Company_Name: 'โรงพยาบาลเอกชล',
    Customer_Phone: '080-9999999',
    Customer_Address: '55/2 ถ.สุขุมวิท ต.บ้านสวน อ.เมือง ชลบุรี',
    Delivery_Status: 'Preparing',
    Deliverer: '-',
    Delivery_Date: '-',
  },
  {
    Delivery_ID: 'DEL903C',
    Sales_Order_ID: 'SO003C',
    Customer_Name: 'ส้มโอ ชิ้นใหญ่',
    Company_Name: 'มนตรีการช่าง',
    Customer_Phone: '081-444-2222',
    Customer_Address: '12 หมู่ 4 ต.เสม็ด อ.เมือง ชลบุรี',
    Delivery_Status: 'Shipping',
    Deliverer: 'นายวันชัย ขนส่ง',
    Delivery_Date: '15/04/2568',
  },
  {
    Delivery_ID: 'DEL904D',
    Sales_Order_ID: 'SO004D',
    Customer_Name: 'สมศักดิ์ บาบาราย',
    Company_Name: 'โรงแรมบาบาราย',
    Customer_Phone: '038-123456',
    Customer_Address: 'หาดบางแสน ชลบุรี',
    Delivery_Status: 'Delivered',
    Deliverer: 'วันชัย Express (นายประสิทธิ์)',
    Delivery_Date: '10/04/2568',
  },
  {
    Delivery_ID: 'DEL905E',
    Sales_Order_ID: 'SO001A',
    Customer_Name: 'ส้มจี๊ด หวานชื่น',
    Company_Name: 'โรงพยาบาลเอกชล',
    Customer_Phone: '080-9999999',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
    Delivery_Status: 'Preparing',
    Deliverer: '-',
    Delivery_Date: '-',
  },
];

const DEFAULT_RECEIPTS: StorageReceiptRecord[] = [
  {
    Receipt_ID: 'R0A11',
    Sales_Order_ID: 'SO901X',
    Quotation_ID: 'QU901X',
    Company_Name: 'โรงพยาบาลเอกชล',
    Customer_Name: 'ส้มจี๊ด หวานชื่น',
    Customer_Phone: '080-9999999',
    Customer_Address: 'สำนักงานใหญ่ 86 ถ.ลงหาดบางแสน ต.แสนสุข ชลบุรี',
    Receipt_Date: '11/09/2568',
    Payment_Receiver: 'วันชัย แซ่ตั้ง',
    Total_Amount: 172850,
    items: [
      { id: '302CNN001', name: 'ป้ายหน้าห้องสีขาว ขนาดสั้น', qty: 10, unit: 'ห่อ', unitPrice: 80, total: 800 },
      { id: '302UMD001', name: 'ใบรายงานการรักษาผู้ป่วยนอก', qty: 200, unit: 'เล่ม', unitPrice: 40, total: 8000 },
      { id: '302OPD001', name: 'ใบรับรองแพทย์', qty: 1000, unit: 'เล่ม', unitPrice: 120, total: 120000 },
    ],
  },
  {
    Receipt_ID: 'R0B97',
    Sales_Order_ID: 'SO003C',
    Quotation_ID: 'QU010B',
    Company_Name: 'เจ๊นุ้ยตามสั่ง',
    Customer_Name: 'นุ้ย มีลาภ',
    Customer_Phone: '081-2345678',
    Customer_Address: '12/4 ตลาดหนองมน ชลบุรี',
    Receipt_Date: '-',
    Payment_Receiver: '-',
    Total_Amount: 14500,
    items: [
      { id: 'QDB0001', name: 'นามบัตรพนักงานเคลือบด้าน', qty: 500, unit: 'ใบ', unitPrice: 3.5, total: 1750 },
      { id: 'QDB0002', name: 'โบรชัวร์ประชาสัมพันธ์ A4', qty: 1000, unit: 'แผ่น', unitPrice: 4.0, total: 4000 },
    ],
  },
  {
    Receipt_ID: 'R0D67',
    Sales_Order_ID: 'SO004D',
    Quotation_ID: 'QU876H',
    Company_Name: 'รับยิ่งรับทราบ',
    Customer_Name: 'กิตติพงษ์ ซิ่งไว',
    Customer_Phone: '089-8765432',
    Customer_Address: '99 หมู่ 3 บางแสน ชลบุรี',
    Receipt_Date: '12/12/2568',
    Payment_Receiver: 'วันชัย แซ่ตั้ง',
    Total_Amount: 38200,
    items: [
      { id: 'QDD0001', name: 'เมนูอาหารปกหนังเข้าเล่ม', qty: 50, unit: 'เล่ม', unitPrice: 350, total: 17500 },
    ],
  },
];

// ----------------------------------------------------
// Orders
// ----------------------------------------------------
export function getStoredOrders(): StorageOrderRecord[] {
  if (typeof window === 'undefined') return DEFAULT_ORDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_ORDERS;
  } catch (err) {
    return DEFAULT_ORDERS;
  }
}

export function saveStoredOrders(orders: StorageOrderRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders to localStorage', err);
  }
}

// ----------------------------------------------------
// Customers
// ----------------------------------------------------
export function getStoredCustomers(): StorageCustomerRecord[] {
  if (typeof window === 'undefined') return DEFAULT_CUSTOMERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(DEFAULT_CUSTOMERS));
      return DEFAULT_CUSTOMERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_CUSTOMERS;
  } catch (err) {
    return DEFAULT_CUSTOMERS;
  }
}

export function saveStoredCustomers(customers: StorageCustomerRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  } catch (err) {
    console.error('Failed to save customers to localStorage', err);
  }
}

// ----------------------------------------------------
// Quotations
// ----------------------------------------------------
export function getStoredQuotations(): StorageQuotationRecord[] {
  if (typeof window === 'undefined') return DEFAULT_QUOTATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUOTATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.QUOTATIONS, JSON.stringify(DEFAULT_QUOTATIONS));
      return DEFAULT_QUOTATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_QUOTATIONS;
  } catch (err) {
    return DEFAULT_QUOTATIONS;
  }
}

export function saveStoredQuotations(quotations: StorageQuotationRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.QUOTATIONS, JSON.stringify(quotations));
  } catch (err) {
    console.error('Failed to save quotations to localStorage', err);
  }
}

// ----------------------------------------------------
// Print Jobs
// ----------------------------------------------------
export function getStoredPrintJobs(): StoragePrintJobRecord[] {
  if (typeof window === 'undefined') return DEFAULT_PRINT_JOBS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRINT_JOBS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRINT_JOBS, JSON.stringify(DEFAULT_PRINT_JOBS));
      return DEFAULT_PRINT_JOBS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_PRINT_JOBS;
    return parsed.map((job: StoragePrintJobRecord) => {
      const status =
        job.Print_Job_Status ||
        (job.Prototype_Status === 'Completed' ? 'In Production' : 'In Design');
      return {
        ...job,
        Print_Job_Status: status,
        Daily_Logs: job.Daily_Logs || [],
        QC_Records: job.QC_Records || [],
        Produced_Qty: typeof job.Produced_Qty === 'number' ? job.Produced_Qty : 0,
        Passed_QC: typeof job.Passed_QC === 'number' ? job.Passed_QC : 0,
        Reorder_Qty: typeof job.Reorder_Qty === 'number' ? job.Reorder_Qty : 0,
      };
    });
  } catch (err) {
    return DEFAULT_PRINT_JOBS;
  }
}

export function saveStoredPrintJobs(jobs: StoragePrintJobRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PRINT_JOBS, JSON.stringify(jobs));
  } catch (err) {
    console.error('Failed to save print jobs to localStorage', err);
  }
}

// ----------------------------------------------------
// Deliveries
// ----------------------------------------------------
export function getStoredDeliveries(): StorageDeliveryRecord[] {
  if (typeof window === 'undefined') return DEFAULT_DELIVERIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DELIVERIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DELIVERIES, JSON.stringify(DEFAULT_DELIVERIES));
      return DEFAULT_DELIVERIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_DELIVERIES;
  } catch (err) {
    return DEFAULT_DELIVERIES;
  }
}

export function saveStoredDeliveries(deliveries: StorageDeliveryRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.DELIVERIES, JSON.stringify(deliveries));
  } catch (err) {
    console.error('Failed to save deliveries to localStorage', err);
  }
}

// ----------------------------------------------------
// Receipts
// ----------------------------------------------------
export function getStoredReceipts(): StorageReceiptRecord[] {
  if (typeof window === 'undefined') return DEFAULT_RECEIPTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECEIPTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(DEFAULT_RECEIPTS));
      return DEFAULT_RECEIPTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_RECEIPTS;
  } catch (err) {
    return DEFAULT_RECEIPTS;
  }
}

export function saveStoredReceipts(receipts: StorageReceiptRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts));
  } catch (err) {
    console.error('Failed to save receipts to localStorage', err);
  }
}
