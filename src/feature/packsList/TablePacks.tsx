import React from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import TableSortLabel from '@mui/material/TableSortLabel'
import Box from '@mui/material/Box'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { changePackTC, deletePackTC, sortPacksAC } from 'redux/packsReducer'
import { RequestStatus } from 'redux/appReducer'
import { useNavigate } from 'react-router-dom'
import { Path } from 'app/AppRoutes'

export const TablePacks = React.memo(() => {
    type iconFlowType = 'read' | 'delete' | 'changed'

    const dispatch = useAppDispatch()

    const cardPacks = useAppSelector((state) => state.packsCard.cardPacks)
    const sort = useAppSelector((state) => state.packsCard.sortPacks)
    const authUserId = useAppSelector((state) => state.auth.profileData.id)
    const requestStatus = useAppSelector((state) => state.app.request.status)

    const hoverStyleIcon = {
        transition: '0.5s',
        cursor: 'pointer',
        '&:hover': { color: '#1976d2', transition: '0.5s' },
    }

    const onClickIconHandler = (type: iconFlowType, id: string) => {
        if (type === 'delete') dispatch(deletePackTC(id))
        if (type === 'read') alert('readPack')
        if (type === 'changed') dispatch(changePackTC({ _id: id, name: 'UpdatedNamePack' }))
    }

    const rows = cardPacks.map((pack) => {
        return {
            userId: pack.user_id,
            key: pack._id,
            Name: pack.name,
            Cards: pack.cardsCount,
            LastCreated: pack.created.slice(0, 10).split('-').reverse().join('.'),
            CreatedBy: pack.user_name,
            Actions: [
                {
                    icon: (
                        <SchoolOutlinedIcon
                            onClick={() => onClickIconHandler('read', pack._id)}
                            sx={hoverStyleIcon}
                        />
                    ),
                    status: 'allMy',
                },
                {
                    icon: (
                        <ModeEditIcon
                            onClick={() => onClickIconHandler('changed', pack._id)}
                            sx={hoverStyleIcon}
                        />
                    ),
                    status: 'my',
                },
                {
                    icon: (
                        <DeleteOutlineIcon
                            onClick={() => onClickIconHandler('delete', pack._id)}
                            sx={hoverStyleIcon}
                        />
                    ),
                    status: 'my',
                },
            ],
        }
    })

    const createSortHandler = () => {
        const valueSort = sort === '0updated' ? '1updated' : '0updated'
        dispatch(sortPacksAC(valueSort))
    }

    const navigate = useNavigate()

    const onNameClickHandler = (id: string, packUserId: string) => {
        if (packUserId !== authUserId) navigate(Path.friendsPack + '/' + id)
        else navigate(Path.myPack + '/' + id)
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: '35px',
                    width: '100%',
                }}
            >
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow hover style={{ backgroundColor: '#EFEFEF' }}>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Cards</TableCell>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active={!(requestStatus === RequestStatus.loading)}
                                        disabled={requestStatus === RequestStatus.loading}
                                        onClick={createSortHandler}
                                        direction={sort === '0updated' ? 'asc' : 'desc'}
                                    >
                                        Last Created
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">Created by</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requestStatus === RequestStatus.loading
                                ? [1].map((el, i) => {
                                      return (
                                          <TableRow
                                              key={i}
                                              sx={{
                                                  '&:last-child td, &:last-child th': { border: 0 },
                                              }}
                                          >
                                              <TableCell align="left">...loading</TableCell>
                                              <TableCell align="center">...loading</TableCell>
                                              <TableCell align="center">...loading</TableCell>
                                              <TableCell align="right">...loading</TableCell>
                                              <TableCell align="center">...loading</TableCell>
                                          </TableRow>
                                      )
                                  })
                                : rows.map((row) => (
                                      <TableRow
                                          key={row.key}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                      >
                                          <TableCell
                                              align="left"
                                              style={{ cursor: 'pointer' }}
                                              onClick={() =>
                                                  onNameClickHandler(row.key, row.userId)
                                              }
                                          >
                                              {row.Name}
                                          </TableCell>
                                          <TableCell align="center">{row.Cards}</TableCell>
                                          <TableCell align="center">{row.LastCreated}</TableCell>
                                          <TableCell align="right">{row.CreatedBy}</TableCell>
                                          <TableCell align="center">
                                              {row.Actions.map((icon, i) => {
                                                  if (authUserId === row.userId) {
                                                      return (
                                                          <span style={{ padding: '3px' }} key={i}>
                                                              {icon.icon}
                                                          </span>
                                                      )
                                                  } else if (icon.status === 'allMy') {
                                                      return (
                                                          <span style={{ padding: '3px' }} key={i}>
                                                              {icon.icon}
                                                          </span>
                                                      )
                                                  }
                                              })}
                                          </TableCell>
                                      </TableRow>
                                  ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
})
