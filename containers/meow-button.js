import { addMeow } from '../actions/addMeow'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

const getCat = (state) => state.cat
const memoizedGetCat = createSelector([getCat], (cat) => cat)

const mapStateToProps = memoizedGetCat

const mapDispatchToProps = (dispatch) => {
  return {
    handleOnClick: () => {
      dispatch(addMeow())
    }
  }
}

const CatInfo = ({ sound, handleOnClick }) => <div className="cat-info" onClick={handleOnClick}>cat button! {sound}</div>;

export default connect(mapStateToProps, mapDispatchToProps)(CatInfo)
