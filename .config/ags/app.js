import { App } from "astal/gtk3"
import { exec } from "astal"
import GLib from 'gi://GLib'
import userOptions from './modules/.configuration/user_options.js'
import Overview from './modules/overview/main.js'

const COMPILED_STYLE_DIR = `${GLib.get_user_config_dir()}/ags/user/`

async function applyStyle() {
    // Note: CSS application methods have changed in AGS v2
    // App.resetCss() and App.applyCss() are not available
    // You'll need to use the new CSS API when it's available
    console.log('[LOG] CSS loading disabled for AGS v2 migration')
}

const CLOSE_ANIM_TIME = 210

App.start({
    instanceName: "ags-main",
    main() {
        // Apply styles
        applyStyle().catch(print)
        
        // Create windows
        const windows = [
            Overview(),
            // AudioContent()
            // forMonitors(OSD),
        ]
        
        // Register windows with the app
        windows.flat(1).forEach(window => {
            if (window) {
                window.application = App
            }
        })
    }
}) 