import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
//import MaterialReactTable from "material-react-table";

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { faFileLines, faPenToSquare, faTrashCan, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalUDelete from "./Components/Modal/Delete/ModalUDelete";
import ModalCDelete from "./Components/Modal/Delete/ModalCDelete";
import ModalCCDelete from "./Components/Modal/Delete/ModalCCDelete";
import ModalTDelete from "./Components/Modal/Delete/ModalTDelete";
import ModalSDelete from "./Components/Modal/Delete/ModalSDelete";
import { useNavigate } from "react-router-dom";
import { param } from "express-validator";
import { Grid, Typography } from "@mui/material";
import TechDisplayLogComponent from "./Components/LogsDisplay/TechDisplayLogComponent";

// Site Logs

export const SiteLogsTableAxios = () => {
    const [siteLogData, setSiteLogData] = useState ( [] )

    var logSiteId = localStorage.getItem("siteIdForLog")
    console.log(logSiteId)

    const endpoint = `http://localhost:3001/listSiteLogs/${logSiteId}`;

    const getData = async() => {
        await axios.get(endpoint).then((response) => {
            console.log(response.data);
            const siteLogData = response.data;
            setSiteLogData(siteLogData);
        })
    }

    useEffect( () => {
        getData()
    }, [])

    // Columnas
    const siteLogsColumns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 70
        },
        { 
            field: 'mov_name', 
            headerName: 'Tipo de Movimiento', 
            width: 280 
        },
        { 
            field: 'is_active', 
            headerName: 'Estatus', 
            width: 110,
            renderCell: (params) => {
                if (params.row.is_active === "Activo"){
                    return (
                        <div>
                          <span className="statusActive">{params.row.is_active}</span>
                        </div>
                      );
                }else{
                    return (
                        <div>
                          <span className="statusInactive">{params.row.is_active}</span>
                        </div>
                      );
                }

              },
              valueGetter: (params) => params.row.is_active
        },
        { 
            field: 'created_at', 
            headerName: 'Fecha de alta', 
            width: 150
        }
    ];

    const [selected, setSelected] = useState ( [] )
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div
                    style={{
                        height: "700%",
                        width: "100%",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <DataGrid
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'id', sort: 'desc'}],
                        },
                    }}
                        checkboxSelection
                        rows={siteLogData}
                        columns={siteLogsColumns}
                        components={{Toolbar: GridToolbar}}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selected = siteLogData.filter((row) =>
                              selectedIDs.has(row.id)
                            );
                            console.log(selected);
                          }}
                    
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        
                        //getRowId={({id}) => id}
                        
                    />
                </div>
            </Grid>
            <Grid item xs={6}>
                <Typography>Log(s) seleccionado(s)</Typography>
                
            </Grid>
        </Grid>
    );
}

// Tech Logs

export const TechLogsTableAxios = () => {
    const [techLogData, setTechLogData] = useState ( [] )

    var logTechId = localStorage.getItem("techIdForLog")
    console.log(logTechId)

    const endpoint = `http://localhost:3001/listTech/${logTechId}`;

    const getData = async() => {
        await axios.get(endpoint).then((response) => {
            console.log(response.data);
            const techLogData = response.data.techLogs;
            setTechLogData(techLogData);
        })
    }

    useEffect( () => {
        getData()
    }, [])

    // Columnas
    const techLogsColumns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 70
        },
        { 
            field: 'mov_name', 
            headerName: 'Tipo de Movimiento', 
            width: 280 
        },
        { 
            field: 'is_active', 
            headerName: 'Estatus', 
            width: 110,
            renderCell: (params) => {
                if (params.row.is_active === "Activo"){
                    return (
                        <div>
                          <span className="statusActive">{params.row.is_active}</span>
                        </div>
                      );
                }else{
                    return (
                        <div>
                          <span className="statusInactive">{params.row.is_active}</span>
                        </div>
                      );
                }

              },
              valueGetter: (params) => params.row.is_active
        },
        { 
            field: 'created_at', 
            headerName: 'Fecha de alta', 
            width: 150
        }
    ];

    const [selected, setSelected] = useState ( [] )
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div
                    style={{
                        height: "700%",
                        width: "100%",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <DataGrid
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'id', sort: 'desc'}],
                        },
                    }}
                        checkboxSelection
                        rows={techLogData}
                        columns={techLogsColumns}
                        components={{Toolbar: GridToolbar}}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selected = techLogData.filter((row) =>
                              selectedIDs.has(row.id)
                            );
                            console.log(selected);
                          }}
                    
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        
                        //getRowId={({id}) => id}
                        
                    />
                </div>
            </Grid>
            <Grid item xs={6}>
                <Typography>Log(s) seleccionado(s)</Typography>
                
            </Grid>
        </Grid>
    );
}

