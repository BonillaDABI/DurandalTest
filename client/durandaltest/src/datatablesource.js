import axios from "axios";
import React, { useState, useEffect } from "react";
//import MaterialReactTable from "material-react-table";

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { faClockRotateLeft, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalUDelete from "./Components/Modal/Delete/ModalUDelete";
import ModalCDelete from "./Components/Modal/Delete/ModalCDelete";
import ModalCCDelete from "./Components/Modal/Delete/ModalCCDelete";
import ModalTDelete from "./Components/Modal/Delete/ModalTDelete";
import ModalSDelete from "./Components/Modal/Delete/ModalSDelete";

import ModalADelete from "./Components/Modal/Delete/ModalADelete";
import ModalVDelete from "./Components/Modal/Delete/ModalVDelete";
import ModalEDelete from "./Components/Modal/Delete/ModalEDelete";
import ModalIDelete from "./Components/Modal/Delete/ModalIDelete";
import ModalActDelete from "./Components/Modal/Delete/ModalActDelete";

import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

// #region Activities Logs

// #endregion

// #region Asset Logs

export const AssetLogsTableAxios = () => {
    const [assetLogData, setAssetLogData] = useState([])

    var logAssetId = localStorage.getItem("assetIdForLog")
    console.log(logAssetId)

    const endpoint = `http://localhost:3001/listAssetLogs/${logAssetId}`;

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            console.log(response.data);
            const assetLogData = response.data;
            setAssetLogData(assetLogData);
        })
    }

    useEffect(() => {
        getData()
    }, [])

    // Columnas
    const assetLogsColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70
        },
        {
            field: 'asset_mov_name',
            headerName: 'Tipo de Movimiento',
            width: 250
        },
        {
            field: 'is_active',
            headerName: 'Estatus',
            width: 110,
            renderCell: (params) => {
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
            field: 'updated_at',
            headerName: 'Fecha de Actualización',
            width: 160
        }
    ];

    const [selected, setSelected] = useState( [ ] )
    const [selectionModel, setSelectionModel] = useState( [ ] );
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div
                    style={{
                        height: "650%",
                        width: "100%",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <DataGrid
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'id', sort: 'desc' }],
                            },
                        }}
                        rows={assetLogData}
                        columns={assetLogsColumns}
                        components={{ Toolbar: GridToolbar }}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selected = assetLogData.filter((row) =>
                                selectedIDs.has(row.id)
                            );
                            setSelected(selected);
                            if (ids.length > 1) {
                                const selectionSet = new Set(selectionModel);
                                const result = ids.filter((s) => !selectionSet.has(s));
                    
                                setSelectionModel(result);
                              } else {
                                setSelectionModel(ids);
                            }
                        }}

                        selectionModel={selectionModel}
                        pageSize={5}
                        rowsPerPageOptions={[5]}

                    //getRowId={({id}) => id}

                    />
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className="logs-info-section">
                    {selected.map((i) => 
                        <Typography key={i} className="logs-info">
                            <div className="divider"></div>

                            <strong>Asset:</strong><br />
                            
                            <span>Nombre:</span>&nbsp;{selected[0].asset_name}<br />
                            <span>Sitio:</span>&nbsp;{selected[0].name}<br />
                            <span>Descripción:</span>&nbsp;{selected[0].description}<br />
                            
                            
                            <div className="divider"></div>

                            <strong>Información del log:</strong><br />
                            <span>Tipo de movimiento:</span>&nbsp;{selected[0].asset_mov_name}<br />
                            <span>Fecha de creación:</span>&nbsp;{selected[0].created_at}<br />
                            <span>Razón:</span>&nbsp;{selected[0].updated_reason}<br />
                            <span>Fecha de actualización:</span>&nbsp;{selected[0].updated_at}<br />

                            <div className="divider"></div>
                        </Typography>
                    )}
                </div>    
            </Grid>
        </Grid>
    );
}
// #endregion

// #region Activities Logs

// #endregion

// #region Visits Logs

