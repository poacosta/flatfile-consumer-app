import React from 'react';
import { useSpace } from '@flatfile/react'
import { config } from './config'
import { listener } from './listener'
import { useState } from 'react'

const ExampleApp = () => {
    const [showSpace, setShowSpace] = useState(false)

    const space = useSpace({
        name: 'Embedded Space',
        publishableKey: 'pk_d504d01543244ac89f5b701b25ded260',
        environmentId: 'us_env_l4iti0WA',
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
