import React from 'react'
import { LinkButton } from './LinkButton'

export const AsideInfo = ({uid}) => {
    return (
        <>
            <p className="text-muted text-center mt-2">ID: {uid}</p>
            <div className="w-100 d-flex justify-content-center mb-3">
                <LinkButton to="/stats" text="Estadísticas"/>
            </div> 
        </>
    )
}
