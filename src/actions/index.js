import {debug} from '../'


//User Actions Types:

export const FOCUS_TAB = 'FOCUS_TAB'
export const FOCUS_PANEL = 'FOCUS_PANEL'
export const SELECT_FILE = 'SELECT_FILE'

//Operational Action Types:

export const ERROR = 'ERROR'
export const RECEIVE_SOURCES = 'RECEIVE_SOURCES'
export const RECEIVE_CALLSTACK = 'RECEIVE_CALLSTACK'
export const RECEIVE_BREAKPOINTS = 'RECEIVE_BREAKPOINTS'
export const RECEIVE_SCOPE = 'RECEIVE_SCOPE'
export const RECEIVE_SOURCE = 'RECEIVE_SOURCE'
export const SET_FILE_INDEX = 'SET_FILE_INDEX'
export const SET_EDITOR_LINE= 'SET_EDITOR_LINE'

// Debugger Action Types
export const PAUSE = 'PAUSE'
export const RESUME = 'RESUME'
export const STEP_OVER = 'STEP_OVER'
export const STEP_INTO = 'STEP_INTO'
export const STEP_OUT = 'STEP_OUT'
export const NEXT_FRAME = 'NEXT_FRAME'
export const PREVIOUS_FRAME = 'PREVIOUS_FRAME'
export const SELECT_FRAME = 'SELECT_FRAME'


//Configuration Action Types:

export const SET_DIMENSIONS = 'SET_DIMENSIONS'


//User Action Creators:

export function focusTab(payload) {
  return {
    type: FOCUS_TAB,
    payload
  }
}
export function focusPanel(payload) {
  return {
    type: FOCUS_PANEL,
    payload
  }
}
export function selectFile(payload) {
  
  return (dispatch, getState) => {
    const {sources, file, files = []} = getState()
    const payloadIsObject = Object(payload) === payload
    const script = payloadIsObject ?
      sources.find(s => +s.id === +payload.scriptId) :
      sources.find(s => s.name === payload) 

    const {source, name} = script

    dispatch({type: SELECT_FILE, payload: name})
    dispatch({type: SET_FILE_INDEX, payload: files.indexOf(name)})

    if (payloadIsObject) {
      const {lineNumber} = payload
      dispatch(setEditorLine(lineNumber))
    }

    if (source) {
      dispatch(receiveSource(source))
    }
    
  }
}

export function setEditorLine(payload) {
  console.log('EDITOR LINE', payload)
  return {
    type: SET_EDITOR_LINE,
    payload
  }
}

export function selectFrame(payload) {
  return (dispatch, getState) => {
    const {frames} = getState()
    const frameIndex = payload
    const frame = frames[frameIndex]
    const {location} = frame
    dispatch({type: SELECT_FRAME, payload: frame})
    try {
    dispatch(selectFile(location))
    } catch (e) {
      console.error(e)
    }

  }
}

//Operational Action Creators:

export function error(payload) {
  return {
    type: ERROR,
    payload
  }
}
export function receiveSources(payload) {
  return {
    type: RECEIVE_SOURCES,
    payload
  }
}
export function receiveCallstack(payload) {
  return {
    type: RECEIVE_CALLSTACK,
    payload
  }
}
export function receiveBreakpoints(payload) {
  return {
    type: RECEIVE_BREAKPOINTS,
    payload
  }
}
export function receiveScope(payload) {
  return {
    type: RECEIVE_SCOPE,
    payload
  }
}
export function receiveSource(payload) {
  return {
    type: RECEIVE_SOURCE,
    payload: (payload + '').split('\n')
  }
}

// Debugger Action Creators

export function pause() {
  return dispatch => {
    dispatch({type: PAUSE})
    debug.pause((err, {source, bp: {callFrames: callstack}}) => {
      dispatch(receiveSource(source))
      dispatch(receiveCallstack(callstack))
    })
  }
}

export function resume() {
  return dispatch => {
    dispatch({type: RESUME})
    dispatch(receiveSource(''))
    dispatch(receiveCallstack([]))
    debug.resume(() => {})
  }
}

export function stepOver() {
  return dispatch => {
    dispatch({type: STEP_OVER})
    debug.step((err, {source, bp: {callFrames: callstack}}) => {
      dispatch(receiveSource(source))
      dispatch(receiveCallstack(callstack))
    })
  }
}

export function stepInto(payload) {
  return {
    type: STEP_INTO,
    payload
  }
}

export function stepOut(payload) {
  return {
    type: STEP_OUT,
    payload
  }
}

export function nextFrame(payload) {
  return {
    type: NEXT_FRAME,
    payload
  }
}

export function previousFrame(payload) {
  return {
    type: PREVIOUS_FRAME,
    payload
  }
}

//Configuration Action Creators:

export function setDimensions(payload) {
  return {
    type: SET_DIMENSIONS,
    payload
  }
}