// Sites

export const SitesTableAxios = () => {
    // Config de hooks
    const [sitesData, setSitesData] = useState ( [] )

    var clientId = localStorage.getItem("client_id")
    console.log(clientId)

    const endpoint = `http://localhost:3001/listClientSites/${clientId}`;

    const getData = async() => {
        await axios.get(endpoint).then((response) => {
            const sitesData = response.data
            //console.log(sitesData)
            setSitesData(sitesData)
        })
    }

    useEffect( () => {
        getData()
    }, [])

    const [modalSDeleteShow, setModalSDeleteShow] = useState(false);
    const navigate = useNavigate();

    function manageSiteDelete(siteInfo){
        //console.log(siteInfo);
        var siteId = siteInfo.id;
        localStorage.setItem("siteIdToDelete", siteId);

        var siteName = siteInfo.name;
        var siteAddressStreet = siteInfo.address_street;
        var siteAddressNumber = siteInfo.address_number;
        var siteAddressPostalCode = siteInfo.address_postal_code;
        var siteBusinessName = siteInfo.business_name;
        var siteCreatedDate = siteInfo.created_at;

        localStorage.setItem("siteNameToDelete", siteName);
        localStorage.setItem("siteAddressStreetToDelete", siteAddressStreet);
        localStorage.setItem("siteAddressNumToDelete", siteAddressNumber);
        localStorage.setItem("siteAddressPCToDelete", siteAddressPostalCode);
        localStorage.setItem("siteBusinessToDelete", siteBusinessName);
        localStorage.setItem("siteCreatedDateToDelete", siteCreatedDate);

    }

    function manageSiteLogs(siteInfo){
        var siteId = siteInfo.id;
        localStorage.setItem("siteIdForLog", siteId);
        navigate("/siteLogs")
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <ModalSDelete
                            show={modalSDeleteShow}
                            onHide={() => setModalSDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => {manageSiteLogs(params.row)}}><FontAwesomeIcon icon={faFileLines} className="detail-icons" id="update-icon"/></button>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => {setModalSDeleteShow(true); manageSiteDelete(params.row)}}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/></button>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const sitesColumns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 70
        },
        { 
            field: 'name', 
            headerName: 'Nombre de sitio', 
            width: 150 
        },
        { 
            field: 'address_street', 
            headerName: 'Nombre de la calle', 
            width: 150 
        },
        {
            field: 'address_number',
            headerName: 'Número de dirección',
            width: 150
        },
        { 
            field: 'address_postal_code', 
            headerName: 'Código postal', 
            width: 120 
        },
        { 
            field: 'is_active', 
            headerName: 'Estatus', 
            width: 110,
            renderCell: (params) => {
                if (params.row.is_active === "Activo"){
                    return (
                        <div>
                          <span className="statusActive">{params.row.is_active}</span>
                        </div>
                      );
                }else{
                    return (
                        <div>
                          <span className="statusInactive">{params.row.is_active}</span>
                        </div>
                      );
                }

              },
              valueGetter: (params) => params.row.is_active
        },
        { 
            field: 'created_at', 
            headerName: 'Fecha de alta', 
            width: 150
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc'}],
                },
            }}
                rows={sitesData}
                columns={sitesColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{Toolbar: GridToolbar}}
        />
    )
}

