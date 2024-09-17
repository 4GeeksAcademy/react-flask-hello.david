import { sync } from "remote-origin-url";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			userToken: null // Para almacenar el token del usuario
		},
		actions: {
			// Registro de usuarios
			signup: async (email, password) => {
				const url = process.env.BACKEND_URL + "/api/signup";
				const opciones = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password,
						"is_active":true

					})
				};

				try {
					const response = await fetch(url, opciones);
					const data = await response.json();
					if (data.msg === "usuario creado con exito") {
						console.log("Registro exitoso:", data.msg);
						return true;
					} else {
						console.error("Error en el registro:", data.msg);
						return false;
					}
				} catch (error) {
					console.error("Error en el registro:", error);
					return false;
				}
			},

			// Inicio de sesión
			login: async (email, password) => {
				const url = process.env.BACKEND_URL + "/api/login";
				const opciones = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};

				try {
					const response = await fetch(url, opciones);
					const data = await response.json();
					if (response.status === 200 && data.token) {
						// Guardar el token en el estado global y en localStorage
						setStore({ userToken: data.token });
						localStorage.setItem("token", data.token);
						console.log("Inicio de sesión exitoso:", data.token);
						return true;
					} else {
						console.error("Error en el inicio de sesión:", data.msg);
						return false;
					}
				} catch (error) {
					console.error("Error en el inicio de sesión:", error);
					return false;
				}
			},

			// Verificación de sesión
			isAuthenticated: () => {
				const store = getStore();
				// Verificar si hay un token en el estado global o en localStorage
				const token = store.userToken || localStorage.getItem("token");
				return token ? true : false;
			},

			// Cierre de sesión
			logout: () => {
				// Eliminar el token del estado global y de localStorage
				setStore({ userToken: null });
				localStorage.removeItem("token");
				console.log("Cierre de sesión exitoso");
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;