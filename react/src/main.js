import React from 'react'
import ReactDOM from 'react-dom'
import App from './root.component';
import { domElementGetter } from './app';

ReactDOM.render(App, domElementGetter('react-app'))