// CONTACTS PER CLIENT

export const ClientContactsTableAxios = () => {
    // Config de hooks
    const [clientContactData, setClientContactData] = useState ( [] )

    var clientId = localStorage.getItem("client_id");
    //console.log(clientId);

    const endpoint = `http://localhost:3001/listClientsContacts/${clientId}`;

    const getData = async() => {
        await axios.get(endpoint).then((response) => {
            //console.log(response.data);
            const clientContactData = response.data.clientContacts;
         
            //console.log(clientFullData)
            setClientContactData(clientContactData)
        })
    }

    useEffect( () => {
        getData()
    }, [])

    const [modalCCDeleteShow, setModalCCDeleteShow] = useState(false);

    function manageContactDelete(contactInfo){
        //console.log(contactInfo);
        //console.log(contactInfo.id);
        var contactId = contactInfo.id;
        localStorage.setItem("contactIdToDelete", contactId);

        //var contactName = contactInfo.name;
        var contactEmail = contactInfo.email;
        var contactBusiness = contactInfo.business_name;
        var contactCreatedDate = contactInfo.created_at;
        var contactName = contactInfo.name + " " + contactInfo.first_surname + " " + contactInfo.second_surname;
        localStorage.setItem("contactNameToDelete", contactName);
        localStorage.setItem("contactEmailToDelete", contactEmail);
        localStorage.setItem("contactCreatedDateToDelete", contactCreatedDate);
        localStorage.setItem("contactBusinessToDelete", contactBusiness);
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <ModalCCDelete
                            show={modalCCDeleteShow}
                            onHide={() => setModalCCDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => {setModalCCDeleteShow(true); manageContactDelete(params.row)}}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/></button>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const clientContactColumns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 100
        },
        {
            field: 'full_name',
            headerName: 'Nombre de contacto',
            width: 200,
            renderCell: (params) => {
                var full_name = params.row.name + " " + params.row.first_surname + " " + params.row.second_surname;
                return (
                    <div>
                      <span>{full_name}</span>
                    </div>
                  );
            }
        },
        { 
            field: 'email', 
            headerName: 'E-mail', 
            width: 200 
        },
        {
            field: 'type',
            headerName: 'Tipo',
            width: 180
        },
        { 
            field: 'is_active', 
            headerName: 'Estatus', 
            width: 150,
            renderCell: (params) => {
                if (params.row.is_active === "Activo"){
                    return (
                        <div>
                          <span className="statusActive">{params.row.is_active}</span>
                        </div>
                      );
                }else{
                    return (
                        <div>
                          <span className="statusInactive">{params.row.is_active}</span>
                        </div>
                      );
                }

              },
              valueGetter: (params) => params.row.is_active
        },
        { 
            field: 'created_at', 
            headerName: 'Fecha de alta', 
            width: 200
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc'}],
                },
            }}
                rows={clientContactData}
                columns={clientContactColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{Toolbar: GridToolbar}}
        />
    )
}

// CONTACTS GENERAL

