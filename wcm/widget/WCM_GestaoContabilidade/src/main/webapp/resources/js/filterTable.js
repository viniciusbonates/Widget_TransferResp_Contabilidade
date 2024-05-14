function setobjFields(){
    initSolict  = document.getElementById('initSolict')
    finalSolict = document.getElementById('finalSolict')
    initDate    = document.getElementById('initDate')
    finalDate   = document.getElementById('finalDate')
    initSolict.value    = 0;
    finalSolict.value   = 999999;
    objFields = {
        fieldsFilter:     [initSolict, finalSolict, initDate, finalDate]
    }
    objFields.cleanFieldsFilter = function (){
        let arrFields = this.fieldsFilter
        for(let i = 0; i < arrFields.length; i++){
            arrFields[i].value = '';
        }
    }
    objFields.cleanValidatefeedback = function (){
        let arrFields = this.fieldsFilter
        for(let i = 0; i < arrFields.length; i++){
            arrFields[i].classList.remove('is-invalid');
            arrFields[i].classList.remove('is-valid')
        }
    }
    objFields.setValidfeedback = function (arrFields){
        for(let i = 0; i < arrFields.length; i++){
            arrFields[i].classList.remove('is-invalid')
            arrFields[i].classList.add('is-valid')
        }
    }
    objFields.setInvalidfeedback = function (arrFields){
        for(let i = 0; i < arrFields.length; i++){
            arrFields[i].classList.remove('is-valid')
            arrFields[i].classList.add('is-invalid')
        }
    }
    initSolict.addEventListener('keyup', setLimitDigit)
    finalSolict.addEventListener('keyup', setLimitDigit)
    function setLimitDigit () {
        let valueInpN = this.value
        if(valueInpN.length > 6){
            let result = valueInpN.slice(0, 6);
            this.value = result
        }
    }
    console.log(objFields)
}
window.addEventListener('load', setobjFields)
function filterTable(){
    btnGetData = document.getElementById('getData');
    console.log(btnGetData)
    btnGetData.onclick = function () {
        loadW = FLUIGC.loading('.super-widget');
        loadW.show()
        tablePag['selecteds'] = []
        initSolict  = document.getElementById('initSolict')
        finalSolict = document.getElementById('finalSolict')
        initDate    = document.getElementById('initDate')
        finalDate   = document.getElementById('finalDate')
        if(initSolict.value == null || initSolict.value == undefined || initSolict.value == ''){
            let arrDefnow = objFields.fieldsFilter
            objFields.setInvalidfeedback(arrDefnow)
        }else{
            if(initSolict.value != '' && finalSolict.value != ''){
                let arrDefnow =  [initSolict, finalSolict]
                objFields.setValidfeedback(arrDefnow)
                recordsTest = tablePag.dsRecordsPags(initSolict.value, finalSolict.value);
            }else{
                let arrDefnow =  [initSolict, finalSolict]
                objFields.setInvalidfeedback(arrDefnow)
            }
            if(initDate.value != '' && finalDate.value != ''){
                console.log(initDate)
                console.log(finalDate)
                let arrDefnow =  [initDate, finalDate]
                objFields.setValidfeedback(arrDefnow)
                recordsTest = tablePag.dsRecordsPags(initSolict.value, finalSolict.value, initDate.value, finalDate.value);
            }/*else{
                let arrDefnow =  [initDate, finalDate]
                objFields.setInvalidfeedback(arrDefnow)
            }*/
            tablePag.table.clear().draw()
            if(recordsTest.length != 0){
                recordsN = tablePag.addRowsTable(recordsTest)
                for(y = 0; y < recordsN.length; y++){
                    tablePag.table.row.add(recordsN[y]).draw(false); 
                }   
                tablePag['lastRecord']  = recordsTest[recordsTest.length - 1]['processInstanceId'];
            } 
        } 
        loadW.hide()
    }
}
window.addEventListener('load', filterTable)
