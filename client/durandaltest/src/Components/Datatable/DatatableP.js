import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { PermissionsTableAxios } from "../../datatablesource";


const Datatable = () => {
    return (
        <div className="datatable">
            <span className="dabiWebText">DABI WEB</span>
            <PermissionsTableAxios />
        </div>
    )
}

export default Datatable
