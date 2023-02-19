/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


/* global #shipNo */

var jpdbBaseURL = "http://api.login2explore.com:5577" ;
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var shipmentDBName = "Shipment-Management";
var shipmentRelationName = "shipmetData";
var connToken = "90932583|-31949277864700601|90948917";
$('#shipNo').focus();


function saveRecNo2LS(jsonObj){
    var lvData= JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getShipNoAsJsonObj(){
    
    var shipId = $(#shipNo).val('');
    var jsonStr = {
        no : shipId
        
    };
    return JSON.stringify(jsonStr);
    
}

function getShip(){
    
    var shipNoJsonObj = getShipNoAsJsonObj();
    var getRequest= createGET_BY_KEYRequest(connToken, shipmentDBName , shipmentRelationName , shipNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    if (resultObj.status===400){
        
        $('#save').prop('disabled',true);
        $('#reset').prop('disabled',true);
        $('#description').focus();
        
    }else if(resultObj.status === 200) {
        $('#shipNo').prop('disabled',true);
        fillData(resultObj);
        $('#change').prop('disabled',true);
        $('#reset').prop('disabled',true);
        $('#description').focus();
        
    }
    
}


function fillData(jsonObj){
    
    saveRecNoToLS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#shipNo').val(record.shipNo);
    $('#description').val(record.description);
    $('#source').val(record.source);
    $('#destination').val(record.destination);
    $('#shipDate').val(record.shipDate);
    $('#expectedDeliDate').val(record.expectedDeliDate);
    
}

function validateData(){
    var shipNo,desc,src,dest,shipDate,ExDeliDate;
    shipNo=$('#shipNo').val('');
    desc=$('#description').val('');
    src=$('#source').val('');
    dest=$('#destination').val('');
    shipDate=$('#shipDate').val('');
    ExDeliDate=$('#expectedDeliDate').val('');
    
    if(shipNo === ''){
        alert('Shipment Number is missing');
        $('#shipNo').focus();
        return '';
    }
    
    if(desc === ''){
        alert('Description is missing');
        $('#sdescription').focus();
        return '';
    }
    
    if(src === ''){
        alert('Source is missing');
        $('#source').focus();
        return '';
    }
    
    if(dest === ''){
        alert('Destination is missing');
        $('#destination').focus();
        return '';
    }
    
    if(shipDate === ''){
        alert('Shipment Date is missing');
        $('#shipDate').focus();
        return '';
    }
    
    if(ExDeliDate === ''){
        alert('Expected Delivery Date is missing');
        $('#expectedDeliDate').focus();
        return '';
    }
    
    var jsonStrObj = {
        
        shipNo : shipNo,
        description : desc,
        source : src,
        destinaton : dest,
        shipmentDate : shipDate,
        expectedDeliveryDate : ExDeliDate  
    };
    return JSON.stringify(jsonStrObj);
}


function resetForm(){
    $('#shipNo').val('');
    $('#description').val('');
    $('#source').val('');
    $('#destination').val('');
    $('#shipDate').val('');
    $('#expectedDeliDate').val('');
    $('#shipNo').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#change').prop('disabled',true);
    $('#shipNo').focus();
}




function saveData(){
    
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken,jsonStrObj, shipmentDBName, shipmentRelationName);
    //alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
    //alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#shipNo').focus();
    
}

function changeData(){
    $('#change').prop('disabled',true);
    jsonChng= validateData();
    var updateReqStr = createUPDATERecordRequest(connToken,jsonChng, shipmentDBName, shipmentRelationName , localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateReqStr, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(updateReqStr);
    resetForm();
    $('#shipNo').focus();
    
    
    
}