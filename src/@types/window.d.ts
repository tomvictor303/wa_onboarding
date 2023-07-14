interface Window { 
    google: any;
    gapiInited: boolean;
    gapi: any;
    my_google_picker_view: any;

    wa_connect_popup: any;
    wa_connect_popup_just_closed: boolean;

    wa_qb_popup_just_closed: boolean;
    wa_qb_just_saved_id: ID;

    wa_dgs_popup_just_closed: boolean;
    wa_dgs_just_saved_id: ID;
}

window.google = window.google || null;
window.gapiInited = window.gapiInited || false;
window.gapi = window.gapi || null;
window.my_google_picker_view = window.my_google_picker_view || null;

window.wa_connect_popup = window.wa_connect_popup || null;
window.wa_connect_popup_just_closed = window.wa_connect_popup_just_closed || false;

window.wa_qb_popup_just_closed = window.wa_qb_popup_just_closed || false;
window.wa_qb_just_saved_id = window.wa_qb_just_saved_id || null;

window.wa_dgs_popup_just_closed = window.wa_dgs_popup_just_closed || false;
window.wa_dgs_just_saved_id = window.wa_dgs_just_saved_id || null;
