import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { UserTableAxios } from "../../datatablesource";


const Datatable = () => {
    return (
        <div className="datatable">
            <span className="dabiWebText">DABI WEB</span>
            <UserTableAxios />
        </div>
    )
}

export default Datatable
