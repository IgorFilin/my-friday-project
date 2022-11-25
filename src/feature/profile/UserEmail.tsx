import React from 'react'
import Link from '@mui/material/Link'

export const UserEmail: React.FC<{ email: string }> = ({ email }) => {
    return (
        <Link sx={{ mb: 3 }} href={'mailto:' + email} underline="hover">
            {email}
        </Link>
    )
}
