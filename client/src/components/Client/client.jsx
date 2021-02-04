import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { axiosApi } from "../../apis/axiosApiCall";

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      email: "",
      redirectToReferrer: "",
      budget: [
        {
          id: 0,
          description: "",
          descriptionIndex: "",
          cost: "",
          delete: false,
        },
      ],
      items: [
        {
          id: 1,
          name: "Direct Mail",
        },
        {
          id: 2,
          name: "Skip Tracing",
        },
        {
          id: 3,
          name: "Other",
        },
      ],
      nonItems: ["", "Direct Mail", "Skip Tracing"],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const id = Number(match.params.id);
    if (id) {
      this.getClient(id);
    }
  }

  async getClient(id) {
    const { items } = this.state;
    const clientUrl = `/client/${id}`;
    const res = await axiosApi(clientUrl, "GET").catch((error) => {
      console.log(`ERROR : clientApi : axiosApi`);
      console.dir(error);
    });
    console.log(res);
    if (!res.error) {
      const { name, email, line_items } = res.data;
      const budget = line_items.map((b, i) => {
        const ii = items.findIndex((a) => a.name === b.description);
        return {
          description: b.description,
          cost: b.cost,
          client_id: b.client_id,
          id: b.id,
          descriptionIndex: ii === -1 ? 2 : ii,
          delete: false,
        };
      });
      this.setState({
        id,
        name,
        email,
        budget,
      });
    }
  }

  addBudget() {
    const { budget: newB } = this.state;
    newB.push({
      id: 0,
      description: "",
      descriptionIndex: "",
      cost: null,
      delete: false,
    });
    this.setState({ budget: newB });
  }

  itemChange(e, i) {
    const { budget: newB, items } = this.state;
    console.log(e.target.value);
    const item = items[e.target.value];
    newB[i].description = item.name === "Other" ? "" : item.name;
    newB[i].descriptionIndex = e.target.value;
    this.setState({ budget: newB });
  }

  otherDescription(e, i) {
    const { budget: newB } = this.state;
    console.log(e.target.value);
    newB[i].description = e.target.value;
    this.setState({ budget: newB });
  }

  setCost(e, i) {
    const { budget: newB } = this.state;
    console.log(e.target.value);
    newB[i].cost = e.target.value;
    this.setState({ budget: newB });
  }

  removeBudget(i) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do want to delete?")) {
      const { budget: newB } = this.state;
      console.log(newB);
      if (newB[i].id > 0) {
        newB[i].delete = true;
      } else {
        newB.splice(i, 1);
      }
      this.setState({ budget: newB });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { name, email, budget, id } = this.state;
    const req = { name, email, budget };
    let res;
    if (id) {
      res = await axiosApi(`/client/${id}`, "PUT", req).catch((error) => {
        console.log(`ERROR : clientApi : axiosApi`);
        console.dir(error);
      });
    } else {
      res = await axiosApi("/client", "POST", req).catch((error) => {
        console.log(`ERROR : clientApi : axiosApi`);
        console.dir(error);
      });
    }
    console.log(res);
    if (res && !res.error) {
      setTimeout(() => {
        this.setState({ redirectToReferrer: "/" });
      }, 100);
    }
  }

  render() {
    const { name, email, items, budget, redirectToReferrer } = this.state;
    let bi = 0;
    console.log(budget);
    if (redirectToReferrer) {
      const from = { pathname: redirectToReferrer };
      return <Redirect to={from} />;
    }
    return (
      <>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              required
            />
          </div>
          {budget.map((b, i) => {
            if (!b.delete) {
              bi += 1;
              return (
                <div className="form-group" key={i}>
                  <label htmlFor="email">Budget {bi}</label>
                  <div className="form-row">
                    <div className="col">
                      <select
                        className="form-control"
                        value={b.descriptionIndex}
                        onChange={(e) => this.itemChange(e, i)}
                      >
                        <option value="">Select Item</option>
                        {items.map((item, ii) => {
                          return (
                            <option key={item.id} value={ii}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {Number(b.descriptionIndex) === 2 && (
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          value={b.description}
                          onChange={(e) => this.otherDescription(e, i)}
                        />
                      </div>
                    )}
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Cost"
                        value={b.cost}
                        onChange={(e) => this.setCost(e, i)}
                      />
                    </div>
                    <div className="col-1 text-right">
                      {i === 0 ? (
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => this.addBudget()}
                        >
                          +
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.removeBudget(i)}
                        >
                          x
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          })}
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </>
    );
  }
}

export default Client;
