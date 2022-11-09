import axios from "axios";
import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const ClientsTableAxios = () => {
    // Config de hooks
    const [clientData, setClientData] = useState ( [] )

    const endpoint = 'http://localhost:3001/clients'

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
    const clientColumns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 100
        },
        { 
            field: 'user_id', 
            headerName: 'Usuario', 
            width: 130 
        },
        { 
            field: 'business_name', 
            headerName: 'Cliente', 
            width: 180 
        },
        { 
            field: 'rfc', 
            headerName: 'RFC', 
            width: 180 
        },
        { 
            field: 'tax_id', 
            headerName: 'Tax ID', 
            width: 180 
        },
        { 
            field: 'parent_id', 
            headerName: 'Parent ID', 
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
                rows={clientData}
                columns={clientColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
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
            //console.log(userData)
            setUserData(userData)
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
                rows={userData}
                columns={userColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
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
                rows={permissionData}
                columns={permissionColumns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
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
                rows={rolesData}
                columns={rolesColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
        />
    )
}