export const ContactsTableAxios = () => {
    // Config de hooks
    const [contactData, setContactData] = useState ( [] )

    const endpoint = 'http://localhost:3001/listContacts'

    const getData = async() => {
        await axios.get(endpoint).then((response) => {
            const contactData = response.data
            //console.log(contactData)
            setContactData(contactData)
        })
    }

    useEffect( () => {
        getData()
    }, [])

    const [modalCCDeleteShow, setModalCCDeleteShow] = useState(false);

    function manageContactDelete(contactInfo){
        //console.log(contactInfo);
        //console.log(contactInfo.id);
        var contactId = contactInfo.id;
        localStorage.setItem("contactIdToDelete", contactId);

        var contactName = contactInfo.name;
        var contactEmail = contactInfo.email;
        var contactBusiness = contactInfo.business_name;
        var contactCreatedDate = contactInfo.created_at;
        localStorage.setItem("contactNameToDelete", contactName);
        localStorage.setItem("contactEmailToDelete", contactEmail);
        localStorage.setItem("contactCreatedDateToDelete", contactCreatedDate);
        localStorage.setItem("contactBusinessToDelete", contactBusiness);
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <ModalCCDelete
                            show={modalCCDeleteShow}
                            onHide={() => setModalCCDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => {setModalCCDeleteShow(true); manageContactDelete(params.row)}}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/></button>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const contactColumns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 100
        },
        { 
            field: 'name', 
            headerName: 'Nombre de contacto', 
            width: 200 
        },
        { 
            field: 'email', 
            headerName: 'E-mail', 
            width: 180 
        },
        { 
            field: 'business_name', 
            headerName: 'Cliente', 
            width: 180 
        },
        {
            field: 'type',
            headerName: 'Tipo',
            width: 180
        },
        { 
            field: 'is_active', 
            headerName: 'Estatus', 
            width: 150,
            renderCell: (params) => {
                if (params.row.is_active === "Activo"){
                    return (
                        <div>
                          <span className="statusActive">{params.row.is_active}</span>
                        </div>
                      );
                }else{
                    return (
                        <div>
                          <span className="statusInactive">{params.row.is_active}</span>
                        </div>
                      );
                }

              },
              valueGetter: (params) => params.row.is_active
        },
        { 
            field: 'created_at', 
            headerName: 'Fecha de alta', 
            width: 200
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc'}],
                },
            }}
                rows={contactData}
                columns={contactColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{Toolbar: GridToolbar}}
        />
    )
}

export const AgentsTableAxios = () => {
    // Config de hooks
    const [agentData, setAgentData] = useState ( [] )

    const endpoint = 'http://localhost:3001/listTechs'

    const getData = async() => {
        await axios.get(endpoint).then((response) => {
            const agentData = response.data
            //console.log(agentData)
            setAgentData(agentData)
        })
    }

    useEffect( () => {
        getData()
    }, [])

    const [modalTDeleteShow, setModalTDeleteShow] = useState(false);
    const navigate = useNavigate();

    function manageTechDelete(techInfo){
        console.log(techInfo);
        console.log(techInfo.id);
        var techId = techInfo.id;
        localStorage.setItem("techIdToDelete", techId);

        //var techName = techInfo.name;
        var techEmail = techInfo.email;
        var techCreatedDate = techInfo.created_at;
        var techPhone = techInfo.telefono;
        var techName = techInfo.name + " " + techInfo.first_surname + " " + techInfo.second_surname;
        //var techNacimiento = techInfo.fechaNacimiento;
        localStorage.setItem("techNameToDelete", techName);
        localStorage.setItem("techEmailToDelete", techEmail);
        localStorage.setItem("techCreatedDateToDelete", techCreatedDate);
        localStorage.setItem("techPhoneToDelete", techPhone);
        //localStorage.setItem("techCreatedDateToDelete", techNacimiento);
    }

    function manageTechLogs(techInfo){
        var techId = techInfo.id;
        localStorage.setItem("techIdForLog", techId);
        navigate("/tecnicosLogs")
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <ModalTDelete
                            show={modalTDeleteShow}
                            onHide={() => setModalTDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => {manageTechLogs(params.row)}}><FontAwesomeIcon icon={faFileLines} className="detail-icons" id="update-icon"/></button>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => {setModalTDeleteShow(true); manageTechDelete(params.row)}}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/></button>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const agentColumns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 100
        },
        {
            field: 'full_name',
            headerName: 'Nombre de contacto',
            width: 200,
            renderCell: (params) => {
                var full_name = params.row.name + " " + params.row.first_surname + " " + params.row.second_surname;
                return (
                    <div>
                      <span>{full_name}</span>
                    </div>
                  );
            }
        },
        { 
            field: 'email', 
            headerName: 'E-mail', 
            width: 180 
        },
        { 
            field: 'telefono', 
            headerName: 'Teléfono', 
            width: 130 
        },
        { 
            field: 'fechaNacimiento', 
            headerName: 'Fecha de nacimiento', 
            width: 200 
        },
        { 
            field: 'is_active', 
            headerName: 'Estatus', 
            width: 150,
            renderCell: (params) => {
                if (params.row.is_active === "Activo"){
                    return (
                        <div>
                          <span className="statusActive">{params.row.is_active}</span>
                        </div>
                      );
                }else{
                    return (
                        <div>
                          <span className="statusInactive">{params.row.is_active}</span>
                        </div>
                      );
                }

              },
              valueGetter: (params) => params.row.is_active
        },
        { 
            field: 'created_at', 
            headerName: 'Fecha de alta', 
            width: 200
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc'}],
                },
            }}
                rows={agentData}
                columns={agentColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{Toolbar: GridToolbar}}
        />
    )
}


