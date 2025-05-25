import GLib from 'gi://GLib'
import Variable from "astal/variable"
import { execAsync, exec, readFile } from "astal"

// Safely get distro ID with fallback
let distroID = 'linux'
try {
    distroID = exec(`bash -c 'cat /etc/os-release | grep "^ID=" | cut -d "=" -f 2 | sed "s/\\"//g"'`).trim()
} catch (e) {
    console.log('Failed to get distro ID, using fallback:', distroID)
}
export { distroID }

export const isDebianDistro = (distroID == 'linuxmint' || distroID == 'ubuntu' || distroID == 'debian' || distroID == 'zorin' || distroID == 'popos' || distroID == 'raspbian' || distroID == 'kali')
export const isArchDistro = (distroID == 'arch' || distroID == 'endeavouros' || distroID == 'cachyos')

// Safely check for flatpak
let hasFlatpak = false
try {
    hasFlatpak = !!exec(`bash -c 'command -v flatpak'`)
} catch (e) {
    console.log('Failed to check for flatpak, using fallback:', hasFlatpak)
}
export { hasFlatpak }

const LIGHTDARK_FILE_LOCATION = `${GLib.get_user_cache_dir()}/ags/user/colormode.txt`

// Safely read color mode
let colorMode = 'dark'
try {
    colorMode = exec('bash -c "sed -n \'1p\' $HOME/.cache/ags/user/colormode.txt"')
} catch (e) {
    console.log('Failed to read color mode, using fallback:', colorMode)
}

// Safely read dark mode setting
let darkModeValue = true
try {
    darkModeValue = !(readFile(LIGHTDARK_FILE_LOCATION).split('\n')[0].trim() == 'light')
} catch (e) {
    console.log('Failed to read dark mode setting, using fallback:', darkModeValue)
}
export let darkMode = Variable(darkModeValue)

// Safely check for plasma integration
let hasPlasmaIntegration = false
try {
    hasPlasmaIntegration = !!exec('bash -c "command -v plasma-browser-integration-host"')
} catch (e) {
    console.log('Failed to check for plasma integration, using fallback:', hasPlasmaIntegration)
}
export { hasPlasmaIntegration }

export const getDistroIcon = () => {
    // Arches
    if(distroID == 'arch') return 'arch-symbolic'
    if(distroID == 'endeavouros') return 'endeavouros-symbolic'
    if(distroID == 'cachyos') return 'cachyos-symbolic'
    // Funny flake
    if(distroID == 'nixos') return 'nixos-symbolic'
    // Cool thing
    if(distroID == 'fedora') return 'fedora-symbolic'
    // Debians
    if(distroID == 'linuxmint') return 'ubuntu-symbolic'
    if(distroID == 'ubuntu') return 'ubuntu-symbolic'
    if(distroID == 'debian') return 'debian-symbolic'
    if(distroID == 'zorin') return 'ubuntu-symbolic'
    if(distroID == 'popos') return 'ubuntu-symbolic'
    if(distroID == 'raspbian') return 'debian-symbolic'
    if(distroID == 'kali') return 'debian-symbolic'
    return 'linux-symbolic'
}

export const getDistroName = () => {
    // Arches
    if(distroID == 'arch') return 'Arch Linux'
    if(distroID == 'endeavouros') return 'EndeavourOS'
    if(distroID == 'cachyos') return 'CachyOS'
    // Funny flake
    if(distroID == 'nixos') return 'NixOS'
    // Cool thing
    if(distroID == 'fedora') return 'Fedora'
    // Debians
    if(distroID == 'linuxmint') return 'Linux Mint'
    if(distroID == 'ubuntu') return 'Ubuntu'
    if(distroID == 'debian') return 'Debian'
    if(distroID == 'zorin') return 'Zorin'
    if(distroID == 'popos') return 'Pop!_OS'
    if(distroID == 'raspbian') return 'Raspbian'
    if(distroID == 'kali') return 'Kali Linux'
    return 'Linux'
}