export const VisitLogsTableAxios = () => {
    const [visitLogData, setVisitLogData] = useState([])

    var logVisitId = localStorage.getItem("visitIdForLog")
    console.log(logVisitId)

    const endpoint = `http://localhost:3001/listVisitLogs/${logVisitId}`;

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            console.log(response.data);
            const visitLogData = response.data;
            setVisitLogData(visitLogData);
        })
    }

    useEffect(() => {
        getData()
    }, [])

    // Columnas
    const visitLogsColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70
        },
        {
            field: 'visit_mov_name',
            headerName: 'Tipo de Movimiento',
            width: 250
        },
        {
            field: 'is_active',
            headerName: 'Estatus',
            width: 110,
            renderCell: (params) => {
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
            field: 'updated_at',
            headerName: 'Fecha de Actualización',
            width: 160
        }
    ];

    const [selected, setSelected] = useState( [ ] )
    const [selectionModel, setSelectionModel] = useState( [ ] );
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div
                    style={{
                        height: "650%",
                        width: "100%",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <DataGrid
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'id', sort: 'desc' }],
                            },
                        }}
                        rows={visitLogData}
                        columns={visitLogsColumns}
                        components={{ Toolbar: GridToolbar }}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selected = visitLogData.filter((row) =>
                                selectedIDs.has(row.id)
                            );
                            setSelected(selected);
                            if (ids.length > 1) {
                                const selectionSet = new Set(selectionModel);
                                const result = ids.filter((s) => !selectionSet.has(s));
                    
                                setSelectionModel(result);
                              } else {
                                setSelectionModel(ids);
                            }
                        }}

                        selectionModel={selectionModel}
                        pageSize={5}
                        rowsPerPageOptions={[5]}

                    //getRowId={({id}) => id}

                    />
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className="logs-info-section">
                    {selected.map((i) => 
                        <Typography key={i} className="logs-info">
                            <div className="divider"></div>

                            <strong>Visita:</strong><br />
                            
                            <span>Nombre:</span>&nbsp;{selected[0].visit_name}<br />
                            <span>Sitio de la visita:</span>&nbsp;{selected[0].site_name}<br />
                            <span>Descripción:</span>&nbsp;{selected[0].description}<br />
                            <span>Técnico:</span>&nbsp;{selected[0].name}<br />
                            
                            <div className="divider"></div>

                            <strong>Información del log:</strong><br />
                            <span>Tipo de movimiento:</span>&nbsp;{selected[0].visit_mov_name}<br />
                            <span>Razón:</span>&nbsp;{selected[0].updated_reason}<br />
                            <span>Fecha de actualización:</span>&nbsp;{selected[0].updated_at}<br />

                            <div className="divider"></div>
                        </Typography>
                    )}
                </div>    
            </Grid>
        </Grid>
    );
}
// #endregion

// #region Activities

