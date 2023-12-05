document.addEventListener('DOMContentLoaded', async function() {
    const eventList = document.querySelector('#events ul');
    const events = await axios.get('/getEvents')
    console.log(events);
    const loadEvents = () => {
        eventList.innerHTML = events.data.map(event => {
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
                <p class="eventdescription">${event.DESCRIPTION}</p>
            </div>
        </li>`
        }).join('')
    }

    loadEvents();

    const buttons = ['showallbutton', 'todaybutton', 'thisweekbutton', 'thismonthbutton'];
    buttons.forEach(async button => {
        const events = await axios.get('/getEvents');
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
                eventList.innerHTML = events.data.filter(event => event.DATE == formattedDate).map(event => {
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
                        <p class="eventdescription">${event.DESCRIPTION}</p>
                    </div>
                </li>`
                }).join('')
            } else if(button == 'thisweekbutton') {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                const max = 6-days.indexOf(days[date.getDay()]);
                const min = 6-max;
                eventList.innerHTML = events.data.filter(event => +day - min <= +event.DATE.split('/')[1] && +day + max >= +event.DATE.split('/')[1] && month == event.DATE.split('/')[0]).map(event => {
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
                        <p class="eventdescription">${event.DESCRIPTION}</p>
                    </div>
                </li>`
                }).join('')
            } else if(button == 'thismonthbutton') {
                const month = `${date.getMonth() + 1}`
                eventList.innerHTML = events.data.filter(event => event.DATE.split('/')[0] == month).map(event => {
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
                        <p class="eventdescription">${event.DESCRIPTION}</p>
                    </div>
                </li>`
                }).join('')
            }
        })
    })

    document.querySelector('button[class="search"]').addEventListener('click', async function() {
        const search = document.querySelector('input[name="search"]').value;
        const events = await axios.get('/getEvents');
        eventList.innerHTML = events.data.filter(event => event.NAME.toLowerCase().includes(search) || event.DATE.includes(search) || event.DESCRIPTION.toLowerCase().includes(search)).map(event => {
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
                <p class="eventdescription">${event.DESCRIPTION}</p>
            </div>
        </li>`
        }).join('')
        buttons.forEach(button => {
            document.querySelector(`#${button}`).classList.remove('active')
        })
        if(search == '') document.querySelector(`#showallbutton`).classList.add('active')
    })

    document.querySelector('main').addEventListener('click', async (e) => {
        if(e.target.className == 'join') {
            const users = await axios.get('/getInfo')
            const events = await axios.get('/getEvents')
            const event = events.data.filter(event => event.NAME == e.target.parentElement.parentElement.querySelector('.eventname').innerHTML)[0]
            const joinRes = await axios.get('/joinEvent', {
                params: {
                    userid: users.data[(getCookies("idNum") - 1)].USERNAME,
                    eventid: event.ID,
                }
            })
            console.log(joinRes)
            const eventUsers = await axios.get('/getEventUsers', {
                params: {
                    eventid: event.ID
                }
            })
            console.log(eventUsers)
            e.target.parentElement.children[0].innerHTML = `${eventUsers.data.length}/${event.MAXUSERS}`;
            e.target.innerHTML = 'Leave';
            e.target.className = 'leave';
        } else if(e.target.className == 'leave') {
            const users = await axios.get('/getInfo')
            const events = await axios.get('/getEvents')
            const event = events.data.filter(event => event.NAME == e.target.parentElement.parentElement.querySelector('.eventname').innerHTML)[0]
            const joinRes = await axios.get('/leaveEvent', {
                params: {
                    userid: users.data[(getCookies("idNum") - 1)].USERNAME,
                    eventid: event.ID,
                }
            })
            const eventUsers = await axios.get('/getEventUsers', {
                params: {
                    eventid: event.ID
                }
            })
            console.log(eventUsers)
            e.target.parentElement.children[0].innerHTML = `${eventUsers.data.length}/${event.MAXUSERS}`;
            e.target.innerHTML = 'Join';
            e.target.className = 'join';
        }
    })
});