async function move(n, a, m, tS, frmFlds){
    hostNow = window.origin; 
    $.ajax({
        method: "POST",
        url: hostNow+"/process-management/api/v2/requests/"+n+"/move",
        contentType: "application/json", 
        data:  JSON.stringify({
            "assignee":             a,//"System:Auto"
            "movementSequence":     m,   
            "targetState":          tS, 
            "formFields": frmFlds 
            }),
        async: false,
        error: function(error) {
            console.log(error)
            statusRequest['status'] = 'Erro na Transferencia';; 
            statusRequest['icon']   =  'iconFail'; 
        }
    }).done(async function (response) { 
        console.log(response); 
        statusRequest['status'] = 'Responsabilidade Transferida';; 
        statusRequest['icon']   =  'iconSucess'; 
        await response
    })
}
async function assumeUser(targetAssignee, Nsolicitacao, movementSequence, targetAssignee){
    hostNow = window.origin; 
    await $.ajax({
        method: "POST",
        url: hostNow + "/api/public/2.0/workflows/assumeProcessTask",
        contentType: "application/json", 
        data:  JSON.stringify(
            { 
                "colleagueId" :         targetAssignee,         // Colleague id 
                "processInstanceId" :   Nsolicitacao,           // Process instance id 
                "movementSequence" :    movementSequence,       // Sequence from the task to take 
                "replacementId" :       targetAssignee          // User id from the replacement taking the task for the user 
            }
            ),
        async: false,
        error: function(error) {
            console.log(error)
            statusRequest['status'] = 'Erro na Transferencia';; 
            statusRequest['icon']   =  'iconFail'; 
        }
        }).done(async function (response) { 
            console.log(response); 
            statusRequest['status'] = 'Responsabilidade Transferida';; 
            statusRequest['icon']   =  'iconSucess'; 
            await response
        })
}
window.statusRequest = {}
async function getRequestProcess (n) {
    let myPromise = new Promise(function(resolve, reject) {
        hostNow = window.origin; 
        $.ajax({
            method: "GET",
            url: hostNow+"/process-management/api/v2/requests/"+n+"/tasks",
            contentType: "application/json",
            async: true
        }).done(function (response) { 
            resolve(response)
        })
    })
    await myPromise.then(function(value) {
        console.log(value)
        valueNow = ''
        stInow = ''
        for(let i = value.items.length - 1; stInow != 'NOT_COMPLETED'; i--){
            stInow = value.items[i].status
            if(stInow == 'NOT_COMPLETED'){
                valueNow = value.items[i];             // Obtem ultimo estado
            }
        }
        var movementSequence    = valueNow.movementSequence;
        var stateNow            = valueNow.state.sequence;
        var chkStatus           = valueNow.status;
        var assignee            = valueNow.assignee.code;
        var targetState         = '';
        var processId           = valueNow.processId
        var tipoPedido             = ''
        /*var movementSequence    = value.items[value.items.length - 1].movementSequence;
        var stateNow            = value.items[value.items.length - 1].state.sequence;
        var chkStatus           = value.items[value.items.length - 1].status;
        var assignee            = value.items[value.items.length - 1].assignee.code;
        var targetState         = '';
        */
        var respN               = objDataPainel['userSelected'];
        frm = {
            "hdn_userResp":     respN
        }  

        /*  Pagamentos
            homolog
        sts = [12, 73, 72, 14, 19]
        rspArr = [14, 14, 14, 19, 14]
        */
         /*  prod
        sts = [12, 73, 72, 14, 19]
        rspArr = [14, 14, 14, 19, 14]
        */
        if(processId == 'Pedido_de_Pagamento'){
            sts = [12, 73, 72, 14, 19, 21]
            rspArr = [14, 14, 14, 19, 14, 19]
            for(i = 0; i < sts.length; i++){
                if(stateNow == sts[i]){
                    targetState = rspArr[i]
                }
            }
        }else if(processId == 'AdiantamentoRessarcimento'){
            sts = [19, 20, 21, 22, 80, 83]
            rspArr = [20, 19, 20, 21, 83, 80]
            for(i = 0; i < sts.length; i++){
                if(stateNow == sts[i]){
                    targetState = rspArr[i]
                }
            }
            if(stateNow == 19){
                tipoPedido = tablePag['selecteds'][0].cells[7].textContent;
                console.log(tipoPedido)
                let objPagamentoParaInAPI = {
                    'Adiantamentos': '1',
                    'Ressarcimentos': '2',
                }
                console.log(tipoPedido)
                tipoPedido = objPagamentoParaInAPI[tipoPedido]
                frm['slc_PagamentoPara'] = 0    
            }
        }
        async function execq(){
            if(assignee.indexOf('Pool') == -1 && assignee.indexOf('Group') == -1){
                for(execT = 0; execT < 2; execT++){
                    if(execT == 1){
                        targetState         = stateNow;
                        movementSequence++;
                        assignee            = respN;
                        if(targetState == 19 && processId == 'AdiantamentoRessarcimento'){
                            console.log(tipoPedido)
                            frm['slc_PagamentoPara'] = tipoPedido
                       }    
                    }
                    if(stateNow == 19 && processId == 'Pedido_de_Pagamento'){
                        tdhj = new Date().toJSON();
                        tdhj = tdhj.split('T')[0];
                        frm = {
                            "hdn_userResp":     respN,
                            "txt_dtPag":        tdhj,
                        }
                    }
                    if(stateNow == 21 && processId == 'AdiantamentoRessarcimento'){
                        tdhj = new Date().toJSON();
                        tdhj = tdhj.split('T')[0];
                        frm = {
                            "hdn_userResp":     respN,
                            "txt_dtPag":        tdhj,
                        }
                    }
                    a = await  move(n, assignee, movementSequence, targetState, frm)
                }
            }else{
                await  assumeUser(respN, n, movementSequence, respN)
            }
        }
        execq()
    })
    let getLastState = new Promise(function(resolve, reject) {
        hostNow = window.origin; 
        $.ajax({
            method: "GET",
            url: hostNow+"/process-management/api/v2/requests/"+n+"/tasks",
            contentType: "application/json",
            async: true
        }).done(function (response) { 
            resolve(response)
        })
    })
    await getLastState.then(function(value) {
        valueNow = ''
        stInow = ''
        for(let i = value.items.length - 1; stInow != 'NOT_COMPLETED'; i--){
            stInow = value.items[i].status
            if(stInow == 'NOT_COMPLETED'){
                valueNow = value.items[i];             // Obtem ultimo estado
            }
        }
        itnNowTable = objFormat['itns'];
        for(itnTB = 0; itnTB < itnNowTable.length; itnTB++){
            if(itnNowTable[itnTB].nSolictItnNow == valueNow.processInstanceId){
                itnNowTable[itnTB].nEtapaItnNow    = valueNow.state.stateDescription;
                itnNowTable[itnTB].respItnNow      = valueNow.assignee.name; 
                itnNowTable[itnTB].status          = statusRequest['status'];
                itnNowTable[itnTB].icon            = statusRequest['icon'];
                
            }
        }
        console.log(objFormat)
        addItnsTableTransfer(objFormat)
    })
}
async function processTransfer(){
    validateResult = objDataPainel['validateFieldPainel']();
    console.log(validateResult)
    if(validateResult == true){
        /*******************************                                < ------------------------
         * Configuração apresentação de loading... button 'Processar' 
         */
        btnInitTransfer    = document.getElementById('initTransfer')
        btnInitTransfer.disabled = true
        btnInitTransfer.innerHTML = ''
        itnsSlcTb = tablePag['selecteds'];
        var spanBtn = document.createElement('span');
        spanBtn.setAttribute('class', 'spinner-grow spinner-grow-sm');
        spanBtn.setAttribute('aria-hidden', 'true');
        btnInitTransfer.appendChild(spanBtn);
        var spanBtnStatus = document.createElement('span');
        spanBtnStatus.setAttribute('role', 'status');
        spanBtnStatus.innerText = 'Loading...';
        btnInitTransfer.appendChild(spanBtn);
        /*******************************/
        for(slcIn = 0; slcIn < itnsSlcTb.length; slcIn++){
            nSolictItnNow   = itnsSlcTb[slcIn].cells[2].textContent;
            console.log(nSolictItnNow)
            /********************************************************* */

                await getRequestProcess(nSolictItnNow)
     
            /********************************************************* */
        }
         /*******************************                                < ------------------------
         * Configuração padrão button 'Processar' 
         */
        btnInitTransfer.disabled = false
        btnInitTransfer.innerHTML = ''
        btnInitTransfer.innerText = 'Processar Transferencias'
        btnInitTransfer.style.display = 'none'
        /*******************************/
        /*******************************                                < ------------------------
         * Configuração padrão inicial tablePag
         */
        objFields.cleanValidatefeedback();
        objFields.cleanFieldsFilter();
        document.getElementById('btnPainel').disabled = true;
        tablePag['selecteds'] = []
        recordsTest = tablePag.dsRecordsPags(0, 90000000);
        tablePag.table.clear().draw()
        if(recordsTest.length != 0){
            recordsN = tablePag.addRowsTable(recordsTest)
            for(y = 0; y < recordsN.length; y++){
                tablePag.table.row.add(recordsN[y]).draw(false); 
            }   
            tablePag['lastRecord']  = recordsTest[recordsTest.length - 1]['processInstanceId'];
        }
        /*******************************/
        objDataPainel['myLoading'].hide()
    }
}
function processItns(){
    initTransfer = document.getElementById('initTransfer');
    initTransfer.addEventListener('click', async function () {
        await processTransfer();
    })
}
window.addEventListener('load', processItns)