export const ActivitiesTableAxios = () => {
    // Config de hooks
    const [actData, setActData] = useState([])

    const endpoint = 'http://localhost:3001/listActs'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const actData = response.data
            //console.log(actData)
            setActData(actData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [modalActDeleteShow, setModalActDeleteShow] = useState(false);
    const navigate = useNavigate();

    function manageActDelete(actInfo) {
        console.log(actInfo);
        console.log(actInfo.id);
        var actId = actInfo.id;
        localStorage.setItem("activityIdToDelete", actId);

        // var techName = techInfo.name;
        // var techEmail = techInfo.email;
        // var techCreatedDate = techInfo.created_at;
        // var techPhone = techInfo.telefono;
        // var techName = techInfo.name + " " + techInfo.first_surname + " " + techInfo.second_surname;
        // //var techNacimiento = techInfo.fechaNacimiento;
        // localStorage.setItem("techNameToDelete", techName);
        // localStorage.setItem("techEmailToDelete", techEmail);
        // localStorage.setItem("techCreatedDateToDelete", techCreatedDate);
        // localStorage.setItem("techPhoneToDelete", techPhone);
        // //localStorage.setItem("techCreatedDateToDelete", techNacimiento);
    }

    function manageActLogs(actInfo) {
        var actId = actInfo.id;
        localStorage.setItem("activityIdForLog", actId);
        //navigate("/tecnicos/tecnicosLogs")
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <ModalActDelete
                            show={modalActDeleteShow}
                            onHide={() => setModalActDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { manageActLogs(params.row) }}><FontAwesomeIcon icon={faClockRotateLeft} className="detail-icons" id="update-icon" /></button>
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { setModalActDeleteShow(true); manageActDelete(params.row) }}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" /></button>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const actColumns = [
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
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={actData}
            columns={actColumns.concat(actionColumn)}
            pageSize={5}
            disableSelectionOnClick
            rowsPerPageOptions={[5]}
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Items
export const ItemsTableAxios = () => {
    // Config de hooks
    const [itemData, setItemData] = useState([])

    const endpoint = 'http://localhost:3001/listItems'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const itemData = response.data
            console.log(itemData)
            setItemData(itemData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [modalIDeleteShow, setModalIDeleteShow] = useState(false);
    const navigate = useNavigate();

    function manageItemDelete(itemInfo) {
        console.log(itemInfo);
        console.log(itemInfo.id);
        var itemId = itemInfo.id;
        localStorage.setItem("itemIdToDelete", itemId);

        var itemName = itemInfo.name;
        var itemCurrency = itemInfo.currency_name;
        var itemUnit = itemInfo.unit_name;
        var itemUpdatedDate = itemInfo.updated_at;

        localStorage.setItem("itemNameToDelete", itemName);
        localStorage.setItem("itemCurrencyToDelete", itemCurrency);
        localStorage.setItem("itemUnitToDelete", itemUnit);
        localStorage.setItem("itemUpdatedDateToDelete", itemUpdatedDate);
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <ModalIDelete
                            show={modalIDeleteShow}
                            onHide={() => setModalIDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { setModalIDeleteShow(true); manageItemDelete(params.row) }}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" /></button>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const itemColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100
        },
        {
            field: 'name',
            headerName: 'Nombre',
            width: 180
        },
        {
            field: 'currency_name',
            headerName: 'Divisa',
            width: 180
        },
        {
            field: 'unit_name',
            headerName: 'Unidad',
            width: 180
        },
        {
            field: 'is_active',
            headerName: 'Estatus',
            width: 150,
            renderCell: (params) => {
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
            field: 'updated_at',
            headerName: 'Fecha de actualización',
            width: 200
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={itemData}
            columns={itemColumns.concat(actionColumn)}
            pageSize={5}
            disableSelectionOnClick
            rowsPerPageOptions={[5]}
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Equipments

export const EquipsTableAxios = () => {
    // Config de hooks
    const [equipData, setEquipData] = useState([])

    const endpoint = 'http://localhost:3001/listEquipments'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const equipData = response.data
            console.log(equipData)
            setEquipData(equipData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [modalEDeleteShow, setModalEDeleteShow] = useState(false);
    const navigate = useNavigate();

    function manageEquipDelete(equipInfo) {
        console.log(equipInfo);
        console.log(equipInfo.id);
        var equipId = equipInfo.id;
        localStorage.setItem("equipIdToDelete", equipId);

        var equipName = equipInfo.equip_name;
        console.log(equipName);
        var equipBrand = equipInfo.brand_name;
        console.log(equipBrand);
        var equipUpdatedDate = equipInfo.updated_at;
        console.log(equipUpdatedDate);

        localStorage.setItem("equipNameToDelete", equipName);
        localStorage.setItem("equipBrandToDelete", equipBrand);
        localStorage.setItem("equipUpdatedAtToDelete", equipUpdatedDate);

        // var techName = techInfo.name;
        // var techEmail = techInfo.email;
        // var techCreatedDate = techInfo.created_at;
        // var techPhone = techInfo.telefono;
        // var techName = techInfo.name + " " + techInfo.first_surname + " " + techInfo.second_surname;
        // //var techNacimiento = techInfo.fechaNacimiento;
        // localStorage.setItem("techNameToDelete", techName);
        // localStorage.setItem("techEmailToDelete", techEmail);
        // localStorage.setItem("techCreatedDateToDelete", techCreatedDate);
        // localStorage.setItem("techPhoneToDelete", techPhone);
        // //localStorage.setItem("techCreatedDateToDelete", techNacimiento);
    }

    function manageEquipLogs(equipInfo) {
        var equipId = equipInfo.id;
        localStorage.setItem("visitIdForLog", equipId);
        //navigate("/tecnicos/tecnicosLogs")
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <ModalEDelete
                            show={modalEDeleteShow}
                            onHide={() => setModalEDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { manageEquipLogs(params.row) }}><FontAwesomeIcon icon={faClockRotateLeft} className="detail-icons" id="update-icon" /></button>
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { setModalEDeleteShow(true); manageEquipDelete(params.row) }}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" /></button>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const equipColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100
        },
        {
            field: 'equip_name',
            headerName: 'Nombre',
            width: 180
        },
        {
            field: 'brand_name',
            headerName: 'Marca',
            width: 180
        },
        {
            field: 'is_active',
            headerName: 'Estatus',
            width: 150,
            renderCell: (params) => {
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
            field: 'updated_at',
            headerName: 'Fecha de actualización',
            width: 200
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={equipData}
            columns={equipColumns.concat(actionColumn)}
            pageSize={5}
            disableSelectionOnClick
            rowsPerPageOptions={[5]}
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Visits

export const VisitsTableAxios = () => {
    // Config de hooks
    const [visitData, setVisitData] = useState([])

    const endpoint = 'http://localhost:3001/listVisits'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const visitData = response.data
            console.log(visitData)
            setVisitData(visitData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [modalVDeleteShow, setModalVDeleteShow] = useState(false);
    const navigate = useNavigate();

    function manageVisitDelete(visitInfo) {
        //console.log(visitInfo);
        console.log(visitInfo.id);
        var visitId = visitInfo.id;
        localStorage.setItem("visitIdToDelete", visitId);

        var visitName = visitInfo.visit_name;
        var visitSiteName = visitInfo.site_name;
        var visitTypeName = visitInfo.vt_name;
        var visitTech = visitInfo.name;
        var visitUpdatedDate = visitInfo.updated_at;

        localStorage.setItem("visitNameToDelete", visitName);
        localStorage.setItem("visitSiteNameToDelete", visitSiteName);
        localStorage.setItem("visitTypeNameToDelete", visitTypeName);
        localStorage.setItem("visitTechToDelete", visitTech);
        localStorage.setItem("visitUpdatedDateToDelete", visitUpdatedDate);
    }

    function manageVisitLogs(visitInfo) {
        var visitId = visitInfo.id;
        localStorage.setItem("visitIdForLog", visitId);
        navigate("/visitLogs")
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <ModalVDelete
                            show={modalVDeleteShow}
                            onHide={() => setModalVDeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { manageVisitLogs(params.row) }}><FontAwesomeIcon icon={faClockRotateLeft} className="detail-icons" id="update-icon" /></button>
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { setModalVDeleteShow(true); manageVisitDelete(params.row) }}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" /></button>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const visitColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100
        },
        {
            field: 'visit_name',
            headerName: 'Nombre de la visita',
            width: 160
        },
        {
            field: 'site_name',
            headerName: 'Sitio',
            width: 160
        },
        {
            field: 'vt_name',
            headerName: 'Tipo de visita',
            width: 180
        },
        {
            field: 'name',
            headerName: 'Técnico',
            width: 100
        },
        {
            field: 'is_active',
            headerName: 'Estatus',
            width: 150,
            renderCell: (params) => {
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
            field: 'updated_at',
            headerName: 'Fecha de actualización',
            width: 200
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={visitData}
            columns={visitColumns.concat(actionColumn)}
            pageSize={5}
            disableSelectionOnClick
            rowsPerPageOptions={[5]}
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Assets

export const AssetsTableAxios = () => {
    // Config de hooks
    const [assetData, setAssetData] = useState([])

    const endpoint = 'http://localhost:3001/listAssets'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const assetData = response.data
            console.log(assetData)
            setAssetData(assetData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [modalADeleteShow, setModalADeleteShow] = useState(false);
    const navigate = useNavigate();

    function manageAssetDelete(assetInfo) {
        console.log(assetInfo);
        console.log(assetInfo.id);
        var assetId = assetInfo.id;
        localStorage.setItem("assetIdToDelete", assetId);

        var assetName = assetInfo.asset_name;
        var assetEquipName = assetInfo.equip_name;
        var assetClientSite = assetInfo.site_name;
        var assetUpdatedDate = assetInfo.updated_at;

        localStorage.setItem("assetNameToDelete", assetName);
        localStorage.setItem("assetEquipNameToDelete", assetEquipName);
        localStorage.setItem("assetClientSiteToDelete", assetClientSite);
        localStorage.setItem("assetUpdatedDateToDelete", assetUpdatedDate);
    }

    function manageAssetLogs(assetInfo) {
        var assetId = assetInfo.id;
        localStorage.setItem("assetIdForLog", assetId);
        navigate("/assetLogs")
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Detalle",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <ModalADelete
                            show={modalADeleteShow}
                            onHide={() => setModalADeleteShow(false)}

                        />
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { manageAssetLogs(params.row) }}><FontAwesomeIcon icon={faClockRotateLeft} className="detail-icons" id="update-icon" /></button>
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { setModalADeleteShow(true); manageAssetDelete(params.row) }}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" /></button>
                    </div>
                )
            }
        }
    ]

    // Columnas
    const assetColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100
        },
        {
            field: 'asset_name',
            headerName: 'Nombre',
            width: 130
        },
        {
            field: 'equip_name',
            headerName: 'Equipo',
            width: 130
        },
        {
            field: 'site_name',
            headerName: 'Sitio',
            width: 180
        },
        {
            field: 'is_active',
            headerName: 'Estatus',
            width: 150,
            renderCell: (params) => {
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
            field: 'updated_at',
            headerName: 'Fecha de actualización',
            width: 200
        }
    ];

    return (
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={assetData}
            columns={assetColumns.concat(actionColumn)}
            pageSize={5}
            disableSelectionOnClick
            rowsPerPageOptions={[5]}
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Site Logs

export const SiteLogsTableAxios = () => {
    const [siteLogData, setSiteLogData] = useState([])

    var logSiteId = localStorage.getItem("siteIdForLog")
    console.log(logSiteId)

    const endpoint = `http://localhost:3001/listSiteLogs/${logSiteId}`;

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            console.log(response.data);
            const siteLogData = response.data;
            setSiteLogData(siteLogData);
        })
    }

    useEffect(() => {
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
            width: 250
        },
        {
            field: 'is_active',
            headerName: 'Estatus',
            width: 110,
            renderCell: (params) => {
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
            field: 'updated_at',
            headerName: 'Fecha de Actualización',
            width: 160
        }
    ];

    const [selected, setSelected] = useState( [ ] )
    const [selectionModel, setSelectionModel] = useState( [ ] );
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div
                    style={{
                        height: "650%",
                        width: "100%",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <DataGrid
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'id', sort: 'desc' }],
                            },
                        }}
                        rows={siteLogData}
                        columns={siteLogsColumns}
                        components={{ Toolbar: GridToolbar }}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selected = siteLogData.filter((row) =>
                                selectedIDs.has(row.id)
                            );
                            setSelected(selected);
                            if (ids.length > 1) {
                                const selectionSet = new Set(selectionModel);
                                const result = ids.filter((s) => !selectionSet.has(s));
                    
                                setSelectionModel(result);
                              } else {
                                setSelectionModel(ids);
                            }
                        }}

                        selectionModel={selectionModel}
                        pageSize={5}
                        rowsPerPageOptions={[5]}

                    //getRowId={({id}) => id}

                    />
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className="logs-info-section">
                    {selected.map((i) => 
                        <Typography key={i} className="logs-info">
                            <div className="divider"></div>

                            <strong>Cliente:</strong>&nbsp;{selected[0].business_name}<br />
                            <span>RFC:</span>&nbsp;{selected[0].rfc}<br />

                            <div className="divider"></div>

                            <strong>Sitio:</strong><br />
                            
                            <span>Pais:</span>&nbsp;{selected[0].name}<br />
                            <span>Nombre de la calle:</span>&nbsp;{selected[0].address_street}
                            <span>Número de dirección:</span>&nbsp;{selected[0].address_number}<br />
                            <span>Código postal:</span>&nbsp;{selected[0].address_postal_code}<br />
                            
                            
                            <div className="divider"></div>

                            <strong>Información del log:</strong><br />
                            <span>Tipo de movimiento:</span>&nbsp;{selected[0].mov_name}<br />
                            <span>Fecha de creación:</span>&nbsp;{selected[0].created_at}<br />
                            <span>Razón:</span>&nbsp;{selected[0].updated_reason}<br />
                            <span>Fecha de actualización:</span>&nbsp;{selected[0].updated_at}<br />

                            <div className="divider"></div>
                        </Typography>
                    )}
                </div>    
            </Grid>
        </Grid>
    );
}
//#endregion

// #region Tech Logs

export const TechLogsTableAxios = () => {
    const [techLogData, setTechLogData] = useState([])

    var logTechId = localStorage.getItem("techIdForLog")
    console.log(logTechId)

    const endpoint = `http://localhost:3001/listTech/${logTechId}`;

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            console.log(response.data);
            const techLogData = response.data.techLogs;
            setTechLogData(techLogData);
        })
    }

    useEffect(() => {
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
            width: 250
        },
        {
            field: 'is_active',
            headerName: 'Estatus',
            width: 110,
            renderCell: (params) => {
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
            field: 'updated_at',
            headerName: 'Fecha de Actualización',
            width: 160
        }
    ];

    const [selected, setSelected] = useState([])
    const [selectionModel, setSelectionModel] = useState( [ ] );

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
                                sortModel: [{ field: 'id', sort: 'desc' }],
                            },
                        }}
                        
                        rows={techLogData}
                        columns={techLogsColumns}
                        components={{ Toolbar: GridToolbar }}
                        
                        /*onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selected = techLogData.filter((row) =>
                                selectedIDs.has(row.id)
                            );
                            setSelected(selected);
                        }}*/
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selected = techLogData.filter((row) =>
                                selectedIDs.has(row.id)
                            );
                            setSelected(selected);
                            if (ids.length > 1) {
                                const selectionSet = new Set(selectionModel);
                                const result = ids.filter((s) => !selectionSet.has(s));
                    
                                setSelectionModel(result);
                              } else {
                                setSelectionModel(ids);
                            }
                        }}

                        selectionModel={selectionModel}
                        pageSize={5}
                        rowsPerPageOptions={[5]}

                    //getRowId={({id}) => id}

                    />
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className="logs-info-section">
                    {selected.map((i) => 
                        <Typography key={i} className="logs-info">
                            <div className="divider"></div>

                            <strong>Técnico:</strong><br />
                            <span>Nombre:</span>&nbsp;{selected[0].name}&nbsp;{selected[0].first_surname}&nbsp;{selected[0].second_surname}<br />
                            <span>Fecha de nacimiento:</span>&nbsp;{selected[0].fechaNacimiento}<br />
                            <span>E-mail:</span>&nbsp;{selected[0].email}<br />
                            <span>Teléfono:</span>&nbsp;{selected[0].telefono}<br />
                            
                            <div className="divider"></div>

                            <strong>Información del log:</strong><br />
                            <span>Tipo de movimiento:</span>&nbsp;{selected[0].mov_name}<br />
                            <span>Fecha de creación:</span>&nbsp;{selected[0].created_at}<br />
                            <span>Razón:</span>&nbsp;{selected[0].updated_reason}<br />
                            <span>Fecha de actualización:</span>&nbsp;{selected[0].updated_at}<br />

                            <div className="divider"></div>
                        </Typography>
                    )}
                </div>    
            </Grid>
        </Grid>
    );
}
//#endregion

