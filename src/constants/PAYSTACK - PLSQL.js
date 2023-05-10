// Notiflix Notify Init - global.js

Notiflix.Notify.Init({width:'300px',fontSize:'14px',timeout:6000,messageMaxLength:200, cssAnimationStyle:'zoom',});  
var apex_r_url = document.getElementById("P2_URL").value;

let p_key = document.getElementById("P2_KEY").value;
let email = document.getElementById("P2_EMAIL").value;
let amount = document.getElementById("P2_PAD_AMOUNT").value;
let ref = document.getElementById("P2_REFERENCE").value;
let sub_acc =  document.getElementById("P2_SUBACCOUNT").value;
let t_charge =  document.getElementById("P2_CDS_CHARGE").value * 100;

let g_name = document.getElementById("P2_G_NAME").value;
let act_code = document.getElementById("P2_PAYMENT_ACTIVITY_CODE").value;

 

 if (apex.item("P2_PAYER_NAME").isEmpty() || apex.item("P2_CONTACT").isEmpty() || apex.item("P2_EMAIL").isEmpty() || apex.item("P2_AMOUNT_TO_PAY").isEmpty()) {
    
    Notiflix.Notify.Init({width:'300px',fontSize:'14px',timeout:8000,messageMaxLength:200, cssAnimationStyle:'zoom',}); 
    Notiflix.Notify.Failure('Kindly provide the neccessary details to proceed');

} else {
    

var handler = PaystackPop.setup({
    key: p_key, // Replace with your public key
    email: email,
    amount:  amount, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: 'GHS', // Use GHS for Ghana Cedis or USD for US Dollars
    ref: ref, // Replace with a reference you generated
     subaccount: sub_acc,
     //subaccount: 'ACCT_438yls8ioxxuzhe', TEST
     
     transaction_charge:t_charge,
     bearer: 'subaccount',

 metadata:{
                "custom_fields":[
                {
                    "value":"Payment Activity",
                    "display_name": g_name,
                    "variable_name":  "Payment activity for pay code "
                }
                ]
            },

    callback: function(response) {
      //this happens after the payment is completed successfully
      var reference = response.reference;
     // alert('Payment complete! Reference: ' + reference);
      Notiflix.Notify.Success('Payment complete! Reference: ' + reference);
      // Make an AJAX call to your server with the reference to verify the transaction

            Notiflix.Loading.Circle('Success..Redirecting');
             Notiflix.Loading.Remove(9000);
         
           setTimeout(function(){ window.location=`${apex_r_url}`; },5000);
                     


    },
    onClose: function() {
      //alert('Transaction was not completed, window closed.');
       Notiflix.Notify.Failure('Transaction was not completed, window closed.');
      
    },
  });
  handler.openIframe();
}