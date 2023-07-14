type ID = number | string
type SpreadSheetInfo = {
  // This schema is also used in Google Apps Script.
  // See function named as "getCurrentSheetInfo"
  // We strongly recommend to do not extend these fields !!!
  // When user opens "Add new" modal in Google Sheets add-on
  // New importer modal destination is set by current sheet automatically.
  // Please check this works correctly after changing this.
  id: string;
  name: string;
  url: string;
}

type ContractInfo = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  setup_price: number;
  cleanup_price: number;
  wa_price: number;
}