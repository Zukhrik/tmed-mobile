import React from 'react'
import moment from 'moment'
import ReactDOM from 'react-dom'
import i18n from './Config/lang'
import MomentUtils from '@date-io/moment'
import {I18nextProvider} from 'react-i18next'
import {BrowserRouter} from 'react-router-dom'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'

//Custom Imports
import {App} from './App'
import './Config/db'

// style
import './index.css'

//lang
import 'moment/locale/ru'

moment.locale('ru')


ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <BrowserRouter>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale='ru'>
                <App/>
            </MuiPickersUtilsProvider>
        </BrowserRouter>
    </I18nextProvider>,
    document.getElementById('root')
)

