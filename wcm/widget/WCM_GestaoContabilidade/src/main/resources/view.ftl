<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class"
     data-params="MyWidget.instance()">
    <script src="/webdesk/vcXMLRPC.js"></script>
    <!--
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.10.20/b-1.6.1/b-html5-1.6.1/datatables.min.css" />
    <script type="text/javascript" src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/2.0.2/css/dataTables.dataTables.css" />
    <script type="text/javascript" src="https://cdn.datatables.net/2.0.2/js/dataTables.js"></script>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        /* width */
        ::-webkit-scrollbar {
          width: 3px;
        
        }
        
        /* Track */
        ::-webkit-scrollbar-track {
          background: #f1f1f1; 
            margin: 20px;
        
        }
         
        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #888; 
         border-radius: 10px;
        }
        
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
        .a:hover{ background-color: #e9ecef; }
    </style>
    <!-- efetua a tradução do texto do objeto i18n -->	
    

        <div class="container text-center" style="display: none">
            <div class="row align-items-start border border-primary rounded-1">
                <div class="col bg-primary text-white border border-5 border-primary fs-5">
                   Configuração de Fila
                </div>
                <form class="row g-3">
                    <div class="col-md-4">
                        <label for="slc_user" class="form-label">Funcionário:</label>
                        <select id="slc_user" class="form-select">
                            <option value="Choose" selected>Choose...</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="order" class="form-label">Ordem</label>
                        <select id="order" class="form-select">
                            <option value="Choose" selected>Choose...</option>
                        </select>
                    </div>
                </form>
                <div class="col-md-3 p-4">
                    <button class="btn btn-primary" id="addRow">Add row</button>
                    <button class="btn btn-primary" id="delRow">Del row</button>
                </div>
                
                <!--<table class="order-table table" id="tbUser" style="width:100%"></table>-->
            
            </div>
        </div>

        <div class="text-center">
            <div class="row align-items-start border border-primary rounded-1">
                <div class="col bg-primary text-white border-5 p-2 border-primary">
                    <h3>Transferência de Responsabilidade</h3>
                </div>
                <div class="bd-example m-0 border-0 p-2">
                    <div class="alert alert-info p-1" role="alert">
                        <h5>Este painel somente apresenta solicitações com 'Status' igual a 'Aberto'.</h5>
                    </div>
                </div>
                <form class="row g-3">
                    <div class="col-7">
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text">A partir da solicitação: </span>
                            <input type="number" class="form-control" placeholder="Número da solicitação" aria-label="initSolict" min="0" max="900000" maxlength="6" id="initSolict">
                            <span class="input-group-text">Até: </span>
                            <input type="number" class="form-control" placeholder="Número da solicitação" aria-label="finalSolict" min="0" max="900000" maxlength="6" id="finalSolict">
                       </div>    
                    </div>
                    <div class="col-7">
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text">A partir desta data: </span>
                            <input type="date" class="form-control" aria-label="initSolict" maxlength="6" id="initDate" data-gtm-form-interact-field-id="1">
                            <span class="input-group-text">Até: </span>
                            <input type="date" class="form-control" aria-label="finalSolict" maxlength="4" id="finalDate" data-gtm-form-interact-field-id="0">
                       </div>    
                    </div>
                </form>
                <div class="col-md-3 p-4">
                    <button class="btn btn-primary" type="submit" id="getData">Buscar</button>
                </div>
                <div class="col-md-3 p-4">
                    <button class="btn btn-success" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" id="btnPainel" disabled>Abrir Definição de Transferência</button>
                </div>
                
                <table class="order-table table" id="tbPag" style="width:100%"></table>
            
            </div>
        </div>

        <div class="modal modal-lg fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Painel de Transferência</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closePainel"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <div class="col-md-4" id="slc_userResp_div">
                            <label for="newUserResp" class="form-label">Usuário que assumirá a responsabilidade:</label>
                            <input type="text" class="form-control" aria-label="newUserResp" id="newUserResp" style="display: none">
                            <div class="col-md-4" style="padding: 0px 100px 700px 0px; top: -100px; left: 270px; position: absolute; background-color: white; overflow-y: scroll; scroll-snap-type: y mandatory; border: 1px solid black; border-radius: 5px; display: none;" id="slcNew">
                               <!-- <div style="width: 97%;position: absolute; ">
                                    <div style="width: 100%;float: left;font-size: 14px;opacity: 85%;border: transparent;border-width: 1px;border-radius: 4px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px" class="a">Nascimento</div>
                                    <div style="width: 100%;float: left;font-size: 14px;opacity: 85%;border: transparent;border-width: 1px;border-radius: 4px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px" class="a">Adina Oliveira</div>
                                    <div style="width: 100%;float: left;font-size: 14px;opacity: 85%;border: transparent;border-width: 1px;border-radius: 4px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px" class="a">Alziney Castro Moreira</div>
                                    <div style="width: 100%;float: left;font-size: 14px;opacity: 85%;border: transparent;border-width: 1px;border-radius: 4px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px" class="a">ELDER SOUZA DOS SANTOS</div>
                                    <div style="width: 100%;float: left;font-size: 14px;opacity: 85%;border: transparent;border-width: 1px;border-radius: 4px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px" class="a">Eliana Sarmento da Costa</div>
                                    <div style="width: 100%;float: left;font-size: 14px;opacity: 85%;border: transparent;border-width: 1px;border-radius: 4px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px" class="a">Eliana Sarmento da Costa</div>
                                    <div style="width: 100%;float: left;font-size: 14px;opacity: 85%;border: transparent;border-width: 1px;border-radius: 4px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px" class="a">Eliana Sarmento da Costa</div>
                                    <div style="width: 100%;float: left;font-size: 14px;opacity: 85%;border: transparent;border-width: 1px;border-radius: 4px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px" class="a">Eliana Sarmento da Costa</div>
                                </div>-->
                            </div>

                        </div>
                    </div>
                    <table class="table" id="tbSelecteds">
                        <thead>
                          <tr>
                            <th scope="col">N°Solicitação</th>
                            <th scope="col">Responsável Atual</th>
                            <th scope="col">Etapa Atual</th>
                            <th scope="col">Status</th>
                            <th scope="col">#</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                        </tbody>
                      </table>
                      <div class="row">
                            <div class="col-md-4" style="color: green;"><b>Transferidas com sucesso</b></div><div class="col-md-2" id="trsSucess"><b></b></div>
                      </div>
                      <div class="row">
                        <div class="col-md-4" style="color: red;"><b>Falhas</b></div><div class="col-md-2" id="trsFail"><b></b></div>
                  </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal" id="cancelTransfer">fechar</button>
                    <button class="btn btn-primary" id="initTransfer">
                        Processar Transferencias
                    </button>
                </div>
              </div>
            </div>
          </div>
    </div>
    </div>    

</div>