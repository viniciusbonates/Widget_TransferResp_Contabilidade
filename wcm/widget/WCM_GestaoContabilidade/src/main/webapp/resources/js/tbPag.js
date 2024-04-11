/*function objItensTbUser(){
    objItnsTbUser = {}
}
window.addEventListener('load', objItensTbUser)
*/
function iniTbPag(){
    tablePag = {}
    tablePag['selecteds'] = []
    tablePag['dsRecordsPags'] = function (initNsolictParam, finalNsolictParam, initialStartDate, finalStartDate) {
        let c1 = DatasetFactory.createConstraint("NsolictParam", initNsolictParam, finalNsolictParam, ConstraintType.MUST);
        if(initialStartDate != undefined && initialStartDate != null && initialStartDate != '' && finalStartDate != undefined && finalStartDate != null && finalStartDate != ''){
            console.log(initialStartDate)
            console.log(finalStartDate)
            let c2 = DatasetFactory.createConstraint("StartDate", initialStartDate, finalStartDate, ConstraintType.MUST);
            cnst = new Array(c1, c2)
        }else{
            cnst = new Array(c1)
        }
        let dataSet = DatasetFactory.getDataset("dsc_TT", null, cnst, null); // em homolog dsc_Pagamentos - Prod dsc_TT
        console.log(dataSet)
        let records = dataSet.values;
        return records
    }

    let tbPag = '#tbPag'
    tableBuild(tbPag)
}
window.addEventListener('load', iniTbPag)
async function tableBuild(tableIn){
    /*hoje = new Date().toJSON()
    hoje = hoje.split('T')[0]
    initialStartDate            = "2024-01-01"
    finalStartDate              = hoje
    dtInit =  "%01/01/2024%"
    finalStartDate
    */
    // GET request por periodo -------------->
        // Parametros contidos na URL da reqeuisição ------------- .
        //initialProcessInstanceId    = 0
        //finalProcessInstanceId      = 900000000
        // Parametros contidos na URL da reqeuisição ------------- .
        /*await $.ajax({
        method: "GET",
        url: "https://myweb.am.sebrae.com.br/bpm/api/v1/requests?&processId=Pedido_de_Pagamento&initialStartDate="+initialStartDate+"&finalStartDate="+finalStartDate+"&status=OPEN&expand=currentMovements&order=processInstanceId&page=1&pageSize=1000", 
        //Obtido na req de 'Consulta solicitações' "https://myweb.am.sebrae.com.br/bpm/api/v1/requests?&processId=Pedido_de_Pagamento&initialProcessInstanceId="+initialProcessInstanceId+"&finalProcessInstanceId="+finalProcessInstanceId+"&initialStartDate="+initialStartDate+"&finalStartDate="+finalStartDate+"&expand=requester&expand=formRecord&expand=currentMovements&expand=currentMovements.tasks&order=processInstanceId&page=1&pageSize=100"
        //https://myweb.am.sebrae.com.br/bpm/api/v1/requests?&processId=Pedido_de_Pagamento&initialStartDate=2024-01-01&finalStartDate=2024-03-18&status=OPEN&expand=currentMovements&order=processInstanceId&page=1&pageSize=1000
        //"https://myweb.am.sebrae.com.br/process-management/api/v2/requests?status=OPEN&processId=Pedido_de_Pagamento&initialStartDate="+initialStartDate+"&finalStartDate="+finalStartDate+"&page=1&pageSize=1000"
        contentType: "application/json", 
        timeout: 20000,
        }).done(async function (response) { 
            console.log(response);
            objItnsTbUser["requests"] = response.items
            await response 
        })
    // GET request por periodo -------------->
    */
    records = tablePag.dsRecordsPags(0, 90000000);
    tablePag['lastRecord']  = records[records.length - 1]['processInstanceId'];
    tablePag['addRowsTable'] = function (records) {
        dataIn = []
        for(r = 0; r < records.length; r++){
            recordNow = records[r];
            // Configuração de campo slc_PagamentoPara -------------->
            objPagamentoPara = {
                '0': 'Selecione',
                '1': 'Consultoria',
                '2': 'Instrutoria',
                '3': 'Convênios',
                '4': 'Adiantamentos',
                '5': 'Diárias',
                '6': 'Passagens',
                '7': 'Ressarcimentos',
                '8': 'Materiais diversos',
                '9': 'Serviços Diversos',
                '10': 'Despesas Administrativas',
                '11': 'Diversos',
                '12': 'Taxas, Impostos e Contribuições',
            }
            
            slcPgPara = objPagamentoPara[recordNow['slc_PagamentoPara']];
            // Configuração de campo slc_PagamentoPara -------------->
            // Obtendo STATUS da SOLICITACAO =  0 - Aberto, 1 - Cancelado e 2 - Finalizado-------------->
            recordNowstatus         = 'Indefinido'
            objStatus               = {
                'CANCELED': 'Cancelado',
                'FINALIZED': 'Finalizado',
                'OPEN':     'Aberto'
            }
            recordNowstatus = objStatus[recordNow.status]
            // Obtendo STATUS da SOLICITACAO =  0 - Aberto, 1 - Cancelado e 2 - Finalizado-------------->
            userNresp = recordNow['hdn_userResp']
            userNresp = userNresp.split('_')
            objCkStateUCOF = {
                'UCOF - Boleto': 1,
                'UCOF - Convênio': 1,
                'UCOF - Análise de Documentação': 1,
                'UCOF - Lançamento no RM': 1,
                'UCOF - Agendamento': 1,
                'UCOF - Geração de  Remessa - Financeiro': 1,
                'UCOF - Pagamento programado conforme vencimento': 1,
                'Contratos Contínuos': 1
            }
            stateN = objCkStateUCOF[recordNow['stateName']]
            if(stateN != undefined){
                if(userNresp.length == 1){
                    userNresp = userNresp[0]
                    let cUser = DatasetFactory.createConstraint("colleaguePK.colleagueId", userNresp, userNresp, ConstraintType.MUST);
                    cnstUser = new Array(cUser)
                    let dsUser = DatasetFactory.getDataset("colleague", null, cnstUser, null); 
                    if(dsUser.values != 0){
                        userNresp = dsUser.values[0]['colleagueName']
                    }else{ userNresp = 'Papel responsável por '+recordNow['stateName'] }
                }else{
                    userNresp = 'Papel responsável por '+recordNow['stateName']
                }
            }else{ userNresp = 'Responsabilidade de outra unidade'}

            hostNow = window.origin; 
            var url = hostNow + "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+recordNow['processInstanceId'];
            link = '<a href=\"'+url+'\" class=\"cad-link\" target=\"_blank\" style=\"color:blue\" ml=\"true\">'+recordNow['processInstanceId']+'</a>';
            dataIn.push([
                recordNow['dt_dataSolicita'],
                link,
                recordNow['stateName'],
                userNresp,
                recordNow['txt_Favorecido'],
                recordNow['txt_CNPJ_CPF'],
                slcPgPara,
                recordNow['txt_valor'],
                recordNowstatus 
            ])
        }
        console.log(dataIn)
        return dataIn
    }
    dataInN = tablePag.addRowsTable(records)
    $(document).ready(function () {
        tablePag['table'] = $(tableIn).DataTable({ 
            data: dataInN,
            columns: [
                { title: 'Data de Inseção Solicitação' },
                { title: 'Número Processo' },
                { title: 'Etapa Atual' },
                { title: 'Responsável Atual' },
                { title: 'RAZAO SOCIAL' },
                { title: 'CNPJ/CPF' },
                { title: 'Pedido de Pagamento de' },
                { title: 'Valor Bruto' },
                { title: 'Status' }
            ],
        });
        $(tableIn).on( 'page.dt', function () {
            objInfoPg = tablePag['table'].page.info();
            console.log(objInfoPg)
            pageNow     = objInfoPg.page 
            pages       = objInfoPg.pages       //Número de páginas contagem começa em 1
            lastPage    = pages -1              //Indicie de pagia contagem começa em 0
            if(pageNow == lastPage){
                lastRecord = tablePag['lastRecord']
                console.log(lastRecord)
                lastRecord += 1
                console.log(lastRecord)
                records = tablePag.dsRecordsPags(lastRecord, 90000000);
                if(records.length != 0){
                    recordsN = tablePag.addRowsTable(records)
                    for(y = 0; y < recordsN.length; y++){
                        tablePag.table.row.add(recordsN[y]).draw(false); 
                    }   
                    tablePag['lastRecord']  = records[records.length - 1]['processInstanceId'];
                }
                //tablePag.table.row.add([1,2,3,4,5,6,7,8,9]).draw(false); 
            }
            //alert( 'Table redrawn' );
        } );
        tablePag['table'].on('click', 'tbody tr', function (e) {
            lenItnsSelected = tablePag.table.rows('.selected').data().length
            ckContains = e.currentTarget.classList.contains("selected");
            console.log(lenItnsSelected)
            if(lenItnsSelected < 10 || ckContains == true){
                if(ckContains == true){
                    e.currentTarget.classList.toggle('selected');
                    currentTarget = e.currentTarget
                    slcArr = tablePag['selecteds']
                    for(y = 0; y < slcArr.length; y++){
                        if(slcArr[y]._DT_RowIndex == currentTarget._DT_RowIndex){
                            arrInitnew = slcArr.slice(y + 1,  slcArr.length);
                            arrFinalnew = slcArr.slice(0,  y);
                            tablePag['selecteds'] = arrInitnew.concat(arrFinalnew);
                            console.log(tablePag['selecteds'])
                        }
                    }
                }else{
                    e.currentTarget.classList.toggle('selected');
                    tablePag['selecteds'].push(e.currentTarget);
                }
            }
            lenItnsSelected = tablePag.table.rows('.selected').data().length
            console.log(lenItnsSelected)
            if(lenItnsSelected == 0){
                document.getElementById('btnPainel').disabled = true;
            }else{ document.getElementById('btnPainel').disabled = false; }
            console.log(e)
        });
        /*$(tableIn+' tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                tablePag['table'].$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });*/
    });
}
