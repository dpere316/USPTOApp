import React from 'react';

const Logout = (props) => {
    localStorage.clear();
    props.history.push('/Login')
    // Triggers a refresh need to find a better way to change login and logout;
    window.location.reload(false);
    return (
        <div>
            
        </div>
    );
};

export default Logout;