export const ClientsTableAxios = () => {
    // Config de hooks
    const [clientData, setClientData] = useState ( [] )

    const endpoint = 'http://localhost:3001/listClients'

    const getData = async() => {
        await axios.get(endpoint).then((response) => {
            const clientData = response.data
            //console.log(clientData)
            setClientData(clientData)
        })
    }

    useEffect( () => {
        getData()
    }, [])

    const [modalCDeleteShow, setModalCDeleteShow] = useState(false);
    const navigate = useNavigate();

    function manageClientInfo(clientInfo){
        navigate("/clientInfo")
        var business_name = clientInfo.business_name;
        var client_id = clientInfo.id;
        var client_rfc = clientInfo.rfc;
        var client_tax_id = clientInfo.tax_id;
        localStorage.setItem("business_name", business_name);
        localStorage.setItem("client_id", client_id);
        localStorage.setItem("client_rfc", client_rfc);
        localStorage.setItem("client_tax_id", client_tax_id);
    }

    function manageClientDelete(clientInfo){
        //console.log(clientInfo);
        //console.log(clientInfo.id);
        var clientId = clientInfo.id;
        localStorage.setItem("clientIdToDelete", clientId);

        var clientBusiness = clientInfo.business_name;
        var clientCreatedDate = clientInfo.created_at;
        localStorage.setItem("clientBusinessToDelete", clientBusiness);
        localStorage.setItem("clientCreatedDateToDelete", clientCreatedDate);
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 140,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <ModalCDelete
                            show={modalCDeleteShow}
                            onHide={() => setModalCDeleteShow(false)}

                        />
                        
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => {manageClientInfo(params.row)}}><FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/></button>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => {setModalCDeleteShow(true); manageClientDelete(params.row)}}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/></button>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const clientColumns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 100
        },
        {
            field: 'full_name',
            headerName: 'Nombre de contacto',
            width: 200,
            renderCell: (params) => {
                var full_name = params.row.name + " " + params.row.first_surname + " " + params.row.second_surname;
                return (
                    <div>
                      <span>{full_name}</span>
                    </div>
                  );
            }
        },
        { 
            field: 'business_name', 
            headerName: 'Cliente', 
            width: 180 
        },
        { 
            field: 'is_active', 
            headerName: 'Estatus', 
            width: 150,
            renderCell: (params) => {
                if (params.row.is_active === "Activo"){
                    return (
                        <div>
                          <span className="statusActive">{params.row.is_active}</span>
                        </div>
                      );
                }else{
                    return (
                        <div>
                          <span className="statusInactive">{params.row.is_active}</span>
                        </div>
                      );
                }

              },
              valueGetter: (params) => params.row.is_active
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc'}],
                },
            }}
                rows={clientData}
                columns={clientColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{Toolbar: GridToolbar}}
        />
    )
}


