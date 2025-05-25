import Gdk from 'gi://Gdk'
import Gtk from 'gi://Gtk?version=3.0'
import { App } from "astal/gtk3"
import { execAsync, exec } from "astal"
import userOptions from '../.configuration/user_options.js'

import AstalApps from 'gi://AstalApps?version=0.1'
import { execAndClose, expandTilde, hasUnterminatedBackslash, couldBeMath, launchCustomCommand, ls } from './miscfunctions.js'
import {
    CalculationResultButton, CustomCommandButton, DirectoryButton,
    DesktopEntryButton, ExecuteCommandButton, SearchButton
} from './searchbuttons.js'
import { checkKeybind } from '../.widgetutils/keybind.js'

// Add math funcs
const { abs, sin, cos, tan, cot, asin, acos, atan, acot } = Math
const pi = Math.PI
// trigonometric funcs for deg
const sind = x => sin(x * pi / 180)
const cosd = x => cos(x * pi / 180)
const tand = x => tan(x * pi / 180)
const cotd = x => cot(x * pi / 180)
const asind = x => asin(x) * 180 / pi
const acosd = x => acos(x) * 180 / pi
const atand = x => atan(x) * 180 / pi
const acotd = x => acot(x) * 180 / pi

const MAX_RESULTS = 10
const OVERVIEW_SCALE = 0.18 // = overview workspace box / screen size
const OVERVIEW_WS_NUM_SCALE = 0.0
const OVERVIEW_WS_NUM_MARGIN_SCALE = 0.07
const TARGET = [Gtk.TargetEntry.new('text/plain', Gtk.TargetFlags.SAME_APP, 0)]

function iconExists(iconName) {
    let iconTheme = Gtk.IconTheme.get_default()
    return iconTheme.has_icon(iconName)
}

const OptionalOverview = async () => {
    try {
        const module = await import('./overview_hyprland_simple.js')
        return module.default()
    } catch (e) {
        console.log('Failed to load overview module:', e)
        return <box />
    }
}

const overviewContentWidget = await OptionalOverview()
const overviewContent = (
    <revealer
        revealChild={true}
        transition="slide_down"
        transitionDuration={userOptions.animations.durationLarge}
    >
        {overviewContentWidget}
    </revealer>
)

export const SearchAndWindows = () => {
    return (
        <box vertical={true}>
            <box className="bar-height" />
            <box hpack="center">
                <entry
                    className="overview-search-box txt-small txt"
                    hpack="center"
                    placeholder="Type to search..."
                />
            </box>
            <box className="overview-tasks">
                <label 
                    label="AGS v2 Overview - Basic functionality"
                    className="txt"
                />
            </box>
        </box>
    )
} 
