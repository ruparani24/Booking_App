import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import PropTypes from 'prop-types';
import axios from "axios";


export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data);
                setReady(true);
            }).catch(() => setReady(true));
        }
        console.log("UserContext Updated:", user); 
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser , ready}}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};