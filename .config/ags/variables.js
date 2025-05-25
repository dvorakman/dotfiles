import Gtk from 'gi://Gtk?version=3.0'
import Variable from "astal/variable"
import { exec, execAsync } from "astal"

// Gtk.IconTheme.get_default().append_search_path(`${App.configDir}/assets/icons`);

// Screen size with fallback values
let SCREEN_WIDTH = 1920  // Default fallback
let SCREEN_HEIGHT = 1080 // Default fallback

try {
    SCREEN_WIDTH = Number(exec(`bash -c "hyprctl monitors -j | jq '.[0].width'"`)) || 1920
} catch (e) {
    console.log('Failed to get screen width from hyprctl, using fallback:', SCREEN_WIDTH)
}

try {
    SCREEN_HEIGHT = Number(exec(`bash -c "hyprctl monitors -j | jq '.[0].height'"`)) || 1080
} catch (e) {
    console.log('Failed to get screen height from hyprctl, using fallback:', SCREEN_HEIGHT)
}

export { SCREEN_WIDTH, SCREEN_HEIGHT }

// Mode switching
export const currentShellMode = Variable('normal') // normal, focus
globalThis['currentMode'] = currentShellMode
globalThis['cycleMode'] = () => {
    if (currentShellMode.get() === 'normal') {
        currentShellMode.set('focus')
    } else {
        currentShellMode.set('normal')
    }
}
