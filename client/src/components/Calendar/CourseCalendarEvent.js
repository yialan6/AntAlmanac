import React from 'react';
import { Paper, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ColorPicker from '../App/ColorPicker.js';
import { Delete } from '@material-ui/icons';
import locations from '../SectionTable/static/locations.json';
import { deleteCourse, deleteCustomEvent } from '../../actions/AppStoreActions';

const styles = {
    container: {
        padding: '0.5rem',
        minWidth: '15rem',
    },
    title: {
        fontSize: '0.9rem',
        fontWeight: 500,
    },
    icon: {
        cursor: 'pointer',
    },
    titleBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    table: {
        border: 'none',
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.9rem',
    },
    alignToTop: {
        verticalAlign: 'top',
    },
    rightCells: {
        textAlign: 'right',
    },
    multiline: {
        whiteSpace: 'pre',
    },
    colorPicker: {
        float: 'right',
        cursor: 'pointer',
        '& > div': {
            height: '1.5rem',
            width: '1.5rem',
            borderRadius: '50%',
        },
    },
};

const genMapLink = (location) => {
    try {
        const location_id = locations[location.split(' ')[0]];
        return 'https://map.uci.edu/?id=463#!m/' + location_id;
    } catch (err) {
        return 'https://map.uci.edu/?id=463#!ct/12035,12033,11888,0,12034';
    }
};

const CourseCalendarEvent = (props) => {
    const { classes, courseInMoreInfo, currentScheduleIndex } = props;

    if (!courseInMoreInfo.isCustomEvent) {
        const {
            instructors,
            sectionCode,
            courseTitle,
            final: finalExam,
            bldg,
        } = courseInMoreInfo;

        return (
            <div>
                <Paper className={classes.container}>
                    <div className={classes.titleBar}>
                        <span className={classes.title}>{courseTitle}</span>
                        <Tooltip title="Delete">
                            <Delete
                                className={classes.icon}
                                onClick={() =>
                                    deleteCourse(
                                        sectionCode,
                                        currentScheduleIndex
                                    )
                                }
                            />
                        </Tooltip>
                    </div>
                    <table className={classes.table}>
                        <tbody>
                            <tr>
                                <td className={classes.alignToTop}>
                                    Instructors
                                </td>
                                <td
                                    className={
                                        classes.multiline +
                                        ' ' +
                                        classes.rightCells
                                    }
                                >
                                    {instructors.join('\n')}
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.alignToTop}>Location</td>
                                <td
                                    className={
                                        classes.multiline +
                                        ' ' +
                                        classes.rightCells
                                    }
                                >
                                    {bldg !== 'TBA' ? (
                                        <a
                                            href={genMapLink(bldg)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {bldg}
                                        </a>
                                    ) : (
                                        bldg
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Final</td>
                                <td className={classes.rightCells}>
                                    {finalExam}
                                </td>
                            </tr>
                            <tr>
                                <td>Color</td>
                                <td className={classes.colorPicker}>
                                    <ColorPicker
                                        courseInMoreInfo={courseInMoreInfo}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Paper>
            </div>
        );
    } else {
        const { title, customEventID } = courseInMoreInfo;
        return (
            <div>
                <Paper className={classes.container}>
                    <div className={classes.titleBar}>
                        <span
                            className={classes.title}
                            style={{ marginBottom: 5 }}
                        >
                            {title}
                        </span>
                    </div>
                    <table className={classes.table}>
                        <tbody>
                            <tr>
                                <td className={classes.colorPicker}>
                                    <ColorPicker
                                        courseInMoreInfo={courseInMoreInfo}
                                    />
                                </td>
                                <td className={classes.rightCells}>
                                    To edit go to
                                    <br />
                                    Added Classes
                                    {/*<CustomEventsDialog editMode={true} event={courseInMoreInfo} onEditCustomEvent={props.onEditCustomEvent}/>*/}
                                </td>
                                <td
                                    className={
                                        classes.rightCells +
                                        ' ' +
                                        classes.alignToTop
                                    }
                                >
                                    <Tooltip title="Delete">
                                        <Delete
                                            className={classes.icon}
                                            onClick={() =>
                                                deleteCustomEvent(
                                                    customEventID,
                                                    currentScheduleIndex
                                                )
                                            }
                                        />
                                    </Tooltip>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Paper>
            </div>
        );
    }
};

CourseCalendarEvent.propTypes = {
    courseInMoreInfo: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseCalendarEvent);
