## Dev Notes

Theme:
- Custom themes are defined in `tailwind.config.js`

Project structure: 
Hooks
| File | Description |
| :--- | :--- |
| `hooks/useApi.js` | Contains createProject, editProject, removeStudentFromProject, addOperatingSystem | 
| `hooks/useComponentVisible.js` | Handles component visibility e.g. dropdown menu | 
| `hooks/useDarkMode.js` | Theme toggler hook | 
| `hooks/useFetch.js` | Node Fetch hook | 
| `hooks/useFetchOperatingSystems.js` | Handles operating system fetching from Postgres db | 
| `hooks/useFetchProjects.js` | Handles the fetching of project from student specified by given student ID | 
| `hooks/useFetchProjectsById.js` | Handles the fetching of projects specified by a single project ID | 
| `hooks/useLoaded.js` | Handles server/client side mismatch loading | 

Layout components
| File | Description | Important Notes |
| :--- | :--- | :--- |
| `components/Header/Header.jsx` | Header styling | None |
| `components/Layout/basicLayout.jsx` | None | Loads layout used on pages without sidebar and header, the loggedOff pages |
| `components/Layout/defaultLayout.jsx` | None | Loads the default layout used on the majority of pages with a header and sidebar |
| `components/Layout/layout.jsx` | None | Contains styling, handled by `defaultLayout.jsx` |
| `components/Layout/subLayout.jsx` | None | Contains styling, handled by `basicLayout.jsx` |

Placeholders
| File | Description | Important Notes |
| :--- | :--- | :--- |
| `components/Placeholders/Error.jsx` | Default styling of errors alerts | None |
| `components/Placeholders/Success.jsx` | Default styling of success alerts | None |
| `components/Placeholders/Loading.jsx` | Default styling of loading states | None |
| `components/Placeholders/ServerPlaceholder.jsx` | Default styling of server placeholder | Shown when loggedIn user has no servers |

Sidebar
| File | Description | Important Notes |
| :--- | :--- | :--- |
| `components/Sidebar/Sidebar.jsx` | Sidebar | None |
| `components/Sidebar/SidebarRow.jsx` | Sidebar row | Handles every row in the sidebar. Requires propTypes: URL, ICON and TITLE |

Misc
| File | Description | Important Notes |
| :--- | :--- | :--- |
| `components/Link.jsx` | None | https://nextjs.org/docs/api-reference/next/link |
| `components/NavLink.jsx` | None | https://nextjs.org/docs/api-reference/next/link |
| `components/ImageUpload.js` | Handles the image upload of ISO thumbnails displayed on (`pages/instances/new`) | Implemented in `pages/admin/iso/new.jsx` converts thumbnails to Base64 |


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Next JS server build

Build server:
`sudo npm run build`

Start server: (port 3000) 
`pm2 start npm --name "FE App" -- start` 
PM2 info: https://pm2.keymetrics.io/

Check status:
`pm2 status`

Console logs
`pm2 monit`


## Creation of Virtual Machines basic template

Current template
Creates Ubuntu virtual machine with 4 CPU's, 1024MB ram.

CURL:
`curl -X POST 'https://172.16.1.70/api/vcenter/vm' -H 'vmware-api-session-id: SESSIONID' -H 'Content-type: application/json'`
https://developer.vmware.com/apis/vsphere-automation/v7.0U1/cis/rest/com/vmware/cis/session/post/

Storage placement:

```
    "placement": {
        "datastore": "datastore-1009",
        "folder": "group-v1002",
        "host": "host-1008"
    },
```

Datastore: HDD1 (172.16.1.70 -> Datacenter -> HDD1)
Folder: = ```    {
        "folder": "group-v1002",
        "name": "vm",
        "type": "VIRTUAL_MACHINE"
    },```
host: `172.16.1.69`


```
{
    "guest_OS": "UBUNTU_64",
    "name": "VM NAME",
    "placement": {
        "datastore": "datastore-1009",
        "folder": "group-v1002",
        "host": "host-1008"
    },
    "cpu": {
        "count": 4,
        "hot_add_enabled": false,
        "hot_remove_enabled": false,
        "cores_per_socket": 1
    },
    "memory": {
        "hot_add_enabled": false,
        "size_MiB": 1024
    },
    "nics": [
        {
        "backing": {
            "type": "STANDARD_PORTGROUP",
            "network": "network-1029"
        }
        }
    ],
    "storage_policy": {
        "policy": ""
    }
}

```

