import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { ClientsTableAxios } from "../../datatablesource";


const Datatable = () => {
    return (
        <div className="datatable">
            <span className="dabiWebText">DABI WEB</span>
            <ClientsTableAxios />
        </div>
    )
}

export default Datatable
