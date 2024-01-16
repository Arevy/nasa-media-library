import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../../stores/StoreContext';
import { useParams } from 'react-router-dom';

const DetailPage: React.FC = observer(() => {
    const { nasaStore } = useContext(StoreContext);
    const { id } = useParams<{ id: string }>();

    // Use id to fetch and display detail data

    return (
        <div>
            {/* Detail view of the selected item */}
        </div>
    );
});

export default DetailPage;
