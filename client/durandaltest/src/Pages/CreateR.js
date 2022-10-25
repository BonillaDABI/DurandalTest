import NavBar from "../Components/Navbar";

const CreateR = () => {
    const createRole = () => {

    }

    return (
        <div className="cu-container">
          <NavBar />
          <div className="cu-content-container">
            <form className="cu-form">
              <h1 className="title">DABI Durandal | Create - Roles</h1>
              <div className="input-container">
                
              </div>
              <div className="cu-button-container">
                <button className="cu-button" type="submit" onClick={() => createRole()}>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}
export default CreateR;