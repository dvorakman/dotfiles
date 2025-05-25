import Gtk from 'gi://Gtk?version=3.0'
import { App, Widget } from "astal/gtk3"
import { execAsync, exec } from "astal"
import userOptions from '../.configuration/user_options.js'
import { searchItem } from './searchitem.js'
import { execAndClose, couldBeMath, launchCustomCommand } from './miscfunctions.js'

export const DirectoryButton = ({ parentPath, name, type, icon }) => {
    const actionText = Widget.Revealer({
        revealChild: false,
        transition: "crossfade",
        transitionDuration: userOptions.animations.durationLarge,
        child: Widget.Label({
            className: 'overview-search-results-txt txt txt-small txt-action',
            label: 'Open',
        })
    })
    const actionTextRevealer = Widget.Revealer({
        revealChild: false,
        transition: "slide_left",
        transitionDuration: userOptions.animations.durationSmall,
        child: actionText,
    })
    return Widget.Button({
        className: 'overview-search-result-btn',
        onClicked: () => {
            App.get_window('overview')?.set_visible(false)
            execAsync(['bash', '-c', `xdg-open '${parentPath}/${name}'`, `&`]).catch(print)
        },
        child: Widget.Box({
            children: [
                Widget.Box({
                    vertical: false,
                    children: [
                        Widget.Box({
                            className: 'overview-search-results-icon',
                            homogeneous: true,
                            child: Widget.Icon({
                                icon: icon,
                            }),
                        }),
                        Widget.Label({
                            className: 'overview-search-results-txt txt txt-norm',
                            label: name,
                        }),
                        Widget.Box({ hexpand: true }),
                        actionTextRevealer,
                    ]
                })
            ]
        }),
        setup: (self) => self
            .on('focus-in-event', (button) => {
                actionText.revealChild = true
                actionTextRevealer.revealChild = true
            })
            .on('focus-out-event', (button) => {
                actionText.revealChild = false
                actionTextRevealer.revealChild = false
            })
        ,
    })
}

export const CalculationResultButton = ({ result, text }) => searchItem({
    materialIconName: '󱖦 ',
    name: `Math result`,
    actionName: "Copy",
    content: `${result}`,
    onActivate: () => {
        App.get_window('overview')?.set_visible(false)
        execAsync(['wl-copy', `${result}`]).catch(print)
    },
})

export const DesktopEntryButton = (app) => {
    const actionText = Widget.Revealer({
        revealChild: false,
        transition: "crossfade",
        transitionDuration: userOptions.animations.durationLarge,
        child: Widget.Label({
            className: 'overview-search-results-txt txt txt-small txt-action',
            label: 'Launch',
        })
    })
    const actionTextRevealer = Widget.Revealer({
        revealChild: false,
        transition: "slide_left",
        transitionDuration: userOptions.animations.durationSmall,
        child: actionText,
    })
    return Widget.Button({
        className: 'overview-search-result-btn',
        onClicked: () => {
            App.get_window('overview')?.set_visible(false)
            // Use AstalApps launch method
            execAsync(['bash', '-c', `${app.executable} &`]).catch(print)
        },
        child: Widget.Box({
            children: [
                Widget.Box({
                    vertical: false,
                    children: [
                        Widget.Box({
                            className: 'overview-search-results-icon',
                            homogeneous: true,
                            child: Widget.Icon({
                                icon: app.icon_name || app.name,
                            }),
                        }),
                        Widget.Label({
                            className: 'overview-search-results-txt txt txt-norm',
                            label: app.name,
                        }),
                        Widget.Box({ hexpand: true }),
                        actionTextRevealer,
                    ]
                })
            ]
        }),
        setup: (self) => self
            .on('focus-in-event', (button) => {
                actionText.revealChild = true
                actionTextRevealer.revealChild = true
            })
            .on('focus-out-event', (button) => {
                actionText.revealChild = false
                actionTextRevealer.revealChild = false
            })
        ,
    })
}

export const ExecuteCommandButton = ({ command, terminal = false }) => searchItem({
    materialIconName: `${terminal ? 'terminal' : ' '}`,
    name: `Run command`,
    actionName: `Execute ${terminal ? 'in terminal' : ''}`,
    content: `${command}`,
    onActivate: () => execAndClose(command, terminal),
    extraClassName: 'techfont',
})

export const CustomCommandButton = ({ text = '' }) => searchItem({
    materialIconName: ' ',
    name: 'Action',
    actionName: 'Run',
    content: `${text}`,
    onActivate: () => {
        App.get_window('overview')?.set_visible(false)
        launchCustomCommand(text)
    },
})

export const SearchButton = ({ text = '' }) => searchItem({
    materialIconName: '󰜏 ',
    name: 'Search the web',
    actionName: 'Go',
    content: `${text}`,
    onActivate: () => {
        App.get_window('overview')?.set_visible(false)
        execAsync(['bash', '-c', `xdg-open '${userOptions.search.engineBaseUrl}${text} ${['', ...userOptions.search.excludedSites].join(' -site:')}' &`]).catch(print)
    },
})