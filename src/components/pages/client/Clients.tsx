import instance from "../../api/fetcher";
import { FC, useEffect, useState } from "react";
import { EditForm } from "./EditClientForm";
import { AddClientForm } from "./AddClientForm";


export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    active: boolean;
}



export const Clients: FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    useEffect(() => {

        fetchClients();

    }, []);

    const setActive = (id: string, value: boolean) => {
        instance.patch(`/users/${id}`, { active: value }).then((response) => {
            console.log(response);
            fetchClients();
        }, (error) => {
            console.log(error);
        }
        );




    }

    const fetchClients = () => {
        instance.get("/clients").then((response) => {
            setClients(response.data);
        }, (error) => {
            console.log(error);
        }
        );
    }

    return (
        <>
            <div >
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.firstName}</td>
                                <td>{client.lastName}</td>
                                <td>{client.id}</td>
                                <td>{client.username}</td>
                                <td>{client.active ? "true" : "false"}</td>
                                <td><button onClick={() => setActive(client.id, client.active ? false : true)} className="col-span-2 bg-blue-500 text-white rounded p-2 w-32"> {client.active ? "deactivate" : "activate"} </button> </td>
                                <td><EditForm {...client} fetchClients={() => fetchClients()} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="">
                <AddClientForm fetchClients={() => fetchClients()} />
            </div>

        </>
    )
}