## Get all Folders

`curl -X GET 'https://172.16.1.70/api/vcenter/folder' -H 'vmware-api-session-id: SESSIONID'`

Response:
```
[
    {
        "folder": "group-d1",
        "name": "Datacenters",
        "type": "DATACENTER"
    },
    {
        "folder": "group-h1003",
        "name": "host",
        "type": "HOST"
    },
    {
        "folder": "group-n1005",
        "name": "network",
        "type": "NETWORK"
    },
    {
        "folder": "group-s1004",
        "name": "datastore",
        "type": "DATASTORE"
    },
    {
        "folder": "group-v1002",
        "name": "vm",
        "type": "VIRTUAL_MACHINE"
    },
    {
        "folder": "group-v1024",
        "name": "Discovered virtual machine",
        "type": "VIRTUAL_MACHINE"
    }
]
```

## Full template including optional params:
https://developer.vmware.com/apis/vsphere-automation/latest/vcenter/api/vcenter/vm/post/

```
{
	"boot": {
		"delay": 0,
		"efi_legacy_boot": false,
		"enter_setup_mode": false,
		"network_protocol": "IPV4",
		"retry": false,
		"retry_delay": 0,
		"type": "BIOS"
	},
	"boot_devices": [
		{
			"type": "CDROM"
		}
	],
	"cdroms": [
		{
			"allow_guest_control": false,
			"backing": {
				"device_access_type": "EMULATION",
				"host_device": "string",
				"iso_file": "string",
				"type": "ISO_FILE"
			},
			"ide": {
				"master": false,
				"primary": false
			},
			"sata": {
				"bus": 0,
				"unit": 0
			},
			"start_connected": false,
			"type": "IDE"
		}
	],
	"cpu": {
		"cores_per_socket": 0,
		"count": 0,
		"hot_add_enabled": false,
		"hot_remove_enabled": false
	},
	"disks": [
		{
			"backing": {
				"type": "VMDK_FILE",
				"vmdk_file": "string"
			},
			"ide": {
				"master": false,
				"primary": false
			},
			"new_vmdk": {
				"capacity": 0,
				"name": "string",
				"storage_policy": {
					"policy": "string"
				}
			},
			"nvme": {
				"bus": 0,
				"unit": 0
			},
			"sata": {
				"bus": 0,
				"unit": 0
			},
			"scsi": {
				"bus": 0,
				"unit": 0
			},
			"type": "IDE"
		}
	],
	"floppies": [
		{
			"allow_guest_control": false,
			"backing": {
				"host_device": "string",
				"image_file": "string",
				"type": "IMAGE_FILE"
			},
			"start_connected": false
		}
	],
	"guest_OS": "DOS",
	"hardware_version": "VMX_03",
	"memory": {
		"hot_add_enabled": false,
		"size_MiB": 0
	},
	"name": "string",
	"nics": [
		{
			"allow_guest_control": false,
			"backing": {
				"distributed_port": "string",
				"network": "string",
				"type": "STANDARD_PORTGROUP"
			},
			"mac_address": "string",
			"mac_type": "MANUAL",
			"pci_slot_number": 0,
			"start_connected": false,
			"type": "E1000",
			"upt_compatibility_enabled": false,
			"wake_on_lan_enabled": false
		}
	],
	"nvme_adapters": [
		{
			"bus": 0,
			"pci_slot_number": 0
		}
	],
	"parallel_ports": [
		{
			"allow_guest_control": false,
			"backing": {
				"file": "string",
				"host_device": "string",
				"type": "FILE"
			},
			"start_connected": false
		}
	],
	"placement": {
		"cluster": "string",
		"datastore": "string",
		"folder": "string",
		"host": "string",
		"resource_pool": "string"
	},
	"sata_adapters": [
		{
			"bus": 0,
			"pci_slot_number": 0,
			"type": "AHCI"
		}
	],
	"scsi_adapters": [
		{
			"bus": 0,
			"pci_slot_number": 0,
			"sharing": "NONE",
			"type": "BUSLOGIC"
		}
	],
	"serial_ports": [
		{
			"allow_guest_control": false,
			"backing": {
				"file": "string",
				"host_device": "string",
				"network_location": "string",
				"no_rx_loss": false,
				"pipe": "string",
				"proxy": "string",
				"type": "FILE"
			},
			"start_connected": false,
			"yield_on_poll": false
		}
	],
	"storage_policy": {
		"policy": "string"
	}
}
```