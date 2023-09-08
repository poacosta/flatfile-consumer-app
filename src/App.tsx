import React from 'react';
import { useSpace } from '@flatfile/react'
import { config } from './config'
import { listener } from './listener'
import { useState } from 'react'

const ExampleApp = () => {
    const [showSpace, setShowSpace] = useState(false)

    const space = useSpace({
        name: 'Embedded Space',
        publishableKey: process.env.REACT_APP_PUBLISHABLE_KEY || '',
        environmentId: process.env.REACT_APP_ENVIRONMENT_ID || '',
        workbook: config,
        listener: listener,
        closeSpace: {
            operation: 'contacts:submit',
            onClose: () => setShowSpace(false)
        }
    })

    return (
        <div style={{ padding: "16px" }}>
            <button
                onClick={() => {
                    setShowSpace(!showSpace);
                }}
            >
                {showSpace === true ? "Close" : "Open"} space
            </button>
            {showSpace && space}
        </div>
    );
}

export default ExampleApp;
