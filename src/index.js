import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
//Setup FontAwesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlay, faPause, faForward, faBackward, faSyncAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faPlay, faPause, faForward, faBackward, faSyncAlt);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
