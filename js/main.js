const form = $('#price-form');
let formData = form.serializeJSON();
showHideBlocks(formData);

form.on('keyup change', 'input, select, textarea', function(){
    let formData = form.serializeJSON();
    //console.log(formData);

    showHideBlocks(formData);

   // getTotalPrice(formData);

    //console.log(totalPrice);

    $('#total-price').text( getTotalPrice(formData) );
});

function  showHideBlocks(formData){
    if (formData.type == 'site') {
        $('[data-name="landing"]').hide();
        $('[data-name="pages"]').show();
    } else {
        $('[data-name="pages"]').hide();
        $('[data-name="landing"]').show();
    };

    if (formData.mobile == 'on') {
        $('[data-name="mobile"]').show();
    } else {
        $('[data-name="mobile"]').hide();
        $('[name="mobile-number"]')[0].checked = true;
        $('[name="mobile-number"]')[1].checked = false;
        $('[name="mobile-number"]')[2].checked = false;
    }

};


function getTotalPrice(formData){
    let totalPrice = 0;

    totalPrice =
        formData['pages-unique'] * 4000 +
        formData['pages-general'] * 2500 +
        formData['sections'] * 2000 +
        formData['mobile-number'] * 1 +
        formData['carousel'] * 1200 +
        formData['modals'] * 900 +
        formData['forms'] * 1500;

    
    totalPrice = totalPrice * GetK(formData);
    console.log(totalPrice);
    
    return totalPrice;

};

function GetK(formData) {
    // адаптив
    let kMobile = 1;

    if (formData['mobile-number'] == 1) {
        kMobile = 1.3;
    } else if (formData['mobile-number'] == 2) {
        kMobile = 1.5;
    }

    //доп.услуги
    let kPixelPerfect = 1;
    if (formData['pixelPerfect']) {
        kPixelPerfect = 1.2;
    }

    let kRetinaReady = 1;
    if (formData['retinaReady']) {
        kRetinaReady = 1.2;
    }

    let kGooglePageSpeed = 1;
    if (formData['googlePageSpeed']) {
        kGooglePageSpeed = 1.2;
    }

    let kUrgentOrder = 1;
    if (formData['urgentOrder']) {
        kUrgentOrder = 1.5;
    }

    let k = 1;
    k = kMobile *
        kPixelPerfect *
        kRetinaReady *
        kGooglePageSpeed *
        kUrgentOrder;
    return k;
};