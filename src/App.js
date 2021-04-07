import React, { Component } from 'react'
import logo from './mainStreetAuto.svg'
import axios from 'axios'
import './App.css'

// Toast notification dependencies
import { ToastContainer, toast } from 'react-toastify'

// Base URL for Axios:
const baseURL = `joes-autos.herokuapp.com/api`;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vehiclesToDisplay: [],
      buyersToDisplay: [],
    }

    this.getVehicles = this.getVehicles.bind(this)
    this.getPotentialBuyers = this.getPotentialBuyers.bind(this)
    this.sellCar = this.sellCar.bind(this)
    this.addCar = this.addCar.bind(this)
    this.filterByColor = this.filterByColor.bind(this)
    this.filterByMake = this.filterByMake.bind(this)
    this.addBuyer = this.addBuyer.bind(this)
    this.nameSearch = this.nameSearch.bind(this)
    this.resetData = this.resetData.bind(this)
    this.byYear = this.byYear.bind(this)
    this.deleteBuyer = this.deleteBuyer.bind(this)
  }

  getVehicles() {
    // axios (GET)
    // setState with response -> vehiclesToDisplay

    axios.get(`https://${baseURL}/vehicles`)
      .then(response => {
        this.setState({ vehiclesToDisplay: response.data })
        toast.success(`Retrieved all vehicles successfully!`)
      }).catch(error => {
        toast.error(`Error attempting to retrieve vehicles.`)
      })
  }

  getPotentialBuyers() {
    // axios (GET)
    // setState with response -> buyersToDisplay

    axios.get(`https://${baseURL}/buyers`)
      .then(response => {
        this.setState({ buyersToDisplay: response.data })
        toast.success('Success! Please view potential buyers below.')
      }).catch(error => {
        toast.error('Cannot retrieve buyer information. Please try again later.')
      })
  }

  sellCar(id) {
    // axios (DELETE)
    // setState with response -> vehiclesToDisplay

    axios.delete(`https://${baseURL}/vehicles/${id}`)
      .then(response => {
        this.setState({ vehiclesToDisplay: response.data.vehicles })
        toast.success(`Success!`)
      }).catch(error => {
        console.log('error on sellCar', error)
        toast.error(`Error.`)
      })
  }

  filterByMake() {
    // axios (GET)
    // setState with response -> vehiclesToDisplay

    axios.get(`https://${baseURL}/vehicles?make=${this.selectedMake.value}`)
      .then(response => {
        this.setState({ vehiclesToDisplay: response.data })
        toast.success(`Vehicles By Make.`)
      }).catch(error => {
        console.log('ERROR filterByMake', error)
        toast.error('An error occurred when showing the selected make.')
      })
  }

  filterByColor() {
    // axios (GET)
    // setState with response -> vehiclesToDisplay

    axios.get(`https://${baseURL}/vehicles?color=${this.selectedColor.value}`)
      .then(response => {
        this.setState({ vehiclesToDisplay: response.data })
        toast.success(`Vehicles By Selected Color Successful!`)
      }).catch(error => {
        console.log('filterByColor ERROR')
        toast.error('Error filtering vehicles by color.')
      })
  }

  updatePrice(priceChange, id) {
    // axios (PUT)
    // setState with response -> vehiclesToDisplay

    axios.put(`https://${baseURL}/vehicles/${id}/${priceChange}`)
      .then(response => {
        this.setState({ vehiclesToDisplay: response.data.vehicles })
        toast.success(`You have successfully updated the price.`)
      }).catch(error => toast.error(`Unable to update price.`))
  }
    
  addCar() {
    let newCar = {
      make: this.make.value,
      model: this.model.value,
      color: this.color.value,
      year: this.year.value,
      price: this.price.value
    }

    // axios (POST)
    // setState with response -> vehiclesToDisplay

    axios.post(`https://${baseURL}/vehicles`, newCar)
      .then(response => {
        this.setState({ vehiclesToDisplay: response.data.vehicles })
        toast.success(`Success! Your vehicle has been added!`)
        this.make.value='', 
        this.model.value='', 
        this.year.value='', 
        this.color.value='',
        this.price.value=''
      }).catch(error => {
        console.log('kara addCar error', error)
        toast.error(`Error adding vehicle at this time.`)
      })
  }

  addBuyer() {
    let newBuyer = {
      name: this.name.value,
      phone: this.phone.value,
      address: this.address.value
    }
    //axios (POST)
    // setState with response -> buyersToDisplay

    axios.post(`https://${baseURL}/buyers`, newBuyer)
    .then(response => {
      this.setState({ buyersToDisplay: response.data.buyers })
      toast.success('New Buyer Added!')
      this.name.value='', 
      this.phone.value='', 
      this.address.value=''
    }).catch(error => {
      toast.error(
        'There seems to be a problem with adding new buyer. Please fill out the New Buyer form and submit again.'
      )})
  }

  deleteBuyer(id) {
    // axios (DELETE)
    //setState with response -> buyersToDisplay

    axios.delete(`https://${baseURL}/buyers/${id}`)
      .then(response => {
        this.setState({ buyersToDisplay: response.data.buyers })
        toast.success('Buyer successfully removed.')
      }).catch(error => {toast.error('Unable to remove this buyer.')})
  }

  nameSearch() {
    // axios (GET)
    // setState with response -> buyersToDisplay


  }

  byYear() {
    // could destructure number off this.state.vehiclesToDisplay
    // axios (GET)
    // setState with response -> vehiclesToDisplay

    axios.get(`https://${baseURL}/vehicles?year=${this.searchYear.value}`)
      .then(response => {
        console.log(this.searchYear.value)
        this.setState({ vehiclesToDisplay: response.data })

        if (this.state.vehiclesToDisplay.length > 0) {
          toast.success('Sorted by year successful!')
        } else {
          toast.error('Search successful but 0 vehicles match the search year.')
        }
      }).catch(error => {
        console.log('sorted byYear ERROR', error)
        toast.error('Error sorting by Year,')
      })
  }

  // DO NOT EDIT CODE BELOW
  resetData(dataToReset) {
    axios
      .get('https://joes-autos.herokuapp.com/api/' + dataToReset + '/reset')
      .then((res) => {
        if (dataToReset === 'vehicles') {
          this.setState({ vehiclesToDisplay: res.data.vehicles })
        } else {
          this.setState({ buyersToDisplay: res.data.buyers })
        }
      })
    }
    // DO NOT EDIT CODE ABOVE
    
    render() {
      console.log('kara this.state.buyersToDisplay', this.state.buyersToDisplay)
      console.log('kara this.state.vehiclesToDisplay', this.state.vehiclesToDisplay)
      console.log('length num', this.state.vehiclesToDisplay.length)


    const vehicles = this.state.vehiclesToDisplay.map((v) => {
      return (
        <div key={v.id}>
          <p>Make: {v.make}</p>
          <p>Model: {v.model}</p>
          <p>Year: {v.year}</p>
          <p>Color: {v.color}</p>
          <p>Price: {v.price}</p>

          <button
            className="btn btn-sp"
            onClick={() => this.updatePrice('up', v.id)}
          >
            Increase Price
          </button>

          <button
            className="btn btn-sp"
            onClick={() => this.updatePrice('down', v.id)}
          >
            Decrease Price
          </button>

          <button className="btn btn-sp" onClick={() => this.sellCar(v.id)}>
            SOLD!
          </button>

          <hr className="hr" />
        </div>
      )
    })

    const buyers = this.state.buyersToDisplay.map((person) => {
      return (
        <div key={person.id}>
          <p>Name: {person.name}</p>
          <p>Phone: {person.phone}</p>
          <p>Address: {person.address}</p>

          <button
            className="btn"
            onClick={() => {
              this.deleteBuyer(person.id)
            }}
          >
            No longer interested
          </button>

          <hr className="hr" />
        </div>
      )
    })

    return (
      <div>
        <ToastContainer />

        <header className="header">
          <img src={logo} alt="" />

          <button
            className="header-btn1 btn"
            onClick={() => this.resetData('vehicles')}
          >
            Reset Vehicles
          </button>

          <button
            className="header-btn2 btn"
            onClick={() => this.resetData('buyers')}
          >
            Reset Buyers
          </button>
        </header>

        <div className="btn-container">
          <button className="btn-sp btn" onClick={this.getVehicles}>
            Get All Vehicles
          </button>

          <select
            onChange={this.filterByMake}
            ref={(selectedMake) => {
              this.selectedMake = selectedMake
            }}
            className="btn-sp"
            value=""
          >
            <option value="" disabled>
              Filter by make
            </option>
            <option value="Suzuki">Suzuki</option>
            <option value="GMC">GMC</option>
            <option value="Ford">Ford</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Cadillac">Cadillac</option>
            <option value="Dodge">Dodge</option>
            <option value="Chrysler">Chrysler</option>
          </select>

          <select
            ref={(selectedColor) => {
              this.selectedColor = selectedColor
            }}
            onChange={this.filterByColor}
            className="btn-sp"
            value=""
          >
            <option value="" disabled>
              Filter by color
            </option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="Purple">Purple</option>
            <option value="indigo">Indigo</option>
            <option value="violet">Violet</option>
            <option value="teal">Teal</option>
          </select>

          <input
            onChange={this.nameSearch}
            placeholder="Search by name"
            type="text"
            ref={(searchLetters) => {
              this.searchLetters = searchLetters
            }}
          />

          <input
            ref={(searchYear) => {
              this.searchYear = searchYear
            }}
            className="btn-sp"
            type="number"
            placeholder="Year"
          />

          <button onClick={this.byYear} className="btn-inp">
            Go
          </button>

          <button className="btn-sp btn" onClick={this.getPotentialBuyers}>
            Get Potential Buyers
          </button>
        </div>

        <br />

        <p className="form-wrap">
          <input
            className="btn-sp"
            placeholder="make"
            ref={(make) => {
              this.make = make
            }}
          />
          <input
            className="btn-sp"
            placeholder="model"
            ref={(model) => {
              this.model = model
            }}
          />
          <input
            type="number"
            className="btn-sp"
            placeholder="year"
            ref={(year) => {
              this.year = year
            }}
          />
          <input
            className="btn-sp"
            placeholder="color"
            ref={(color) => {
              this.color = color
            }}
          />
          <input
            type="number"
            className="btn-sp"
            placeholder="price"
            ref={(price) => {
              this.price = price
            }}
          />

          <button className="btn-sp btn" onClick={this.addCar}>
            Add vehicle
          </button>
        </p>

        <p className="form-wrap">
          <input
            className="btn-sp"
            placeholder="name"
            ref={(name) => {
              this.name = name
            }}
          />
          <input
            className="btn-sp"
            placeholder="phone"
            ref={(phone) => {
              this.phone = phone
            }}
          />
          <input
            className="btn-sp"
            placeholder="address"
            ref={(address) => {
              this.address = address
            }}
          />

          <button onClick={this.addBuyer} className="btn-sp btn">
            Add buyer
          </button>
        </p>

        <main className="main-wrapper">
          <section className="info-box">
            <h3>Inventory</h3>

            {vehicles}
          </section>

          <section className="info-box">
            <h3>Potential Buyers</h3>

            {buyers}
          </section>
        </main>
      </div>
    )
  }
}

export default App
