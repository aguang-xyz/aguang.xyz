import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person';
import MoviesIcon from '@material-ui/icons/LocalMovies';

import { IoLogoGithub, IoLogoLinkedin, IoMdMail } from 'react-icons/io';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: 'flex',
    overflow: 'hidden'
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
  menuIcon: {
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
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		paddingTop: theme.spacing.unit * 10,
		height: '100vh',
		overflow: 'auto',
		boxSizing: 'border-box',
	},
  contentFoot: {
    height: '50px',
  },
})


class Page extends React.Component {

	state = {
		showDrawer: false,
	};

	handleDrawerOpen = () => {
		this.setState({ showDrawer: true });
	};

	handleDrawerClose = () => {
		this.setState({ showDrawer: false });
	};

	handleGoToGithub = () => {
		window.location.assign('https://github.com/aguang-xyz');
	};
  
  handleGoToLinkedin = () => {
		window.location.assign('https://www.linkedin.com/in/wang-guangrui-80337a193/');
  };
  
  handleGoEmail = () => {
		window.location.assign('mailto:aguang.xyz@gmail.com');
  };

	render() {
		const { classes, menu, body } = this.props
		
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
              <IoLogoGithub />
            </IconButton>
            
            <IconButton color="inherit" onClick={this.handleGoToLinkedin}>
              <IoLogoLinkedin />
            </IconButton>

            <IconButton color="inherit" onClick={this.handleGoEmail}>
              <IoMdMail />
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

          <ListItem button onClick={() => window.location.assign('/#/post/articles/latest')}>
            <ListItemIcon className={classes.menuIcon}>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary="Latest Posts"
            />
          </ListItem>

          <ListItem button onClick={() => window.location.assign('/#/post/about/myself')}>
            <ListItemIcon className={classes.menuIcon}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="About Myself"
            />
          </ListItem>
				</Drawer>

				<main className={classes.content}>
          {body}
          
          <div className={classes.contentFoot}/>
				</main>
			</div>
		)
	}
} 

export default withStyles(styles)(Page);
