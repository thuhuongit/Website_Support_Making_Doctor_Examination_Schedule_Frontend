import React from 'react';
import './UserRedux.css'; // Import CSS file for stylingUU

function UserRedux() {
  return (
    <div className="container">
        <h1>Learn React-Redux </h1>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputFirstName4">FirstName</label>
            <input type="firstName" className="form-control" id="inputFirstName4" placeholder="FirstName" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputLastName4">LastName</label>
            <input type="lastName" className="form-control" id="inputLastName4" placeholder="LastName" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Số điện thoại</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Địa chỉ</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Giới tính</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">Chức danh</label>
            <select id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">Vai trò</label>
            <select id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">Ảnh đại diện</label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    </div>
  );
}

export default UserRedux;
