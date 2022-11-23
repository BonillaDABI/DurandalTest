import axios from "axios";
import React, { useState, useEffect } from "react";
//import MaterialReactTable from "material-react-table";

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalUDelete from "./Components/Modal/Delete/ModalUDelete";
import ModalCDelete from "./Components/Modal/Delete/ModalCDelete";
import ModalCCDelete from "./Components/Modal/Delete/ModalCCDelete";
import ModalTDelete from "./Components/Modal/Delete/ModalTDelete";

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

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: () => {
                return (
                    <div className="cellAction">
                        <ModalCCDelete
                            show={modalCCDeleteShow}
                            onHide={() => setModalCCDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => setModalCCDeleteShow(true)}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/></button>
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

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: () => {
                return (
                    <div className="cellAction">
                        <ModalTDelete
                            show={modalTDeleteShow}
                            onHide={() => setModalTDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => setModalTDeleteShow(true)}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/></button>
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

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: () => {
                return (
                    <div className="cellAction">
                        <ModalCDelete
                            show={modalCDeleteShow}
                            onHide={() => setModalCDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => setModalCDeleteShow(true)}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/></button>
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
            field: 'name', 
            headerName: 'Nombre de contacto', 
            width: 200 
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

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: () => {                
                return (
                
                    <div className="cellAction">
                        <ModalUDelete
                            show={modalUDeleteShow}
                            onHide={() => setModalUDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon"/>
                        <button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} onClick={() => setModalUDeleteShow(true)}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon"/></button>
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