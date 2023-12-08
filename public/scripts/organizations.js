let organizations = [
    {
        name: 'SFSU Meet Up',
        description: 'organization Description',
        socialMedia: [
            {
                name: 'Instagram',
                handle: 'instagramhandle'
            }
        ],
        staff: [
            {
                name: 'Staff name',
                role: 'Staff role'
            }
        ],
        events: [
            {
                name: 'SFSU Meet Up',
                date: '12/08/23',
                maxUsers: 40,
                description: 'Event Description'
            },
        ]
    },
    {
        name: 'SFSU Math Club',
        description: 'organization Description',
        socialMedia: [
            {
                name: 'Instagram',
                handle: 'instagramhandle'
            }
        ],
        staff: [
            {
                name: 'Staff name',
                role: 'Staff role'
            }
        ],
        events: [
            {
                name: 'SFSU Meet Up',
                date: '12/08/23',
                maxUsers: 40,
                description: 'Event Description'
            },
        ]
    },
]

document.addEventListener('DOMContentLoaded', async function () {
    const main = document.querySelector('main');
    const loadOrganizations = async () => {
        console.log('Loading organizations')
        document.querySelector('main').innerHTML = `            <div id="organizations">
        <button class="createanorganization">Create an Organization</button>
        <ul>
        </ul>
    </div>`
    const organizationsRes = await axios.get('/getOrgs');
    const organizationList = document.querySelector('#organizations ul');
        const stylesheet = document.querySelector('#stylesheet');
        stylesheet.setAttribute('href', 'stylesheets/organizations.css')
        organizationList.innerHTML = organizationsRes.data.map(organization => {
            return `                                        <li class="organization">
            <img src="images/dice.jpg" alt="Organization Image">
            <div class="organizationinfo-text">
                <div class="organizationheader">
                    <span class="organizationname">${organization.NAME}</span>
                    <button class="view">View</button>
                </div>
                <p class="organizationdescription">${organization.DESCRIPTION}</p>
            </div>
        </li>`
        }).join('')
    }

    loadOrganizations();

    document.querySelector('body').addEventListener('click', async (e) => {
        if(e.target.className == 'search' || e.target.name == 'submit-search') {
            const organizations = await axios.get('/getOrgs');
            const search = document.querySelector('input[name="search"]').value;
            const organizationList = document.querySelector('#organizations ul');
            organizationList.innerHTML = organizations.data.filter(organization => organization.NAME.toLowerCase().includes(search) || organization.DESCRIPTION.toLowerCase().includes(search)).map(organization => {
                return `<li class="organization">
                <img src="images/dice.jpg" alt="Organization Image">
                <div class="organizationinfo-text">
                    <div class="organizationheader">
                        <span class="organizationname">${organization.NAME}</span>
                        <button class="view">View</button>
                    </div>
                    <p class="organizationdescription">${organization.DESCRIPTION}</p>
                </div>
            </li>`
            }).join('')
        } else if(e.target.className == 'view') {
            const organizations = await axios.get('/getOrgs');
            const organization = organizations.data.filter(organization => organization.NAME == e.target.parentElement.querySelector('span[class="organizationname"]').innerHTML)[0]
            const stylesheet = document.querySelector('#stylesheet');
            const organizationEvents = await axios.get('/getOrgEvents', {
                params: {
                    orgid: organization.ID
                }
            });
            const users = await axios.get('/getInfo')
            const username = users.data[(getCookies("idNum") - 1)].USERNAME
            const test = await axios.get('/getUserOrgEvents', {
                params: {
                    userid: username
                }
            });
            const organizationEventUsers = await axios.get('/getOrgEventUsers', {
                params: {
                    eventid: organization.ID
                }
            })
            stylesheet.setAttribute('href', 'stylesheets/organization.css')
            document.querySelector('main').innerHTML = `            <div class="main">
            <div class="organization">
                <h2>Organization</h2>
                <ul>
                    <li>
                        <img src="images/dice.jpg" alt="organization Image">
                        <div class="organizationinfo-text">
                            <div class="organizationheader">
                                <span class="organizationname">${organization.NAME}</span>
                            </div>
                            <div class="organizationheader2">
                                <button class="edit">Edit</button>
                            </div>
                            <p class="organizationdescription">${organization.DESCRIPTION}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="staff">
                <h2>Staff</h2>
                <ul>
                    <li class="staffmember">
                        <img src="images/dice.jpg" alt="Staff Image">
                        <div class="staffinfo">
                            <p class="staffname">John Doe</p>
                            <p class="staffrole">Admin</p>
                        </div>
                    </li>
                    <li class="staffmember">
                        <img src="images/dice.jpg" alt="Staff Image">
                        <div class="staffinfo">
                            <p class="staffname">Jane Doe</p>
                            <p class="staffrole">Staff</p>
                        </div>
                    </li>
                    <li class="staffmember">
                        <img src="images/dice.jpg" alt="Staff Image">
                        <div class="staffinfo">
                            <p class="staffname">John and Jane's Kid</p>
                            <p class="staffrole">Other</p>
                        </div>
                    </li>
                </ul>
            </div>
          </div>
          <div id="events" class="events">
            <h2>Events</h2>
            <button class="createanevent">Create an Event</button>
            <ul>
            ${organizationEvents.data.map(event => {
                return `                    <li class="event">
                <img src="images/dice.jpg" alt="Event Image">
                <div class="eventinfo-text">
                    <div class="eventheader">
                        <span class="eventname">${event.NAME}</span>
                        <span class="eventdate">${event.DATE}</span>
                    </div>
                    <div class="eventheader2">
                        <span class="users">0/${event.MAXUSERS}</span>
                        <button class="join">Join</button>
                    </div>
                    <p class="eventdescription">Event Description</p>
                </div>
            </li>`
            }).join('')}
            </ul>
          </div>`

            document.querySelector('button[class="createanevent"]').addEventListener('click', function () {
                event.preventDefault();
                const stylesheet = document.querySelector('#stylesheet');
                stylesheet.setAttribute('href', 'stylesheets/contact.css')
                const previousName = document.querySelector('.organizationname').innerHTML;
                const previousDescription = document.querySelector('.organizationdescription').innerHTML;
                document.querySelector('main').innerHTML = `            <div class="container">
            <h1>Create an Organization Event</h1>
            <hr>
            <h2 class='previousname'>${previousName}</h2>
            <h2>${previousDescription}</h2>
            <b>Organization Event Name:</b>
            <input type="text" name="name" placeholder="Name">
            <br>
            <b>Organization Event Location:</b>
            <input type="text" name="location" placeholder="Location">
            <br>
            <b>Organization Event Date:</b>
            <input type="text" name="date" placeholder="Date">
            <br>
            <b>Organization Event Max Users:</b>
            <input type="text" name="maxusers" placeholder="Max Users">
            <br>
            <b>Description:</b>
            <textarea name="description" placeholder="Enter your description" style="width: 775px; height: 200px;"></textarea>
            <br>
            <button class="submitorganizationevent">Send</button>
        </div>`
            })
        } else if(e.target.className == 'submitorganizationevent') {
            const organizations = await axios.get('/getOrgs');
            const organization = organizations.data.filter(organization => organization.NAME == document.querySelector('.previousname').innerHTML)[0]
            const createEvent = await axios.get('/createOrgEvent', {
                params: {
                    orgid: organization.ID,
                    name: document.querySelector('input[name="name"]').value,
                    location: document.querySelector('input[name="location"]').value,
                    date: document.querySelector('input[name="date"]').value,
                    maxusers: document.querySelector('input[name="maxusers"]').value,
                }
            })
            console.log(createEvent.status)
            if(createEvent.status == 200) {
                loadOrganizations()
            }
        }
    })

    document.querySelector('main').addEventListener('click', async (event) => {
        const organizations = await axios.get('/getOrgs');
        if(event.target.className == 'join') {
            const users = await axios.get('/getInfo')
            const organization = organizations.data.filter(organization => organization.NAME == document.querySelector('.organizationname').innerHTML)[0]
            const organizationEvents = await axios.get('/getOrgEvents', {
                params: {
                    orgid: organization.ID
                }
            })
            const organizationEvent = organizationEvents.data.filter(eventt => eventt.NAME == event.target.parentElement.parentElement.querySelector('.eventname').innerHTML)[0]
            const joinRes = await axios.get('/joinUserOrgEvent', {
                params: {
                    userid: users.data[(getCookies("idNum") - 1)].USERNAME,
                    eventid: organizationEvent.ID,
                }
            })
            const organizationEventUsers = await axios.get('/getOrgEventUsers', {
                params: {
                    eventid: organizationEvent.ID
                }
            })
            console.log(organizationEventUsers.data.length)
            event.target.parentElement.children[0].innerHTML = `${organizationEventUsers.data.length}/${organizationEvent.MAXUSERS}`;
            event.target.innerHTML = 'Leave';
            event.target.className = 'leave';
        } else if(event.target.className == 'leave') {
            const users = await axios.get('/getInfo')
            const organization = organizations.data.filter(organization => organization.NAME == document.querySelector('.organizationname').innerHTML)[0]
            const organizationEvents = await axios.get('/getOrgEvents', {
                params: {
                    orgid: organization.ID
                }
            })
            const organizationEvent = organizationEvents.data.filter(eventt => eventt.NAME == event.target.parentElement.parentElement.querySelector('.eventname').innerHTML)[0]
            const joinRes = await axios.get('/leaveUserOrgEvent', {
                params: {
                    userid: users.data[(getCookies("idNum") - 1)].USERNAME
                }
            })
            const organizationEventUsers = await axios.get('/getOrgEventUsers', {
                params: {
                    eventid: organizationEvent.ID
                }
            })
            event.target.parentElement.children[0].innerHTML = `${organizationEventUsers.data.length}/${organizationEvent.MAXUSERS}`;
            event.target.innerHTML = 'Join';
            event.target.className = 'join';
        } else if(event.target.className == 'edit') {
            const previousName = document.querySelector('.organizationname').innerHTML;
            const previousDescription = document.querySelector('.organizationdescription').innerHTML;
            const stylesheet = document.querySelector('#stylesheet');
            stylesheet.setAttribute('href', 'stylesheets/contact.css')
            document.querySelector('main').innerHTML = `            <div class="container">
            <h1>Create an Organization</h1>
            <hr>
            <h2 class='previousname'>${previousName}</h2>
            <h2>${previousDescription}</h2>
            <b>Organization Name:</b>
            <input type="text" name="name" placeholder="Enter your organization name">
            <br>
            <b>Description:</b>
            <textarea name="description" placeholder="Enter your description" style="width: 775px; height: 200px;"></textarea>
            <br>
            <button class="submiteditorganization">Send</button>
            </div>`
        } else if(event.target.className == 'submiteditorganization') {
            console.log(document.querySelector('input[name="name"]').value)
            console.log(document.querySelector('textarea[name="description"]').value)
            console.log(document.querySelector('.previousname').innerHTML)
            const editOrganization = await axios.get('/editOrganization', {
                params: {
                    name: document.querySelector('input[name="name"]').value,
                    description: document.querySelector('textarea[name="description"]').value,
                    previousName: document.querySelector('.previousname').innerHTML
                }
            })
            const orgs = await axios.get('/getOrgs')
            const stylesheet = document.querySelector('#stylesheet');
            stylesheet.setAttribute('href', 'stylesheets/organizations.css')
            const main = document.querySelector('main').innerHTML = `            <div id="organizations">
            <button class="createanorganization">Create an Organization</button>
            <ul>
            </ul>
        </div>`
        const organizationList = document.querySelector('#organizations ul');
            organizationList.innerHTML = orgs.data.map(organization => {
                return `                                        <li class="organization">
                <img src="images/dice.jpg" alt="Organization Image">
                <div class="organizationinfo-text">
                    <div class="organizationheader">
                        <span class="organizationname">${organization.NAME}</span>
                        <button class="view">View</button>
                    </div>
                    <p class="organizationdescription">${organization.DESCRIPTION}</p>
                </div>
            </li>`
            }).join('')
        }
    })

    document.querySelector('button[class="createanorganization"]').addEventListener('click', function () {
        event.preventDefault();
        const stylesheet = document.querySelector('#stylesheet');
        stylesheet.setAttribute('href', 'stylesheets/contact.css')
        document.querySelector('main').innerHTML = `            <div class="container">
        <h1>Create an Organization</h1>
        <hr>
        <b>Organization Name:</b>
        <input type="text" name="name" placeholder="Enter your organization name">
        <br>
        <b>Description:</b>
        <textarea name="description" placeholder="Enter your description" style="width: 775px; height: 200px;"></textarea>
        <br>
        <button class="submitorganization">Send</button>
    </div>`
        document.querySelector('button[class="submitorganization"]').addEventListener('click', async function () {
            const createOrganization = await axios.get('/createOrganization', {
                params: {
                    name: `${document.querySelector('input[name="name"]').value}`,
                    description: `${document.querySelector('textarea[name="description"]').value}`,
                }
            })
            const organizations = await axios.get('/getOrgs')
            const stylesheet = document.querySelector('#stylesheet');
            document.querySelector('main').innerHTML = `            <div id="organizations">
        <button class="createanorganization">Create an Organization</button>
        <ul>
        ${organizations.data.map(organization => {
            console.log(organization)
                return `                                        <li class="organization">
            <img src="images/dice.jpg" alt="Organization Image">
            <div class="organizationinfo-text">
                <div class="organizationheader">
                    <span class="organizationname">${organization.NAME}</span>
                    <button class="view">View</button>
                </div>
                <p class="organizationdescription">${organization.DESCRIPTION}</p>
            </div>
        </li>`
            }).join('')}
        </ul>
    </div>`
            stylesheet.setAttribute('href', 'stylesheets/organizations.css')
        })
    })
});