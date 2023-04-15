import { useState } from 'react'
import React from 'react'
import { NavBarComponent } from './NavBar/NavBar'
import OverviewComponent from './Overview/Overview'
import '../styles/App.sass'


export default function App() {
    return (
      <div id='app'>
        <NavBarComponent />
        <OverviewComponent />
      </div>
    )
}