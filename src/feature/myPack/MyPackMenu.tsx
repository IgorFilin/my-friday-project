import React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";

export const MyPackMenu: React.FC<{ onMenuClick: (item: string) => void }> = ({onMenuClick}) => {
	return <Paper sx={{position: "absolute", zIndex: 10, pl: 1, pr: 1}}>
		<MenuList>
			<MenuItem onClick={() => onMenuClick("Edit")}>
				<ListItemIcon>
					<EditIcon fontSize="small"/>
				</ListItemIcon>
				<ListItemText>Edit</ListItemText>
			</MenuItem>
			<MenuItem onClick={() => onMenuClick("Delete")}>
				<ListItemIcon>
					<DeleteIcon fontSize="small"/>
				</ListItemIcon>
				<ListItemText>Delete</ListItemText>
			</MenuItem>
			<MenuItem onClick={() => onMenuClick("Learn")}>
				<ListItemIcon>
					<SchoolIcon fontSize="small"/>
				</ListItemIcon>
				<ListItemText>Learn</ListItemText>
			</MenuItem>
		</MenuList>
	</Paper>
}
