import { API_CONSTANTS, APP_CONSTANTS } from '../config/config';
const { QB_PATH, DESTINATION_GOOGLE_SHEET_PATH } = API_CONSTANTS;
const { BASE_PATH } = APP_CONSTANTS;

export const launchQBConnectPopup = () => {
    return launchPopup(`${QB_PATH}/connect_to_quickbooks`);
}

export const launchQBReconnectPopup = (id) => {
    return launchPopup(`${QB_PATH}/connect_to_quickbooks/reconnect/${id}`);
}

export const launchDestinationGoogleSheetConnectPopup = () => {
    return launchPopup(`${DESTINATION_GOOGLE_SHEET_PATH}/connect_to_google`);
}

export const launchDestinationGoogleSheetReconnectPopup = (id) => {
    return launchPopup(`${DESTINATION_GOOGLE_SHEET_PATH}/connect_to_google/reconnect/${id}`);
}

export const launchPopup = (path) => { 
    if (window.wa_connect_popup && !window.wa_connect_popup.closed) {
      return alert("For security, you can open only one popup window in weekly accounting! Please close previous popup first to continue.");
    }
    var checkConnect;
    var parameters = "location=1,width=800,height=650";
    parameters += ",left=" + (window.screen.width - 800) / 2 + ",top=" + (window.screen.height - 650) / 2;

    // Launch Popup
    var real_path = `${BASE_PATH}/auth_page_open.html?target_url=${path}`;
    var win = window.wa_connect_popup = window.open(real_path, 'wa_connect_popup', parameters);

    // Detect if it is closed
    var pollTimer = window.setInterval(function() {
      if (win.closed !== false) { // !== is required for compatibility with Opera
        window.clearInterval(pollTimer);
        window.wa_connect_popup_just_closed = true;
      }
    }, 200);

    return window.wa_connect_popup;
}

export const timeAgo = (date) => {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return "about " + Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return "about " + Math.floor(interval) + " minutes ago";
  }
  return "just now";
}

export const titles2labels = (list) => {
  var newList = [];
  for (let i = 0; i < list.length; i++) { 
    var item = list[i];
    item['label'] = item['title'];
    newList.push(item);
  }
  return newList;
}

export const id2item = (id, list) => {
  if(!list) return null;
  for (let i = 0; i < list.length; i++) { 
    if (list[i]['id'] == id)
    {
      return list[i];
    }
  }
  return null;
}

export const dd = function (number) {
  return number > 9 ? ('' + number) : ('0' + number)
}

export const date2str = function (this_date, style = 0) {
  if ( !this_date ) return "";

  // As default, mysql date format
  var datetime = this_date.getFullYear() + "-"
              + dd(this_date.getMonth()+1)  + "-" 
              + dd(this_date.getDate()) + " "  
              + dd(this_date.getHours()) + ":"  
              + dd(this_date.getMinutes()) + ":" 
              + dd(this_date.getSeconds());
  if ( style === 1 ) {
    datetime = this_date.getFullYear() + "/"
              + dd(this_date.getMonth()+1)  + "/" 
              + dd(this_date.getDate()) + " "  
              + dd(this_date.getHours()) + ":"  
              + dd(this_date.getMinutes()) + ":" 
              + dd(this_date.getSeconds());
  }
  return datetime;
}

export const setValueInParamsList = function (paramsList, keyStr, valueObject, noOverwriteIfAlreadyExist = false) {
  let is_key_found = false;
  for (let i = 0; i < paramsList.length; i++) {
    if(paramsList[i]['key'] === keyStr) {
      if ( paramsList[i]['value'] && noOverwriteIfAlreadyExist ) {
        return;
      }
      paramsList[i]['value'] = valueObject;
      is_key_found = true;
      break;
    }
  }
  if (!is_key_found) {
    paramsList.push({ 'key': keyStr, 'value': valueObject });
  }
}

export const array_includes = function(list, search_value) {
  if (!list.length) return false;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === search_value) {
      return true;
    }
  }
  return false;
}

export const NumberZeroIfNaN = function ( val ) {
  return isNaN(Number(val)) ? 0 : Number(val);
}