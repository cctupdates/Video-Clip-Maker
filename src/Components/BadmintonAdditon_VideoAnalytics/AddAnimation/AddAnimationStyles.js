import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '4%',
    height: '1000px',
    width: '95%',
    margin: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rightGridBtn: {
    width: '85%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100px',
  },
  scaleCard: {},
  toogleDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    margin: 'auto',
    marginTop: '2%',
    height: '50px',
  },
  imgStyle: {
    width: '100%',
  },
  scaleimgDiv: {
    width: '90%',
    margin: 'auto',
    marginTop: '1.7%',
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleButtons: {
    width: '30%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50px',
  },
  scaleBTN: {
    width: '40%',
    height: '45px',
  },
  addClipBtnContainer: {
    width: '50%',
    display: 'flex',
    margin: 'auto',
    height: '100px',
    marginTop: '4%',
  },
  addClipBtn: {
    textTransform: 'none',
    color: 'grey',
    margin: 'auto',
    borderRadius: '0',
    background: '#D9DFEA',
  },
  submitWatchBtn: {
    border: '1px solid #48B499',
    color: 'white',
    backgroundColor: 'white',
    marginTop: '2em',
    width: '40%',
    fontSize: '15px',
    height: ' 40px',
    textTransform: 'none',
  },

  addClipBtnDiv: {
    width: '90%',
    display: 'flex',
    margin: 'auto',
    height: '100px',
    marginTop: '4%',
  },

  leftLowerbtns: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '60%',
    margin: 'auto',
    padding: '1em',
  },
}))
