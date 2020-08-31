import React, { useEffect } from 'react'
import {connect} from 'react-redux';
import LogItem from './LogItem'
import Preloader from '../layout/Preloader'
import PropTypes from 'prop-types'
import {getLogs} from '../../actions/logActions';

// logs and loading is being destructed from log
// 
const Logs = ({log: {logs, loading}, getLogs}) => {


    useEffect(() => {
        getLogs();
        // eslint-disable-next-line
    }, []);

    if (loading || logs === null) {
        return <Preloader/>
    }

    return (
        <ul className='collection with-header'>
            <li className='collection-header'>
                <h4 className='center'>System Logs</h4>
            </li>
            {!loading && logs.length === 0 ? (<p className='center'>No logs to show...</p>) : (logs.map(log => <li>{<LogItem log={log} key={log.id}/>}</li>))}
        </ul>
    )
}

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired,
};

// if you want to get anything from app level state to component you bring it in as a prop
// log: state.log comes from index.js
const mapStateToProps = state => ({
    log: state.log
});

// when you bring in an action, and pass it in here, your action is now a prop so it's destructured at the top
export default connect(mapStateToProps, {getLogs})(Logs);
