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

document.addEventListener('DOMContentLoaded', function () {
    const organizationList = document.querySelector('#organizations ul');
    const loadOrganizations = () => {
        organizationList.innerHTML = organizations.map(organization => {
            console.log(organization)
            return `                                        <li class="organization">
            <img src="images/dice.jpg" alt="Organization Image">
            <div class="organizationinfo-text">
                <div class="organizationheader">
                    <span class="organizationname">${organization.name}</span>
                    <button class="view">View</button>
                </div>
                <p class="organizationdescription">${organization.description}</p>
            </div>
        </li>`
        }).join('')
    }

    loadOrganizations();

    document.querySelector('button[class="search"]').addEventListener('click', function () {
        const search = document.querySelector('input[name="search"]').value;
        const organizationList = document.querySelector('#organizations ul');
        organizationList.innerHTML = organizations.filter(organization => organization.name.toLowerCase().includes(search) || organization.description.toLowerCase().includes(search)).map(organization => {
            return `<li class="organization">
            <img src="images/dice.jpg" alt="Organization Image">
            <div class="organizationinfo-text">
                <div class="organizationheader">
                    <span class="organizationname">${organization.name}</span>
                    <button class="view">View</button>
                </div>
                <p class="organizationdescription">${organization.description}</p>
            </div>
        </li>`
        }).join('')
        viewOrganizations();
    })

    const viewOrganizations = () => {
        document.querySelectorAll('button[class="view"]').forEach(button => {
            button.addEventListener('click', function () {
                console.log('clicking')
                const loadOrganization = () => {
                    console.log('loading')
                    const organization = organizations.filter(organization => organization.name == button.parentElement.querySelector('span[class="organizationname"]').innerHTML)[0]
                    const stylesheet = document.querySelector('#stylesheet');
                    stylesheet.setAttribute('href', 'stylesheets/organization.css')
                    document.querySelector('main').innerHTML = `            <div class="main">
                    <div class="organization">
                        <h2>Organization</h2>
                        <ul>
                            <li>
                                <img src="images/dice.jpg" alt="organization Image">
                                <div class="organizationinfo-text">
                                    <div class="organizationheader">
                                        <span class="organizationname">${organization.name}</span>
                                    </div>
                                    <div class="organizationheader2">
                                        <button class="edit">Edit</button>
                                    </div>
                                    <p class="organizationdescription">${organization.description}</p>
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
                                    <p class="staffname">Staff Name</p>
                                    <p class="staffrole">Staff Role</p>
                                </div>
                            </li>
                            <li class="staffmember">
                                <img src="images/dice.jpg" alt="Staff Image">
                                <div class="staffinfo">
                                    <p class="staffname">Staff Name</p>
                                    <p class="staffrole">Staff Role</p>
                                </div>
                            </li>
                            <li class="staffmember">
                                <img src="images/dice.jpg" alt="Staff Image">
                                <div class="staffinfo">
                                    <p class="staffname">Staff Name</p>
                                    <p class="staffrole">Staff Role</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                  </div>
                  <div id="events" class="events">
                    <h2>Events</h2>
                    <button class="createanevent">Create an Event</button>
                    <ul>
                    ${organization.events.map(event => {
                        return `                    <li class="event">
                        <img src="images/dice.jpg" alt="Event Image">
                        <div class="eventinfo-text">
                            <div class="eventheader">
                                <span class="eventname">${event.name}</span>
                                <span class="eventdate">${event.date}</span>
                            </div>
                            <div class="eventheader2">
                                <span class="users">0/${event.maxUsers}</span>
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
                        document.querySelector('main').innerHTML = `            <div class="container">
                    <h1>Create an Organization Event</h1>
                    <hr>
                    <b>Organization Event Name:</b>
                    <input type="text" name="name" placeholder="Enter your event name">
                    <br>
                    <b>Description:</b>
                    <textarea name="description" placeholder="Enter your description" style="width: 775px; height: 200px;"></textarea>
                    <br>
                    <button class="submitorganizationevent">Send</button>
                </div>`
                        document.querySelector('button[class="submitorganizationevent"]').addEventListener('click', function () {
                            organization.events.push({
                                name: 'SFSU Meet Up',
                                date: '12/08/23',
                                maxUsers: 40,
                                description: 'Event Description'
                            })
                            loadOrganization();
                        })
                    })
                }
                loadOrganization();
            })
        })
    }


    viewOrganizations();

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
        document.querySelector('button[class="submitorganization"]').addEventListener('click', function () {
            organizations.push({
                name: document.querySelector('input[name="name"]').value,
                description: document.querySelector('textarea[name="description"]').value,
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
                    },
                    {
                        name: 'Staff name',
                        role: 'Staff role'
                    },
                    {
                        name: 'Staff name',
                        role: 'Staff role'
                    }
                ],
                events: []
            })
            const stylesheet = document.querySelector('#stylesheet');
            document.querySelector('main').innerHTML = `            <div id="organizations">
        <button class="createanorganization">Create an Organization</button>
        <ul>
        ${organizations.map(organization => {
                return `                                        <li class="organization">
            <img src="images/dice.jpg" alt="Organization Image">
            <div class="organizationinfo-text">
                <div class="organizationheader">
                    <span class="organizationname">${organization.name}</span>
                    <button class="view">View</button>
                </div>
                <p class="organizationdescription">${organization.description}</p>
            </div>
        </li>`
            }).join('')}
        </ul>
    </div>`
            stylesheet.setAttribute('href', 'stylesheets/organizations.css')
            viewOrganizations();
        })
    })
});