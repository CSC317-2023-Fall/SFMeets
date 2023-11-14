const events = [
    {
        name: 'SFSU Meet Up',
        date: '11/06/23',
        maxUsers: 20,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '12/07/23',
        maxUsers: 30,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '12/08/23',
        maxUsers: 40,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '12/09/23',
        maxUsers: 50,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '12/10/23',
        maxUsers: 100,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '11/10/23',
        maxUsers: 100,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '11/11/23',
        maxUsers: 100,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '11/12/23',
        maxUsers: 100,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '11/13/23',
        maxUsers: 100,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '11/14/23',
        maxUsers: 100,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '11/15/23',
        maxUsers: 100,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '11/16/23',
        maxUsers: 100,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '11/17/23',
        maxUsers: 100,
        description: 'Event Description'
    },
    {
        name: 'SFSU Meet Up',
        date: '11/18/23',
        maxUsers: 100,
        description: 'Event Description'
    }
]

document.addEventListener('DOMContentLoaded', function() {
    const eventList = document.querySelector('#events ul');
    const loadEvents = () => {
        eventList.innerHTML = events.map(event => {
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
        }).join('')
    }

    loadEvents();

    const buttons = ['showallbutton', 'todaybutton', 'thisweekbutton', 'thismonthbutton'];
    buttons.forEach(button => {
        document.querySelector(`#${button}`).addEventListener('click', function() {
            let buttons = ['showallbutton', 'todaybutton', 'thisweekbutton', 'thismonthbutton'];
            if(document.querySelector(`#${button}`).className.includes('active')) return;

            buttons.splice(buttons.indexOf(`${button}`), 1)
            buttons.forEach(button => {
                document.querySelector(`#${button}`).classList.remove('active')
            })
            document.querySelector(`#${button}`).classList.add('active')

            const date = new Date();
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`
            const [month, day, year] = formattedDate.split('/')
            if(button == 'showallbutton') {
                loadEvents()
            } else if(button == 'todaybutton') {
                eventList.innerHTML = events.filter(event => event.date == formattedDate).map(event => {
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
                }).join('')
            } else if(button == 'thisweekbutton') {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                const max = 6-days.indexOf(days[date.getDay()]);
                const min = 6-max;
                eventList.innerHTML = events.filter(event => +day - min <= +event.date.split('/')[1] && +day + max >= +event.date.split('/')[1] && month == event.date.split('/')[0]).map(event => {
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
                }).join('')
            } else if(button == 'thismonthbutton') {
                const month = `${date.getMonth() + 1}`
                eventList.innerHTML = events.filter(event => event.date.split('/')[0] == month).map(event => {
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
                }).join('')
            }
        })
    })

    document.querySelector('button[class="search"]').addEventListener('click', function() {
        const search = document.querySelector('input[name="search"]').value;
        eventList.innerHTML = events.filter(event => event.name.toLowerCase().includes(search) || event.date.includes(search) || event.description.toLowerCase().includes(search)).map(event => {
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
        }).join('')
        buttons.forEach(button => {
            document.querySelector(`#${button}`).classList.remove('active')
        })
        if(search == '') document.querySelector(`#showallbutton`).classList.add('active')
    })
});