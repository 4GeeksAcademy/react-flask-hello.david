import React, { useEffect, useState } from "react";

const PrivatePage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
       
        const token = localStorage.getItem("token");

        if (token) {
            fetch("https://psychic-palm-tree-wrv5v955w65wc565v-3001.app.github.dev/api/private", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
        } else {
            console.log("No se encontró el token en localStorage");
        }
    }, []);

    return (
        <div>
            {data ? <h1>{data.msg}</h1> : <p>Cargando...</p>}
        </div>
    );
};

export default PrivatePage;