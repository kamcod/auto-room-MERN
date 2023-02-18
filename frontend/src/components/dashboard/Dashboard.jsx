import {useEffect, useState} from "react";
import axios from "axios";
import AppConfig from "../../utils/AppConfig";
import "../../assets/styles/dashboard.css"
import AddCarModal from "./AddCarModal";

export default function Dashboard() {
    const [carsData, setCarsData] = useState([]);
    const [editCarData, setEditCarData] = useState();
    const [showAddCarModal, setShowAddCarModal] = useState(false);

    const fetchDashboardData = () => {
        axios.get(AppConfig.apis.getDashboardStats)
            .then(res => {
                if(res.status === 200) {
                    const {cars} = res.data;
                    setCarsData(cars);
                }
            })
            .catch(err => {
                console.log("error", err);
            })
    }
    const editCar = (id) => {
        axios.get(`${AppConfig.apis.cars}/${id}`)
            .then(res => {
                if(res.status === 200) {
                    setEditCarData(res.data.car);
                    setShowAddCarModal(true);
                }
            })
            .catch(err => {
                console.log("error", err);
            })
    };
    const deleteCar = (id) => {
        axios.delete(`${AppConfig.apis.cars}/${id}`)
            .then(res => {
                if(res.status === 200) {
                    fetchDashboardData();
                }
            })
            .catch(err => {
                console.log("error", err);
            })
    }
    useEffect(()=>{
       fetchDashboardData();
    }, [])
    return (
        <div>
            Total Number of Registered Cars: {carsData.length}

            <br /><br />
            <AddCarModal
                show={showAddCarModal}
                onHide={()=>{setEditCarData(null);setShowAddCarModal(false)}}
                refetchData={()=>fetchDashboardData()}
                editCarData={editCarData}
            />
            <button type="button" className="add-new-car-btn" onClick={() => setShowAddCarModal(true)}>Add new car</button>

            <br/><br/>

            <div className="cars-table-wrapper">
                <table className="cars-table">
                    <thead>
                    <tr>
                        <th>Sr. No#</th>
                        <th>Registeration No</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {carsData?.map(({_id: id, registration_no, make, model, color }, index) => {
                        return <tr key={id}>
                            <td style={{width: "100px"}}>{index+1}</td>
                            <td>{registration_no}</td>
                            <td>{make}</td>
                            <td>{model}</td>
                            <td>{color}</td>
                            <td><span><a style={{cursor: 'pointer'}} onClick={()=>editCar(id)}>edit</a></span>
                                {` || `}
                                <span><a style={{cursor: 'pointer'}} onClick={()=>deleteCar(id)}>delete</a></span></td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>


        </div>
    )
}
