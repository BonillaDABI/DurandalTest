import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { SiteLogsTableAxios } from "../../datatablesource";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Datatable = () => {
    return (
        <div className="datatable">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Site Logs</span>
            <SiteLogsTableAxios />
        </div>
    )
}

export default Datatable
