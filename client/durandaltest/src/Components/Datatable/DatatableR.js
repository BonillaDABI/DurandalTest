import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { RolesTableAxios } from "../../datatablesource";


const Datatable = () => {
    return (
        <div className="datatable">
            <span className="dabiWebText">DABI WEB</span>
            <RolesTableAxios />
        </div>
    )
}

export default Datatable
