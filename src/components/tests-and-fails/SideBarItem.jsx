// import React, { useState } from "react";
// import {
//   Divider,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import InboxIcon from "@mui/icons-material/Inbox";
// import { NavLink } from "react-router-dom";

// // Failed, couldnt pass the selectedIndex an handleListItemClick function through props
// // So the state is not updating properly, the state needs to be managed the the SideBarList, to toggle on one and the others off

// const SideBarItem = (props) => {
//   //   const [selectedIndex, setSelectedIndex] = useState(0);
//   //   const handleListItemClick = (event, index) => {
//   //     setSelectedIndex(index);
//   //   };

//   return (
//     <NavLink to={`${props.menuItemNav}`}>
//       <ListItemButton
//         selected={selectedIndex === props.menuItemID}
//         onClick={(event) => handleListItemClick(event, props.menuItemID)}
//       >
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary={`${props.menuItemTxt}`} />
//       </ListItemButton>
//       <Divider />
//     </NavLink>
//   );
// };

// export default SideBarItem;