// #region Sites

export const SitesTableAxios = () => {
    // Config de hooks
    const [sitesData, setSitesData] = useState([])

    var clientId = localStorage.getItem("client_id")
    console.log(clientId)

    const endpoint = `http://localhost:3001/listClientSites/${clientId}`;

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const sitesData = response.data
            //console.log(sitesData)
            setSitesData(sitesData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [modalSDeleteShow, setModalSDeleteShow] = useState(false);
    const navigate = useNavigate();

    function manageSiteDelete(siteInfo) {
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

    function manageSiteLogs(siteInfo) {
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
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { manageSiteLogs(params.row) }}><FontAwesomeIcon icon={faClockRotateLeft} className="detail-icons" id="update-icon" /></button>
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { setModalSDeleteShow(true); manageSiteDelete(params.row) }}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" /></button>
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
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={sitesData}
            columns={sitesColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Conctats per client

export const ClientContactsTableAxios = () => {
    // Config de hooks
    const [clientContactData, setClientContactData] = useState([])

    var clientId = localStorage.getItem("client_id");
    //console.log(clientId);

    const endpoint = `http://localhost:3001/listClientsContacts/${clientId}`;

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            //console.log(response.data);
            const clientContactData = response.data.clientContacts;

            //console.log(clientFullData)
            setClientContactData(clientContactData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [modalCCDeleteShow, setModalCCDeleteShow] = useState(false);

    function manageContactDelete(contactInfo) {
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
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { setModalCCDeleteShow(true); manageContactDelete(params.row) }}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" /></button>
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
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={clientContactData}
            columns={clientContactColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Contacts General

export const ContactsTableAxios = () => {
    // Config de hooks
    const [contactData, setContactData] = useState([])

    const endpoint = 'http://localhost:3001/listContacts'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const contactData = response.data
            //console.log(contactData)
            setContactData(contactData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [modalCCDeleteShow, setModalCCDeleteShow] = useState(false);

    function manageContactDelete(contactInfo) {
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
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { setModalCCDeleteShow(true); manageContactDelete(params.row) }}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" /></button>
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
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={contactData}
            columns={contactColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Techs

export const AgentsTableAxios = () => {
    // Config de hooks
    const [agentData, setAgentData] = useState([])

    const endpoint = 'http://localhost:3001/listTechs'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const agentData = response.data
            //console.log(agentData)
            setAgentData(agentData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [modalTDeleteShow, setModalTDeleteShow] = useState(false);
    const navigate = useNavigate();

    function manageTechDelete(techInfo) {
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

    function manageTechLogs(techInfo) {
        var techId = techInfo.id;
        localStorage.setItem("techIdForLog", techId);
        navigate("/tecnicos/tecnicosLogs")
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
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { manageTechLogs(params.row) }}><FontAwesomeIcon icon={faClockRotateLeft} className="detail-icons" id="update-icon" /></button>
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { setModalTDeleteShow(true); manageTechDelete(params.row) }}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" /></button>
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
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={agentData}
            columns={agentColumns.concat(actionColumn)}
            pageSize={5}
            disableSelectionOnClick
            rowsPerPageOptions={[5]}
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Clients

export const ClientsTableAxios = () => {
    // Config de hooks
    const [clientData, setClientData] = useState([])

    const endpoint = 'http://localhost:3001/listClients'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const clientData = response.data
            console.log(clientData)
            setClientData(clientData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [modalCDeleteShow, setModalCDeleteShow] = useState(false);
    const navigate = useNavigate();

    function manageClientInfo(clientInfo) {
        navigate("/clients/clientInfo")
        var business_name = clientInfo.business_name;
        var client_id = clientInfo.id;
        var client_rfc = clientInfo.rfc;
        var client_tax_id = clientInfo.tax_id;
        localStorage.setItem("business_name", business_name);
        localStorage.setItem("client_id", client_id);
        localStorage.setItem("client_rfc", client_rfc);
        localStorage.setItem("client_tax_id", client_tax_id);
    }

    function manageClientDelete(clientInfo) {
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

                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { manageClientInfo(params.row) }}><FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" /></button>
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { setModalCDeleteShow(true); manageClientDelete(params.row) }}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" /></button>
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
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={clientData}
            columns={clientColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Users

export const UserTableAxios = () => {

    // Config de hooks
    const [userData, setUserData] = useState([])

    const endpoint = 'http://localhost:3001/listAll'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const userData = response.data
            console.log(userData)
            setUserData(userData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [modalUDeleteShow, setModalUDeleteShow] = useState(false);

    function manageUserDelete(userInfo) {
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
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <button style={{ background: "none", border: "none", padding: 0, marginTop: "5px" }} onClick={() => { setModalUDeleteShow(true); manageUserDelete(params.row) }}><FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" /></button>
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
                if (params.row.is_active === "Activo") {
                    return (
                        <div>
                            <span className="statusActive">{params.row.is_active}</span>
                        </div>
                    );
                } else {
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
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={userData}
            columns={userColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Permissions

export const PermissionsTableAxios = () => {
    // Config de hooks
    const [permissionData, setPermissionData] = useState([])

    const endpoint = 'http://localhost:3001/permissions'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const permissionData = response.data
            //console.log(permissionData)
            setPermissionData(permissionData)
        })
    }

    useEffect(() => {
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
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" />
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
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={permissionData}
            columns={permissionColumns.concat(actionColumn)}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

// #region Roles

export const RolesTableAxios = () => {
    // Config de hooks
    const [rolesData, setRolesData] = useState([])

    const endpoint = 'http://localhost:3001/roles'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const rolesData = response.data
            //console.log(rolesData)
            setRolesData(rolesData)
        })
    }

    useEffect(() => {
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
                        <FontAwesomeIcon icon={faPenToSquare} className="detail-icons" id="update-icon" />
                        <FontAwesomeIcon icon={faTrashCan} className="detail-icons" id="delete-icon" />
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
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            rows={rolesData}
            columns={rolesColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
        />
    )
}
// #endregion

/*

<button style={{background: "none", border: "none", padding: 0, marginTop: "5px"}} ><FontAwesomeIcon icon={faUserPlus} className="detail-add-icon" id="addcontact-icon"/></button>

*/