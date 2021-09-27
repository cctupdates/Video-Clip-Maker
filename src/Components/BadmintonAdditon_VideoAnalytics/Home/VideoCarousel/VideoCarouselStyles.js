import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  prevBox: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    zIndex: 5,
    cursor: 'pointer',

    top: '42%',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },

  navigationIcon: {
    color: '#5F5F5F',
    fontSize: '25px',
    marginLeft: '3px',
    marginTop: '3px',
  },
  nextBox: {
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    zIndex: 5,
    cursor: 'pointer',

    top: '42%',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    right: '0',
  },

  button: {
    color: '#48B499',
    border: '1px solid #48B499',
    '&:hover': {
      color: 'white',
      backgroundColor: '#48B499',
    },
    cursor: 'pointer',
    width: '80%',
    textTransform: 'none',
  },
  innerImage: {
    width: '90%',
    margin: 'auto',
    backgroundColor: 'red',
    marginTop: '1vw',
    textAlign: 'left',
  },
  innerImageDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
  },
  carousel: {
    zIndex: 10,
    position: 'relative',
    alignItems: 'center',
  },
}))

export default useStyles
