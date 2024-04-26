import { Button, Table } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://662a511867df268010a3708b.mockapi.io/crudData`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const setData = (data) => {
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox)
    }

    const onDelete = (id) => {
        axios.delete(`https://662a511867df268010a3708b.mockapi.io/crudData/${id}`)
            .then(() => {
                getData();
            })
    }

    const getData = () => {
        axios.get(`https://662a511867df268010a3708b.mockapi.io/crudData/`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const handleAddData = () => {
        navigate('/create');
    }

    return (<>
    <Button className='buttonStyle' onClick={handleAddData}>Add Data</Button>
        <div>
           <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checked</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.length ?  APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.firstName}</Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>

                                <Link to='/update'>
                                    <Table.Cell>
                                        <Button onClick={() => setData(data)} >Update</Button>
                                    </Table.Cell>
                                </Link>


                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>

                            </Table.Row>
                        )
                    }) : <Table.Row>
                        <Table.Cell>No Data</Table.Cell></Table.Row>}
                </Table.Body>
            </Table> 
        </div>
        </>
    )
}