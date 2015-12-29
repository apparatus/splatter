Error.stackTraceLimit = Infinity
import 'babel-polyfill'
import 'source-map-support/register'

import React from 'react'
import {Component} from 'react'
import blessed from 'blessed'
import {Provider, connect} from 'react-redux'
import {render} from 'react-blessed'
import functional from 'react-functional'
import portly from 'portly'
import createStore from './store/create'
import createScreen from './screen'
import config from './config'
import { Console, Sources } from './containers'
import { Tabs, Cog, Settings } from './components'
import createDebugger from './lib/debug'
import {
  receiveCallstack,
  receiveBreakpoints,
  receiveScope,
  receiveSource,
  receiveSources,
  selectFile,
  selectFrame,
  pause,
  resume,
  stepOver,
  stepInto,
  stepOut,
  nextFrame,
  previousFrame
} from './actions'

const store = createStore({
  tab: 'sources',
  panel: 'editor',
  layout: config.layout,
})
const {dispatch} = store
const tabs = ['Sources', 'Networking', 'Profiling', 'Console']

export const debug = createDebugger()

export default async (pid) => {
  const debugPort = 5858

  if (pid) {
    try { 
      process.kill(pid, 'SIGUSR1')
    } catch (e) {
      console.log('Warning unable to locate supplied pid ', pid)
    }
  }

  let screen = createScreen(store)

  dispatch(receiveSource('Waiting for port debug port ' + debugPort))

  portly(debugPort).then(portPid => {
    debug.start(debugPort, (err, callstack) => {
      dispatch(receiveCallstack(callstack))

      debug.scripts((err, scripts) => {
        dispatch(receiveSources(scripts))
        if (callstack) {
          return dispatch(selectFrame(0))
        }
        const {name} = (scripts.find(s => s.name[0] === '/') || scripts[0])
        dispatch(selectFile(name))
      })

      debug.breakpoints((err, {breakpoints}) => {
        if (err) { return console.error(err) }
        receiveBreakpoints(breakpoints)
      })
    })
  })

  let Devtools = ({layout, tab, panel}) => {
    return (
      <element>
        <Tabs dispatch={dispatch} items={tabs} {...layout.tabs}/>
        {tab === 'sources' && <Sources/>}
        {tab === 'console' && <Console/>}
        <Cog {...layout.cog} active={panel === 'settings'} dispatch={dispatch}/>
        {
          panel === 'settings' && 
            <Settings dispatch={dispatch} layout={layout} focused={panel === 'settings'} {...layout.settings} />
        }
      </element>
    )
  }

  Devtools = connect(({layout, tab, panel}) => ({layout, tab, panel}))(Devtools)

  return render(<Provider store={store}><Devtools/></Provider>, screen)
}