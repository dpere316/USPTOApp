import React, { Component } from 'react';

class ViewUser extends Component {

  
  displayUsers = () => {
    return (
      <tr>
        <td>
          
        </td>
      </tr>

    )
  }

  render() {
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
              <th scope="col" className="sort" data-sort="email">Email</th>
              <th scope="col" className="sort" data-sort="name">Name</th>
              <th scope="col" className="sort" data-sort="status">Role</th>
              <th scope="col" className="sort" data-sort="completion">Remove</th>
            </tr>
          </thead>
          <tbody className="list">
          {this.displayUsers()}
          </tbody>
        </table>
      </div>
      
    </div>
  </div>
</div>

</div>

    );
  }
}

export default ViewUser;