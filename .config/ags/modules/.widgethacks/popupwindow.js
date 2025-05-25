import { App } from "astal/gtk3"

export default ({
    name,
    child,
    showClassName = "",
    hideClassName = "",
    ...props
}) => {
    return (
        <window
            name={name}
            visible={false}
            layer="overlay"
            application={App}
            {...props}
        >
            <box
                setup={(self) => {
                    self.hook(App, (self, currentName, visible) => {
                        if (currentName === name) {
                            self.toggleClassName(hideClassName, !visible)
                        }
                    })
                    // Note: keybind functionality needs to be reimplemented in AGS v2
                    // using onKeyPressEvent signal handler
                    self.connect("key-press-event", (widget, event) => {
                        const keyval = event.get_keyval()[1]
                        if (keyval === 65307) { // Escape key
                            App.get_window(name)?.set_visible(false)
                        }
                    })
                    if (showClassName !== "" && hideClassName !== "")
                        self.className = `${showClassName} ${hideClassName}`
                }}
            >
                {child}
            </box>
        </window>
    )
}