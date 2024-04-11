var MyWidget = SuperWidget.extend({
    message: null,

    init: function () {
       /* initOpsCardData = new opsCardData()
        initOpsCardData.prmsTableNow()
        matricula = window.WCMAPI.userCode
        console.log(matricula)

        slcData.getSelectOptionsUser()
        initTableData = new tableData();

        let tbUser = '#tbUser'
        tableBuild(tbUser)
*/
    },

    bindings: {
        local: {
            'show-message': ['click_showMessage']
        }
    },

    showMessage: function () {
        $div = $('#helloMessage_' + this.instanceId);
        $message = $('<div>').addClass('message').append(this.message);
        $div.append($message);
    }
});
function tableBuild(tableIn){
    let dataSet = DatasetFactory.getDataset("colleague", null, null, null);
    let records = dataSet.values;
    dataIn = []
    for(r = 0; r < records.length; r++){
        recordNow = records[r];
        if(recordNow['colleaguePK.colleagueId'] != undefined){
            dataIn.push([
                recordNow.colleagueName,
                recordNow['colleaguePK.colleagueId'],
                recordNow.mail,
                recordNow.login,
                recordNow.groupId
            ])
        }
    }
    $(document).ready(function () {
        var table = $(tableIn).DataTable({ 
            data: dataIn,
            columns: [
                { title: 'Nome' },
                { title: 'Matricula' },
                { title: 'E-mail' },
                { title: 'login' },
                { title: 'Unidade' },
            ],
        });
        $(tableIn+' tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                console.log(this)
                console.log(initPerson)   

                let rw = this.cells[3];

                serviceCard.matricula = this.cells[1].textContent;
                initpanelAdmin.sclValuesIn = ''
                let myPromise = new Promise(function(resolve, myReject) {
                    serviceCard.getCardIndex(resolve);  
                  });
                  
                myPromise.then(function(response) {
                    initpanelAdmin.sclValuesIn = response.items[response.items.length - 1];
                    console.log(initpanelAdmin)
                    initpanelAdmin.updateUserSocial();
                    serviceCard.cadId =  response.items[response.items.length - 1].cardId;
                });

                console.log(rw)
                initPerson.setNamePerson(rw.textContent)
                initPerson.setPharagPerson()

                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    });
}

function opsCardData(){
    this.resp = 0;
    this.userResponsNow = 0;
    this.tableObj = {};
}
opsCardData.prototype.updateTable = async function (dt) {
    arrDataDetermine = initTableData.table.rows().data()

    for(let x in arrDataDetermine){
        itnCK = (value['fieldId'].search(arrFields[x]) != -1) ? '{\"fieldId\": \"'+value['fieldId'].slice(0,value['fieldId'].length-1)+'\",'+'\"value\": '+'\"'+value['value']+'\"}' : '';   
        itnN = (itnCK != '') ? itnCK : '';
        if(itnCK.indexOf('\"') != -1 ){
            fldN.push(JSON.parse(itnN));
        }
    }

    
}
opsCardData.prototype.prmsUpUserNow = async function (dt) {
    url = 'https://mywebhm.am.sebrae.com.br/ecm-forms/api/v2/cardindex/225581/cards/237567';
    await $.ajax({
        method: "PUT",
        url: url,
        contentType: "application/json",
        async: true,
        data:  JSON.stringify(dt)
    }).done(async function (response) { 
        await response
        return response
    })   
}
opsCardData.prototype.prmsAddRow = async function (dt) {
    url = 'https://mywebhm.am.sebrae.com.br/ecm-forms/api/v2/cardindex/225581/cards/237567/children';
    await $.ajax({
        method: "POST",
        url: url,
        contentType: "application/json",
        async: true,
        data:  JSON.stringify(dt)
    }).done(async function (response) { 
        await response
        return response
    })    
}
opsCardData.prototype.prmsCardDataNow = async function () {
    url = 'https://myweb.am.sebrae.com.br/ecm-forms/api/v2/cardindex/225581/cards/237567?expand=children&page=1&pageSize=100';
    await $.ajax({
        method: "GET",
        url: url,
        contentType: "application/json",
        async: true
    }).done(async function (response) { 
        await response
        initOpsCardData.resp = response
        console.log(initOpsCardData.resp)
        console.log(response)
        return response 
    })        
}  
opsCardData.prototype.prmsTableNow =  async function () {
    await initOpsCardData.prmsCardDataNow()
    response = this.resp
    var respNow = 0;   
    let resValues = response.values
    for(let i of resValues){
        respNow = (i.fieldId.search('nomeGerente') != -1) ? i['value'] : respNow;
    }
    let resItems = response.children
    var objRowNow = [];
    var objStorageChilds = [];
    for(let i of resItems){
        rowIn = [];
        rowBuild = '';
        fldN = [];
        itnN = '';
        arrFields = ['txt_ordem___', 'txt_vez___', 'txt_nomeUsuario___'];
        i.values.forEach (myFunction)
        objRowNow.push(rowIn);
        objStorageChilds.push({values: fldN})
    }
    function myFunction(value, index, array) {
        var itnBuild = '';
        itnBuild += (index == 0) ? '{' : '';
        itnBuild += (value['fieldId'].search('txt_ordem___') != -1) ? '\"'+value['fieldId']+'\"'+': '+'\"'+value['value']+'\"' : '';
        itnBuild += (value['fieldId'].search('txt_vez___') != -1) ? '\"'+value['fieldId']+'\"'+': '+'\"'+value['value']+'\"' : '';
        itnBuild += (value['fieldId'].search('txt_nomeUsuario___') != -1) ? '\"'+value['fieldId']+'\"'+': '+'\"'+value['value']+'\"' : '';
        itnBuild += (value['fieldId'].search('rowId') != -1) ? '\"'+value['fieldId']+'\"'+': '+'\"'+value['value']+'\"' : '';
        itnBuild += (index == array.length - 1) ? '}' : ',';
        
        itnCK = '';
        for(let x in arrFields){
            itnCK = (value['fieldId'].search(arrFields[x]) != -1) ? '{\"fieldId\": \"'+value['fieldId'].slice(0,value['fieldId'].length-1)+'\",'+'\"value\": '+'\"'+value['value']+'\"}' : '';   
            itnN = (itnCK != '') ? itnCK : '';
            if(itnCK.indexOf('\"') != -1 ){
                fldN.push(JSON.parse(itnN));
            }
        }

        rowBuild += (itnBuild != '' && itnBuild != ',') ? itnBuild : '';
        if(index == array.length - 1){
            if(rowBuild.charAt(rowBuild.length-2) == ','){
                rowUpN = rowBuild.slice(0,rowBuild.length-2);
                rowUpN += '}';
            }else{ rowUpN =  rowBuild}
            rowIn.push(JSON.parse(rowUpN));
            rowBuild = '';
        }
    }
    //console.log(objStorageChilds)
    this.tableObj = objStorageChilds
    this.userResponsNow = respNow

    initTableData.tableBuild();
}
function tableData(){
    this.table = 0
    this.tbUser = '#tbUser'
}
tableData.prototype.tableBuild = function () {
    /*let dataSet = DatasetFactory.getDataset("colleague", null, null, null);
    let records = dataSet.values;
    dataIn = []
    for(r = 0; r < records.length; r++){
        recordNow = records[r];
        if(recordNow['colleaguePK.colleagueId'] != undefined){
            dataIn.push([
                recordNow.colleagueName,
                recordNow['colleaguePK.colleagueId'],
                recordNow.mail,
                recordNow.login,
                recordNow.groupId
            ])
        }
    }*/
    
    /*var dataSet = [
            ['Tiger Nixon', '1','1'],
            ['Garrett Winters', '2', '2'],
        ];*/
    var dataSet = []
    for(let i of initOpsCardData.tableObj){
            arrTemp = []
            i.values.forEach (myFunction)
            
    }
    console.log(dataSet) 
    function myFunction(value, index, array) {
            
        if(value['fieldId'].search('txt_ordem___') != -1){ 
            arrTemp[1] = value['value'] 
        }
        if(value['fieldId'].search('txt_nomeUsuario___') != -1){ 
            for(i = 0; i < slcData.arrSlc.length; i++){
                if(slcData.arrSlc[i]['colleaguePK.colleagueId'] == value['value']){
                    arrTemp[0] = slcData.arrSlc[i].colleagueName
                    arrTemp[2] = value['value']
                }
                
            }
            
        }

        if(index == 2){
            dataSet.push(arrTemp);
        } 
    }
    this.table = $(this.tbUser).DataTable({ 
                data: dataSet,//dataIn,
                columns: [
                    { title: 'Nome' },
                    { title: 'Ordem' },
                    { title: 'matricula' },
                ],
                initComplete: function() {
                    thisDataTable = this.api()
                    initTableData.setSelect(thisDataTable);
                    initTableData.updateSelectOptionsOrder(thisDataTable)
                }
            });
            table = this.table
            tbUser = this.tbUser
            table.column( 2 ).visible( false );
    $(document).ready(function () {
        $(tbUser+' tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
        $('#addRow').on('click', function () {
            userSsl = document.getElementById('slc_user');
            let userMatr = userSsl.value;
            indxSlc = userSsl.selectedIndex
            let userNow = userSsl[indxSlc].textContent;
            let orderNow = document.getElementById('order').value; 
            table.row.add([userNow , orderNow, userMatr]).draw(false);
        });
        $('#delRow').click(function () {
            table.row('.selected').remove().draw(false);
        });
    });
    table.on('draw stateRestore-change', function() { 
        initTableData.setSelect()
        initTableData.updateSelectOptionsOrder()
    })
}
tableData.prototype.setSelect = function (tb) {
    defTb = (this.table != 0) ? this.table : tb 
    if(defTb.rows().data().length != 0){
        defTb.column(1).nodes().each(function ( value, index ) {
            indxRow = defTb.rows().indexes()[index]
            vle = defTb.row(indxRow).data()[1]
            value.innerHTML = ''
            $('<select id="order___'+indxRow+'" class="form-select"><option value="'+vle+'">'+vle+'</option>').appendTo(value)
            document.getElementById('order___'+indxRow).onchange = function () { initTableData.updateSelectOptionsOrder();initTableData.changeData(this) }
        })
    }
}
tableData.prototype.updateSelectOptionsOrder = function (tb) {
    defTb = (this.table != 0) ? this.table : tb 
    colns = defTb.columns().header()
    arrIndxOrder    = []
    newArrOptns     = [] 
    if(defTb.rows().data().length != 0){
        for(i = 0; i <colns.length; i++){       // Obtem os numeros da Coluna Ordem 
            rowNow = colns[i]
            if(rowNow.textContent == 'Ordem'){
                dataCol = defTb.columns(i).data()
                for(j = 0; j < dataCol[0].length; j++){
                    arrIndxOrder.push(dataCol[0][j])  
                }
            }
        }
        arrIndxOrder.sort(function(a, b){return a - b});
        stpCond = arrIndxOrder[arrIndxOrder.length - 1]
        newArrOptns.push(parseInt(stpCond) + 1)
        for(k = stpCond; k != 0; k--){           // Obtem os numeros que estão faltando na coluna Ordem
            mark = 0
            for(l = arrIndxOrder.length - 1; l != -1; l--){
                if(arrIndxOrder[l] == k){
                    mark++
                }
                if(mark != 0){ break }
            }
            if(mark == 0){ 
                newArrOptns.push(k)
            }
        }
        console.log(newArrOptns)
        arrSlcs = document.getElementsByTagName('SELECT')               
        for(j = 0; j < arrSlcs.length; j++){
            slc = (arrSlcs[j].id.indexOf('order') != -1) ? arrSlcs[j] : '';
            if(arrSlcs[j].id.indexOf('order___') == -1) { slc.innerHTML = '' } ;
            if(arrSlcs[j].id.indexOf('order___') != -1) { 
                for (let x in slc.childNodes.length) {
                    slc.removeChild(slc.firstElementChild)
                } 
            };
            newArrOptns.forEach(fncSetOpt);              // Insere opções no Select
        }
        function fncSetOpt(value, index, array) {
            if(slc != ''){
                var optV = document.createElement("option")
                optV.value = value
                optV.textContent = value
                slc.appendChild(optV)
            }   
        }
    } else {
        slc = document.getElementById('order')
        slc.innerHTML = ''
        var optV = document.createElement("option")
            optV.value = '1'
            optV.textContent = '1'
            slc.appendChild(optV)
    }
}
tableData.prototype.changeData = function (elem) {
    indxRow = elem.id.split('___')[1]
    nameIn = this.table.row(indxRow).data()[0]
    matrIn = this.table.row(indxRow).data()[2]
    this.table.row(indxRow).data([nameIn , elem.value, matrIn])
    initTableData.setSelect()
    initTableData.updateSelectOptionsOrder()
}
slcData = {
    arrSlc: [],
    getSelectOptionsUser: function () {
        let c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", 'UCOF', 'UCOF', ConstraintType.MUST);
        let userUcof = DatasetFactory.getDataset('colleagueGroup', null, new Array(c1), null).values;
        let slc = document.getElementById('slc_user');

        for(i = 0; i < userUcof.length; i++){
            var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", userUcof[i]["colleagueGroupPK.colleagueId"], userUcof[i]["colleagueGroupPK.colleagueId"], ConstraintType.MUST)
            var userNow = DatasetFactory.getDataset('colleague', null, new Array(c2), null).values[0];
            this.arrSlc.push( userNow ) ;  

            var optV = document.createElement("option")
            optV.value = userNow['colleaguePK.colleagueId']
            optV.textContent = userNow['colleagueName']
            slc.appendChild(optV)
        }
        console.log(this.arrSlc)
    }
}
