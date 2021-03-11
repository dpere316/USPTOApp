import React from "react";
import axios from "axios";

const ViewUser = () => {

  const onSubmit = (data) => {
    // This is using axios to make a post request to our backend and send {name,email,password}
    // and store it in mongoDB

    axios({
      url: "/users/getuser", // route in backend
      method: "GET",
      data: {
        data
      },
    })
      .then((response) => {
        console.log(data)
      })
      .catch((error) => {
        console.log("Error: ", error.data);
      });
  };

  const displayUsers = () => {
    return (
      <tr>
        <td></td>
      </tr>
    );
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          <div className="card">
            {/* Card header */}
            <div className="card-header border-0">
              <h3 className="mb-0">Users</h3>
            </div>
            {/* Light table */}
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="sort" data-sort="email">
                      Email
                    </th>
                    <th scope="col" className="sort" data-sort="name">
                      Name
                    </th>
                    <th scope="col" className="sort" data-sort="status">
                      Role
                    </th>
                    <th scope="col" className="sort" data-sort="completion">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="list">{onSubmit()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
