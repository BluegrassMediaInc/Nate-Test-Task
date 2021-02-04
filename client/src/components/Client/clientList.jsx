import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { axiosApi } from "../../apis/axiosApiCall";
import { Link } from "react-router-dom";

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      offset: 0,
      isMore: false,
      items: [],
    };
  }

  componentDidMount() {
    this.getClient();
  }

  async getClient() {
    const { limit, offset } = this.state;
    const clientUrl = `/client?limit=${limit}&offset=${offset}`;
    const res = await axiosApi(clientUrl, "GET").catch((error) => {
      console.log(`ERROR : clientApi : axiosApi`);
      console.dir(error);
    });
    console.log(res.data);
    const { isMore, items } = res.data;
    if (items) {
      this.setState({ items, isMore });
    }
  }

  async deleteClient(id) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do want to delete?")) {
      const clientUrl = `/client/${id}`;
      const res = await axiosApi(clientUrl, "DELETE").catch((error) => {
        console.log(`ERROR : clientApi : axiosApi`);
        console.dir(error);
      });
      console.log(res);
      if (!res.error) {
        setTimeout(() => {
          this.getClient();
        }, 100);
      }
    }
  }

  previous() {
    const { limit, offset } = this.state;
    this.setState(
      {
        offset: offset - limit,
      },
      () => {
        this.getClient();
      }
    );
  }

  next() {
    const { limit, offset } = this.state;
    this.setState(
      {
        offset: offset + limit,
      },
      () => {
        this.getClient();
      }
    );
  }

  render() {
    const { items, isMore, limit, offset } = this.state;
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col" className="text-center">
                Budget
              </th>
              <th scope="col" className="text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td className="text-center">({item.line_items.length})</td>
                  <td className="text-right">
                    <Link className="btn btn-primary" to={"/edit/" + item.id}>
                      {"Edit"}
                    </Link>{" "}
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.deleteClient(item.id)}
                    >
                      {"Delete"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-center">
          {offset >= limit && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.previous()}
            >
              {"Previous"}
            </button>
          )}{" "}
          {isMore && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.next()}
            >
              {"Next"}
            </button>
          )}
        </div>
      </>
    );
  }
}

export default ClientList;
