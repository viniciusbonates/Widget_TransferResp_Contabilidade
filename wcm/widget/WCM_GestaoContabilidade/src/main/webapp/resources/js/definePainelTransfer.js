objDataPainel = {}
function setDataset(){
    colleague = DatasetFactory.getDataset("colleague",null,null,null);
    dsc_Unidades = DatasetFactory.getDataset("dsc_Unidades",null,null,null);
    colleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, null, null)
}
window.addEventListener('load', setDataset)
function getUsersForRole (papel) {                   
    cll     = colleague;
    c7      = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", papel, papel,  ConstraintType.MUST); 
    cnst    = new Array(c7);
    dsCllfilter = DatasetFactory.getDataset("workflowColleagueRole",null,cnst,null);          
    objOptionsFil = { values: [] };
    for(z = 0; z <  dsCllfilter.values.length; z++){
        colleagueNowIn  = dsCllfilter.values[z]['workflowColleagueRolePK.colleagueId']
        dsCllFinal = 0;
        for(i = 0; i < cll.values.length; i++){
            if(cll.values[i]['colleaguePK.colleagueId'] == colleagueNowIn){                  
                dsCllFinal = cll.values[i];
            }
        }
        objOptionsFil.values.push(dsCllFinal)
    } 
    console.log(objOptionsFil)
    return objOptionsFil
}
function defineOptsDiv(divAll, arr){
    for(i = 0; i < arr.length; i++){
        var divOptTemp = document.createElement('div');
        divOptTemp.setAttribute('style', 'width: 100%;float: left;font-size: 14px; color: black; opacity: 85%;border: transparent;border-width: 1px;border-radius: 4px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px');
        divOptTemp.setAttribute('class','a divOpt');
        divOptTemp['value'] = arr[i]['colleaguePK.colleagueId'];
        var nameTemp = document.createElement('b');
        nameTemp.setAttribute('class','nameOpt');
        nameTemp.innerText = arr[i]['colleagueName'];
        var breakTemp = document.createElement('BR');
        var spanTemp = document.createElement('span');
        spanTemp.innerText = arr[i]['colleaguePK.colleagueId'];
        divOptTemp.addEventListener("click", function(){
            console.log(this)
            hdn_userResp.value = this.value
            console.log(hdn_userResp)
            objDataPainel['userSelected'] = hdn_userResp.value;
            for(let i = 0; i < this.children.length; i++){
                if(this.children[i].classList.contains('nameOpt') == true){
                    document.getElementById('slc_temp').value = this.children[i].innerText;
                }
            }
            document.getElementById('slcNew').style.display = 'none'
        })
        divOptTemp.appendChild(nameTemp);
        divOptTemp.appendChild(breakTemp);
        divOptTemp.appendChild(spanTemp);
        divAll.appendChild(divOptTemp);
    }
}
function DemandResp() {
    cll             = colleague;
    elemSelc        = document.getElementById('slc_userResp_div');
    hdn_userResp    = document.getElementById("newUserResp");
    document.getElementById('exampleModalToggle').addEventListener("click", function (event) { 
        console.log(event);
        let tgN = event.target
        if(tgN.classList.contains('divOpt') == false && tgN.id != 'slcNew' && tgN.id != 'slc_temp'){
            document.getElementById('slcNew').style.display = 'none'
        }
    });
    objOptions      = { values: [] };
    dsCllGrou = getUsersForRole('UCOFAnaliseDocumentacao');
    function setOptionsSelectObj(datasetObjUser, objForSet){
        for(z = 0; z <  datasetObjUser.values.length; z++){
            nameCll     = datasetObjUser.values[z]['colleagueName']
            idCll       = datasetObjUser.values[z]['colleaguePK.colleagueId']
    
            objForSet.values.push(datasetObjUser.values[z])
        }
    }
    setOptionsSelectObj(dsCllGrou, objOptions)
    function searchInpTemp(){
        var inpTemp = document.createElement('input');
        //inpTemp.setAttribute('list', 'browsersP');
        inpTemp.setAttribute('class','form-control');
        inpTemp.setAttribute('name','slc_temp');
        inpTemp.setAttribute('id','slc_temp');
        //inpTemp.setAttribute('autocomplete','off');
        inpTemp.setAttribute('style','color: black;');
        elemSelc.appendChild(inpTemp);
        inpTemp.addEventListener("focus", function () {
            document.getElementById('slcNew').style.display = 'block'
        });
        var arrayOption = objOptions.values  
        inpTemp.addEventListener("keyup", function () {
            let arraOptTempo = objOptions.values  
            elemDiv = document.getElementById('inpsearch');
            strN = this.value
            arrT = []
            if(strN.length >= 3){
                for(let i = 0; i < arraOptTempo.length; i++){
                    let itnN = arraOptTempo[i]['colleagueName']
                    itnNUP = itnN.toUpperCase();
                    strNUP = strN.toUpperCase();
                    if(itnNUP.search(strNUP) != -1){
                        arrT.push(arraOptTempo[i])   
                    }
                }
                elemDiv.innerHTML = ''
                defineOptsDiv(elemDiv, arrT)
            }else if(strN.length == 0){
                elemDiv.innerHTML = ''
                defineOptsDiv(elemDiv, arrayOption)
           }
        });
        /*var vdatalist = document.createElement('datalist');
        vdatalist.setAttribute('id','browsersP');

        for(i = 0; i < arrayOption.length; i++){
            var voption = document.createElement('option')
            att = document.createAttribute('value')
            att.value = arrayOption[i]['colleagueName']
            voption.setAttributeNode(att)
            voption.innerText = arrayOption[i]['colleaguePK.colleagueId']

            if(hdn_userResp.value == voption.innerText){
                inpTemp.value = voption.value
            }

            vdatalist.appendChild(voption)
        }
        elemSelc.appendChild(vdatalist);
        */
        /******************************************************************** */
        var divAllOptTemp = document.createElement('div');
        divAllOptTemp.setAttribute('style', 'width: 97%;position: absolute;');
        divAllOptTemp.setAttribute('id', 'inpsearch');
        divAllOptTemp.addEventListener("focusout", function(){
            document.getElementById('slcNew').style.display = 'none'
        })
        defineOptsDiv(divAllOptTemp, arrayOption)
        document.getElementById('slcNew').appendChild(divAllOptTemp)

        /*document.getElementById("slc_temp").addEventListener("change", function(){
            for(i = 0; i < arrayOption.length; i++){
                if(arrayOption[i].colleagueName == this.value){
                    hdn_userResp.value = arrayOption[i]['colleaguePK.colleagueId']
                    objDataPainel['userSelected'] = hdn_userResp.value;
                    break;
                }
            }
        })*/
    }
    searchInpTemp()
}
window.addEventListener('load', DemandResp)

