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
    marginTop: '13%',
  },
  scaleCard: {},
  toogleDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    margin: 'auto',
    marginTop: '2%',
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
    width: '90%',
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

  rightGridDropDown: {
    width: '85%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '80px',
  },
}))
