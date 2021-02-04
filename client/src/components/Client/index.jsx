import React, { Component, lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Loading = () => <div>Loading...</div>;
const Client = lazy(() => import("./client.jsx"));
const ClientList = lazy(() => import("./clientList.jsx"));

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { location } = this.props;
    const { pathname } = location;
    const isCreatePage = pathname === "/create";
    const isEditPage = pathname.startsWith("/edit");
    return (
      <>
        <div className="container">
          <div className="row pt-2">
            <h1 className="col-10">
              {isCreatePage
                ? "Create Client"
                : isEditPage
                ? "Edit Client"
                : "Client List"}
            </h1>
            <div className="col-2 text-right">
              {isCreatePage || isEditPage ? (
                <Link className="btn btn-success" to="/">
                  Back
                </Link>
              ) : (
                <Link className="btn btn-success" to="/create">
                  New
                </Link>
              )}
            </div>
          </div>
          <Suspense fallback={<Loading />}>
            {isCreatePage || isEditPage ? (
              <Client {...this.props} />
            ) : (
              <ClientList {...this.props} />
            )}
          </Suspense>
        </div>
      </>
    );
  }
}

export default Clients;
