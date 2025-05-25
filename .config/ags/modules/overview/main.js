import { SearchAndWindows } from "./windowcontent.js"
import PopupWindow from '../.widgethacks/popupwindow.js'

export default (id = '') => PopupWindow({
    name: `overview${id}`,
    exclusivity: 'ignore',
    keymode: 'exclusive',
    visible: false,
    // anchor: ['middle'],
    layer: 'overlay',
    child: (
        <box vertical={true}>
            <SearchAndWindows />
        </box>
    ),
})
