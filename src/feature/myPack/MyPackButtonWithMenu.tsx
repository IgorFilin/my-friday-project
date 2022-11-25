import React, {useState} from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {MyPackMenu} from "./MyPackMenu";
import {DEV_VERSION} from "config";

export const MyPackButtonWithMenu: React.FC = () => {
	const [isMenuShow, setIsMenuShow] = useState(false)
	
	const onClickHandler = () => {
		setIsMenuShow(value => !value)
	}
	
	const onMenuClickHandler = (item: string) => {
		setIsMenuShow(false)
		DEV_VERSION && console.log(item)
	}
	
	return (
		<Box>
			<IconButton onClick={onClickHandler}>
				<svg width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="50%" cy="50%" r="40%" stroke="#0D0C0B"/>
					<circle cx="50%" cy="32%" r="5%" fill="black"/>
					<circle cx="50%" cy="50%" r="5%" fill="black"/>
					<circle cx="50%" cy="68%" r="5%" fill="black"/>
				</svg>
			</IconButton>
			{isMenuShow && <MyPackMenu onMenuClick={onMenuClickHandler}/>}
		</Box>
	)
}