export const UserTableAxios = () => {
    
    // Config de hooks
    const [userData, setUserData] = useState ( [] )

    const endpoint = 'http://localhost:3001/listAll'

    const getData = async() => {
        await axios.get(endpoint).then((response) => {
            const userData = response.data
            console.log(userData)
            setUserData(userData)
        })
    }

    useEffect( () => {
        getData()
    }, [])

    const [modalUDeleteShow, setModalUDeleteShow] = useState(false);

    function manageUserDelete(userInfo){
        console.log(userInfo);
        console.log(userInfo.id);
        var userId = userInfo.id;
        localStorage.setItem("userIdToDelete", userId);

        var userName = userInfo.name;
        var userEmail = userInfo.email;
        var userCreatedDate = userInfo.created_at;

        
        localStorage.setItem("userNameToDelete", userName);
        localStorage.setItem("userEmailToDelete", userEmail);
        localStorage.setItem("userCreatedDateToDelete", userCreatedDate);
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: (params) => {                
                return (
                
                    <div className="cellAction">
                        <ModalUDelete
                            show={modalUDeleteShow}
                            onHide={() => setModalUDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => {setModalUDeleteShow(true); manageUserDelete(params.row)}}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/></button>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const userColumns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 100
        },
        { 
            field: 'name', 
            headerName: 'Nombre', 
            width: 130 
        },
        { 
            field: 'email', 
            headerName: 'E-mail', 
            width: 180 
        },
        { 
            field: 'is_active', 
            headerName: 'Estatus', 
            width: 150,
            renderCell: (params) => {
                if (params.row.is_active === "Activo"){
                    return (
                        <div>
                          <span className="statusActive">{params.row.is_active}</span>
                        </div>
                      );
                }else{
                    return (
                        <div>
                          <span className="statusInactive">{params.row.is_active}</span>
                        </div>
                      );
                }

              },
              valueGetter: (params) => params.row.is_active
        },
        { 
            field: 'created_at', 
            headerName: 'Fecha de alta', 
            width: 200
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc'}],
                },
            }}
                rows={userData}
                columns={userColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{Toolbar: GridToolbar}}
        />
    )
}

export const PermissionsTableAxios = () => {
    // Config de hooks
    const [permissionData, setPermissionData] = useState ( [] )

    const endpoint = 'http://localhost:3001/permissions'

    const getData = async() => {
        await axios.get(endpoint).then((response) => {
            const permissionData = response.data
            //console.log(permissionData)
            setPermissionData(permissionData)
        })
    }

    useEffect( () => {
        getData()
    }, [])

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: () => {
                return (
                    <div className="cellAction">
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/>
                        <FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const permissionColumns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 100
        },
        { 
            field: 'per_name', 
            headerName: 'Permiso', 
            width: 150 
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc'}],
                },
            }}
                rows={permissionData}
                columns={permissionColumns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{Toolbar: GridToolbar}}
        />
    )
}

export const RolesTableAxios = () => {
    // Config de hooks
    const [rolesData, setRolesData] = useState ( [] )

    const endpoint = 'http://localhost:3001/roles'

    const getData = async() => {
        await axios.get(endpoint).then((response) => {
            const rolesData = response.data
            //console.log(rolesData)
            setRolesData(rolesData)
        })
    }

    useEffect( () => {
        getData()
    }, [])

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: () => {
                return (
                    <div className="cellAction">
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/>
                        <FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const rolesColumns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 100
        },
        { 
            field: 'role_name', 
            headerName: 'Rol', 
            width: 130 
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc'}],
                },
            }}
                rows={rolesData}
                columns={rolesColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{Toolbar: GridToolbar}}
        />
    )
}

/*

<button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} ><FontAwesomeIcon icon={faUserPlus} className="detail-add-icon" id="addcontact-icon"/></button>

*/