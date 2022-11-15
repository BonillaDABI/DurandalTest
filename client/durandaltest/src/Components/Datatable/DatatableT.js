import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { AgentsTableAxios } from "../../datatablesource";


const Datatable = () => {
    return (
        <div className="datatable">
            <span className="dabiWebText">DABI WEB</span>
            <AgentsTableAxios />
        </div>
    )
}

export default Datatable
