import NavBar from "../Components/Navbar";

const UpdateR = () => {
    const updateRole = () => {
        
    }

    return (
        <div className="cu-container">
          <NavBar />
          <div className="cu-content-container">
            <form className="cu-form">
              <h1 className="title">DABI Durandal | Update - Roles</h1>
              <div className="input-container">
                
              </div>
              <div className="cu-button-container">
                <button className="cu-button" type="submit" onClick={() => updateRole()}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}
export default UpdateR;