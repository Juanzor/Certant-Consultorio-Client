import React from 'react';

import Alta from './Alta.jsx';

const AltaPage = () => {
    return (
        <>
            <div className='mx-auto p-2 mt-5 col-sm-4 '>
                <Alta update={false} />
            </div>
        </>
    );
};

export default AltaPage;
