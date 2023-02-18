import {useEffect, useState} from "react";
import axios from "axios";
import AppConfig from "../../utils/AppConfig";
import "../../assets/styles/dashboard.css"
import Pagination from 'react-bootstrap/Pagination';
import AddCarModal from "./AddCarModal";

export default function Dashboard() {
    const [userName, setUserName] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationItems, setPaginationItems] = useState([]);
    const [carsData, setCarsData] = useState([]);
    const [editCarData, setEditCarData] = useState();
    const [showAddCarModal, setShowAddCarModal] = useState(false);

    const setPagination = (data) => {
        let items = [];
        let active = Number(data.currentPage);
        let totalPages = Number(data.totalPages);
        let currentPage = Number(data.currentPage);
        items.push(
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1}/>,
            <Pagination.Prev onClick={(e) => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}/>,
        );
            for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                items.push(
                    <Pagination.Item key={pageNumber} onClick={() => setCurrentPage(pageNumber)}
                                     active={pageNumber == active}>
                        {pageNumber}
                    </Pagination.Item>,
                );
            }
        items.push(
            <Pagination.Next onClick={(e)=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}/>,
            <Pagination.Last onClick={(e)=>setCurrentPage(totalPages)} disabled={currentPage === totalPages}/>
        );
        setPaginationItems([...items]);
    };

    const fetchDashboardData = () => {
        axios.get(`${AppConfig.apis.getDashboardStats}?page=${currentPage}`)
            .then(res => {
                if(res.status === 200) {
                    const {cars, name, pagination} = res.data;
                    setCarsData(cars);
                    setPagination(pagination);
                    setUserName(name);
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
    }, [currentPage])
    return (
        <div>
            <div className="dashboard-title">
                <h1>Welcome {userName}!</h1>
            </div>
            <div className="dashboard-card">
                <p>Registered Cars: </p>
                <p>{carsData.length < 10 ? `0${carsData.length}` : carsData.length}</p>
            </div>

            <br /><br />
            <AddCarModal
                show={showAddCarModal}
                onHide={()=>{setEditCarData(null);setShowAddCarModal(false)}}
                refetchData={()=>fetchDashboardData()}
                editCarData={editCarData}
            />
            {carsData.length > 0 && <div className="table-top-bar">
                <button type="button" className="add-new-car-btn" onClick={() => setShowAddCarModal(true)}>Add New Car</button>
            </div>}

            <div className="cars-table-wrapper">
                {carsData.length > 0 ? <table className="cars-table">
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
                    <td><span><a href="#" style={{cursor: 'pointer'}} onClick={()=>editCar(id)}>edit</a></span>
                {` || `}
                    <span><a href="#" style={{cursor: 'pointer'}} onClick={()=>deleteCar(id)}>delete</a></span></td>
                    </tr>
                })}
                    </tbody>
                </table> : <div>
                    You have not registered any car yet. <br/>
                    <button type="button" className="add-new-car-btn" onClick={() => setShowAddCarModal(true)}>Add New Car</button>
                </div>}
            </div>

            <div className="pagination-wrapper">
                <Pagination size="sm">{paginationItems}</Pagination>
            </div>


        </div>
    )
}
