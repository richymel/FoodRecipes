import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

const mapStateToProps = state =>  ({posts: state.posts, comments: state.comments});
const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

//Takes state (posts and comments) and the action creators, and surface those via props in our components
const App = connect(mapStateToProps, mapDispatchToProps)(Main);
//The above adds all state and actions via  props to Main

export default App;