function addItnsTableTransfer(objFormat){
    tbSelecteds = document.getElementById('tbSelecteds')
    trsSucess   = document.getElementById('trsSucess')
    trsFail     = document.getElementById('trsFail')
    trsSucess['value']  = 0
    trsFail['value']    = 0
    trsSucess.innerHTML  = '<b>0</b>'
    trsFail.innerHTML    = '<b>0</b>'
    objIcon     = {}
    iconSucess  =   "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"30\" height=\"30\" fill=\"green\" class=\"bi bi-file-check-fill\" viewBox=\"0 0 16 16\">"+
    "<path d=\"M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1.146 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708.708\"\/>" +
    "<\/svg>"
    iconFail    =   "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"30\" height=\"30\" fill=\"red\" class=\"bi bi-file-excel-fill\" viewBox=\"0 0 16 16\">"+
        "<path d=\"M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5.884 4.68 8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 1 1 .768-.64\"\/>"+
        "<\/svg>"
    iconNothing =   "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-dash\" viewBox=\"0 0 16 16\">"+
        "<path d=\"M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8\"\/>"+
        "<\/svg>"
    objIcon['iconSucess']   = iconSucess
    objIcon['iconFail']     = iconFail
    objIcon['iconNothing']  = iconNothing
    function createRow(indx, resp, etapa, status, icon){
        numCols = tbSelecteds.tHead.rows[0].cells;         //Obtem da colunas da tabela
        var objTr = document.createElement('tr');
        for(colsI = 0; colsI < numCols.length; colsI++){
            lastCol = numCols.length - 1
            if(colsI == 0){
                var objTh = document.createElement('th');
                    objTh.setAttribute('scope', 'row');
                    objTh.innerText = indx;
                    objTr.appendChild(objTh);
            }else if(colsI == 4){
                var objTd = document.createElement('td');
                    objTd.innerHTML = icon;
                    objTr.appendChild(objTd);
            }else if(colsI == 1){
                var objTd = document.createElement('td');
                    objTd.innerHTML = resp;
                    objTr.appendChild(objTd);
            }else if(colsI == 2){
                var objTd = document.createElement('td');
                objTd.innerText = etapa;
                objTr.appendChild(objTd);
            }else if(colsI == 3){
                var objTd = document.createElement('td');
                objTd.innerText = status;
                objTr.appendChild(objTd);
            }
        }
        console.log(objTr)
        return objTr
    }
    tbSelecteds.tBodies[0].innerHTML = ''
    for(slcI = 0; slcI < objFormat['itns'].length; slcI++){
        paramSolic  = objFormat['itns'][slcI].nSolictItnNow
        paramResp   = objFormat['itns'][slcI].respItnNow 
        paramEtapa  = objFormat['itns'][slcI].nEtapaItnNow
        paramStatus = objFormat['itns'][slcI].status
        icnNow      = objFormat['itns'][slcI].icon
        paramIcon   = objIcon[icnNow]
        if(icnNow == 'iconSucess'){
            trsSucess['value'] = trsSucess['value'] + 1;
            trsSucess.innerHTML = '<b>'+trsSucess['value']+'</b>'
        }else if(icnNow == 'iconFail'){
            trsFail['value'] = trsFail['value'] + 1;
            trsFail.innerHTML = '<b>'+trsFail['value']+'</b>'
        }
        rowModel = createRow(paramSolic, paramResp, paramEtapa, paramStatus, paramIcon)
        tbSelecteds.tBodies[0].appendChild(rowModel)
    }  
}
function initPainelTrasnfer(){
    document.getElementById('btnPainel').onclick = function () {
        cleanAllIn()
        initTransfer        = document.getElementById('initTransfer');
        initTransfer.style.display = 'block'
        objFormat = {}
        objFormat['itns'] = []
        itnsSlcTb = tablePag['selecteds'];
        for(slcI = 0; slcI < itnsSlcTb.length; slcI++){
            objThis = {}
            objThis.nSolictItnNow   = itnsSlcTb[slcI].cells[2].textContent;
            objThis.respItnNow      = itnsSlcTb[slcI].cells[4].textContent; 
            objThis.nEtapaItnNow    = itnsSlcTb[slcI].cells[3].textContent;
            objThis.icon            = 'iconNothing'
            objThis.status          = '---'
            objFormat['itns'].push(objThis)
        }
        console.log(objFormat)
        addItnsTableTransfer(objFormat)
    }
}
window.addEventListener('load', initPainelTrasnfer)
function cleanAllIn () {
    tbSelecteds = document.getElementById('tbSelecteds')
    tbSelecteds.tBodies[0].innerHTML = ''
    slc_temp = document.getElementById('slc_temp')
    slc_temp.classList.remove('is-valid')
    slc_temp.classList.remove('is-invalid')
    slc_temp.value = ''
    trsSucess   = document.getElementById('trsSucess')
    trsFail     = document.getElementById('trsFail')
    trsSucess['value']  = 0
    trsFail['value']    = 0
    trsSucess.innerHTML  = '<b>0</b>'
    trsFail.innerHTML    = '<b>0</b>'
}
function cleanPainel(){
    document.getElementById('cancelTransfer').addEventListener('click', cleanAllIn);
    document.getElementById('closePainel').addEventListener('click', cleanAllIn);
    //document.getElementById('exampleModalToggle').addEventListener('click', cleanAllIn);
}
window.addEventListener('load', cleanPainel)
function setFuncValidateFieldPainel(){
    objDataPainel['myLoading']      = FLUIGC.loading('#exampleModalToggle');
    objDataPainel['validateFieldPainel'] = function (){
        initTransfer        = document.getElementById('initTransfer');
        slc_temp            = document.getElementById('slc_temp')
        cancelTransfer      = document.getElementById('cancelTransfer')
        closePainel         = document.getElementById('closePainel')
        arrControls = [slc_temp, cancelTransfer, initTransfer, closePainel]
        if(slc_temp.value == null || slc_temp.value == undefined || slc_temp.value == ''){
            console.log(slc_temp)
            slc_temp.classList.remove('is-valid')
            slc_temp.classList.add('is-invalid')
            for(i = 0; i < arrControls.length; i++){
                arrControls[i].tabIndex = 0
            }
            console.log(slc_temp)
            return false
        }else{
            console.log(slc_temp)
            slc_temp.classList.remove('is-invalid')
            slc_temp.classList.add('is-valid')
            console.log(arrControls)
            for(i = 0; i < arrControls.length; i++){
                arrControls[i].tabIndex = -1
            }
            objDataPainel['myLoading'].show();
            return true
        }
    } 
}
window.addEventListener('load', setFuncValidateFieldPainel)