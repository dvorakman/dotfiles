import { execAsync } from "astal"
import AstalHyprland from 'gi://AstalHyprland?version=0.1'

const hyprland = AstalHyprland.get_default()

function moveClientToWorkspace(address, workspace) {
    hyprland.dispatch('movetoworkspacesilent', `${workspace},address:${address}`)
}

export function dumpToWorkspace(from, to) {
    if (from == to) return
    // Use AstalHyprland to get clients
    const clients = hyprland.get_clients()
    clients.forEach(client => {
        if (client.workspace.id == from) {
            moveClientToWorkspace(client.address, to)
        }
    })
}

export function swapWorkspace(workspaceA, workspaceB) {
    if (workspaceA == workspaceB) return
    const clientsA = []
    const clientsB = []
    
    // Use AstalHyprland to get clients
    const clients = hyprland.get_clients()
    clients.forEach(client => {
        if (client.workspace.id == workspaceA) clientsA.push(client.address)
        if (client.workspace.id == workspaceB) clientsB.push(client.address)
    })

    clientsA.forEach((address) => moveClientToWorkspace(address, workspaceB))
    clientsB.forEach((address) => moveClientToWorkspace(address, workspaceA))
}