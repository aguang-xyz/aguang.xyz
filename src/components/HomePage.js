import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PeopleIcon from '@material-ui/icons/People';

import { GoMarkGithub } from 'react-icons/go';

import ScrollTop from "react-scrolltop-button";

const drawerWidth = 240;

// TODO

const items = (
  /*
	<div>
		{Array.apply(null, { length: 50 }).map((i) => (

			<ListItem button key={i}>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText
					primary="Category 1"
				/>
			</ListItem>
		))}
	</div>
  */
  []
)

const styles = theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
	toolbar: {
    paddingRight: 24,
  },
	toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
	menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
	title: {
    flexGrow: 1,
  },
	drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
		overflowX: 'hidden',
  },
	drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
})


class HomePage extends React.Component {

	state = {
		showDrawer: false,
	};

	handleDrawerOpen = () => {
		this.setState({ showDrawer: true });
	};

	handleDrawerClose = () => {
		console.log('close..');

		this.setState({ showDrawer: false });
	};

	handleGoToGithub = () => {
		window.location.assign('https://github.com/aguang-xyz');
	};

	render() {
		const { classes } = this.props

	console.log(this.state.showDrawer)

		return (
			<div className={classes.root}>
				<AppBar
					position="absolute"
          className={classNames(classes.appBar, this.state.showDrawer && classes.appBarShift)}
				>
					<Toolbar
						disableGutters={!this.state.showDrawer}
						className={classes.toolbar}
					>
						<IconButton
							color="inherit"
							aria-label="Show menu"
							onClick={this.handleDrawerOpen}
							className={classNames(
                classes.menuButton,
                this.state.showDrawer && classes.menuButtonHidden,
              )}
						>
							<MenuIcon />
						</IconButton>

						<Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Aguang's Blog
            </Typography>

						<IconButton color="inherit" onClick={this.handleGoToGithub}>
              <GoMarkGithub />
            </IconButton>
					</Toolbar>
				</AppBar>

				<Drawer
					variant="permanent"
					open={this.state.showDrawer}
					classes={{
            paper: classNames(classes.drawerPaper, !this.state.showDrawer && classes.drawerPaperClose),
					}}
				>
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

					<Divider />

					<List>
						{items}
					</List>
          
					<Divider />
				</Drawer>

				<ScrollTop
					text="back to top"
				/>
			</div>
		)
	}
} 

export default withStyles(styles)(HomePage);
